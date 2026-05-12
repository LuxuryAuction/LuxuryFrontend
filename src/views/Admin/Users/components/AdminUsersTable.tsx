"use client";

import { DotsVerticalIcon } from "@/public/assets/icons";
import Select, { type SelectOption } from "@/src/components/ui/Select";
import { ScrollTableShell } from "@/src/components/ui/Table";
import { formatDateTime } from "@/src/utils/textUtils";
import type { AdminUser, AdminUserRole, AdminUserStatus } from "../types";

type AdminUsersTableProps = {
  users: AdminUser[];
  onSetRole: (id: string, role: AdminUserRole) => void;
  onSetStatus: (id: string, status: AdminUserStatus) => void;
  onToggleVerified: (id: string) => void;
};

function userRowActionOptions(user: AdminUser): SelectOption[] {
  const verify: SelectOption = {
    label: user.verified ? "Unverify" : "Verify",
    value: "toggle_verified",
  };
  const banOrUnban: SelectOption =
    user.status === "banned"
      ? { label: "Unban", value: "unban" }
      : { label: "Ban", value: "ban" };
  return [verify, banOrUnban];
}

function roleLabel(role: AdminUserRole) {
  switch (role) {
    case "user":
      return "User";
    case "seller":
      return "Seller";
    case "moderator":
      return "Moderator";
    case "admin":
      return "Admin";
    default:
      return role;
  }
}

function statusLabel(status: AdminUserStatus) {
  switch (status) {
    case "active":
      return "Active";
    case "suspended":
      return "Suspended";
    case "banned":
      return "Banned";
    default:
      return status;
  }
}

export function AdminUsersTable({
  users,
  onSetRole,
  onSetStatus,
  onToggleVerified,
}: AdminUsersTableProps) {
  const onUserAction = (userId: string, v: string) => {
    if (v === "toggle_verified") onToggleVerified(userId);
    else if (v === "ban") onSetStatus(userId, "banned");
    else if (v === "unban") onSetStatus(userId, "active");
  };

  return (
    <ScrollTableShell>
      <table className="w-full min-w-[920px] table-fixed border-collapse text-left">
        <thead>
          <tr className="border-b border-white/10 text-[10px] font-mono uppercase tracking-[0.22em] text-white/45">
            <th className="w-[26%] px-4 py-3 font-medium">User</th>
            <th className="w-[14%] px-4 py-3 font-medium">Role</th>
            <th className="w-[14%] px-4 py-3 font-medium">Status</th>
            <th className="w-[26%] px-4 py-3 font-medium">Activity</th>
            <th className="w-[20%] px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, rowIndex) => (
            <tr
              key={u.id}
              className={rowIndex > 0 ? "border-t border-white/10" : ""}
            >
              <td className="px-4 py-3 align-center">
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-white/90">{u.name}</div>
                  <div className="truncate text-xs text-white/55">{u.email}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-md border border-white/10 bg-black/20 px-2 py-0.5 font-mono text-[10px] text-white/65">
                      {u.id}
                    </span>
                    {u.verified ? (
                      <span className="rounded-md border border-admin-accent/20 bg-admin-accent/10 px-2 py-0.5 font-mono text-[10px] text-admin-accent-hi">
                        VERIFIED
                      </span>
                    ) : (
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/55">
                        UNVERIFIED
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.14em] text-white/35 md:hidden">
                    {statusLabel(u.status)} · {roleLabel(u.role)}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 align-center">
                <Select
                  options={[
                    { label: "User", value: "user" },
                    { label: "Seller", value: "seller" },
                    { label: "Moderator", value: "moderator" },
                    { label: "Admin", value: "admin" },
                  ]}
                  value={u.role}
                  onChange={(v) => onSetRole(u.id, v as AdminUserRole)}
                  selectSize="sm"
                  variant="admin"
                />
              </td>
              <td className="px-4 py-3 align-center">
                <Select
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Suspended", value: "suspended" },
                    { label: "Banned", value: "banned" },
                  ]}
                  value={u.status}
                  onChange={(v) => onSetStatus(u.id, v as AdminUserStatus)}
                  selectSize="sm"
                  variant="admin"
                />
              </td>
              <td className="px-4 py-3 align-center text-xs text-white/60">
                <div>
                  <span className="font-semibold text-white/80">{u.lotsCount}</span> lots ·{" "}
                  <span className="font-semibold text-white/80">{u.bidsCount}</span> bids
                </div>
                <div className="mt-1 text-[11px] text-white/40">
                  Last login: {formatDateTime(u.lastLoginAt, "compact")}
                </div>
              </td>
              <td className="px-4 py-3 align-center text-right">
                <div className="inline-flex justify-end">
                  <Select
                    options={userRowActionOptions(u)}
                    onChange={(v) => onUserAction(u.id, v)}
                    align="right"
                    variant="admin"
                    selectSize="sm"
                    renderTrigger={(isOpen) => (
                      <span
                        className={`
                          inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5
                          text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white
                          ${isOpen ? "border-admin-accent text-admin-accent ring-1 ring-admin-accent" : ""}
                        `}
                        aria-label="Actions"
                      >
                        <DotsVerticalIcon className="h-5 w-5 text-white" />
                      </span>
                    )}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollTableShell>
  );
}
