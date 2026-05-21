"use client";

import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { RootState } from "@/src/store";
import { PageHeader } from "@/src/components/ui/PageHeader";
import { LotCard } from "@/src/components/ui/LotCard";
import { Tabs } from "@/src/components/ui/Tabs";
import { Input } from "@/src/components/ui/Input";
import { ViewSwitcher, ViewVariant } from "@/src/components/ui/ViewSwitcher";
import { Pagination } from "@/src/components/ui/Pagination";
import { LightningIcon } from "@/public/assets/icons";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import NoData from "@/src/components/ui/NoData";
import { useGetUserLots } from "@/src/hooks/useLots";
import { usePaginationScroll } from "@/src/hooks/usePaginationScroll";
import { LotsGridSkeleton } from "@/src/views/Auction/components/LotsGridSkeleton";
import Button from "@/src/components/ui/Button";
import { useRouter } from "@/src/i18n/navigation";
import { ArrowRightIcon } from "@/public/assets/icons";

const FILTER_TAB_IDS = [
  { id: "all", labelKey: "tabs.all" as const },
  { id: "Active", labelKey: "tabs.active" as const },
  { id: "Draft", labelKey: "tabs.draft" as const },
  { id: "Completed", labelKey: "tabs.ended" as const },
];

export const MyLotsView = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const t = useTranslations("MyLotsPage");
  const [activeTab, setActiveTab] = useState("all");
  const [viewVariant, setViewVariant] = useState<ViewVariant>("grid");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();
  const router = useRouter();

  usePaginationScroll(page);

  const filterTabs = useMemo(
    () =>
      FILTER_TAB_IDS.map(({ id, labelKey }) => ({
        id,
        label: t(labelKey),
      })),
    [t],
  );

  const params = useMemo(() => ({
    status: activeTab !== "all" ? activeTab : undefined,
    search: search || undefined,
  }), [activeTab, search]);

  const { data: lots, isLoading: isLoadingLots } = useGetUserLots(params, userId ?? undefined);

  const items = lots || [];

  return (
    <div className="p-5 md:p-7 max-w-7xl mx-auto flex flex-col gap-8">
      <main className="flex-1 min-w-0">
        <PageHeader
          label={t("eyebrow")}
          title={t("title")}
          description={
            isLoadingLots
              ? t("descriptionLoading")
              : t("descriptionWithCount", { count: items.length })
          }
        />

        <div className="flex flex-col lg:flex-row-reverse justify-between gap-4 mb-6 items-start lg:items-center">
          <div className="flex flex-row items-center gap-2 sm:gap-3 w-full md:w-auto justify-end relative">
            <div className="flex-1 md:flex-none md:w-64">
              <Input
                type="search"
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={setSearch}
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

          <div>
            <Tabs
              tabs={filterTabs}
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
              totalPages={3}
              onPageChange={setPage}
              className="mt-8 md:mt-12"
            />
          </>
        ) : (
          <NoData
            title={search ? t("emptySearchTitle") : t("emptyTitle")}
            description={search ? t("emptySearchDescription") : t("emptyDescription")}
            icon={<LightningIcon className="text-brand-primary/40 w-12 h-12" />}
            action={!search && (
              <Button
                variant="nexus"
                size="md"
                rightIcon={<ArrowRightIcon className="w-3 h-3" />}
                onClick={() => router.push("/user/create-lot")}
              >
                {t("placeLot")}
              </Button>
            )}
          />
        )}
      </main>
    </div>
  );
};

