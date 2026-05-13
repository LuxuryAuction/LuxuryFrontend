"use client";

import { useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { OverviewTab } from "./OverviewTab";
import { MyLotsTab } from "./MyLotsTab";
import { MyBidsTab } from "./MyBidsTab";
import { BalanceTab } from "./BalanceTab";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import Tabs from "@/src/components/ui/Tabs";
import { Alert } from "@/src/components/ui/Alert";
import { useUserProfile } from "@/src/hooks/useUserProfile";
import { RootState } from "@/src/store";
import { useSelector } from "react-redux";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: profile, isLoading } = useUserProfile();
  const { userId, userName, userRole, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  console.log(userId, userName, userRole, isAuthenticated);
  
  const tabsConfig = [
    { id: "overview", label: "Overview" },
    { id: "lots", label: "Lots" },
    { id: "bids", label: "Bids" },
    { id: "balance", label: "Balance" },
  ];

  if (isLoading || !profile) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="p-5 md:p-7 max-w-7xl mx-auto">
      <ProfileHeader profile={profile} />

      <Alert variant="warning" title="Outbid Alert" className="mb-6">
        You are <span>outbid</span> on 1 lot. Raise your bid before the auction ends.
      </Alert>

      <Tabs

        tabs={tabsConfig}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-5"
      />

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "lots" && <MyLotsTab />}
      {activeTab === "bids" && <MyBidsTab />}
      {activeTab === "balance" && <BalanceTab balance={profile.balance} />}
    </div>
  );
};