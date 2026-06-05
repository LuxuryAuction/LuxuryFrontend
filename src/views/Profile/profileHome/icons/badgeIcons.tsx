import { forwardRef, type ComponentProps } from "react";
import {
  BadgeDollarSign,
  CalendarClock,
  Crown,
  Gem,
  Handshake,
  LockKeyhole,
  Medal,
  PackageCheck,
  Pin,
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
  | "seller_10"
  | "seller_50"
  | "power_seller"
  | "first_win"
  | "collector"
  | "patron"
  | "verified"
  | "trust_90"
  | "lock";

type IconProps = ComponentProps<LucideIcon>;

const VerifiedBadgeIcon = forwardRef<SVGSVGElement, IconProps>(function VerifiedBadgeIcon(
  { className, ...props },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path
        d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z"
        fill="#2F88FF"
        stroke="#000000"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 24L22 29L32 19"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}) as LucideIcon;

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
  seller_10: BadgeDollarSign,
  seller_50: Store,
  power_seller: Crown,
  first_win: Trophy,
  collector: Gem,
  patron: Handshake,
  verified: VerifiedBadgeIcon,
  trust_90: ShieldPlus,
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
