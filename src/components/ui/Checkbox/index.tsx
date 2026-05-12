"use client";

import React from "react";
import { TickIcon } from "@/public/assets/icons";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string | React.ReactNode;
  error?: string;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  label,
  error,
  onChange,
  className = "",
  id,
  checked,
  ...props
}: CheckboxProps) => {
  const checkboxId = id ?? (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`flex flex-col gap-1 items-center ${className}`}>
      <label
        htmlFor={checkboxId}
        className="group flex items-start gap-3 cursor-pointer select-none"
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            {...props}
            type="checkbox"
            id={checkboxId}
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            className="peer appearance-none w-5 h-5 rounded-md border-2 border-border-primary bg-surface-secondary checked:bg-brand-primary checked:border-brand-primary transition-all duration-200 cursor-pointer hover:border-[#F0A50060]"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none text-black">
            <TickIcon className="w-3.5 h-3.5 stroke-3" />
          </div>
        </div>

        {label && (
          <span className="text-sm text-content-secondary group-hover:text-content-primary transition-colors leading-tight pt-0.5">
            {label}
          </span>
        )}
      </label>

      {error && <p className="text-xs text-state-danger ml-8">{error}</p>}
    </div>
  );
};
