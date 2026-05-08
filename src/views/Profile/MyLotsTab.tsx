"use client";

import { useState, useEffect, useMemo } from "react";
import { LotCard } from "@/src/components/ui/LotCard";
import { ViewSwitcher, ViewVariant } from "@/src/components/ui/ViewSwitcher";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { Pagination } from "@/src/components/ui/Pagination";
import { EmptyBoxIcon } from "@/public/assets/icons";
import { useGetUserLots } from "@/src/hooks/useLots";
import NoData from "@/src/components/ui/NoData";

const MY_LOTS_FILTER_TABS = [
  { id: "all", label: "All Lots" },
  { id: "Active", label: "Active" },
  { id: "Draft", label: "Drafts" },
  { id: "Completed", label: "Ended" },
];

export const MyLotsTab = () => {
  const [viewVariant, setViewVariant] = useState<ViewVariant>("grid");
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();

  const params = useMemo(() => ({
    status: activeTab !== "all" ? activeTab : undefined,
    search: search || undefined,
  }), [activeTab, search]);

  const { data: lots, isLoading: isLoadingLots } = useGetUserLots(params);

  const items = lots || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row-reverse lg:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
          <div className="flex flex-row items-center gap-2 sm:gap-3 w-full md:w-auto relative">
            <div className="flex-1 md:w-72">
              <Input
                type="search"
                placeholder="Search in my lots..."
                value={search}
                onChange={setSearch}
              />
            </div>

            <div className="hidden md:flex">
              <ViewSwitcher
                variant={viewVariant}
                onChange={setViewVariant}
              />
            </div>
          </div>
        </div>
        <div>
          <Tabs
            tabs={MY_LOTS_FILTER_TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="pill"
          />
        </div>
      </div>
      {isLoadingLots ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-content-tertiary font-mono text-[10px] uppercase tracking-widest animate-pulse">
            Loading your auction lots...
          </p>
        </div>
      ) : items.length > 0 ? (
        <>
          <div className={
            (isMobile || viewVariant === "grid")
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-bvCatFadeUp"
              : "flex flex-col gap-3 animate-bvCatFadeUp"
          }>
            {items.map((lot, idx) => (
              <div key={lot.id} className="h-full" style={{ animationDelay: `${idx * 0.05}s` }}>
                <LotCard
                  lot={lot}
                  variant={isMobile ? "grid" : viewVariant}
                  showCategory={true}
                />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={3}
            onPageChange={setPage}
          />
        </>
      ) : (
        <NoData
          title={search ? "No lots found" : "No auctions yet"}
          description={search ? "There are no lots matching your search." : "You haven't created any auction lots yet."}
          icon={<EmptyBoxIcon className="text-content-tertiary" />}
        />
      )}
    </div>
  );
};



