"use client";

import { useState } from "react";
import { TabId } from "./types";
import { ProfileHeader } from "./ProfileHeader";
import { OverviewTab } from "./OverviewTab";
import { MyLotsTab } from "./MyLotsTab";
import Tabs from "@/src/components/ui/Tabs";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const tabsConfig = [
    { id: "overview" as TabId, label: "Overview" },
    { id: "my-lots" as TabId, label: "My Active Lots" },
    { id: "auctions" as TabId, label: "My Auction Lots" },
    { id: "payments" as TabId, label: "Payments" },
    { id: "trust" as TabId, label: "Trust & Safety" },
  ];

  return (
    <div className="p-5 md:p-7">
      <ProfileHeader />
      <Tabs
        tabs={tabsConfig}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-5"
      />

      {activeTab === "overview" && <OverviewTab />}
      {(activeTab === "my-lots" || activeTab === "auctions") && <MyLotsTab />}
      {(activeTab === "payments" || activeTab === "trust") && (
        <div className="bg-[#13151a] border border-[#2a2e3a] rounded-[12px] p-10 text-center text-[#555b6e] font-mono text-[0.75rem]">
          {activeTab} — coming soon
        </div>
      )}
    </div>
  );
};