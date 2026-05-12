import { Link } from "@/src/i18n/navigation";
import { SidebarUser } from "./types";
import { Avatar } from "@/src/components/common/Avatar";
import type { SidebarProps } from "./Sidebar";

interface Props {
  user: SidebarUser;
  isCollapsed: boolean;
  variant?: SidebarProps["variant"];
}

export function SidebarUserBlock({ user, isCollapsed, variant }: Props) {
  const hoverBg = variant === "admin" ? "hover:bg-admin-accent/10" : "hover:bg-[#1c1f27]";
  const roleText = variant === "admin" ? "text-admin-primary" : "text-brand-primary";
  const avatarRing = variant === "admin" ? "group-hover:ring-admin-accent/25 group-hover:border-admin-accent/50" : "group-hover:ring-brand-primary/20 group-hover:border-brand-primary/50";

  const inner = (
    <div
      className={
        "group relative flex items-center gap-2.5 py-2 mx-2 rounded-[8px] " +
        `cursor-pointer transition-colors duration-150 ${hoverBg} ` +
        (isCollapsed
          ? "justify-center px-0"
          : "justify-start px-2.5")
      }
    >
      <Avatar 
        name={user.name} 
        src={user.avatarUrl}
        size="md" 
        className={`transition-all duration-300 group-hover:scale-110 group-hover:ring-4 ${avatarRing} shadow-lg shadow-black/20`}
      />

      {!isCollapsed && (
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-white truncate leading-none mb-1">
            {user.name}
          </p>
          <p className={`font-mono text-[9px] tracking-widest uppercase truncate leading-none ${roleText}`}>
            {user.role}
          </p>
        </div>
      )
      }

      {
        !isCollapsed && (
          <svg
            className="w-3.5 h-3.5 text-[#4a5270] group-hover:text-[#8892a8] transition-colors shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )
      }

    </div >
  );

  return user.href ? (
    <Link href={user.href} className="block">
      {inner}
    </Link>
  ) : (
    <div>{inner}</div>
  );
}
