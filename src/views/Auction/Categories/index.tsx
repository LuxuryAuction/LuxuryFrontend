"use client";

import { useTranslations } from "next-intl";
import { CategoryCard } from "./components/CategoryCard";
import { PageHeader } from "@/src/components/ui/PageHeader";
import { useGetCategories } from "@/src/hooks/useCategory";
import NoData from "@/src/components/ui/NoData";
import { CategoriesSkeletonList } from "./components/CategorySkeleton";

export const CategoriesView = () => {
  const t = useTranslations("CategoriesPage");
  const { categories, isLoading, error } = useGetCategories();

  if (error) {
    return (
      <div className="p-5 md:p-7 max-w-7xl mx-auto text-center text-red-500">
        {t("error")}
      </div>
    );
  }

  return (
    <div className="p-5 md:p-7 max-w-7xl mx-auto mb-4">
      <PageHeader
        label={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      {isLoading ? (
        <CategoriesSkeletonList />
      ) : categories?.length > 0 ? (
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          }}
        >
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      ) : (
        <NoData title={t("emptyTitle")} description={t("emptyDescription")} />
      )}
    </div>
  );
};
