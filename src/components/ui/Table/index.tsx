"use client";

import type { ReactNode } from "react";

type ScrollTableShellProps = {
  children: ReactNode;
  className?: string;
  scrollClassName?: string;
};

/**
 * Shell for data tables: keeps a real `<table>` on small viewports via horizontal scroll
 * inside a rounded bordered container (admin-style chrome).
 */
export function ScrollTableShell({
  children,
  className = "",
  scrollClassName = "",
}: ScrollTableShellProps) {
  return (
    <div className={`overflow-hidden rounded-3xl border border-white/6 bg-white/2 ${className}`}>
      <div
        className={`min-w-0 max-w-full overflow-x-auto overscroll-x-contain touch-pan-x ${scrollClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
