type BrandLogoProps = {
  showText?: boolean;
  variant?: "app" | "admin";
  size?: "sm" | "md";
  className?: string;
};

const markSizeClasses = {
  sm: "h-8 w-8 rounded-lg",
  md: "h-[34px] w-[34px] rounded-[10px]",
} as const;

const textSizeClasses = {
  sm: "text-sm",
  md: "text-[15px]",
} as const;

export const BrandLogo = ({
  showText = true,
  variant = "app",
  size = "md",
  className = "",
}: BrandLogoProps) => {
  const isAdmin = variant === "admin";
  const markClass = isAdmin
    ? "from-admin-primary to-admin-tertiary text-[#061018] shadow-[0_4px_12px_rgba(34,211,238,0.25)]"
    : "from-[#f0a500] to-[#e07800] text-[#0b0c0f]";
  const accentClass = isAdmin ? "text-admin-primary" : "text-brand-primary";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={[
          "relative flex shrink-0 items-center justify-center overflow-hidden bg-linear-to-br",
          markSizeClasses[size],
          markClass,
        ].join(" ")}
        aria-hidden
      >
        <svg
          className="h-[72%] w-[72%]"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 5 26 24h-5l-2-4.2h-6L11 24H6L16 5z" strokeWidth="2.25" />
          <path d="M13.8 16h4.4" strokeWidth="2.25" />
          <path d="M21.5 7.5 26 12" strokeWidth="2" />
          <path d="M20.3 8.9 24.8 13.4" strokeWidth="2" />
          <path d="M23.8 13.4 20.4 16.8" strokeWidth="2" />
          <path d="M7 26h11" strokeWidth="2" />
        </svg>
        <span className="absolute inset-x-1 top-1 h-px bg-white/35" />
      </span>

      {showText && (
        <span className={`font-bold tracking-tight text-[#e8eaf0] ${textSizeClasses[size]}`}>
          Auctique<span className={accentClass}>Bids</span>
        </span>
      )}
    </span>
  );
};
