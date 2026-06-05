"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/Button";
import { PROFILE_BADGE_RARITY_STYLES } from "../profileHome.config";
import type { IProfileBadge } from "../profileHome.types";
import { BadgeIcon } from "../icons/BadgeIcon";
import { PinIcon } from "../icons/badgeIcons";

interface BadgeTileProps {
  badge: IProfileBadge;
  canFavourite?: boolean;
  onToggleFavourite?: () => void;
}

export function BadgeTile({ badge, canFavourite, onToggleFavourite }: BadgeTileProps) {
  const t = useTranslations("ProfileHome");
  const rarityStyle = PROFILE_BADGE_RARITY_STYLES[badge.badgeRare];
  const { isCollected, isFavourite } = badge;

  return (
    <article
      className={[
        "group relative flex h-full w-full flex-col rounded-xl border p-4 transition-all duration-300",
        isCollected
          ? "border-border-primary bg-auth-app hover:border-brand-primary/30"
          : "border-border-primary/60 bg-surface-secondary/40 opacity-75",
      ].join(" ")}
    >
      {canFavourite && isCollected && onToggleFavourite && (
        <Button
          type="button"
          variant={isFavourite ? "secondary" : "ghost"}
          size="xxs"
          onClick={onToggleFavourite}
          title={isFavourite ? t("actions.unpin") : t("actions.pin")}
          className={[
            "absolute top-2.5 right-2.5 z-10 min-w-0 px-1.5 transition-opacity",
            "opacity-100 sm:opacity-0 sm:group-hover:opacity-100",
            isFavourite && "sm:opacity-100",
          ].join(" ")}
          aria-pressed={isFavourite}
        >
          <PinIcon filled={isFavourite} className="w-3.5 h-3.5" />
        </Button>
      )}

      <div
        className={[
          "mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ring-2",
          rarityStyle.ring,
          isCollected ? "bg-surface-secondary" : "bg-surface-primary/80",
        ].join(" ")}
      >
        <BadgeIcon
          badgeId={badge.badgeType}
          locked={!isCollected}
          rarity={badge.badgeRare}
          size="md"
        />
      </div>

      <div className={`font-mono text-[0.55rem] uppercase tracking-[0.14em] mb-1 ${rarityStyle.label}`}>
        {t(`rarity.${badge.badgeRare}`)}
      </div>

      <h3 className="mb-1 line-clamp-2 text-[0.85rem] font-bold leading-tight text-content-light max-sm:min-h-[2.5em]">
        {badge.badgeTitle}
      </h3>

      <p className="line-clamp-3 flex-1 text-[0.72rem] leading-relaxed text-content-tertiary max-sm:min-h-[3.75em]">
        {badge.badgeDescription}
      </p>

      {isCollected ? (
        <div className="mt-auto pt-3 font-mono text-[0.58rem] uppercase tracking-wider text-[#22c55e]">
          {t("status.collected")}
        </div>
      ) : (
        <div className="mt-auto pt-3 font-mono text-[0.58rem] uppercase tracking-wider text-content-tertiary/80">
          {t("status.locked")}
        </div>
      )}
    </article>
  );
}
