"use client";

import { NODE_SERVICES, NODE_TONE_BAR_CLASS, NODE_TONE_LABEL_CLASS } from "../constants";

const GLOBAL_LOAD_PCT = 65;

export const NodeStatusPanel = () => {
  const ringDeg = GLOBAL_LOAD_PCT * 3.6;

  return (
    <div className="rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-xl md:p-8">
      <h3 className="mb-8 text-lg font-bold tracking-tight text-white">Node Status</h3>

      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <div
            className="relative h-20 w-20 shrink-0 rounded-full shadow-admin-accent-lg"
            style={{
              background: `conic-gradient(from -90deg, rgb(6 182 212) ${ringDeg}deg, rgba(255,255,255,0.08) ${ringDeg}deg)`,
            }}
          >
            <div className="absolute inset-[5px] flex items-center justify-center rounded-full bg-admin-inset">
              <span className="text-lg font-black text-white tabular-nums">
                {GLOBAL_LOAD_PCT}
                <span className="text-[10px]">%</span>
              </span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="mb-1 text-sm font-bold text-white">Global Load</p>
            <p className="text-[10px] font-mono leading-relaxed text-white/40">
              Cluster operating within optimal parameters.
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-white/5" />

        <div className="space-y-5">
          {NODE_SERVICES.map((node) => (
            <div key={node.name}>
              <div className="mb-2 flex items-end justify-between gap-2">
                <p className="text-xs font-bold text-white/80">{node.name}</p>
                <p className={`text-[9px] font-mono uppercase tracking-wider ${NODE_TONE_LABEL_CLASS[node.tone]}`}>
                  {node.status}
                </p>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/3">
                <div
                  className={`h-full rounded-full shadow-[0_0_10px_currentColor] ${NODE_TONE_BAR_CLASS[node.tone]}`}
                  style={{ width: `${node.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
