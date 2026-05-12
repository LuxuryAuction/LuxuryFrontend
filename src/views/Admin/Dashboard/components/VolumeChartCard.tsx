"use client";

import { useState } from "react";
import { VOLUME_RANGES, type VolumeRange } from "../constants";
import { MOCK_PUBLISHED_VOLUME_SERIES } from "../mockVolumeChartSeries";
import { PublishedLotsVolumeChart } from "./PublishedLotsVolumeChart";

export const VolumeChartCard = () => {
  const [range, setRange] = useState<VolumeRange>("24H");
  const series = MOCK_PUBLISHED_VOLUME_SERIES[range];

  return (
    <div className="rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-xl md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white">Кількість опублікованих лотів</h3>
          <p className="mt-1 text-[11px] text-white/40">
            {range === "1H" && "остання година"}
            {range === "24H" && "останні 24 години"}
            {range === "7D" && "останні 7 днів"}
            {range === "30D" && "останні 30 днів"}
            {series.totalInWindow > 0 ? ` · ${series.totalInWindow} лотів у вікні` : ""}
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {VOLUME_RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-md px-3 py-1 text-[10px] font-bold transition-colors ${r === range ? "bg-admin-accent/20 text-admin-accent-lo" : "text-white/30 hover:bg-white/5"
                }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <PublishedLotsVolumeChart range={range} series={series} isLoading={false} error={null} />
    </div>
  );
};
