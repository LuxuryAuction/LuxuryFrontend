"use client";

import { useState } from "react";
import { UserIcon } from "@/public/assets/icons";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import NoData from "@/src/components/ui/NoData";
import { PageHeader } from "@/src/components/ui/PageHeader";
import Select from "@/src/components/ui/Select";
import { AdminUsersTable } from "./components/AdminUsersTable";
import { UserStatsGrid } from "./components/UserStatsGrid";
import { MOCK_USERS } from "./mockUsers";
import type { AdminUser, AdminUserRole, AdminUserStatus } from "./types";
import { ROLE_OPTINS, STATUS_OPTIONS } from "./usersOptions.config";

type RoleFilter = AdminUserRole | "all";
type StatusFilter = AdminUserStatus | "all";

export const AdminUsersView = () => {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);

  const [query, setQuery] = useState("");
  const [role, setRole] = useState<RoleFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  const stats = {
    total: 10,
    active: 4,
    suspended: 9,
    banned: 1,
  }

  const onSetRole = (id: string, nextRole: AdminUserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: nextRole } : u)));
  };

  const onSetStatus = (id: string, nextStatus: AdminUserStatus) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: nextStatus } : u)));
  };

  const onToggleVerified = (id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, verified: !u.verified } : u)));
  };

  const clearFilters = () => {
    setQuery("");
    setRole("all");
    setStatus("all");
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] animate-bvCatFadeUp pb-12">
      <PageHeader
        variant="admin"
        label="Admin"
        title="Користувачі"
        description="Мок-сторінка для адміністрування користувачами: пошук, фільтри та базові дії (role/status/verified)."
      />

      <div className="mb-6 grid grid-cols-12 gap-2 sm:gap-3">
        <div className="col-span-5 min-w-0">
          <Input
            type="search"
            placeholder="Search by name / email / id…"
            inputSize="sm"
            variant="admin"
            value={query}
            onChange={setQuery}
          />
        </div>
        <div className="col-span-4 min-w-0">
          <Select
            options={ROLE_OPTINS}
            value={role}
            onChange={(v) => setRole(v as RoleFilter)}
            selectSize="sm"
            variant="admin"
          />
        </div>
        <div className="col-span-3 min-w-0">
          <Select
            options={STATUS_OPTIONS}
            value={status}
            onChange={(v) => setStatus(v as StatusFilter)}
            selectSize="sm"
            variant="admin"
          />
        </div>
      </div>

      <UserStatsGrid stats={stats} />

      {users.length === 0 ? (
        <NoData
          variant="admin"
          title="Немає користувачів"
          description="Жоден користувач не відповідає фільтрам."
          icon={<UserIcon className="h-10 w-10 text-admin-accent/40" />}
          action={(
            <Button variant="admin" size="xs" onClick={clearFilters}>
              Reset filters
            </Button>
          )}
        />
      ) : (
        <AdminUsersTable
          users={users}
          onSetRole={onSetRole}
          onSetStatus={onSetStatus}
          onToggleVerified={onToggleVerified}
        />
      )}
    </div>
  );
};

export default AdminUsersView;
