import { ReactNode } from "react";

export type PageHeaderVariant = "default" | "admin";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
  variant?: PageHeaderVariant;
}

const VARIANT_STYLES: Record<
  PageHeaderVariant,
  { rail: string; label: string; title: string; description: string }
> = {
  default: {
    rail: "h-px w-8 shrink-0 bg-linear-to-r from-brand-primary to-transparent",
    label: "font-mono text-[9px] tracking-[0.22em] uppercase text-content-tertiary",
    title:
      "mb-2 font-extrabold leading-none tracking-[-0.03em] text-content-primary text-[clamp(1.7rem,2.8vw,2.4rem)]",
    description: "max-w-[600px] text-[13px] text-content-secondary",
  },
  admin: {
    rail: "h-px w-8 shrink-0 bg-linear-to-r from-admin-accent/80 to-transparent",
    label: "font-mono text-[9px] tracking-[0.22em] uppercase text-admin-accent/55",
    title:
      "mb-2 font-extrabold leading-none tracking-[-0.03em] text-white/90 text-[clamp(1.7rem,2.8vw,2.4rem)]",
    description: "max-w-[600px] text-[13px] text-white/55",
  },
};

export const PageHeader = ({
  label,
  title,
  description,
  actions,
  className = "",
  variant = "default",
}: PageHeaderProps) => {
  const v = VARIANT_STYLES[variant];

  return (
    <div className={`mb-4 lg:mb-6 animate-bvCatFadeUp ${className}`}>
      <div className="mb-3 flex items-center gap-3">
        <div className={v.rail} />
        <span className={v.label}>
          {label}
        </span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className={v.title}>
            {title}
          </h1>
          {description && (
            <div className={v.description}>
              {description}
            </div>
          )}
        </div>

        {actions && (
          <div className="shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
