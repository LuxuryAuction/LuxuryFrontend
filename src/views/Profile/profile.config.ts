import { ActivityItem } from "./types";

export const USER_STATS = [
  { val: "47", label: "Lots Sold" },
  { val: "23", label: "Won Bids" },
  { val: "0", label: "Unpaid" },
  { val: "4.9★", label: "Rating" },
];

export const OVERVIEW_STATS = [
  { label: "Active Bids", value: "8", delta: "Across 8 lots", accent: "gold" as const },
  { label: "Won Lots", value: "23", delta: "Last 12 months", accent: "green" as const },
  { label: "Active Listings", value: "5", delta: "2 live, 3 pending", accent: "blue" as const },
];

export const TRUST_SAFETY_CONFIG = {
  trustScore: {
    value: 92,
    display: "92/100",
    color: "bg-[#22c55e]",
  },
  unpaidLots: {
    value: 0,
    max: 3,
    display: "0 / 3",
    color: "bg-[#f0a500]",
  },
  badges: ["0 Disputes", "0 Reports", "Good Standing"],
};

export const ACTIVITY: ActivityItem[] = [
  { icon: "🏷", label: 'Outbid on "Roman Statuette"', time: "2h ago" },
  { icon: "✅", label: 'Won "Cartier Brooch"', time: "1d ago" },
  { icon: "📦", label: 'Lot "Ming Vase" delivered', time: "3d ago" },
  { icon: "💳", label: "Payment confirmed for #0441", time: "5d ago" },
];
