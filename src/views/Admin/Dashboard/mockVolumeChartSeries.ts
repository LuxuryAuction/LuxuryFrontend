import type { VolumeRange } from "./constants";
import type { PublishedLotsSeries } from "./utils/buildPublishedLotsSeries";

/** Фіксована точка часу для підписів осі (мок; з беку — реальний «зараз» / вікно). */
const ANCHOR_MS = 1_746_964_800_000; // 2026-05-11T12:00:00.000Z

const sum = (b: number[]) => b.reduce((a, x) => a + x, 0);

const mk = (bucketCount: number, windowMs: number, buckets: number[]): PublishedLotsSeries => ({
  buckets,
  bucketStartMs: ANCHOR_MS - windowMs,
  bucketMs: windowMs / bucketCount,
  totalInWindow: sum(buckets),
});

export const MOCK_PUBLISHED_VOLUME_SERIES: Record<VolumeRange, PublishedLotsSeries> = {
  "1H": mk(12, 60 * 60 * 1000, [2, 3, 1, 4, 2, 5, 3, 2, 4, 3, 2, 3]),
  "24H": mk(
    24,
    24 * 60 * 60 * 1000,
    [3, 5, 2, 6, 4, 7, 5, 8, 4, 6, 5, 9, 6, 7, 5, 8, 6, 7, 8, 5, 6, 7, 8, 6],
  ),
  "7D": mk(7, 7 * 24 * 60 * 60 * 1000, [12, 18, 15, 22, 19, 24, 16]),
  "30D": mk(
    30,
    30 * 24 * 60 * 60 * 1000,
    [
      4, 5, 3, 6, 5, 4, 7, 5, 6, 4, 5, 7, 6, 5, 8, 6, 5, 7, 6, 8, 5, 6, 7, 5, 6, 8, 7, 5, 6, 7,
    ],
  ),
};
