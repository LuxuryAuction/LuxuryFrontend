"use client";

import { ActivityStream } from "./components/ActivityStream";
import { CommandBanner } from "./components/CommandBanner";
import { EmergencyActions } from "./components/EmergencyActions";
import { NodeStatusPanel } from "./components/NodeStatusPanel";
import { StatCard } from "./components/StatCard";
import { VolumeChartCard } from "./components/VolumeChartCard";
import { STATS } from "./constants";

export const DashboardView = () => {
  return (
    <div className="mx-auto w-full max-w-[1600px] animate-bvCatFadeUp space-y-8 pb-12">
      <CommandBanner />
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
        {STATS.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} trend={stat.trend} trendUp={stat.trendUp} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <VolumeChartCard />
          <ActivityStream />
        </div>

        <div className="space-y-8">
          <NodeStatusPanel />
          <EmergencyActions />
        </div>
      </div>
    </div>
  );
};
