"use client";

import { useMemo, useState } from "react";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { LightningIcon } from "@/public/assets/icons";
import NoData from "@/src/components/ui/NoData";
import { LotsGridSkeleton } from "@/src/views/Auction/components/LotsGridSkeleton";
import { BidCard } from "@/src/views/Auction/MyBids/components/BidCard";
import { useUserBids } from "@/src/hooks/useUserBids";
import { UserBidStatus } from "@/src/services/UsersService/types";
import { Alert } from "@/src/components/ui/Alert";
import { matchesBidFilterTab } from "@/src/views/Auction/MyBids/utils";

const FILTER_TABS = [
  { id: "all", label: "All Bids" },
  { id: UserBidStatus.Winning, label: "Winning" },
  { id: UserBidStatus.Outbid, label: "Outbid" },
  { id: UserBidStatus.Won, label: "Won" },
  { id: UserBidStatus.Lost, label: "Lost" },
];

const ITEMS_PER_PAGE = 12;

type BidFilterTab = "all" | UserBidStatus;

function getApiStatusParam(tab: BidFilterTab) {
  if (tab === "all") return undefined;
  if (tab === UserBidStatus.Winning || tab === UserBidStatus.Outbid) {
    return UserBidStatus.Ongoing;
  }
  return tab;
}

interface MyBidsTabProps {
  userName?: string;
}

export const MyBidsTab = ({ userName }: MyBidsTabProps) => {
  const [activeTab, setActiveTab] = useState<BidFilterTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const listParams = useMemo(
    () => ({
      page,
      pageSize: ITEMS_PER_PAGE,
      status: getApiStatusParam(activeTab),
    }),
    [page, activeTab],
  );

  const { items, isLoading, error } = useUserBids(listParams, userName);

  const filteredItems = useMemo(() => {
    const byTab = items.filter((bid) => matchesBidFilterTab(bid, activeTab));

    if (!search.trim()) return byTab;

    const q = search.trim().toLowerCase();
    return byTab.filter(
      (bid) =>
        bid.lot.name.toLowerCase().includes(q) ||
        bid.lot.lotNumber.toLowerCase().includes(q) ||
        bid.lot.category.name.toLowerCase().includes(q),
    );
  }, [items, activeTab, search]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as BidFilterTab);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <Alert variant="error" title="Failed to load bids">
          {error.message}
        </Alert>
      )}

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
          <Tabs tabs={FILTER_TABS} activeTab={activeTab} onChange={handleTabChange} variant="pill" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {isLoading ? (
          <LotsGridSkeleton />
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map((bid, idx) => (
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
