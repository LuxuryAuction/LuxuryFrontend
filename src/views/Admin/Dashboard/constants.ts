export type ActivityStatus = "success" | "danger" | "warning" | "info";

export type NodeStatusTone = "success" | "warning";

export const STATS = [
  { label: "Active Lots", value: "2,405", trend: "+12%", trendUp: true },
  { label: "Bids", value: "48", trend: "-5%", trendUp: false },
  { label: "Total Revenue", value: "₴1.2M", trend: "+8%", trendUp: true },
  { label: "Active Users", value: "14.2k", trend: "+2%", trendUp: true },
] as const;

export const VOLUME_RANGES = ["1H", "24H", "7D", "30D"] as const;

export type VolumeRange = (typeof VOLUME_RANGES)[number];

export const RECENT_ACTIVITY: Array<{
  id: number;
  action: string;
  user: string;
  target: string;
  time: string;
  status: ActivityStatus;
}> = [
  { id: 1, action: "Lot Approved", user: "Oleja", target: "Rolex Daytona 2023", time: "2m ago", status: "success" },
  { id: 2, action: "User Banned", user: "Dro4eni Ejik", target: "@scammer_99", time: "15m ago", status: "danger" },
  { id: 3, action: "Dispute Resolved", user: "Pronin", target: "Order #4421", time: "1h ago", status: "success" },
  { id: 4, action: "System Update", user: "System", target: "Core v2.5 Deployed", time: "3h ago", status: "info" },
  { id: 5, action: "High Value Bid", user: "System", target: "Patek Philippe Nautilus", time: "4h ago", status: "warning" },
];

export const NODE_SERVICES: Array<{
  name: string;
  status: string;
  percent: number;
  tone: NodeStatusTone;
}> = [
  { name: "Payment Gateway", status: "Optimal", percent: 12, tone: "success" },
  { name: "Image Processor", status: "High Load", percent: 85, tone: "warning" },
  { name: "WebSocket Hub", status: "Optimal", percent: 45, tone: "success" },
];

export const ACTIVITY_DOT_CLASS: Record<ActivityStatus, string> = {
  success: "bg-admin-success text-admin-success",
  danger: "bg-admin-danger text-admin-danger",
  warning: "bg-admin-warning text-admin-warning",
  info: "bg-admin-info text-admin-info",
};

export const NODE_TONE_LABEL_CLASS: Record<NodeStatusTone, string> = {
  success: "text-admin-success",
  warning: "text-admin-warning",
};

export const NODE_TONE_BAR_CLASS: Record<NodeStatusTone, string> = {
  success: "bg-admin-success",
  warning: "bg-admin-warning",
};
