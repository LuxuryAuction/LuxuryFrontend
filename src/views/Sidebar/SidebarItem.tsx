"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarBadge } from "./SidebarBadge";
import { NavItem } from "./types"; // ← fixed: was "./sidebar"

interface Props {
  item: NavItem;
  isCollapsed: boolean;
  onClick?: () => void;
}

export function SidebarItem({ item, isCollapsed, onClick }: Props) {
  const pathname = usePathname();

  const isActive =
    !item.disabled &&
    (pathname === item.href ||
      (item.href !== "/" && pathname.startsWith(item.href + "/")));

  const content = (
    <>
      {isActive && (
        <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-brand-primary shadow-[0_0_10px_rgba(240,165,0,0.8)] z-10" />
      )}

      <span
        className={
          "shrink-0 transition-all duration-300 w-[18px] h-[18px] " +
          (isActive
            ? "text-brand-primary scale-110 drop-shadow-[0_0_5px_rgba(240,165,0,0.3)]"
            : item.disabled
              ? "text-[#3a3f50]"
              : "text-[#4a5270] group-hover:text-[#e8eaf0] group-hover:scale-110")
        }
      >
        {item.icon}
      </span>

      {!isCollapsed && (
        <span className="truncate leading-none transition-transform duration-300 group-hover:translate-x-0.5">{item.label}</span>
      )}

      {!isCollapsed && item.badge && (
        <SidebarBadge
          count={item.badge.count}
          variant={item.disabled ? undefined : item.badge.variant}
          className={item.disabled ? "opacity-30 grayscale" : "transition-transform group-hover:scale-110"}
        />
      )}

      {isCollapsed && item.badge && (
        <span
          className={
            "absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full border-2 border-[#13151a] " +
            (item.disabled ? "bg-gray-600" : "bg-brand-primary shadow-[0_0_5px_rgba(240,165,0,0.5)]")
          }
        />
      )}
    </>
  );

  const commonClasses =
    "group relative flex items-center mx-2 rounded-[8px] " +
    "transition-all duration-300 select-none overflow-hidden " +
    (isCollapsed ? "justify-center py-2.5 " : "gap-2.5 px-3 py-[9px] ") +
    "text-xs font-medium ";

  if (item.disabled) {
    return (
      <div
        title={isCollapsed ? `${item.label} (Coming Soon)` : "Coming Soon"}
        className={commonClasses + "text-[#3a3f50] cursor-not-allowed"}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      title={isCollapsed ? item.label : undefined}
      className={
        commonClasses +
        "text-[#8892a8] hover:bg-[#1c1f27] hover:text-[#e8eaf0] " +
        (isActive ? "bg-brand-primary/10 text-brand-primary shadow-[inset_0_0_12px_rgba(240,165,0,0.05)]" : "")
      }
    >
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-transparent pointer-events-none" />
      )}
      {content}
    </Link>
  );
}
