"use client";

import { useToast } from "@/src/components/ui/Toast";
import { useCurrentUtcTime } from "@/src/hooks/useTime";

export const CommandBanner = () => {
  const { showToast } = useToast();
  const currentTime = useCurrentUtcTime();

  const generateReport = () => {
    showToast("success", "Report Downloading")
  }

  const openSystemSettings = () => {
    showToast("error", "Settings under development")
  }

  return (
    <div className="relative rounded-3xl overflow-hidden border border-admin-accent/20 bg-admin-canvas p-8 md:p-12">
      <div className="absolute inset-0 bg-linear-to-r from-admin-accent/10 via-transparent to-transparent pointer-events-none" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-admin-radial-accent" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-admin-accent/20 bg-admin-accent/10 px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-admin-accent-lo" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-admin-accent-lo">System Secure</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
            Command Center
          </h1>
          <p className="text-sm font-mono tracking-wider text-admin-accent/60">
            {currentTime}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/3 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10 cursor-pointer"
            onClick={generateReport}
          >
            Generate Report
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-xl border border-admin-accent/20 bg-admin-accent/10 px-6 py-3 text-xs font-bold uppercase tracking-widest text-admin-accent-lo shadow-admin-accent transition-colors hover:bg-admin-accent/20 hover:text-admin-accent-hi"
            onClick={openSystemSettings}
          >
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
};
