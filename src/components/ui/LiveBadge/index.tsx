type LiveBadgeVariant = "sm" | "md" | "lg";
type LiveBadgeTone = "overlay" | "inline";

interface LiveBadgeProps {
  variant?: LiveBadgeVariant;
  tone?: LiveBadgeTone;
  label?: string;
  className?: string;
}

const VARIANT_STYLES: Record<
  LiveBadgeVariant,
  { wrapper: string; dot: string; text: string }
> = {
  sm: {
    wrapper: "gap-1.5 px-2 py-1",
    dot: "w-1.5 h-1.5",
    text: "text-[8px] tracking-widest",
  },
  md: {
    wrapper: "gap-1.5 px-2 py-1",
    dot: "w-1.5 h-1.5",
    text: "text-[9px] tracking-widest",
  },
  lg: {
    wrapper: "gap-2 px-0 py-0",
    dot: "w-2 h-2",
    text: "text-[10px] tracking-widest",
  },
};

const TONE_STYLES: Record<LiveBadgeTone, string> = {
  overlay:
    "rounded-md bg-black/60 backdrop-blur-sm border border-white/10",
  inline: "",
};

export const LiveBadge = ({
  variant = "md",
  tone = "overlay",
  label = "Live",
  className = "",
}: LiveBadgeProps) => {
  const v = VARIANT_STYLES[variant];

  return (
    <span
      className={`
        inline-flex items-center shrink-0
        ${v.wrapper}
        ${TONE_STYLES[tone]}
        ${className}
      `}
    >
      <span className={`relative flex shrink-0 ${v.dot}`}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
        <span className="relative inline-flex rounded-full h-full w-full bg-[#22c55e]" />
      </span>
      <span
        className={`font-mono font-bold text-[#22c55e] uppercase whitespace-nowrap ${v.text}`}
      >
        {label}
      </span>
    </span>
  );
};

export default LiveBadge;
