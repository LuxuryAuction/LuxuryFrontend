"use client";

import { useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { OverviewTab } from "./OverviewTab";
import { MyLotsTab } from "./MyLotsTab";
import { MyBidsTab } from "./MyBidsTab";
import Tabs from "@/src/components/ui/Tabs";
import { useUserProfile } from "@/src/hooks/useUserProfile";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: profile, isLoading } = useUserProfile();

  const tabsConfig = [
    { id: "overview", label: "Overview" },
    { id: "lots", label: "Lots" },
    { id: "bids", label: "Bids" },
    { id: "payments", label: "Payments" },
  ];

  if (isLoading || !profile) {
    return <div className="p-5 md:p-7 text-content-secondary animate-pulse">Loading profile...</div>;
  }

  return (
    <div className="p-5 md:p-7">
      <ProfileHeader profile={profile} />
      <Tabs

        tabs={tabsConfig}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-5"
      />

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "lots" && <MyLotsTab />}
      {activeTab === "bids" && <MyBidsTab />}
      {activeTab === "payments" && (
        <div className="bg-[#13151a] border border-[#2a2e3a] rounded-[12px] p-10 text-center text-[#555b6e] font-mono text-[0.75rem]">
          {activeTab} — coming soon
        </div>
      )}
    </div>
  );
};