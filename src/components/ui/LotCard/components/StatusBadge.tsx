"use client";

import { LotStatus, STATUS_CFG } from "../constants";

export const StatusBadge = ({ status }: { status: LotStatus }) => {
  const c = STATUS_CFG[status];
  if (!c) return null;

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-[2px] mt0- rounded-full font-mono text-[9px] font-medium uppercase whitespace-nowrap"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.color,
      }}
    >
      {c.dot && (
        <span
          className="inline-block w-[4px] h-[4px] rounded-full"
          style={{
            background: c.dot,
            animation: c.pulse ? "bvBlink 1.4s ease-in-out infinite" : "none",
          }}
        />
      )}
      <span className="mt-0.5">{c.label}</span>
    </span>
  );
};
