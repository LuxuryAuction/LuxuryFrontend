import React from "react";

type AlertVariant = "info" | "error" | "success" | "warning";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<AlertVariant, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
  info: {
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
    text: "text-blue-400",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
  error: {
    bg: "bg-[#ff4d6a]/5",
    border: "border-[#ff4d6a]/20",
    text: "text-[#ff4d6a]",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  success: {
    bg: "bg-[#22c55e]/5",
    border: "border-[#22c55e]/20",
    text: "text-[#22c55e]",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  warning: {
    bg: "bg-[#f0a500]/5",
    border: "border-[#f0a500]/20",
    text: "text-[#f0a500]",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
};

export const Alert = ({
  variant = "info",
  title,
  children,
  className = "",
}: AlertProps) => {
  const style = variantStyles[variant];

  return (
    <div
      className={`flex gap-3 p-4 rounded-[10px] border animate-bvCatFadeUp ${style.bg} ${style.border} ${className}`}
    >
      <div className={`flex-shrink-0 mt-0.5 ${style.text}`}>
        {style.icon}
      </div>

      <div className="flex flex-col gap-1">
        {title && (
          <p className={`font-mono text-[10px] tracking-[0.14em] uppercase font-semibold ${style.text}`}>
            {title}
          </p>
        )}
        <div className="text-[12px] leading-relaxed text-content-secondary">
          {children}
        </div>
      </div>
    </div>
  );
};
