
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
  userName: string;
  memberSince: string;
  isVerified: boolean;
  trustScore: number;
  balance?: number;
}
