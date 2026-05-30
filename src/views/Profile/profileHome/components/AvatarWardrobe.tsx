"use client";

import { useRef, useState } from "react";
import { Avatar } from "@/src/components/common/Avatar";
import {
  AVATAR_WEARABLE_SLOT_LABELS,
  type AvatarWearableId,
  type EquippedAvatarWearables,
} from "@/src/components/common/Avatar/wearables";
import type { IProfile } from "../../types";
import { PROFILE_BADGE_RARITY_STYLES } from "../profileHome.config";
import type { IProfileWearable } from "../profileHome.types";

interface AvatarWardrobeProps {
  profile: IProfile;
  wearables: IProfileWearable[];
  totalCount: number;
  paneCount: number;
  equippedLoadout: EquippedAvatarWearables;
  onEquip: (wearableId: string) => void;
  onUnequip: (wearableId: string) => void;
}

export function AvatarWardrobe({
  profile,
  wearables,
  totalCount,
  paneCount,
  equippedLoadout,
  onEquip,
  onUnequip,
}: AvatarWardrobeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleWardrobeScroll = () => {
    const el = scrollRef.current;
    if (!el || paneCount <= 1) return;
    const stride = el.scrollWidth / paneCount;
    if (stride > 0) setActiveIndex(Math.round(el.scrollLeft / stride));
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el || paneCount <= 1) return;
    const stride = el.scrollWidth / paneCount;
    el.scrollTo({ left: stride * index, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden rounded-lg border border-border-primary bg-auth-app">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-brand-primary via-[#e87c00] to-transparent opacity-80" />
      <div className="grid gap-5 p-5 md:grid-cols-[220px_1fr] md:p-6">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border-primary bg-surface-secondary/30 p-5 text-center">
          <div className="relative mb-4 px-4 pt-4">
            <Avatar
              name={profile.name}
              src={profile.profileImageUrl}
              size="lg"
              wearables={equippedLoadout}
              className="h-28 w-28 text-3xl border-4"
            />
          </div>
          <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-brand-primary">
            Wearable Avatar
          </div>
          <h2 className="text-[1rem] font-bold text-content-primary">Digital fit room</h2>
          <p className="mt-2 text-[12px] leading-relaxed text-content-tertiary">
            Приміряй речі, які відкриваються за квести.
          </p>
        </div>

        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-[0.95rem] font-bold text-content-light">Wardrobe drops</h3>
              <p className="mt-1 text-[12px] text-content-tertiary">
                Бейджі залишаються досягненнями, а ці предмети можна одягнути на Avatar.
              </p>
            </div>
            <span className="rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-brand-primary">
              {totalCount} items
            </span>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleWardrobeScroll}
            className="-mx-5 flex items-stretch snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pl-[max(1.25rem,calc((100%-340px)/2))] pr-[max(1.25rem,calc((100%-340px)/2))] [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:auto-cols-[calc((100%-1.5rem)/3)] sm:grid-flow-col sm:grid-rows-2 sm:gap-3 sm:overflow-x-auto sm:px-0 sm:pb-3 sm:pl-0 sm:pr-0 [&::-webkit-scrollbar]:hidden"
          >
            {wearables.map((wearable) => {
              const { isUnlocked, isEquipped } = wearable;
              const rarityStyle = PROFILE_BADGE_RARITY_STYLES[wearable.rarity];

              return (
                <div
                  key={wearable.id}
                  className="flex w-[340px] shrink-0 snap-center sm:contents"
                >
                  <article
                    className={[
                      "relative flex h-full w-full min-h-[176px] snap-start flex-col overflow-hidden rounded-xl border p-3 transition-all duration-300 sm:min-h-0",
                      isUnlocked
                        ? "border-border-primary bg-surface-secondary/30 hover:border-brand-primary/30"
                        : "border-border-primary/60 bg-surface-secondary/20 opacity-60",
                    ].join(" ")}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-30"
                      style={{
                        background: `radial-gradient(90% 70% at 50% 0%, ${rarityStyle.halo}, transparent 58%)`,
                      }}
                      aria-hidden
                    />
                    <div className="relative flex gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border-primary bg-auth-app p-2">
                        <Avatar
                          name={profile.name}
                          src={profile.profileImageUrl}
                          wearables={{ [wearable.slot]: wearable.id as AvatarWearableId }}
                          className="h-10 w-10"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-1.5">
                          <span
                            className={`font-mono text-[8px] uppercase tracking-[0.14em] ${rarityStyle.label}`}
                          >
                            {wearable.rarity}
                          </span>
                          <span className="rounded-full border border-border-primary px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-content-tertiary">
                            {AVATAR_WEARABLE_SLOT_LABELS[wearable.slot]}
                          </span>
                        </div>
                        <h4 className="truncate text-[0.82rem] font-bold text-content-light">
                          {wearable.name}
                        </h4>
                        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-content-tertiary">
                          {wearable.description}
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-auto flex items-center justify-between gap-2 border-t border-border-primary/50 pt-3">
                      <span className="truncate font-mono text-[9px] text-content-tertiary">
                        Unlock: {wearable.unlockedByBadgeType}
                      </span>
                      {isUnlocked ? (
                        <button
                          type="button"
                          onClick={() => (isEquipped ? onUnequip(wearable.id) : onEquip(wearable.id))}
                          className={[
                            "shrink-0 rounded-md px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors cursor-pointer",
                            isEquipped
                              ? "bg-brand-primary text-black hover:bg-brand-primary/90"
                              : "border border-brand-primary/25 text-brand-primary hover:bg-brand-primary/10",
                          ].join(" ")}
                        >
                          {isEquipped ? "Equipped" : "Try on"}
                        </button>
                      ) : (
                        <span className="shrink-0 rounded-md border border-border-primary px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-content-tertiary">
                          Locked
                        </span>
                      )}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {paneCount > 1 && (
            <div className="mt-3 hidden items-center justify-center gap-1.5 sm:flex">
              {Array.from({ length: paneCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`${index + 1}`}
                  onClick={() => scrollToIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "w-4 bg-brand-primary" : "w-1.5 bg-content-tertiary/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
