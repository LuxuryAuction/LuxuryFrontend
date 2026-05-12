export const CATEGORY_FILTER_TAB_IDS = ["all", "live", "upcoming", "ended"] as const;

export type CategoryFilterTabId = (typeof CATEGORY_FILTER_TAB_IDS)[number];
