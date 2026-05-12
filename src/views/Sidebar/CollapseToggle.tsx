"use client";

import { useTranslations } from "next-intl";

export const CollapseToggle = ({
  isCollapsed,
  onToggle,
  variant = "app",
}: {
  isCollapsed: boolean;
  onToggle: () => void;
  variant?: "app" | "admin";
}) => {
  const t = useTranslations("Sidebar.aria");
  const shellClass =
    variant === "admin"
      ? "bg-admin-canvas border-admin-accent/20 text-white/50 hover:text-admin-primary hover:border-admin-primary/40"
      : "bg-[#1c1f27] border-border-primary text-[#4a5270] hover:text-brand-primary hover:border-brand-primary/40";

  return (
    <button
      onClick={onToggle}
      aria-label={isCollapsed ? t("expandSidebar") : t("collapseSidebar")}
      className={
        "absolute -right-[12px] top-[115px] z-10 cursor-pointer " +
        "w-6 h-6 flex items-center justify-center rounded-full " +
        "border " +
        shellClass +
        " " +
        "shadow-[0_2px_8px_rgba(0,0,0,0.4)] " +
        "transition-all duration-200 " +
        "hidden md:flex"
      }
    >
      <svg
        className={
          "w-3 h-3 transition-transform duration-300 " +
          (isCollapsed ? "rotate-180" : "")
        }
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
};