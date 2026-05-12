import { ACTIVITY, OVERVIEW_STATS, TRUST_SAFETY_CONFIG } from "./profile.config";

function StatCard({
  label,
  value,
  delta,
  accent,
}: {
  label: string;
  value: string;
  delta: string;
  accent: "gold" | "green" | "blue";
}) {
  const topBar = { gold: "bg-[#f0a500]", green: "bg-[#22c55e]", blue: "bg-[#3b82f6]" }[accent];
  const deltaColor = { gold: "text-[#f0a500]", green: "text-[#22c55e]", blue: "text-[#3b82f6]" }[accent];
  return (
    <div className="relative bg-auth-app border border-border-primary rounded-lg px-5 py-4 overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${topBar}`} />
      <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-content-tertiary mb-2">{label}</div>
      <div className="text-[2rem] font-bold text-content-light leading-none font-serif">{value}</div>
      <div className={`font-mono text-[0.6rem] mt-2.5 ${deltaColor}`}>{delta}</div>
    </div>
  );
}

function ProgressBar({ label, value, displayVal, color }: { label: string; value: number; displayVal: string; color: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-[0.75rem] mb-[0.4rem]">
        <span className="text-content-tertiary">{label}</span>
        <span className="font-semibold text-content-light">{displayVal}</span>
      </div>
      <div className="bg-surface-secondary rounded-full h-[6px] overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export const OverviewTab = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {OVERVIEW_STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-auth-app border border-border-primary rounded-lg p-5">
          <div className="text-[0.78rem] font-semibold text-content-light mb-4">Recent Activity</div>
          {ACTIVITY.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-[0.6rem] border-b border-border-primary last:border-0 text-[0.75rem]"
            >
              <span className="text-content-light">
                {item.icon} {item.label}
              </span>
              <span className="font-mono text-[0.62rem] text-content-tertiary whitespace-nowrap ml-4">{item.time}</span>
            </div>
          ))}
        </div>

        <div className="bg-auth-app border border-border-primary rounded-lg p-5">
          <div className="text-[0.78rem] font-semibold text-content-light mb-4">Trust &amp; Safety</div>

          <ProgressBar
            label="Trust Score"
            value={TRUST_SAFETY_CONFIG.trustScore.value}
            displayVal={TRUST_SAFETY_CONFIG.trustScore.display}
            color={TRUST_SAFETY_CONFIG.trustScore.color}
          />
          <ProgressBar
            label="Unpaid Lots"
            value={(TRUST_SAFETY_CONFIG.unpaidLots.value / TRUST_SAFETY_CONFIG.unpaidLots.max) * 100}
            displayVal={TRUST_SAFETY_CONFIG.unpaidLots.display}
            color={TRUST_SAFETY_CONFIG.unpaidLots.color}
          />

          <div className="font-mono text-[0.58rem] text-content-tertiary mb-4 -mt-2">
            {TRUST_SAFETY_CONFIG.unpaidLots.max} unpaid lots triggers temporary ban
          </div>

          <div className="flex gap-2 flex-wrap">
            {TRUST_SAFETY_CONFIG.badges.map((label) => (
              <span
                key={label}
                className="inline-flex items-center px-[0.6rem] py-[0.25rem] rounded-full font-mono text-[0.6rem] tracking-widest uppercase bg-[rgba(34,197,94,0.12)] text-[#22c55e]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
