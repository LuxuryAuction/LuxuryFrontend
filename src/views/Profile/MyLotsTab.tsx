"use client";

import { useState, useMemo } from "react";
import { LotCard } from "@/src/components/ui/LotCard";
import { ViewSwitcher, ViewVariant } from "@/src/components/ui/ViewSwitcher";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { Pagination } from "@/src/components/ui/Pagination";
import { useGetUserLots } from "@/src/hooks/useLots";
import { LotsGridSkeleton } from "@/src/views/Auction/components/LotsGridSkeleton";
import NoData from "@/src/components/ui/NoData";
import Button from "@/src/components/ui/Button";
import { useRouter } from "@/src/i18n/navigation";
import { ArrowRightIcon, LightningIcon } from "@/public/assets/icons";
import { usePaginationScroll } from "@/src/hooks/usePaginationScroll";

const MY_LOTS_FILTER_TABS = [
  { id: "all", label: "All Lots" },
  { id: "Active", label: "Active" },
  { id: "Draft", label: "Drafts" },
  { id: "Completed", label: "Ended" },
];

interface MyLotsTabProps {
  userName?: string;
}

export const MyLotsTab = ({ userName }: MyLotsTabProps) => {
  const [viewVariant, setViewVariant] = useState<ViewVariant>("grid");
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  usePaginationScroll(page);

  const isMobile = useIsMobile();
  const router = useRouter();

  const params = useMemo(() => ({
    status: activeTab !== "all" ? activeTab : undefined,
    search: search || undefined,
    page,
    pageSize: 20,
  }), [activeTab, search, page]);

  const { data, isLoading: isLoadingLots } = useGetUserLots(params, userName);

  const items = data?.items ?? [];

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
        <LotsGridSkeleton />
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
            totalPages={data?.totalPages ?? 1}
            onPageChange={setPage}
          />
        </>
      ) : (
        <NoData
          title={search ? "No lots found" : "No auctions yet"}
          description={search ? "There are no lots matching your search." : "You haven't created any auction lots yet."}
          icon={<LightningIcon className="text-brand-primary/40 w-12 h-12" />}
          action={!search && (
            <Button
              variant="nexus"
              size="md"
              rightIcon={<ArrowRightIcon className="w-3 h-3" />}
              onClick={() => router.push("/user/create-lot")}
            >
              Place Lot
            </Button>
          )}
        />
      )}
    </div>
  );
};



