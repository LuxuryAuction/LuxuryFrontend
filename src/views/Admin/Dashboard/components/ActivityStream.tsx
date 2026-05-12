"use client";

import { ACTIVITY_DOT_CLASS, RECENT_ACTIVITY } from "../constants";

export const ActivityStream = () => {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-xl md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold tracking-tight text-white">Last Activity</h3>
        <button
          type="button"
          className="cursor-pointer text-[10px] font-mono uppercase tracking-widest text-admin-accent/70 transition-colors hover:text-admin-accent-lo"
        >
          View All
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {RECENT_ACTIVITY.map((activity) => (
          <div
            key={activity.id}
            className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-white/3"
          >
            <div
              className={`h-2 w-2 shrink-0 rounded-full shadow-[0_0_8px_currentColor] ${ACTIVITY_DOT_CLASS[activity.status]}`}
            />
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 sm:flex-nowrap">
              <p className="truncate text-sm font-bold text-white/90">{activity.action}</p>
              <span className="hidden text-white/10 sm:inline">•</span>
              <p className="hidden min-w-0 flex-1 truncate text-xs text-white/40 sm:block">
                    User <span className="text-admin-accent-lo/80">{activity.user}</span> on{" "}
                <span className="text-content-light">{activity.target}</span>
              </p>
            </div>
            <div className="shrink-0 text-[10px] font-mono text-content-tertiary">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
