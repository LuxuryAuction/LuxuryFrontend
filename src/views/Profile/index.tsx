"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/src/i18n/navigation";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileHome } from "./profileHome";
import { MyLotsTab } from "./MyLotsTab";
import { MyBidsTab } from "./MyBidsTab";
import { BalanceTab } from "./BalanceTab";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import { ReportModal } from "./components/ReportModal";
import Tabs from "@/src/components/ui/Tabs";
import { Alert } from "@/src/components/ui/Alert";
import { useToast } from "@/src/components/ui/Toast";
import { useGetProfile } from "@/src/hooks/useUserProfile";
import { useTopUpReturnPolling } from "@/src/hooks/useTopUpReturnPolling";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { useTranslations } from "next-intl";
import { isTopUpReturn } from "@/src/utils/paymentReturn";
import { consumePostTopUpRedirect, peekPostTopUpRedirect } from "@/src/utils/paymentStorage";
import { topUpLog } from "@/src/utils/topUpDebugLog";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profileHome");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [handledReturn, setHandledReturn] = useState(false);

  const { showToast } = useToast();
  const t = useTranslations("ProfilePage");
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useParams();
  const profileUserName = params.userName as string | undefined;
  const authUserName = useSelector((state: RootState) => state.auth.userName);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const isMe =
    profileUserName != null &&
    authUserName != null &&
    profileUserName.toLowerCase() === authUserName.toLowerCase();

  const { data: profile, isLoading, error, refetch } = useGetProfile(profileUserName);

  const isReturnFromPayment = useMemo(
    () => isTopUpReturn(searchParams) && isMe && !handledReturn,
    [searchParams, isMe, handledReturn],
  );

  useEffect(() => {
    topUpLog("profile.mountState", {
      profileUserName,
      authUserName,
      isMe,
      isReturnFromPayment,
      handledReturn,
      searchParams: searchParams.toString(),
      profileBalance: profile?.balance,
      pendingRedirect: peekPostTopUpRedirect(),
    });
  }, [
    profileUserName,
    authUserName,
    isMe,
    isReturnFromPayment,
    handledReturn,
    searchParams,
    profile?.balance,
  ]);

  useEffect(() => {
    if (isReturnFromPayment) {
      topUpLog("profile.returnFromPayment.detected", {
        profileBalance: profile?.balance,
        pendingRedirect: peekPostTopUpRedirect(),
      });
      setActiveTab("balance");
    }
  }, [isReturnFromPayment, profile?.balance]);

  const pollBalance = useCallback(async () => {
    topUpLog("profile.pollBalance.refetch.start");
    const updated = await refetch();
    topUpLog("profile.pollBalance.refetch.done", { balance: updated?.balance });
    return updated?.balance;
  }, [refetch]);

  const { isConfirming } = useTopUpReturnPolling({
    enabled: isReturnFromPayment,
    initialBalance: profile?.balance ?? 0,
    onPoll: pollBalance,
    onSuccess: (newBalance) => {
      topUpLog("profile.pollBalance.onSuccess", { newBalance });
      setHandledReturn(true);
      const redirectPath = consumePostTopUpRedirect();
      topUpLog("profile.pollBalance.postRedirect", { redirectPath });
      if (redirectPath) {
        topUpLog("profile.pollBalance.navigating", { redirectPath });
        router.replace(redirectPath);
      }
    },
    successMessage: "Balance updated successfully.",
    timeoutMessage: "Payment is still processing. Refresh the page in a moment.",
  });

  const tabsConfig = isMe
    ? [
      { id: "profileHome", label: t("tabs.profileHome") },
      { id: "lots", label: t("tabs.lots") },
      { id: "bids", label: t("tabs.bids") },
      { id: "balance", label: t("tabs.balance") },
    ]
    : [
      { id: "profileHome", label: t("tabs.profileHome") },
      { id: "lots", label: t("tabs.lots") },
    ];

  const handleReportSubmit = async (data: {
    reason: string;
    lotNumber: string;
    proofs: string;
    telegramContact: string;
  }) => {
    console.log(data);
    try {
      showToast("success", "Report submitted successfully. Our team will review it shortly.");
    } catch {
      showToast("error", "Failed to submit report. Please try again.");
    }
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error && !profile) {
    return (
      <div className="p-5 md:p-7 max-w-7xl mx-auto">
        <Alert variant="error" title="Failed to load profile">
          {error.message}
        </Alert>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="p-5 md:p-7 max-w-7xl mx-auto">
      <ProfileHeader
        profile={profile}
        profileUserName={profile.userName}
        isMe={isMe}
        isAuthenticated={isAuthenticated}
        onReportClick={isAuthenticated ? () => setIsReportOpen(true) : undefined}
      />

      {isMe && profile.outbidLotsCount > 0 && (
        <Alert variant="warning" title={t("outbidAlert.title")} className="mb-6">
          {t.rich("outbidAlert.body", {
            count: profile.outbidLotsCount,
            outbid: (chunks) => <span>{chunks}</span>,
          })}
        </Alert>
      )}

      <Tabs
        tabs={tabsConfig}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-5"
      />

      {activeTab === "profileHome" && <ProfileHome profile={profile} isMe={isMe} />}
      {activeTab === "lots" && <MyLotsTab userName={profileUserName} />}
      {activeTab === "bids" && isMe && <MyBidsTab userName={profileUserName} />}
      {activeTab === "balance" && isMe && (
        <BalanceTab balance={profile.balance} isConfirmingPayment={isConfirming} />
      )}

      {!isMe && isAuthenticated && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          onSubmit={handleReportSubmit}
          userName={profile.userName}
        />
      )}
    </div>
  );
};
