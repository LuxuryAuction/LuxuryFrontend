export type ProfileBadgeRarity = "common" | "rare" | "epic" | "legendary";

export type ProfileBadgeStatusFilter = "all" | "collected" | "locked";


export interface IProfileBadge {
  badgeType: string;
  badgeRare: ProfileBadgeRarity;
  badgeTitle: string;
  badgeDescription: string;
  isCollected: boolean;
  isFavourite: boolean;
}

export interface IProfileRarityProgress {
  rarity: ProfileBadgeRarity;
  collected: number;
  total: number;
}

export interface IProfileAchievements {
  collected: number;
  total: number;
  percent: number;
  byRarity: IProfileRarityProgress[];
}

export interface IProfileBadgesResponse {
  badges: IProfileBadge[];
  achievements: IProfileAchievements;
}

export const PROFILE_HOME_MAX_FAVOURITES = 4;
