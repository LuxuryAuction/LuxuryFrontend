import type { SelectOption } from "@/src/components/ui/Select";

export const ROLE_OPTINS: SelectOption[] = [
  { label: "All roles", value: "all" },
  { label: "User", value: "user" },
  { label: "Seller", value: "seller" },
  { label: "Moderator", value: "moderator" },
  { label: "Admin", value: "admin" },
];

export const STATUS_OPTIONS: SelectOption[] = [
  { label: "All statuses", value: "all" },
  { label: "Active", value: "active" },
  { label: "Suspended", value: "suspended" },
  { label: "Banned", value: "banned" },
];
