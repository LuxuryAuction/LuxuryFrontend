export enum LotStatus {
  Draft = "Draft",
  Active = "Active",
  Paid = "Paid",
  Sent = "Sent",
  Delivered = "Delivered",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Returned = "Returned",
  Banned = "Banned",
}

export const STATUS_CFG: Record<
  LotStatus,
  { label: string; color: string; bg: string; border: string; dot?: string; pulse?: boolean }
> = {
  [LotStatus.Draft]:     { label: "Draft",     color: "#555b6e", bg: "rgba(85,91,110,0.12)",  border: "rgba(85,91,110,0.2)"   },
  [LotStatus.Active]:    { label: "Live",    color: "#ff4d6a", bg: "rgba(255,77,106,0.1)",  border: "rgba(255,77,106,0.22)", dot: "#ff4d6a", pulse: true },
  [LotStatus.Paid]:      { label: "Paid",      color: "#b06ef3", bg: "rgba(176,110,243,0.1)", border: "rgba(176,110,243,0.2)" },
  [LotStatus.Sent]:      { label: "Sent",      color: "#4f8ef7", bg: "rgba(79,142,247,0.1)",  border: "rgba(79,142,247,0.22)" },
  [LotStatus.Delivered]: { label: "Delivered", color: "#00d4c8", bg: "rgba(0,212,200,0.1)",   border: "rgba(0,212,200,0.2)"   },
  [LotStatus.Completed]: { label: "Sold",      color: "#10d97e", bg: "rgba(16,217,126,0.1)",  border: "rgba(16,217,126,0.2)"  },
  [LotStatus.Cancelled]: { label: "Cancelled", color: "#ff4d6a", bg: "rgba(255,77,106,0.1)",  border: "rgba(255,77,106,0.2)"  },
  [LotStatus.Returned]:  { label: "Returned",  color: "#ff7a3d", bg: "rgba(255,122,61,0.1)",  border: "rgba(255,122,61,0.2)"  },
  [LotStatus.Banned]:    { label: "Banned",    color: "#a02633", bg: "rgba(160,38,51,0.12)",  border: "rgba(160,38,51,0.25)"  },
};

export const DEFAULT_STATUS_CFG = STATUS_CFG[LotStatus.Draft];

export function getStatusConfig(status: LotStatus | string) {
  return STATUS_CFG[status as LotStatus] ?? DEFAULT_STATUS_CFG;
}

export const LIVE_STATUSES: LotStatus[] = [LotStatus.Active];
export const ENDED_STATUSES: LotStatus[] = [
  LotStatus.Paid,
  LotStatus.Sent,
  LotStatus.Delivered,
  LotStatus.Completed,
  LotStatus.Cancelled,
  LotStatus.Returned,
  LotStatus.Banned,
];
