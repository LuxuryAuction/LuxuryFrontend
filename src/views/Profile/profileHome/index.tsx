"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ShieldIcon } from "@/public/assets/icons";
import { Tabs } from "@/src/components/ui/Tabs";
import NoData from "@/src/components/ui/NoData";
import type { IProfile } from "../types";
import { PROFILE_RARITY_ORDER } from "./profileHome.config";
import type { ProfileBadgeStatusFilter } from "./profileHome.types";
import { PROFILE_HOME_MAX_FAVOURITES } from "./profileHome.types";
import { useProfileBadges } from "./useProfileBadges";
import { ProfileHomeIntro } from "./components/ProfileHomeIntro";
import { ProfileHomePanels } from "./components/ProfileHomePanels";
import { BadgeTile } from "./components/BadgeTile";

interface ProfileHomeProps {
  profile: IProfile;
  isMe?: boolean;
}

export function ProfileHome({ profile, isMe = false }: ProfileHomeProps) {
  const t = useTranslations("ProfileHome");
  const [status, setStatus] = useState<ProfileBadgeStatusFilter>("all");

  const { badges, achievements, toggleFavourite } = useProfileBadges(profile.userName);

  const showcaseBadges = useMemo(() => {
    const favourites = badges.filter((b) => b.isFavourite && b.isCollected);
    if (favourites.length > 0) {
      return favourites.slice(0, PROFILE_HOME_MAX_FAVOURITES);
    }

    const rarityRank = PROFILE_RARITY_ORDER.reduce<Record<string, number>>(
      (acc, rarity, idx) => {
        acc[rarity] = PROFILE_RARITY_ORDER.length - idx;
        return acc;
      },
      {},
    );

    return [...badges]
      .filter((b) => b.isCollected)
      .sort((a, b) => rarityRank[b.badgeRare] - rarityRank[a.badgeRare])
      .slice(0, PROFILE_HOME_MAX_FAVOURITES);
  }, [badges]);

  const nextBadge = useMemo(() => {
    const rarityRank = PROFILE_RARITY_ORDER.reduce<Record<string, number>>(
      (acc, rarity, idx) => {
        acc[rarity] = idx;
        return acc;
      },
      {},
    );

    return (
      [...badges]
        .filter((b) => !b.isCollected)
        .sort((a, b) => rarityRank[a.badgeRare] - rarityRank[b.badgeRare])[0] ?? null
    );
  }, [badges]);

  const filteredBadges = useMemo(() => {
    if (status === "collected") return badges.filter((b) => b.isCollected);
    if (status === "locked") return badges.filter((b) => !b.isCollected);
    return badges;
  }, [badges, status]);

  const statusTabs = useMemo(() => {
    const collected = achievements.collected;
    const total = achievements.total;
    return [
      { id: "all" as const, label: `${t("filters.all")} (${total})` },
      { id: "collected" as const, label: `${t("filters.collected")} (${collected})` },
      { id: "locked" as const, label: `${t("filters.locked")} (${total - collected})` },
    ];
  }, [t, achievements]);

  const handleStatusChange = (tabId: string) => {
    setStatus(tabId as ProfileBadgeStatusFilter);
  };

  return (
    <div className="flex flex-col gap-6 animate-bvCatFadeUp">
      <section className="relative overflow-hidden rounded-lg border border-border-primary bg-auth-app">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-brand-primary via-[#e87c00] to-transparent opacity-80" />
        <ProfileHomeIntro
          isMe={isMe}
          profileName={profile.name}
          unlocked={achievements.collected}
          total={achievements.total}
        />
        <ProfileHomePanels
          achievements={achievements}
          showcaseBadges={showcaseBadges}
          nextBadge={nextBadge}
          isMe={isMe}
        />
      </section>

      <Tabs
        tabs={statusTabs}
        activeTab={status}
        onChange={handleStatusChange}
        variant="pill"
      />

      {filteredBadges.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {filteredBadges.map((badge) => (
            <BadgeTile
              key={badge.badgeType}
              badge={badge}
              canFavourite={isMe}
              onToggleFavourite={() => toggleFavourite(badge.badgeType)}
            />
          ))}
        </div>
      ) : (
        <NoData
          title={t("emptyCategoryTitle")}
          description={t("emptyCategoryDescription")}
          icon={<ShieldIcon className="w-10 h-10 text-brand-primary/40" />}
        />
      )}
    </div>
  );
}
