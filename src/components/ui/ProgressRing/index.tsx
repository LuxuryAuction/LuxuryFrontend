"use client";

import { useId } from "react";
import type { ReactNode } from "react";

export interface ProgressRingProps {
  /** Progress value, 0–100. */
  value: number;
  /** Outer diameter in px. */
  size?: number;
  /** Ring thickness in px. */
  strokeWidth?: number;
  /** Gradient start/end colors for the progress arc. */
  gradientFrom?: string;
  gradientTo?: string;
  /** Tailwind text-color class applied to the background track. */
  trackClassName?: string;
  className?: string;
  /** Center content (e.g. percentage label). */
  children?: ReactNode;
}

export const ProgressRing = ({
  value,
  size = 120,
  strokeWidth = 8,
  gradientFrom = "var(--color-brand-primary, #f0a500)",
  gradientTo = "#e87c00",
  trackClassName = "text-surface-secondary",
  className = "",
  children,
}: ProgressRingProps) => {
  const gradientId = useId();
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={trackClassName}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientFrom} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>
        </defs>
      </svg>

      {children != null && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
