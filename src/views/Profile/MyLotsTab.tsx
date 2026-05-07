"use client";

import { useState, useEffect } from "react";
import { LotCard } from "@/src/components/ui/LotCard";
import { ViewSwitcher, ViewVariant } from "@/src/components/ui/ViewSwitcher";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { Pagination } from "@/src/components/ui/Pagination";
import { EmptyBoxIcon } from "@/public/assets/icons";
import { MOCK_LOTS } from "@/src/views/Auction/MyLots/mockLots";

const MY_LOTS_FILTER_TABS = [
  { id: "all", label: "All Lots" },
  { id: "active", label: "Active" },
  { id: "draft", label: "Drafts" },
  { id: "ended", label: "Ended" },
];

export const MyLotsTab = () => {
  const [viewVariant, setViewVariant] = useState<ViewVariant>("grid");
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();


  const filteredLots = MOCK_LOTS.filter(lot => {
    if (activeTab !== "all") {
      if (activeTab === "active" && !["ACTIVE", "EXTENDED"].includes(lot.status)) return false;
      if (activeTab === "upcoming" && lot.status !== "PENDING_APPROVAL") return false;
      if (activeTab === "ended" && !["COMPLETED", "PAID", "DELIVERED"].includes(lot.status)) return false;
      if (activeTab === "draft" && lot.status !== "DRAFT") return false;
    }
    if (search && !lot.title.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  });

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
      {filteredLots.length > 0 ? (
        <>
          <div className={
            (isMobile || viewVariant === "grid")
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-bvCatFadeUp"
              : "flex flex-col gap-3 animate-bvCatFadeUp"
          }>
            {filteredLots.map((lot, idx) => (
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
        <div className="flex flex-col items-center justify-center py-20 bg-surface-secondary border border-dashed border-border-primary rounded-3xl animate-bvCatFadeUp">
          <div className="w-16 h-16 bg-surface-primary rounded-2xl flex items-center justify-center mb-4 border border-border-primary">
            <EmptyBoxIcon className="text-content-tertiary" />
          </div>
          <h3 className="text-content-primary font-semibold text-lg">No lots found</h3>
          <p className="text-content-tertiary text-sm mt-1">There are no lots matching your search.</p>
        </div>
      )}
    </div>
  );
};



