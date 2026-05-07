"use client";

import React from "react";
import { LotStatus } from "../types";
import { STATUS_CFG } from "../constants";

export const StatusBadge = ({ status }: { status: LotStatus }) => {
  const c = STATUS_CFG[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-[3px] rounded-full font-mono text-[9px] font-medium uppercase tracking-[0.1em] whitespace-nowrap"
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
      {status === "ACTIVE" ? "Live" : c.label}
    </span>
  );
};
