export const ProfileSkeleton = () => (
  <div className="p-5 md:p-7 max-w-7xl mx-auto animate-pulse">
    <div className="bg-surface-secondary/20 border border-border-primary rounded-lg px-4 md:px-8 py-6 mb-6 h-[120px] flex items-center gap-6">
       <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-surface-secondary" />
       <div className="flex-1 space-y-3">
          <div className="h-6 w-48 bg-surface-secondary rounded" />
          <div className="h-3 w-32 bg-surface-secondary/60 rounded" />
       </div>
       <div className="hidden lg:flex gap-8">
          <div className="h-10 w-16 bg-surface-secondary/40 rounded" />
          <div className="h-10 w-16 bg-surface-secondary/40 rounded" />
       </div>
    </div>

    <div className="flex gap-2 mb-8 border-b border-border-primary/30 pb-1">
       {Array.from({ length: 4 }).map((_, i) => (
         <div key={i} className="h-2 w-24 bg-surface-secondary/40 rounded-t-lg mt-10" />
       ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
       {Array.from({ length: 3 }).map((_, i) => (
         <div key={i} className="h-[100px] bg-surface-secondary/30 rounded-lg border border-border-primary/50" />
       ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <div className="h-[300px] bg-surface-secondary/20 rounded-lg border border-border-primary/50" />
       <div className="h-[300px] bg-surface-secondary/20 rounded-lg border border-border-primary/50" />
    </div>
  </div>
);
