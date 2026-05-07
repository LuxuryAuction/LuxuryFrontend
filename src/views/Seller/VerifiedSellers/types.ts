export type Tier = "bronze" | "silver" | "gold";

export interface ISeller {
  id: string;
  username: string;
  totalSales: number;
  activeLots: number;
  avgPrice: string;
  joinedYear: number;
}

export interface TierConfig {
  label: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  glow: string;
}
