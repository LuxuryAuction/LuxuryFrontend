import { BADGE_ICON_COLORS, renderBadgeIcon } from "./badgeIcons";
import type { ProfileBadgeRarity } from "../profileHome.types";

interface BadgeIconProps {
  badgeId: string;
  locked?: boolean;
  rarity?: ProfileBadgeRarity;
  size?: "sm" | "md";
  className?: string;
}

const SIZE_CLASS = {
  sm: "w-6 h-6",
  md: "w-7 h-7",
} as const;

export function BadgeIcon({
  badgeId,
  locked = false,
  rarity = "common",
  size = "md",
  className = "",
}: BadgeIconProps) {
  const colorClass = locked ? "text-content-tertiary/70" : BADGE_ICON_COLORS[rarity];

  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${SIZE_CLASS[size]} ${colorClass} ${className}`}>
      {renderBadgeIcon(locked ? "lock" : badgeId, { className: "w-full h-full" })}
    </span>
  );
}
