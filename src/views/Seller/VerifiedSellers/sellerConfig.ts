import { ISeller, Tier, TierConfig } from "./types";

export const TIER_CONFIG: Record<Tier, TierConfig> = {
  bronze: {
    label: "50+ sales",
    icon: "☑️",
    color: "#cd7f32",
    bg: "rgba(205,127,50,0.08)",
    border: "rgba(205,127,50,0.2)",
    glow: "rgba(205,127,50,0.15)",
  },
  silver: {
    label: "200+ sales",
    icon: "✅",
    color: "#b0b8cc",
    bg: "rgba(176,184,204,0.07)",
    border: "rgba(176,184,204,0.18)",
    glow: "rgba(176,184,204,0.12)",
  },
  gold: {
    label: "500+ sales",
    icon: "✅",
    color: "#f0a500",
    bg: "rgba(240,164,0,0.08)",
    border: "rgba(240,164,0,0.22)",
    glow: "rgba(240,164,0,0.18)",
  },
};

export const MOCK_SELLERS: ISeller[] = [
  {
    id: "china-antiques",
    username: "china_antiques",
    totalSales: 612,
    activeLots: 14,
    avgPrice: "€24,300",
    joinedYear: 2019,
  },
  {
    id: "marcus-collector",
    username: "marcus_collector",
    totalSales: 387,
    activeLots: 7,
    avgPrice: "€8,100",
    joinedYear: 2020,
  },
  {
    id: "gemstone-vault",
    username: "gemstone_vault",
    totalSales: 541,
    activeLots: 22,
    avgPrice: "€11,750",
    joinedYear: 2018,
  },
  {
    id: "arthaus-berlin",
    username: "arthaus_berlin",
    totalSales: 214,
    activeLots: 5,
    avgPrice: "€31,000",
    joinedYear: 2021,
  },
  {
    id: "rare-manuscripts",
    username: "rare_manuscripts",
    totalSales: 89,
    activeLots: 3,
    avgPrice: "€14,200",
    joinedYear: 2022,
    },
  {
    id: "luxury-timepieces",
    username: "luxury_timepieces",
    totalSales: 176,
    activeLots: 9,
    avgPrice: "€62,000",
    joinedYear: 2020,
  },
];

export function getTier(sales: number): Tier {
  if (sales >= 500) return "gold";
  if (sales >= 200) return "silver";
  return "bronze";
}
