import { LotStatus } from "./types";

export const STATUS_CFG: Record<
  LotStatus,
  { label: string; color: string; bg: string; border: string; dot?: string; pulse?: boolean }
> = {
  DRAFT:            { label: "Draft",     color: "#555b6e", bg: "rgba(85,91,110,0.12)", border: "rgba(85,91,110,0.2)"   },
  PENDING_APPROVAL: { label: "Pending",   color: "#f0a500", bg: "rgba(240,165,0,0.1)", border: "rgba(240,165,0,0.22)"  },
  ACTIVE:           { label: "Live",      color: "#ff4d6a", bg: "rgba(255,77,106,0.1)", border: "rgba(255,77,106,0.22)", dot: "#ff4d6a", pulse: true },
  EXTENDED:         { label: "+24h",      color: "#4f8ef7", bg: "rgba(79,142,247,0.1)", border: "rgba(79,142,247,0.22)", dot: "#4f8ef7", pulse: true },
  PAID:             { label: "Paid",      color: "#b06ef3", bg: "rgba(176,110,243,0.1)", border: "rgba(176,110,243,0.2)" },
  DELIVERED:        { label: "Delivered", color: "#00d4c8", bg: "rgba(0,212,200,0.1)", border: "rgba(0,212,200,0.2)"   },
  COMPLETED:        { label: "Sold",      color: "#10d97e", bg: "rgba(16,217,126,0.1)", border: "rgba(16,217,126,0.2)"  },
  CANCELLED:        { label: "Cancelled", color: "#ff4d6a", bg: "rgba(255,77,106,0.1)", border: "rgba(255,77,106,0.2)"  },
  RETURNED:         { label: "Returned",  color: "#ff7a3d", bg: "rgba(255,122,61,0.1)", border: "rgba(255,122,61,0.2)"  },
};

export const LIVE_STATUSES: LotStatus[] = ["ACTIVE", "EXTENDED"];
export const ENDED_STATUSES: LotStatus[] = ["COMPLETED", "CANCELLED", "RETURNED", "PAID", "DELIVERED"];
