"use client";

import { GridIcon, ListIcon } from "@/public/assets/icons";

export type ViewVariant = "grid" | "list";

interface ViewSwitcherProps {
  variant: ViewVariant;
  onChange: (variant: ViewVariant) => void;
  className?: string;
  gridAriaLabel?: string;
  listAriaLabel?: string;
}

export const ViewSwitcher = ({
  variant,
  onChange,
  className = "",
  gridAriaLabel = "Grid view",
  listAriaLabel = "List view",
}: ViewSwitcherProps) => {
  return (
    <div className={`flex items-center w-fit gap-2 bg-surface-secondary p-1 rounded-xl border border-border-primary ${className}`}>
      <button
        onClick={() => onChange("grid")}
        className={`p-2 rounded-lg transition-all cursor-pointer ${variant === "grid"
          ? "bg-surface-primary text-brand-primary shadow-sm"
          : "text-content-tertiary hover:text-content-primary"
          }`}
        aria-label={gridAriaLabel}
      >
        <GridIcon />
      </button>
      <button
        onClick={() => onChange("list")}
        className={`p-2 rounded-lg transition-all cursor-pointer ${variant === "list"
          ? "bg-surface-primary text-brand-primary shadow-sm"
          : "text-content-tertiary hover:text-content-primary"
          }`}
        aria-label={listAriaLabel}
      >
        <ListIcon />
      </button>
    </div>
  );
};
