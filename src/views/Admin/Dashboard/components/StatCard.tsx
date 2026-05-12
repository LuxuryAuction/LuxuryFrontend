"use client";

import { AdminSparkTrendDownIcon, AdminSparkTrendUpIcon } from "@/public/assets/icons";

type StatCardProps = {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
};

export const StatCard = ({ label, value, trend, trendUp }: StatCardProps) => {
  const SparkIcon = trendUp ? AdminSparkTrendUpIcon : AdminSparkTrendDownIcon;
  const sparkColor = trendUp ? "text-emerald-500" : "text-rose-500";
  const badgeClass = trendUp
    ? "bg-emerald-500/10 text-emerald-400"
    : "bg-rose-500/10 text-rose-400";

  return (
    <div className="group relative flex min-h-[148px] flex-col justify-between overflow-hidden rounded-3xl border border-white/6 bg-white/2 p-6 backdrop-blur-xl transition-colors hover:border-admin-accent/30 cursor-pointer">
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-18 opacity-25 transition-opacity group-hover:opacity-40 ${sparkColor}`}
      >
        <SparkIcon className="h-full w-full" />
      </div>

      <div className="relative z-10 flex items-start justify-between gap-3">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">{label}</p>
        <div className={`shrink-0 rounded px-2 py-0.5 text-[9px] font-bold ${badgeClass}`}>{trend}</div>
      </div>

      <h3 className="relative z-10 text-3xl font-black tracking-tight text-white sm:text-4xl">{value}</h3>
    </div>
  );
};
