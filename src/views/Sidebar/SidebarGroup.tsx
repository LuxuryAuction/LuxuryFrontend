"use client";

import { useTranslations } from "next-intl";
import { SidebarItem } from "./SidebarItem";
import { NavGroup } from "./types";
import type { SidebarProps } from "./Sidebar";

interface Props {
  group: NavGroup;
  isCollapsed: boolean;
  variant?: SidebarProps["variant"];
  onItemClick?: () => void;
}

export function SidebarGroup({ group, isCollapsed, variant, onItemClick }: Props) {
  const t = useTranslations("Sidebar");

  return (
    <div className="mb-1">
      {!isCollapsed ? (
        <p
          className={`px-3.5 pt-4 pb-1.5 font-mono text-[9px] tracking-[0.2em] uppercase select-none ${variant === "admin" ? "text-admin-accent/55" : "text-content-tertiary"}`}
        >
          {t(group.titleKey)}
        </p>
      ) : (
        <div className={`mx-3 my-3 h-px ${variant === "admin" ? "bg-admin-accent/15" : "bg-border-primary"}`} />
      )}

      {group.items.map((item) => (
        <SidebarItem
          key={item.id}
          item={item}
          isCollapsed={isCollapsed}
          variant={variant}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}
