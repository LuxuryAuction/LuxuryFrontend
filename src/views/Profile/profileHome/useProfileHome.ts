"use client";

import { useCallback, useMemo, useState } from "react";
import type { AvatarWearableId, EquippedAvatarWearables } from "@/src/components/common/Avatar/wearables";
import { MOCK_PROFILE_BADGES_RESPONSE } from "./profileHome.mock";
import { MOCK_PROFILE_WARDROBE_RESPONSE } from "./profileHome.wearables.mock";
import { getWardrobePaneCount } from "./profileHome.config";
import { PROFILE_HOME_MAX_FAVOURITES } from "./profileHome.types";
import type { IProfileWearable } from "./profileHome.types";

function buildEquippedLoadout(wearables: IProfileWearable[]): EquippedAvatarWearables {
  return wearables.reduce<EquippedAvatarWearables>((acc, wearable) => {
    if (wearable.isEquipped) {
      acc[wearable.slot] = wearable.id as AvatarWearableId;
    }
    return acc;
  }, {});
}

export function useProfileHome() {
  const [badgesResponse, setBadgesResponse] = useState(() => MOCK_PROFILE_BADGES_RESPONSE);
  const [wardrobeResponse, setWardrobeResponse] = useState(() => MOCK_PROFILE_WARDROBE_RESPONSE);

  const favouriteCount = useMemo(
    () => badgesResponse.badges.filter((badge) => badge.isFavourite).length,
    [badgesResponse.badges],
  );

  const equippedLoadout = useMemo(
    () => buildEquippedLoadout(wardrobeResponse.wearables),
    [wardrobeResponse.wearables],
  );

  const paneCount = useMemo(
    () => getWardrobePaneCount(wardrobeResponse.totalCount),
    [wardrobeResponse.totalCount],
  );

  const toggleFavourite = useCallback((badgeType: string) => {
    setBadgesResponse((prev) => {
      const target = prev.badges.find((badge) => badge.badgeType === badgeType);
      if (!target?.isCollected) return prev;

      if (target.isFavourite) {
        return {
          ...prev,
          badges: prev.badges.map((badge) =>
            badge.badgeType === badgeType ? { ...badge, isFavourite: false } : badge,
          ),
        };
      }

      const favourites = prev.badges.filter((badge) => badge.isFavourite);
      const dropType =
        favourites.length >= PROFILE_HOME_MAX_FAVOURITES ? favourites[0].badgeType : null;

      return {
        ...prev,
        badges: prev.badges.map((badge) => {
          if (badge.badgeType === badgeType) return { ...badge, isFavourite: true };
          if (badge.badgeType === dropType) return { ...badge, isFavourite: false };
          return badge;
        }),
      };
    });
  }, []);

  const equipWearable = useCallback((wearableId: string) => {
    setWardrobeResponse((prev) => {
      const target = prev.wearables.find((wearable) => wearable.id === wearableId);
      if (!target?.isUnlocked) return prev;

      return {
        ...prev,
        wearables: prev.wearables.map((wearable) => {
          if (wearable.id === wearableId) return { ...wearable, isEquipped: true };
          if (wearable.slot === target.slot) return { ...wearable, isEquipped: false };
          return wearable;
        }),
      };
    });
  }, []);

  const unequipWearable = useCallback((wearableId: string) => {
    setWardrobeResponse((prev) => ({
      ...prev,
      wearables: prev.wearables.map((wearable) =>
        wearable.id === wearableId ? { ...wearable, isEquipped: false } : wearable,
      ),
    }));
  }, []);

  return {
    badges: badgesResponse.badges,
    achievements: badgesResponse.achievements,
    wearables: wardrobeResponse.wearables,
    totalCount: wardrobeResponse.totalCount,
    paneCount,
    favouriteCount,
    equippedLoadout,
    toggleFavourite,
    equipWearable,
    unequipWearable,
  };
}
