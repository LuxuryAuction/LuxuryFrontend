"use client";

import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import type { SidebarProps } from "./Sidebar";

interface Props {
  isCollapsed: boolean;
  variant?: SidebarProps["variant"];
  onClick?: () => void;
}

export function SidebarSignIn({ isCollapsed, variant, onClick }: Props) {
  const t = useTranslations("TopBar");
  const isAdmin = variant === "admin";

  const baseClass =
    "mx-2 flex items-center justify-center rounded-[8px] font-bold uppercase tracking-wider transition-all active:scale-[0.98] " +
    (isAdmin
      ? "bg-admin-primary text-black hover:bg-admin-primary/90"
      : "bg-brand-primary text-black hover:bg-brand-primary/90");

  if (isCollapsed) {
    return (
      <Link
        href="/login"
        onClick={onClick}
        title={t("signIn")}
        className={`${baseClass} w-10 h-10 p-0`}
        aria-label={t("signIn")}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[18px] h-[18px]"
          aria-hidden
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
      </Link>
    );
  }

  return (
    <Link href="/login" onClick={onClick} className={`${baseClass} px-3 py-2.5 text-xs`}>
      {t("signIn")}
    </Link>
  );
}
