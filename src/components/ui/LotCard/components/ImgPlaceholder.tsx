"use client";

import { useState } from "react";

export const ImgPlaceholder = () => {
  const [hue] = useState(() => Math.floor(Math.random() * 360));

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, hsl(${hue},18%,10%), hsl(${hue},14%,7%))`,
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, hsl(${hue},50%,50%) 0%, transparent 70%)`,
        }}
      />
      <svg
        viewBox="0 0 80 80"
        fill="none"
        className="w-14 h-14 opacity-[0.18] relative z-10"
      >
        <circle
          cx="40"
          cy="40"
          r="28"
          stroke={`hsl(${hue},50%,55%)`}
          strokeWidth="1"
        />
        <polygon
          points="40,16 52,32 68,32 57,46 62,62 40,52 18,62 23,46 12,32 28,32"
          stroke={`hsl(${hue},50%,55%)`}
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r="6"
          fill={`hsl(${hue},50%,55%)`}
          opacity="0.4"
        />
      </svg>
    </div>
  );
};
