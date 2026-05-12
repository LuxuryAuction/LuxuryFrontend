"use client";

import { useId, useMemo } from "react";
import type { VolumeRange } from "../constants";
import type { PublishedLotsSeries } from "../utils/buildPublishedLotsSeries";
import { getSeriesTickLabels } from "../utils/buildPublishedLotsSeries";

type PublishedLotsVolumeChartProps = {
  range: VolumeRange;
  series: PublishedLotsSeries;
  isLoading: boolean;
  error: Error | null;
};

const VIEW_W = 1000;
const VIEW_H = 300;
const TOP_Y = 42;
const BOTTOM_Y = 268;

function buildPaths(buckets: number[]) {
  const n = buckets.length;
  const max = Math.max(...buckets, 1);
  const h = BOTTOM_Y - TOP_Y;

  const points = buckets.map((c, i) => ({
    x: n <= 1 ? VIEW_W / 2 : (i / (n - 1)) * VIEW_W,
    y: BOTTOM_Y - (c / max) * h,
  }));

  if (points.length === 0) {
    const y = BOTTOM_Y;
    return {
      lineD: `M 0 ${y} L ${VIEW_W} ${y}`,
      areaD: `M 0 ${y} L ${VIEW_W} ${y} L ${VIEW_W} ${VIEW_H} L 0 ${VIEW_H} Z`,
    };
  }

  const lineD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const first = points[0];
  const last = points[points.length - 1];
  const areaD = `${lineD} L ${last.x.toFixed(1)} ${BOTTOM_Y} L ${first.x.toFixed(1)} ${BOTTOM_Y} Z`;

  return { lineD, areaD };
}

export const PublishedLotsVolumeChart = ({ range, series, isLoading, error }: PublishedLotsVolumeChartProps) => {
  const gradId = useId().replace(/:/g, "");
  const { buckets, bucketStartMs, bucketMs } = series;
  const { lineD, areaD } = useMemo(() => buildPaths(buckets), [buckets]);
  const ticks = useMemo(
    () => getSeriesTickLabels(range, buckets.length, bucketStartMs, bucketMs),
    [range, buckets.length, bucketStartMs, bucketMs],
  );

  if (isLoading) {
    return <div className="h-64 w-full animate-pulse rounded-xl bg-white/4" />;
  }

  if (error) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl border border-admin-danger/25 bg-admin-danger/10 px-4 text-center text-sm text-admin-danger/90">
        Не вдалося завантажити лоти: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative h-64 w-full [&_svg_path:last-of-type]:drop-shadow-admin-chart">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          className="h-full w-full text-admin-accent"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.32" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3].map((k) => (
            <line
              key={k}
              x1="0"
              y1={TOP_Y + (k * (BOTTOM_Y - TOP_Y)) / 3}
              x2={VIEW_W}
              y2={TOP_Y + (k * (BOTTOM_Y - TOP_Y)) / 3}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}

          <path d={areaD} fill={`url(#${gradId})`} />
          <path
            d={lineD}
            fill="none"
            className="stroke-current"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative h-4 text-[10px] font-mono text-white/35">
        {ticks.map(({ index, label }) => {
          const pct = buckets.length <= 1 ? 50 : (index / (buckets.length - 1)) * 100;
          return (
            <span
              key={`${index}-${label}`}
              className="absolute top-0 -translate-x-1/2 whitespace-nowrap"
              style={{ left: `${pct}%` }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
};
