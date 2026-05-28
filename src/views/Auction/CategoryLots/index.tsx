"use client";

import { useRef, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/src/components/ui/PageHeader";
import { LotCard } from "@/src/components/ui/LotCard";
import { ViewSwitcher, ViewVariant } from "@/src/components/ui/ViewSwitcher";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { Pagination } from "@/src/components/ui/Pagination";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { ArrowRightIcon, EmptyBoxIcon, FilterIcon } from "@/public/assets/icons";
import Button from "@/src/components/ui/Button";
import { useRouter } from "@/src/i18n/navigation";
import { FiltersPopover } from "./components/FiltersPopover";
import NoData from "@/src/components/ui/NoData";
import { useGetLots } from "@/src/hooks/useLots";
import { usePaginationScroll } from "@/src/hooks/usePaginationScroll";
import { LotsGridSkeleton } from "@/src/views/Auction/components/LotsGridSkeleton";
import { CATEGORY_FILTER_TAB_IDS } from "./categoryConfig";

interface CategoryLotsViewProps {
  slug: string;
}

export const CategoryLotsView = ({ slug }: CategoryLotsViewProps) => {
  const t = useTranslations("CategoryLotsPage");
  const router = useRouter();

  const [viewVariant, setViewVariant] = useState<ViewVariant>("grid");
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sex, setSex] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  const filtersRef = useRef<HTMLDivElement>(null);

  const params = useMemo(() => ({
    slug,
    page,
    pageSize: 20,
    search: search || undefined,
    sex,
    status: activeTab,
    minPrice,
    maxPrice,
  }), [slug, page, search, sex, activeTab, minPrice, maxPrice]);

  const { data, isLoading } = useGetLots(params);

  const onTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setPage(1);
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  useClickOutside(filtersRef, () => setShowFilters(false));

  usePaginationScroll(page);
  const filterTabs = useMemo(
    () =>
      CATEGORY_FILTER_TAB_IDS.map((id) => ({
        id,
        label: t(`tabs.${id}`),
      })),
    [t],
  );

  return (
    <div className="p-5 md:p-7 mx-auto flex flex-col gap-8 max-w-7xl">
      <main className="flex-1 min-w-0">
        <PageHeader
          label={t("eyebrow")}
          title={data?.categoryName ?? t("eyebrow")}
          description={t("description")}
        />

        <div className="flex flex-col lg:flex-row-reverse justify-between gap-4 mb-8">
          <div className="flex flex-row items-center gap-2 sm:gap-3 w-full md:w-auto justify-end relative">
            <div className="flex-1 md:flex-none md:w-64">
              <Input
                type="search"
                placeholder={t("searchPlaceholder")}
                defaultValue={search}
                onDebounceChange={onSearchChange}
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
                {t("filters")}
              </button>

              <FiltersPopover
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                initialFilters={{
                  sex,
                  size,
                  condition,
                  minPrice,
                  maxPrice,
                }}
                onApply={(newFilters) => {
                  setSex(newFilters.sex);
                  setSize(newFilters.size);
                  setCondition(newFilters.condition);
                  setMinPrice(newFilters.minPrice);
                  setMaxPrice(newFilters.maxPrice);
                  setPage(1);
                }}
              />
            </div>

            <div className="hidden md:flex">
              <ViewSwitcher
                variant={viewVariant}
                onChange={setViewVariant}
                gridAriaLabel={t("aria.gridView")}
                listAriaLabel={t("aria.listView")}
              />
            </div>
          </div>
          <Tabs
            tabs={filterTabs}
            activeTab={activeTab}
            onChange={onTabChange}
            variant="pill"
          />
        </div>

        {isLoading ? (
          <LotsGridSkeleton />
        ) : (data?.items?.length ?? 0) > 0 ? (
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
              totalPages={data?.totalPages || 1}
              onPageChange={setPage}
              className="mt-8 md:mt-12"
            />
          </>
        ) : (
          <NoData
            title={t("noLotsTitle")}
            description={t("noLotsDescription")}
            icon={<EmptyBoxIcon className="text-content-tertiary" />}
            action={
              <Button
                variant="secondary"
                size="md"
                rightIcon={<ArrowRightIcon className="w-3.5 h-3.5" />}
                onClick={() => router.push("/user/categories")}
              >
                {t("noLotsBrowseCategories")}
              </Button>
            }
          />
        )}
      </main >
    </div >
  );
};
