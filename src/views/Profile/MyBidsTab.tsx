"use client";

import { useState } from "react";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { LightningIcon } from "@/public/assets/icons";
import NoData from "@/src/components/ui/NoData";

const FILTER_TABS = [
  { id: "all", label: "All Bids" },
  { id: "winning", label: "Winning" },
  { id: "outbid", label: "Outbid" },
  { id: "won", label: "Won" },
];


export const MyBidsTab = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row-reverse justify-between gap-4 items-start lg:items-center">
        <div className="flex flex-row items-center gap-3 w-full md:w-auto justify-end relative">
          <div className="flex-1 md:flex-none md:w-64">
            <Input
              type="search"
              placeholder="Filter bids..."
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>

        <div>
          <Tabs
            tabs={FILTER_TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="pill"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {false ? (
          <></>
        ) : (
          <NoData
            title="No bids found"
            description="You don't have any bids matching this criteria."
            icon={<LightningIcon className="text-brand-primary/40 w-10 h-10" />}
          />
        )}
      </div>
    </div>
  );
};
