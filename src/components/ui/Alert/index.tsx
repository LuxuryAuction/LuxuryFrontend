import { WarningIcon } from "@/public/assets/icons";
import React from "react";

type AlertVariant = "info" | "error" | "success" | "warning" | "strict";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

type VariantTheme = {
  root: string;
  iconShell: string;
  title: string;
  body: string;
  icon: React.ReactNode;
};

const variantTheme: Record<AlertVariant, VariantTheme> = {
  strict: {
    root: "border-red-500/20 bg-red-950/20",
    iconShell: "border-red-500/30 bg-red-500/15 text-red-400",
    title: "text-red-400/80",
    body: "text-red-200/45 [&_span]:text-red-400/90 [&_span]:font-semibold",
    icon: <WarningIcon className="w-4 h-4" />,
  },
  error: {
    root: "border-[#ff4d6a]/25 bg-[#ff4d6a]/10",
    iconShell: "border-[#ff4d6a]/35 bg-[#ff4d6a]/15 text-[#ff4d6a]",
    title: "text-[#ff4d6a]/90",
    body: "text-red-200/50 [&_span]:text-[#ff4d6a] [&_span]:font-semibold",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  info: {
    root: "border-blue-500/25 bg-blue-950/25",
    iconShell: "border-blue-500/35 bg-blue-500/15 text-blue-400",
    title: "text-blue-400/85",
    body: "text-blue-200/50 [&_span]:text-blue-400/90 [&_span]:font-semibold",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
  success: {
    root: "border-emerald-500/25 bg-emerald-950/25",
    iconShell: "border-emerald-500/35 bg-emerald-500/15 text-emerald-400",
    title: "text-emerald-400/85",
    body: "text-emerald-200/50 [&_span]:text-emerald-400/90 [&_span]:font-semibold",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  warning: {
    root: "border-[#f0a500]/25 bg-[#f0a500]/10",
    iconShell: "border-[#f0a500]/35 bg-[#f0a500]/15 text-[#f0a500]",
    title: "text-[#f0a500]/90",
    body: "text-amber-200/50 [&_span]:text-[#f0a500] [&_span]:font-semibold",
    icon: <WarningIcon className="w-4 h-4" />,
  },
};

export const Alert = ({
  variant = "info",
  title,
  children,
  className = "",
}: AlertProps) => {
  const t = variantTheme[variant];

  return (
    <div
      role="alert"
      className={`flex gap-4 items-start rounded-2xl border px-5 py-4 animate-bvCatFadeUp ${t.root} ${className}`}
    >
      <div className={`mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-xl border ${t.iconShell}`}>
        {t.icon}
      </div>
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        {title ? (
          <p className={`font-mono text-[10px] tracking-[0.14em] uppercase font-semibold m-0 ${t.title}`}>
            {title}
          </p>
        ) : null}
        <div className={`text-[12px] leading-relaxed ${t.body}`}>
          {children}
        </div>
      </div>
    </div>
  );
};
