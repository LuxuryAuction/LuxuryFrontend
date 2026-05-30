import type React from "react";
import {
  Award,
  BadgeCheck,
  BadgeDollarSign,
  CalendarClock,
  Crown,
  Gavel,
  Gem,
  Handshake,
  LockKeyhole,
  Medal,
  PackageCheck,
  Pin,
  ShieldCheck,
  ShieldPlus,
  Store,
  Trophy,
  UserRoundCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ProfileBadgeRarity } from "../profileHome.types";

export type BadgeIconId =
  | "welcome"
  | "veteran"
  | "anniversary"
  | "first_listing"
  | "active_seller"
  | "seller_10"
  | "seller_50"
  | "power_seller"
  | "first_win"
  | "collector"
  | "patron"
  | "verified"
  | "trust_75"
  | "trust_90"
  | "clean_record"
  | "lock";

type IconProps = React.ComponentProps<LucideIcon>;

export const BADGE_ICON_COLORS: Record<ProfileBadgeRarity, string> = {
  common: "text-content-light",
  rare: "text-[#60a5fa]",
  epic: "text-[#c084fc]",
  legendary: "text-[#f0a500]",
};

const ICONS: Record<BadgeIconId, LucideIcon> = {
  welcome: UserRoundCheck,
  veteran: CalendarClock,
  anniversary: Medal,
  first_listing: PackageCheck,
  active_seller: Gavel,
  seller_10: BadgeDollarSign,
  seller_50: Store,
  power_seller: Crown,
  first_win: Trophy,
  collector: Gem,
  patron: Handshake,
  verified: BadgeCheck,
  trust_75: ShieldCheck,
  trust_90: ShieldPlus,
  clean_record: Award,
  lock: LockKeyhole,
};

export function isBadgeIconId(id: string): id is BadgeIconId {
  return id in ICONS;
}

export function renderBadgeIcon(id: string, props: IconProps) {
  const iconId = isBadgeIconId(id) ? id : "welcome";
  const Icon = ICONS[iconId];
  return <Icon aria-hidden strokeWidth={1.85} {...props} />;
}

export function PinIcon({ filled, className }: { filled?: boolean; className?: string }) {
  return <Pin className={className} fill={filled ? "currentColor" : "none"} strokeWidth={1.85} aria-hidden />;
}
