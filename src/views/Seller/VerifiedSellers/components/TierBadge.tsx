import { Tier } from "../types";
import { TIER_CONFIG } from "../sellerConfig";

export const TierBadge = ({ tier }: { tier: Tier }) => {
  const cfg = TIER_CONFIG[tier];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-[3px] rounded-full font-mono text-[9px] tracking-[0.1em] uppercase font-medium"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.color,
      }}
    >
      <span className="w-3 h-3">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
};
