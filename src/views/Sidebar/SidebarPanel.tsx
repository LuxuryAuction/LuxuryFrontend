"use client";

import { useTranslations } from "next-intl";
import { CollapseToggle } from "./CollapseToggle";
import { SidebarProps } from "./Sidebar";
import { SidebarGroup } from "./SidebarGroup";
import { Logo } from "./SidebarLogo";
import { SidebarUserBlock } from "./SidebarUser";

export const SidebarPanel = ({
  groups,
  user,
  logoHref,
  variant,
  isCollapsed,
  onClose,
  onToggleCollapse,
}: Omit<SidebarProps, "isOpen">) => {
  const t = useTranslations("Sidebar.aria");

  return (
    <div className="relative flex flex-col h-full">
      <CollapseToggle
        isCollapsed={isCollapsed}
        onToggle={onToggleCollapse}
        variant={variant}
      />

      <Logo collapsed={isCollapsed} href={logoHref} variant={variant} />

      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden py-2"
        aria-label={t("mainNav")}
      >
        {groups.map((group) => (
          <SidebarGroup
            key={group.titleKey}
            group={group}
            isCollapsed={isCollapsed}
            variant={variant}
            onItemClick={onClose}
          />
        ))}
      </nav>

      <div className={`shrink-0 py-3 border-t ${variant === "admin" ? "border-admin-accent/15" : "border-border-primary"}`}>
        <SidebarUserBlock
          user={user}
          isCollapsed={isCollapsed}
          variant={variant}
        />
      </div>
    </div>
  );
};