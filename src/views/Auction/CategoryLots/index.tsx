"use client";

import { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/src/components/ui/PageHeader";
import { LotCard, ILot } from "@/src/components/ui/LotCard";
import { ViewSwitcher, ViewVariant } from "@/src/components/ui/ViewSwitcher";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { Pagination } from "@/src/components/ui/Pagination";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { EmptyBoxIcon } from "@/public/assets/icons";
import { FiltersPopover } from "./components/FiltersPopover";
import { MOCK_CATEGORIES } from "../Categories/categoryConfig";
import { SEX_OPTIONS, SIZE_OPTIONS } from "../CreateLot/createLotConfig";
import { MOCK_LOTS } from "../MyLots/mockLots";

const CATEGORY_FILTER_TABS = [
  { id: "all", label: "All Lots" },
  { id: "live", label: "Live Now" },
  { id: "upcoming", label: "Upcoming" },
  { id: "ended", label: "Ended" },
];

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


  useClickOutside(filtersRef, () => setShowFilters(false));

  const category = MOCK_CATEGORIES.find(c => c.id === categoryId);
  const title = category?.title || "Category Not Found";
  const desc = category?.shortDescription || "Browse available lots in this category.";

  const filteredLots = MOCK_LOTS.filter(lot => {
    if (activeTab !== "all") {
      if (activeTab === "live" && lot.status !== "ACTIVE") return false;
      if (activeTab === "upcoming" && lot.status !== "PENDING_APPROVAL" && lot.status !== "DRAFT") return false;
      if (activeTab === "ended" && lot.status !== "COMPLETED") return false;
    }

    if (search && !lot.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (sex && lot.sex !== sex) return false;
    if (size && lot.size !== size) return false;
    if (condition && lot.condition !== condition) return false;
    if (brand && !lot.title.toLowerCase().includes(brand.toLowerCase())) return false;

    if (minPrice && lot.currentBid < Number(minPrice)) return false;
    if (maxPrice && lot.currentBid > Number(maxPrice)) return false;

    return true;
  });

  return (
    <div className="p-5 md:p-7 max-w-7xl mx-auto flex flex-col gap-8">
      <main className="flex-1 min-w-0">
        <PageHeader
          label="Auctions"
          title={title}
          description={desc}
        />

        <div className="flex flex-col lg:flex-row-reverse justify-between gap-4 mb-8">
          <div className="flex flex-row items-center gap-2 sm:gap-3 w-full md:w-auto justify-end relative">
            <div className="flex-1 md:flex-none md:w-64">
              <Input
                type="search"
                placeholder="Search lots..."
                value={search}
                onChange={setSearch}
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
                <svg className={`w-4 h-4 transition-transform duration-300 ${showFilters ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                Filters
                {(sex || size || brand || minPrice > 0 || maxPrice < 100000) && (
                  <span className="w-2 h-2 rounded-full bg-state-danger animate-pulse" />
                )}
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
                }}
                sex={sex}
                setSex={setSex}
                size={size}
                setSize={setSize}
                condition={condition}
                setCondition={setCondition}
                brand={brand}
                setBrand={setBrand}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
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
            onChange={setActiveTab}
            variant="pill"
          />
        </div>

        {
          filteredLots.length > 0 ? (
            <>
              <div className={
                (isMobile || viewVariant === "grid")
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-bvCatFadeUp"
                  : "flex flex-col gap-3 animate-bvCatFadeUp"
              }>
                {filteredLots.map((lot, idx) => (
                  <div key={lot.id} className="h-full" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <LotCard
                      lot={{ ...lot, category: category?.title || lot.category }}
                      variant={isMobile ? "grid" : viewVariant}
                      showCategory={false}
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
            <div className="flex flex-col items-center justify-center py-20 bg-surface-secondary border border-dashed border-border-primary rounded-3xl animate-bvCatFadeUp">
              <div className="w-16 h-16 bg-surface-primary rounded-2xl flex items-center justify-center mb-4 border border-border-primary">
                <EmptyBoxIcon className="text-content-tertiary" />
              </div>
              <h3 className="text-content-primary font-semibold text-lg">No lots found</h3>
              <p className="text-content-tertiary text-sm mt-1">There are no lots matching this filter.</p>
            </div>
          )
        }
      </main >
    </div >
  );
};
