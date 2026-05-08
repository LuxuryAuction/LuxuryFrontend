

export const CategorySkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-[12px] bg-surface-primary border border-border-primary animate-pulse">
      <div className="relative aspect-4/5 bg-surface-secondary/50">
      </div>
      <div className="flex flex-col flex-1 px-4 pt-3.5 pb-4">
        <div className="h-5 w-3/4 rounded bg-surface-tertiary/80 mb-2.5" />
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full rounded bg-surface-tertiary/40" />
          <div className="h-3 w-5/6 rounded bg-surface-tertiary/40" />
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border-primary/30">
          <div className="h-3 w-16 rounded bg-surface-tertiary/40" />
          <div className="h-4 w-4 rounded-full bg-surface-tertiary/40" />
        </div>
      </div>
    </div>
  );
};

export const CategoriesSkeletonList = () => {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
      }}
    >
      {[...Array(6)].map((_, i) => (
        <CategorySkeleton key={i} />
      ))}
    </div>
  );
};
