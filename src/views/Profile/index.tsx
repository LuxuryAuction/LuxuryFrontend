"use client";

import { useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { OverviewTab } from "./OverviewTab";
import { MyLotsTab } from "./MyLotsTab";
import { MyBidsTab } from "./MyBidsTab";
import { BalanceTab } from "./BalanceTab";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import { ReportModal } from "./components/ReportModal";
import Tabs from "@/src/components/ui/Tabs";
import { Alert } from "@/src/components/ui/Alert";
import { useToast } from "@/src/components/ui/Toast";
import { useGetProfile } from "@/src/hooks/useUserProfile";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";

interface ProfilePageProps {
  id?: string;
}

export const ProfilePage = ({ id: idProp }: ProfilePageProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isReportOpen, setIsReportOpen] = useState(false);

  const { showToast } = useToast();

  const params = useParams();
  const profileId = (params.id as string | undefined) ?? idProp;
  const authUserId = useSelector((state: RootState) => state.auth.userId);

  const isMe =
    profileId != null &&
    authUserId != null &&
    String(profileId) === String(authUserId);

  const { data: profile, isLoading, error } = useGetProfile(profileId);

  const tabsConfig = isMe
    ? [
      { id: "overview", label: "Overview" },
      { id: "lots", label: "Lots" },
      { id: "bids", label: "Bids" },
      { id: "balance", label: "Balance" },
    ]
    : [
      { id: "overview", label: "Overview" },
      { id: "lots", label: "Lots" },
    ];

  const handleReportSubmit = async (data: {
    reason: string;
    lotNumber: string;
    proofs: string;
    telegramContact: string;
  }) => {
    console.log(data)
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
        isMe={isMe}
        onReportClick={() => setIsReportOpen(true)}
      />

      {isMe && (
        <Alert variant="warning" title="Outbid Alert" className="mb-6">
          You are <span>outbid</span> on 1 lot. Raise your bid before the auction ends.
        </Alert>
      )}

      <Tabs
        tabs={tabsConfig}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-5"
      />

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "lots" && <MyLotsTab userId={profileId} />}
      {activeTab === "bids" && isMe && <MyBidsTab userId={profileId} />}
      {activeTab === "balance" && isMe && <BalanceTab balance={profile.balance} />}

      {!isMe && (
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