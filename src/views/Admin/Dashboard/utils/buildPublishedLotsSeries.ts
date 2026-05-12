import type { VolumeRange } from "../constants";


export type PublishedLotsSeries = {
  buckets: number[];
  bucketStartMs: number;
  bucketMs: number;
  totalInWindow: number;
};


export function getSeriesTickLabels(
  range: VolumeRange,
  bucketCount: number,
  bucketStartMs: number,
  bucketMs: number,
): { index: number; label: string }[] {
  const step =
    range === "1H" ? 3 : range === "24H" ? 4 : range === "7D" ? 2 : 5;
  const out: { index: number; label: string }[] = [];

  for (let i = 0; i < bucketCount; i += step) {
    const mid = bucketStartMs + i * bucketMs + bucketMs / 2;
    const d = new Date(mid);
    const label =
      range === "1H" || range === "24H"
        ? d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false })
        : d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
    out.push({ index: i, label });
  }

  return out;
}
