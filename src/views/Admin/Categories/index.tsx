"use client";

import { GridIcon } from "@/public/assets/icons";
import NoData from "@/src/components/ui/NoData";
import { PageHeader } from "@/src/components/ui/PageHeader";
import { useGetCategories } from "@/src/hooks/useCategory";
import { CategoryEditCard } from "./components/CategoryEditCard";

export const AdminCategoriesView = () => {
  const { categories, isLoading, error, fetchCategories } = useGetCategories();

  return (
    <div className="mx-auto w-full animate-bvCatFadeUp pb-12">
      <PageHeader
        variant="admin"
        label="Admin"
        title="Категорії"
        description="Редагування назви, опису, зображення та ціни публікації."
      />

      {error && (
        <div className="mb-6 rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200/90">
          {error.message}
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-white/4" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <NoData
          variant="admin"
          title="Немає категорій"
          description="Список порожній або API недоступний."
          icon={<GridIcon className="h-10 w-10 text-admin-accent/40" />}
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {categories.map((cat) => (
            <CategoryEditCard
              key={[cat.id, cat.name, cat.shortDescription, cat.image, cat.postingPrice].join("|")}
              category={cat}
              onUpdated={fetchCategories}
            />
          ))}
        </div>
      )}
    </div>
  );
};
