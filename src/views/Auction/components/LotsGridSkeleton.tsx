const LotCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-[12px] bg-surface-primary border border-border-primary animate-pulse">
    <div className="relative aspect-4/5 bg-surface-secondary/50" />
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

export const LotsGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: 8 }, (_, i) => (
      <LotCardSkeleton key={i} />
    ))}
  </div>
);
