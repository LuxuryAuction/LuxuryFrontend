import React from "react";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({
  label,
  title,
  description,
  actions,
  className = "",
}: PageHeaderProps) => {
  return (
    <div className={`mb-4 lg:mb-6 animate-bvCatFadeUp ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-8 flex-shrink-0 bg-gradient-to-r from-brand-primary to-transparent" />
        <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-content-tertiary">
          {label}
        </span>
      </div>

      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <h1
            className="font-extrabold tracking-tight text-content-primary leading-none mb-2 text-[clamp(1.7rem,2.8vw,2.4rem)] tracking-[-0.03em]"
          >
            {title}
          </h1>
          {description && (
            <div className="text-[13px] text-content-secondary max-w-[600px]">
              {description}
            </div>
          )}
        </div>

        {actions && (
          <div className="flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
