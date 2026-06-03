"use client";

import { useTranslations } from "next-intl";
import { ProgressRing } from "@/src/components/ui/ProgressRing";
import { PROFILE_BADGE_RARITY_STYLES, PROFILE_RARITY_ORDER } from "../profileHome.config";
import type { IProfileAchievements, IProfileBadge } from "../profileHome.types";
import { BadgeIcon } from "../icons/BadgeIcon";

interface CollectionProgressProps {
  achievements: IProfileAchievements;
  nextBadge?: IProfileBadge | null;
}

function NextBadgeTeaser({ badge }: { badge: IProfileBadge }) {
  const t = useTranslations("ProfileHome");
  const style = PROFILE_BADGE_RARITY_STYLES[badge.badgeRare];

  return (
    <div className="flex items-center gap-3 rounded-xl border border-dashed border-border-primary bg-surface-secondary/30 p-3">
      <div
        className={[
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-2 bg-surface-primary/80",
          style.ring,
        ].join(" ")}
      >
        <BadgeIcon badgeId={badge.badgeType} locked rarity={badge.badgeRare} size="md" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-content-tertiary">
          {t("nextBadge")}
        </p>
        <p className="text-[0.82rem] font-bold text-content-light leading-tight truncate">
          {badge.badgeTitle}
        </p>
        <p className="text-[0.7rem] text-content-tertiary leading-snug line-clamp-1">
          {badge.badgeDescription}
        </p>
      </div>
    </div>
  );
}

function AllCollectedTeaser() {
  const t = useTranslations("ProfileHome");
  return (
    <div className="flex items-center gap-3 rounded-xl border border-brand-primary/30 bg-brand-primary/5 p-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-2 ring-brand-primary/40 bg-surface-secondary text-brand-primary text-xl">
        ★
      </div>
      <p className="text-[0.8rem] font-semibold text-content-light leading-snug">
        {t("allCollected")}
      </p>
    </div>
  );
}

export function CollectionProgress({ achievements, nextBadge = null }: CollectionProgressProps) {
  const t = useTranslations("ProfileHome");
  const { percent, collected, total, byRarity } = achievements;
  const remaining = Math.max(total - collected, 0);

  const rarityRows = PROFILE_RARITY_ORDER.map((rarity) => {
    const row = byRarity.find((r) => r.rarity === rarity);
    return { rarity, collected: row?.collected ?? 0, total: row?.total ?? 0 };
  });

  return (
    <div className="flex h-full flex-col justify-center gap-6 p-5 md:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
        <div className="flex flex-col items-center gap-4 sm:gap-6 shrink-0 text-center sm:text-left">
          <ProgressRing value={percent} size={120}>
            <span className="text-[1.65rem] sm:text-[1.85rem] font-black text-content-primary tabular-nums leading-none">
              {percent}%
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-content-tertiary mt-1">
              {t("progressLabel")}
            </span>
          </ProgressRing>

          {remaining > 0 ? (
            <p className="text-[13px] text-content-secondary max-w-[200px] leading-relaxed">
              {t("progressRemaining", { count: remaining })}
            </p>
          ) : (
            <p className="text-[13px] text-content-secondary max-w-[200px] leading-relaxed text-center">
              {t("allCollected")}
            </p>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-5">
          {nextBadge ? <NextBadgeTeaser badge={nextBadge} /> : <AllCollectedTeaser />}

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-content-tertiary mb-3">
              {t("progressByRarity")}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {rarityRows.map(({ rarity, collected: rCollected, total: rTotal }) => {
                const style = PROFILE_BADGE_RARITY_STYLES[rarity];
                const rPercent = rTotal > 0 ? Math.round((rCollected / rTotal) * 100) : 0;
                return (
                  <div
                    key={rarity}
                    className="rounded-lg border border-border-primary bg-surface-secondary/40 px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`font-mono text-[9px] uppercase tracking-wider ${style.label}`}>
                        {t(`rarity.${rarity}`)}
                      </span>
                      <span className="font-mono text-[10px] text-content-tertiary tabular-nums">
                        {rCollected}/{rTotal}
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-surface-primary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-primary/80 transition-all duration-500"
                        style={{ width: `${rPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
