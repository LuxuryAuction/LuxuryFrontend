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
import { RootState } from "@/src/store";
import { useSelector } from "react-redux";

interface ProfilePageProps {
  id?: string;
}

export const ProfilePage = ({ id }: ProfilePageProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isReportOpen, setIsReportOpen] = useState(false);

  const { userId } = useSelector((state: RootState) => state.auth);
  const { showToast } = useToast();

  const isMe = !id || (userId !== null && String(userId) === String(id));

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
      { id: "bids", label: "Bids" },
    ];

  const handleReportSubmit = async (data: {
    reason: string;
    lotNumber: string;
    proofs: string;
    telegramContact: string;
  }) => {
    console.log
    try {
      showToast("success", "Report submitted successfully. Our team will review it shortly.");
    } catch {
      showToast("error", "Failed to submit report. Please try again.");
    }
  };

  if (false) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="p-5 md:p-7 max-w-7xl mx-auto">
      <ProfileHeader
        profile={{
          name: "Test User",
          userName: "@testUser",
          id: 123,
          memberSince: "2022-01-01",
          isVerified: true,
          trustScore: 95,
          balance: 1000,
        }}
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
      {activeTab === "lots" && <MyLotsTab />}
      {activeTab === "bids" && <MyBidsTab />}
      {activeTab === "balance" && isMe && <BalanceTab />}

      {!isMe && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          onSubmit={handleReportSubmit}
          userName="test"
        />
      )}
    </div>
  );
};