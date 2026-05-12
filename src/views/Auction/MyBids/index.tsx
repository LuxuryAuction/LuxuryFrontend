"use client";

import { useState } from "react";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { Pagination } from "@/src/components/ui/Pagination";
import NoData from "@/src/components/ui/NoData";
import { MOCK_BIDS_DATA } from "./mockBids";
import { PageHeader } from "@/src/components/ui/PageHeader";
import { FILTER_TABS } from "./constants";
import { BidCard } from "./components/BidCard";
import { LightningIcon } from "@/public/assets/icons";


export const MyBidsView = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);


  const winningCount = 3
  const outbidCount = 1

  return (
    <div className="p-5 md:p-7 mx-auto flex flex-col">
      <PageHeader
        label="Bidding"
        title="My Bids"
        description={`${winningCount} winning · ${outbidCount} outbid`}
      />

      <div className="flex flex-col gap-6">
        {outbidCount > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ef4444]/5 border border-[#ef4444]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0" />
            <p className="text-sm text-[#ef4444]/90">
              You are outbid on{" "}
              <span className="font-bold">{outbidCount} {outbidCount === 1 ? "lot" : "lots"}</span>.
              Raise your bid before the auction ends.
            </p>
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 items-start sm:items-center justify-between">
          <Tabs tabs={FILTER_TABS} activeTab={activeTab} onChange={setActiveTab} variant="pill" />
          <div className="w-full sm:w-60">
            <Input type="search" placeholder="Search bids..." value={search} onChange={setSearch} inputSize="sm" />
          </div>
        </div>

        {MOCK_BIDS_DATA.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {MOCK_BIDS_DATA.map((bid, idx) => (
                <BidCard key={bid.id} bid={bid} idx={idx} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
          </>
        ) : (
          <NoData
            title={search ? "No results" : "No bids yet"}
            description={search ? "Try a different search." : "Explore auctions and place your first bid."}
            icon={<LightningIcon className="text-brand-primary/30 w-10 h-10" />}
          />
        )}
      </div>
    </div>
  );
};
