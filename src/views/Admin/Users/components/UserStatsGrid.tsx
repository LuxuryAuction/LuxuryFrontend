"use client";

import { AdminUsersStats } from "../types";


type UserStatsGridProps = {
  stats: AdminUsersStats;
};

type TileVariant = "neutral" | "accent" | "muted" | "danger";

const TILES: Array<{
  key: keyof AdminUsersStats;
  label: string;
  variant: TileVariant;
}> = [
    { key: "total", label: "Total", variant: "neutral" },
    { key: "active", label: "Active", variant: "accent" },
    { key: "suspended", label: "Suspended", variant: "muted" },
    { key: "banned", label: "Banned", variant: "danger" },
  ];

const VARIANT_STYLES: Record<
  TileVariant,
  { card: string; label: string; value: string }
> = {
  neutral: {
    card: "border-white/6 bg-white/2 hover:border-admin-accent/30",
    label: "text-white/50",
    value: "text-white/90",
  },
  accent: {
    card: "border-admin-accent/15 bg-admin-accent/5 hover:border-admin-accent/30",
    label: "text-admin-accent/60",
    value: "text-admin-accent-hi",
  },
  muted: {
    card: "border-white/6 bg-white/2 hover:border-admin-accent/30",
    label: "text-white/45",
    value: "text-white/85",
  },
  danger: {
    card: "border-rose-500/15 bg-rose-500/5 hover:border-rose-500/30",
    label: "text-rose-200/60",
    value: "text-rose-100/90",
  },
};

export const UserStatsGrid = ({ stats }: UserStatsGridProps) => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
      {TILES.map(({ key, label, variant }) => {
        const styles = VARIANT_STYLES[variant];
        return (
          <div key={key} className={`rounded-3xl border px-4 py-3 transition-colors ${styles.card}`}>
            <div className={`font-mono text-[10px] uppercase tracking-[0.2em] ${styles.label}`}>{label}</div>
            <div className={`text-lg font-black ${styles.value}`}>{stats[key]}</div>
          </div>
        );
      })}
    </div>
  );
};
