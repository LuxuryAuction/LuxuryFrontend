"use client";

import { useTranslations } from "next-intl";
import { PinIcon } from "../icons/badgeIcons";
import { PROFILE_BADGE_RARITY_STYLES } from "../profileHome.config";
import { PROFILE_HOME_MAX_FAVOURITES } from "../profileHome.types";
import type { IProfileBadge } from "../profileHome.types";
import { BadgeIcon } from "../icons/BadgeIcon";
import { ShowcaseEmptySlot } from "./ShowcaseEmptySlot";

interface BadgeShowcaseProps {
  badges: IProfileBadge[];
  isMe?: boolean;
}

export function BadgeShowcase({ badges, isMe = false }: BadgeShowcaseProps) {
  const t = useTranslations("ProfileHome");

  const slots: (IProfileBadge | null)[] = Array.from(
    { length: PROFILE_HOME_MAX_FAVOURITES },
    (_, i) => badges[i] ?? null,
  );

  return (
    <div className="bg-surface-secondary/20 px-5 py-5 md:px-6 md:py-6 sm:border-t sm:border-border-primary">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
        <div>
          <h2 className="text-[0.85rem] font-bold text-content-light">{t("showcaseTitle")}</h2>
          <p className="text-[12px] text-content-tertiary mt-0.5">
            {isMe ? t("showcaseSubtitleOwn") : t("showcaseSubtitleOther")}
          </p>
        </div>
        {isMe && badges.length > 0 && (
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-content-tertiary">
            <PinIcon className="w-3 h-3 text-brand-primary/70" />
            {t("pinHint")}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {slots.map((badge, index) =>
          badge ? (
            <ShowcaseFilledSlot key={badge.badgeType} badge={badge} index={index} />
          ) : (
            <ShowcaseEmptySlot key={`empty-${index}`} isMe={isMe} />
          ),
        )}
      </div>
    </div>
  );
}

function ShowcaseFilledSlot({ badge, index = 0 }: { badge: IProfileBadge; index?: number }) {
  const t = useTranslations("ProfileHome");
  const rarityStyle = PROFILE_BADGE_RARITY_STYLES[badge.badgeRare];

  return (
    <div
      style={{ animationDelay: `${index * 0.07}s` }}
      className={[
        "group/slot relative flex h-full flex-col items-center overflow-hidden rounded-xl border border-border-primary bg-auth-app pt-5 pb-4 px-3 text-center animate-bvCatFadeUp",
        "transition-[transform,border-color,box-shadow] duration-300 ease-out",
        "sm:hover:-translate-y-1 sm:hover:border-brand-primary/30",
        rarityStyle.glow,
      ].join(" ")}
    >
      {/* rarity-tinted glow from the top on hover (desktop) */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 sm:group-hover/slot:opacity-100"
        style={{ background: `radial-gradient(120% 80% at 50% 0%, ${rarityStyle.halo} 0%, transparent 55%)` }}
        aria-hidden
      />

      {/* diagonal sheen sweep on hover (desktop) */}
      <span className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
        <span className="absolute -inset-y-6 -left-1/3 w-1/3 rotate-12 -translate-x-[140%] bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover/slot:translate-x-[420%]" />
      </span>

      {/* rarity top accent line */}
      <span
        className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${rarityStyle.halo}, transparent)` }}
        aria-hidden
      />

      {badge.isFavourite && (
        <span className="absolute top-2 right-2 z-10 text-brand-primary" aria-hidden>
          <PinIcon filled className="w-3 h-3" />
        </span>
      )}

      <div
        className={[
          "relative mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ring-2 transition-transform duration-300",
          rarityStyle.ring,
          "bg-surface-secondary sm:group-hover/slot:scale-110",
        ].join(" ")}
      >
        <div
          className="absolute -inset-1 rounded-2xl opacity-40 blur-md pointer-events-none transition-opacity duration-300 sm:group-hover/slot:opacity-80"
          style={{ background: `radial-gradient(circle, ${rarityStyle.halo} 0%, transparent 70%)` }}
        />
        <BadgeIcon badgeId={badge.badgeType} rarity={badge.badgeRare} size="md" />
      </div>

      <p className="relative text-[0.72rem] font-bold text-content-light leading-tight line-clamp-2 min-h-[2.2em]">
        {badge.badgeTitle}
      </p>
      <span className={`relative mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] ${rarityStyle.label}`}>
        {t(`rarity.${badge.badgeRare}`)}
      </span>

      <div className="relative mt-3 h-px w-8 bg-linear-to-r from-transparent via-border-primary to-transparent transition-all duration-300 sm:group-hover/slot:w-12" />
    </div>
  );
}
