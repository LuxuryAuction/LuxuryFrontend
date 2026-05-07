"use client";

import { MOCK_CATEGORIES } from "./categoryConfig";
import { CategoryCard } from "./components/CategoryCard";
import { PageHeader } from "@/src/components/ui/PageHeader";
import { IAuctionCategory } from "./types";
import { EmptyBoxIcon } from "@/public/assets/icons";
import { useGetCategories } from "@/src/hooks/useCategory";

interface CategoriesViewProps {
  categories?: IAuctionCategory[];
}

export const CategoriesView = ({
  categories = MOCK_CATEGORIES,
}: CategoriesViewProps) => {

  const { categories: data, loading, error } = useGetCategories()

  return (
    <div className="p-5 md:p-7">
      <PageHeader
        label="Spring Sale 2026"
        title="Auction Categories"
        description="Choose a category to browse active lots and place your bids."
      />

      {categories.length > 0 ? (
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
        <div className="flex flex-col items-center justify-center py-24 text-center animate-bvCatFadeUp">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-surface-primary border border-border-primary">
            <EmptyBoxIcon />
          </div>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-content-tertiary">
            No categories available
          </p>
        </div>
      )}
    </div>
  );
};
