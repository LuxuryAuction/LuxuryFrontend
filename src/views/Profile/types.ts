export type TabId = "overview" | "my-lots" | "auctions" | "payments" | "trust";

export interface ActivityItem {
  icon: string;
  label: string;
  time: string;
}

export interface LotRow {
  name: string;
  id: string;
  status: "active" | "extended" | "pending" | "paid" | "completed" | "draft";
  bid: string;
  bids: number | string;
  timer: string;
  timerColor?: string;
  actions: { label: string; variant: "ghost" | "primary" | "danger" }[];
}

export interface IProfile {
  name: string;
  username: string;
  memberSince: string;
  avatarName: string;
  avatarUrl?: string;
  isVerified: boolean;
  trustScore: number;
}
