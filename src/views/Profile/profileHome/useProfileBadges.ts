"use client";

import { useCallback, useMemo, useState } from "react";
import { MOCK_PROFILE_BADGES } from "./profileHome.mock";
import { PROFILE_HOME_MAX_FAVOURITES } from "./profileHome.types";
import type { IProfileBadgesResponse } from "./profileHome.types";

export function useProfileBadges(userName: string) {
  void userName;

  const [response, setResponse] = useState<IProfileBadgesResponse>(
    () => MOCK_PROFILE_BADGES,
  );

  const favouriteCount = useMemo(
    () => response.badges.filter((b) => b.isFavourite).length,
    [response.badges],
  );

  const toggleFavourite = useCallback((badgeType: string) => {
    setResponse((prev) => {
      const target = prev.badges.find((b) => b.badgeType === badgeType);
      if (!target || !target.isCollected) return prev;

      if (target.isFavourite) {
        return {
          ...prev,
          badges: prev.badges.map((b) =>
            b.badgeType === badgeType ? { ...b, isFavourite: false } : b,
          ),
        };
      }

      const favourites = prev.badges.filter((b) => b.isFavourite);
      const dropType =
        favourites.length >= PROFILE_HOME_MAX_FAVOURITES
          ? favourites[0].badgeType
          : null;

      return {
        ...prev,
        badges: prev.badges.map((b) => {
          if (b.badgeType === badgeType) return { ...b, isFavourite: true };
          if (b.badgeType === dropType) return { ...b, isFavourite: false };
          return b;
        }),
      };
    });
  }, []);

  return {
    badges: response.badges,
    achievements: response.achievements,
    favouriteCount,
    toggleFavourite,
  };
}
