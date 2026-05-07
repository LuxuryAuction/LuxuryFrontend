"use client";

import { useState } from "react";
import { PageHeader } from "@/src/components/ui/PageHeader";
import { LotCard } from "@/src/components/ui/LotCard";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { ViewSwitcher, ViewVariant } from "@/src/components/ui/ViewSwitcher";
import { Pagination } from "@/src/components/ui/Pagination";
import { EmptyBoxIcon } from "@/public/assets/icons";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { MOCK_LOTS } from "./mockLots";
import NoData from "@/src/components/ui/NoData";

const FILTER_TABS = [
  { id: "all", label: "All Lots" },
  { id: "active", label: "Active" },
  { id: "draft", label: "Drafts" },
  { id: "ended", label: "Ended" },
];

export const MyLotsView = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [viewVariant, setViewVariant] = useState<ViewVariant>("grid");
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
    <div className="p-5 md:p-7 max-w-7xl mx-auto flex flex-col gap-8">
      <main className="flex-1 min-w-0">
        <PageHeader
          label="Management"
          title="My Auction Lots"
          description={`You have ${MOCK_LOTS.length} items in your inventory.`}
        />

        <div className="flex flex-col lg:flex-row-reverse justify-between gap-4 mb-6 items-start lg:items-center">
          <div className="flex flex-row items-center gap-2 sm:gap-3 w-full md:w-auto justify-end relative">
            <div className="flex-1 md:flex-none md:w-64">
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

          <div>
            <Tabs
              tabs={FILTER_TABS}
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
              className="mt-12"
            />
          </>
        ) : (
          <NoData
            title="No lots found"
            description="There are no lots matching your search."
            icon={<EmptyBoxIcon className="text-content-tertiary" />}
          />
        )}
      </main>
    </div>
  );
};

