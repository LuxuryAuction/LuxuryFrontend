type LotNumberVariant = "sm" | "md" | "lg" | "header";
type LotNumberTone = "solid" | "overlay";

interface LotNumberProps {
  lotNumber: string;
  variant?: LotNumberVariant;
  tone?: LotNumberTone;
  className?: string;
}

const VARIANT_STYLES: Record<LotNumberVariant, string> = {
  sm: "px-1.5 py-0.5 text-[8px] rounded-sm tracking-[0.14em]",
  md: "px-2 py-1 text-[9px] rounded-sm tracking-[0.16em]",
  lg: "px-2.5 py-1 text-[10px] rounded-lg tracking-[0.18em]",
  header: "px-2.5 py-1 text-[10px] rounded-md tracking-[0.2em]",
};

const TONE_STYLES: Record<LotNumberTone, string> = {
  solid: "bg-brand-primary/12 border-brand-primary/30 text-brand-primary",
  overlay: "bg-black/55 backdrop-blur-md border-brand-primary/35 text-brand-primary",
};

function formatLotNumber(value: string) {
  const trimmed = value.trim();
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

export const LotNumber = ({
  lotNumber,
  variant = "md",
  tone = "solid",
  className = "",
}: LotNumberProps) => {
  return (
    <span
      className={`
        inline-flex items-center font-mono font-bold uppercase whitespace-nowrap
        border shadow-[0_0_12px_rgba(240,165,0,0.12)]
        ${VARIANT_STYLES[variant]}
        ${TONE_STYLES[tone]}
        ${className}
      `}
    >
      {formatLotNumber(lotNumber)}
    </span>
  );
};

export default LotNumber;
