"use client";

import { CategoryCard } from "./components/CategoryCard";
import { PageHeader } from "@/src/components/ui/PageHeader";
import { useGetCategories } from "@/src/hooks/useCategory";
import NoData from "@/src/components/ui/NoData";
import { CategoriesSkeletonList } from "./components/CategorySkeleton";

export const CategoriesView = () => {
  const { categories, isLoading, error } = useGetCategories()

  if (error) {
    return <div className="p-5 md:p-7 text-center text-red-500">
      Error loading categories. Please try again.
    </div>
  }

  return (
    <div className="p-5 md:p-7">
      <PageHeader
        label="Spring Sale 2026"
        title="Auction Categories"
        description="Choose a category to browse active lots and place your bids."
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
        <NoData
          title="No Categories"
          description="There are no categories available at the moment. Please check back later."
        />
      )}
    </div>
  );
};
