import type { ProfileBadgeRarity } from "./profileHome.types";

export const PROFILE_RARITY_ORDER: ProfileBadgeRarity[] = [
  "common",
  "rare",
  "epic",
  "legendary",
];


/** Ширина картки в горизонтальному скролі на mobile (Tailwind: w-[340px]) */
export const PROFILE_HOME_MOBILE_CARD_WIDTH_PX = 340;

/** Карток на одну «сторінку» гардеробу: 3 колонки × 2 ряди */
export const PROFILE_WARDROBE_ITEMS_PER_PANE = 6;

export function getWardrobePaneCount(totalCount: number): number {
  if (totalCount <= 0) return 1;
  return Math.ceil(totalCount / PROFILE_WARDROBE_ITEMS_PER_PANE);
}

export const PROFILE_BADGE_RARITY_STYLES: Record<
  ProfileBadgeRarity,
  { ring: string; glow: string; label: string; halo: string }
> = {
  common: {
    ring: "ring-white/10",
    glow: "shadow-[0_0_24px_rgba(255,255,255,0.06)]",
    label: "text-content-tertiary",
    halo: "rgba(255,255,255,0.08)",
  },
  rare: {
    ring: "ring-[#3b82f6]/35",
    glow: "shadow-[0_0_28px_rgba(59,130,246,0.18)]",
    label: "text-[#60a5fa]",
    halo: "rgba(59,130,246,0.25)",
  },
  epic: {
    ring: "ring-[#a855f7]/35",
    glow: "shadow-[0_0_32px_rgba(168,85,247,0.2)]",
    label: "text-[#c084fc]",
    halo: "rgba(168,85,247,0.3)",
  },
  legendary: {
    ring: "ring-[#f0a500]/45",
    glow: "shadow-[0_0_36px_rgba(240,165,0,0.28)]",
    label: "text-[#f0a500]",
    halo: "rgba(240,165,0,0.35)",
  },
};
