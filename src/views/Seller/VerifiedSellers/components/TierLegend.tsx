import { Tier } from "../types";
import { TIER_CONFIG } from "../sellerConfig";

export const TierLegend = () => {
  return (
    <div
      className="flex flex-wrap items-center gap-4 animate-bvCatFadeUp [animation-delay:0.1s]"
    >
      {(Object.entries(TIER_CONFIG) as [Tier, typeof TIER_CONFIG[Tier]][]).map(([tier, cfg]) => (
        <div key={tier} className="flex items-center gap-1.5">
          <span style={{ fontSize: 12 }} className="fill-current">{cfg.icon}</span>
          <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-content-tertiary">
            {cfg.label}
          </span>
        </div>
      ))}
    </div>
  );
};
