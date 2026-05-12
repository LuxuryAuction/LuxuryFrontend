export const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "winning", label: "Winning" },
  { id: "outbid", label: "Outbid" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
];

export const STATUS_META = {
  winning: { label: "Winning", bar: "#22c55e", text: "text-[#22c55e]", dot: "bg-[#22c55e] animate-ping", badge: "bg-[#22c55e]/10 border-[#22c55e]/20" },
  outbid: { label: "Outbid", bar: "#ef4444", text: "text-[#ef4444]", dot: "bg-[#ef4444]", badge: "bg-[#ef4444]/10 border-[#ef4444]/20" },
  won: { label: "Won", bar: "#f0a500", text: "text-brand-primary", dot: "bg-brand-primary", badge: "bg-brand-primary/10 border-brand-primary/20" },
  lost: { label: "Lost", bar: "#555b6e", text: "text-content-tertiary", dot: "bg-content-tertiary/40", badge: "bg-surface-tertiary/40 border-border-primary/40" },
};
