import React from "react";

interface NoDataProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const NoData = ({
  title,
  description = "No data found in this category",
  icon = "📭",
  className = "",
}: NoDataProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-20 px-6 text-center animate-bvCatFadeUp ${className}`}>
      <div className="relative mb-10 group">
        <div className="absolute inset-0 bg-brand-primary/20 blur-[60px] rounded-full -z-10 animate-pulse" />

        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 rounded-[32px] rotate-6 group-hover:rotate-0 transition-all duration-700 backdrop-blur-md shadow-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent border border-brand-primary/20 rounded-[32px] -rotate-6 group-hover:rotate-0 transition-all duration-700 delay-75" />

          <div className="relative text-4xl animate-float drop-shadow-2xl">
            {icon}
          </div>
        </div>

        <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-primary/30 rounded-full blur-md animate-bounce" />
        <div className="absolute -bottom-4 -left-2 w-6 h-6 bg-blue-500/20 rounded-full blur-lg animate-pulse" />
      </div>

      <div className="max-w-md mx-auto space-y-3">
        <h3 className="text-xl font-black tracking-tight text-white/90">
          {title || "Nothing here yet"}
        </h3>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/10" />
          <p className="text-[10px] font-mono font-medium uppercase tracking-[0.3em] text-brand-primary/60">
            {description}
          </p>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        <p className="text-sm text-content-tertiary leading-relaxed max-w-[280px] mx-auto opacity-60">
          Try adjusting your filters or check back later for new arrivals.
        </p>
      </div>
    </div>
  );
};


export default NoData;
