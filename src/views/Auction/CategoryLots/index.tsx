"use client";

import { useRef, useState } from "react";
import { PageHeader } from "@/src/components/ui/PageHeader";
import { LotCard } from "@/src/components/ui/LotCard";
import { ViewSwitcher, ViewVariant } from "@/src/components/ui/ViewSwitcher";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { Pagination } from "@/src/components/ui/Pagination";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { EmptyBoxIcon, FilterIcon } from "@/public/assets/icons";
import { FiltersPopover } from "./components/FiltersPopover";
import NoData from "@/src/components/ui/NoData";
import { useGetLots } from "@/src/hooks/useLots";
import { CATEGORY_FILTER_TABS } from "./categoryConfig";

interface CategoryLotsViewProps {
  categoryId: string;
}

export const CategoryLotsView = ({ categoryId }: CategoryLotsViewProps) => {

  const [viewVariant, setViewVariant] = useState<ViewVariant>("grid");
  const [activeTab, setActiveTab] = useState("all");

  const [search, setSearch] = useState("");
  const [sex, setSex] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  const filtersRef = useRef<HTMLDivElement>(null);

  const { data } = useGetLots({
    categoryId: Number(categoryId),
    page,
    pageSize: 10,
    search,
    sex,
    minPrice,
    maxPrice,
  });

  const onTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setPage(1);
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  useClickOutside(filtersRef, () => setShowFilters(false));


  return (
    <div className="p-5 md:p-7 max-w-7xl mx-auto flex flex-col gap-8">
      <main className="flex-1 min-w-0">
        <PageHeader
          label="Auctions"
          title="Mock Title"
          description="Mock Desc"
        />

        <div className="flex flex-col lg:flex-row-reverse justify-between gap-4 mb-8">
          <div className="flex flex-row items-center gap-2 sm:gap-3 w-full md:w-auto justify-end relative">
            <div className="flex-1 md:flex-none md:w-64">
              <Input
                type="search"
                placeholder="Search lots..."
                value={search}
                onChange={onSearchChange}
              />
            </div>

            <div className="relative shrink-0" ref={filtersRef}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 h-12 px-5 rounded-xl border transition-all active:scale-95 text-sm font-medium
                  ${showFilters
                    ? "bg-brand-primary border-brand-primary text-black shadow-[0_0_20px_rgba(240,165,0,0.3)]"
                    : "bg-surface-secondary border-border-primary text-content-primary hover:border-brand-primary/50"
                  }`}
              >
                <FilterIcon
                  className={`w-4 h-4 transition-transform duration-300 ${showFilters ? "rotate-90" : ""}`}
                />
                Filters
              </button>

              <FiltersPopover
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                onReset={() => {
                  setSex("");
                  setSize("");
                  setBrand("");
                  setMinPrice(0);
                  setMaxPrice(100000);
                  setSearch("");
                  setCondition("");
                  setPage(1);
                }}
                sex={sex}
                setSex={(value) => {
                  setSex(value);
                  setPage(1);
                }}
                size={size}
                setSize={(value) => {
                  setSize(value);
                  setPage(1);
                }}
                condition={condition}
                setCondition={(value) => {
                  setCondition(value);
                  setPage(1);
                }}
                brand={brand}
                setBrand={(value) => {
                  setBrand(value);
                  setPage(1);
                }}
                minPrice={minPrice}
                setMinPrice={(value) => {
                  setMinPrice(value);
                  setPage(1);
                }}
                maxPrice={maxPrice}
                setMaxPrice={(value) => {
                  setMaxPrice(value);
                  setPage(1);
                }}
              />
            </div>

            <div className="hidden md:flex">
              <ViewSwitcher
                variant={viewVariant}
                onChange={setViewVariant}
              />
            </div>
          </div>
          <Tabs
            tabs={CATEGORY_FILTER_TABS}
            activeTab={activeTab}
            onChange={onTabChange}
            variant="pill"
          />
        </div>

        {
          (data?.items?.length ?? 0) > 0 ? (
            <>
              <div className={
                (isMobile || viewVariant === "grid")
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-bvCatFadeUp"
                  : "flex flex-col gap-3 animate-bvCatFadeUp"
              }>
                {data?.items.map((lot, idx) => (
                  <div key={lot.id} className="h-full" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <LotCard
                      lot={lot}
                      variant={isMobile ? "grid" : viewVariant}
                      showCategory={false}
                    />
                  </div>
                ))}
              </div>

              <Pagination
                currentPage={page}
                totalPages={data?.totalCount || 1}
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
          )
        }
      </main >
    </div >
  );
};
