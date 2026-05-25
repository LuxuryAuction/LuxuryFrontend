"use client";

import { LotStatus, getStatusConfig } from "../constants";

export const StatusBadge = ({ status }: { status: LotStatus }) => {
  const c = getStatusConfig(status);

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
      <span>{c.label}</span>
    </span>
  );
};
