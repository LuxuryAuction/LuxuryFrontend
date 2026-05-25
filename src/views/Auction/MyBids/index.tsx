"use client";

import { useMemo, useState } from "react";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { Pagination } from "@/src/components/ui/Pagination";
import NoData from "@/src/components/ui/NoData";
import { PageHeader } from "@/src/components/ui/PageHeader";
import { FILTER_TABS } from "./constants";
import { BidCard } from "./components/BidCard";
import { LightningIcon } from "@/public/assets/icons";
import { Alert } from "@/src/components/ui/Alert";
import { usePaginationScroll } from "@/src/hooks/usePaginationScroll";
import { useUserBids } from "@/src/hooks/useUserBids";
import { UserBidStatus } from "@/src/services/UsersService/types";
import { LotsGridSkeleton } from "@/src/views/Auction/components/LotsGridSkeleton";
import { matchesBidFilterTab } from "./utils";

const ITEMS_PER_PAGE = 12;

type BidFilterTab = "all" | UserBidStatus;

function getApiStatusParam(tab: BidFilterTab) {
  if (tab === "all") return undefined;
  if (tab === UserBidStatus.Winning || tab === UserBidStatus.Outbid) {
    return UserBidStatus.Ongoing;
  }
  return tab;
}

export const MyBidsView = () => {
  const [activeTab, setActiveTab] = useState<BidFilterTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  usePaginationScroll(page);

  const listParams = useMemo(
    () => ({
      page,
      pageSize: ITEMS_PER_PAGE,
      status: getApiStatusParam(activeTab),
    }),
    [page, activeTab],
  );

  const {
    items,
    winningLotsCount,
    outbidLotsCount,
    totalPages,
    isLoading,
    error,
  } = useUserBids(listParams);

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
    <div className="p-5 md:p-7 mx-auto flex flex-col max-w-7xl">
      <PageHeader
        label="Bidding"
        title="My Bids"
        description={`${winningLotsCount} winning · ${outbidLotsCount} outbid`}
      />

      <div className="flex flex-col gap-6">
        {outbidLotsCount > 0 && (
          <Alert variant="warning" title="Outbid Alert">
            You are <span>outbid</span> on{" "}
            <span className="font-bold">
              {outbidLotsCount} {outbidLotsCount === 1 ? "lot" : "lots"}
            </span>
            . Raise your bid before the auction ends.
          </Alert>
        )}

        {error && (
          <Alert variant="error" title="Failed to load bids">
            {error.message}
          </Alert>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 items-start sm:items-center justify-between">
          <Tabs tabs={FILTER_TABS} activeTab={activeTab} onChange={handleTabChange} variant="pill" />
          <div className="w-full sm:w-60">
            <Input
              type="search"
              placeholder="Search bids..."
              value={search}
              onChange={setSearch}
              inputSize="sm"
            />
          </div>
        </div>

        {isLoading ? (
          <LotsGridSkeleton />
        ) : filteredItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((bid, idx) => (
                <BidCard key={bid.bidId} bid={bid} idx={idx} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            )}
          </>
        ) : (
          <NoData
            title={search ? "No results" : "No bids yet"}
            description={
              search ? "Try a different search." : "Explore auctions and place your first bid."
            }
            icon={<LightningIcon className="text-brand-primary/30 w-10 h-10" />}
          />
        )}
      </div>
    </div>
  );
};
