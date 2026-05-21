"use client";

import { useState, useMemo } from "react";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { LightningIcon } from "@/public/assets/icons";
import NoData from "@/src/components/ui/NoData";
import { LotsGridSkeleton } from "@/src/views/Auction/components/LotsGridSkeleton";
import { BidCard } from "@/src/views/Auction/MyBids/components/BidCard";

const FILTER_TABS = [
  { id: "all", label: "All Bids" },
  { id: "winning", label: "Winning" },
  { id: "outbid", label: "Outbid" },
  { id: "won", label: "Won" },
];


interface MyBidsTabProps {
  userId?: string;
}

export const MyBidsTab = ({ userId }: MyBidsTabProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const params = useMemo(() => ({
    status: activeTab !== "all" ? activeTab : undefined,
    search: search || undefined,
  }), [activeTab, search]);

  const isLoading = true
  const items = [];

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
        {isLoading ? (
          <LotsGridSkeleton />
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((bid, idx) => (
              <BidCard key={bid.bidId} bid={bid} idx={idx} />
            ))}
          </div>
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
