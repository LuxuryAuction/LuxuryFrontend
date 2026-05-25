import { UserBidStatus } from "@/src/services/UsersService/types";

export const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: UserBidStatus.Winning, label: "Winning" },
  { id: UserBidStatus.Outbid, label: "Outbid" },
  { id: UserBidStatus.Won, label: "Won" },
  { id: UserBidStatus.Lost, label: "Lost" },
];

export const STATUS_META = {
  [UserBidStatus.Winning]: { label: "Winning", bar: "#22c55e", text: "text-[#22c55e]", dot: "bg-[#22c55e] animate-ping", badge: "bg-[#22c55e]/10 border-[#22c55e]/20" },
  [UserBidStatus.Outbid]: { label: "Outbid", bar: "#ef4444", text: "text-[#ef4444]", dot: "bg-[#ef4444]", badge: "bg-[#ef4444]/10 border-[#ef4444]/20" },
  [UserBidStatus.Won]: { label: "Won", bar: "#f0a500", text: "text-brand-primary", dot: "bg-brand-primary", badge: "bg-brand-primary/10 border-brand-primary/20" },
  [UserBidStatus.Lost]: { label: "Lost", bar: "#555b6e", text: "text-content-tertiary", dot: "bg-content-tertiary/40", badge: "bg-surface-tertiary/40 border-border-primary/40" },
};

export const DEFAULT_STATUS_META = STATUS_META[UserBidStatus.Winning];
