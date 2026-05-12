export type AdminUserRole = "user" | "seller" | "moderator" | "admin";

export type AdminUserStatus = "active" | "suspended" | "banned";

export type AdminUsersStats = {
  total: number;
  active: number;
  suspended: number;
  banned: number;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  verified: boolean;
  createdAt: string; // ISO
  lastLoginAt?: string; // ISO
  lotsCount: number;
  bidsCount: number;
};

