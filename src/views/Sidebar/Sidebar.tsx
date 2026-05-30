"use client";

import { NavGroup, SidebarUser } from "./types";
import { SidebarPanel } from "./SidebarPanel";
import { CloseIcon } from "@/public/assets/icons";
import { useTranslations } from "next-intl";

export interface SidebarProps {
  groups: NavGroup[];
  user: SidebarUser;
  logoHref?: string;
  variant?: "app" | "admin";
  isAuthenticated?: boolean;
  isCollapsed: boolean;
  isOpen: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}


export function Sidebar({
  groups,
  user,
  logoHref = "/",
  variant = "app",
  isAuthenticated = true,
  isCollapsed,
  isOpen,
  onClose,
  onToggleCollapse,
}: SidebarProps) {
  const t = useTranslations("Sidebar.aria");
  const shellClass =
    variant === "admin"
      ? "bg-admin-canvas border-r border-admin-accent/20"
      : "bg-auth-app border-r border-border-primary";

  return (
    <>
      <aside
        className={
          "hidden md:flex flex-col " +
          "fixed top-0 left-0 bottom-0 z-50 " +
          shellClass +
          " overflow-visible " +
          "transition-[width] duration-300 ease-in-out " +
          (isCollapsed ? "w-16" : "w-[248px]")
        }
      >
        <SidebarPanel
          groups={groups}
          user={user}
          logoHref={logoHref}
          variant={variant}
          isAuthenticated={isAuthenticated}
          isCollapsed={isCollapsed}
          onClose={onClose}
          onToggleCollapse={onToggleCollapse}
        />
      </aside>

      <div
        onClick={onClose}
        aria-hidden="true"
        className={
          "fixed inset-0 z-40 md:hidden bg-black/70 " +
          "transition-opacity duration-300 " +
          (isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
      />

      <aside
        className={
          "fixed top-0 left-0 bottom-0 z-50 md:hidden " +
          "w-full flex flex-col " +
          shellClass +
          " shadow-[4px_0_32px_rgba(0,0,0,0.6)] " +
          "transition-transform duration-300 ease-in-out " +
          (isOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <button
          onClick={onClose}
          aria-label={t("closeNav")}
          className="absolute top-5 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-[6px] bg-[#1c1f27] border border-[#2a2e3a] text-[#4a5270] hover:text-[#e8eaf0] hover:border-[#353a4a] transition-all"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        <SidebarPanel
          groups={groups}
          user={user}
          logoHref={logoHref}
          variant={variant}
          isAuthenticated={isAuthenticated}
          isCollapsed={false}
          onClose={onClose}
          onToggleCollapse={onToggleCollapse}
        />
      </aside >
    </>
  );
}
