"use client";

import { useState, useRef, useEffect } from "react";

export type SelectOption = {
  label: string;
  value: string;
  icon?: React.ReactNode | React.ElementType;
};

type SelectSize = "xs" | "sm" | "md" | "lg";
type SelectVariant = "primary" | "secondary" | "ghost";

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  selectSize?: SelectSize;
  variant?: SelectVariant;
  required?: boolean;
  renderTrigger?: (isOpen: boolean, selectedOption?: SelectOption) => React.ReactNode;
  align?: "left" | "right";
}

const sizeClasses: Record<SelectSize, string> = {
  xs: "h-9 px-3 text-xs",
  sm: "h-10 px-3 text-sm",
  md: "h-12 px-4 text-sm",
  lg: "h-14 px-5 text-base",
};

const variantClasses: Record<SelectVariant, string> = {
  primary: "border border-border-primary bg-surface-secondary",
  secondary: "border border-transparent bg-surface-primary",
  ghost: "border border-border-secondary bg-transparent",
};

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  error,
  className = "",
  selectSize = "md",
  variant = "primary",
  required = false,
  renderTrigger,
  align = "left",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`flex w-full flex-col gap-1 ${className}`} ref={selectRef}>
      {label && (
        <label className="font-mono text-[0.62rem] uppercase tracking-widest text-content-tertiary flex items-start gap-1">
          <span>{label}</span>
          {required && (
            <span className="text-state-danger relative -top-[2px]">*</span>
          )}
        </label>
      )}

      <div className="relative">
        {renderTrigger ? (

          <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            {renderTrigger(isOpen, selectedOption)}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`
              ${sizeClasses[selectSize]}
              w-full rounded-lg flex items-center justify-between cursor-pointer
              ${variantClasses[variant]}
              ${selectedOption ? "text-content-primary" : "text-content-tertiary"}
              outline-none transition-all duration-300 focus:border-brand-primary
              ${error ? "border-state-danger" : ""}
              ${isOpen ? "border-brand-primary ring-1 ring-brand-primary" : ""}
            `}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        <div
          className={`
            absolute z-50 min-w-[14rem] mt-2 bg-[#1c1f27]/95 backdrop-blur-md border border-[#2a2e3a] rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 ease-out origin-top
            ${align === "right" ? "right-0" : "left-0"}
            ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
          `}
        >
          {options.length === 0 ? (
            <div className="p-3 text-sm text-content-tertiary text-center">
              No options available
            </div>
          ) : (
            <ul className="py-1.5">
              {options.map((option) => {
                const Icon = option.icon;
                return (
                  <li
                    key={option.value}
                    onClick={() => {
                      onChange?.(option.value);
                      setIsOpen(false);
                    }}
                    className={`
                      group relative px-4 py-2.5 text-sm cursor-pointer transition-all duration-200 flex items-center gap-3
                      ${value === option.value 
                        ? "bg-[#F0A50014] text-brand-primary" 
                        : "text-[#e8eaf0] hover:bg-[#F0A50014] hover:text-brand-primary hover:pl-5"}
                    `}
                  >
                    <span 
                      className={`
                        absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-brand-primary transition-all duration-200
                        ${value === option.value ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                      `} 
                    />
                    {Icon && (
                      <span className="shrink-0 text-current opacity-70 w-4 h-4 flex items-center justify-center">
                        {typeof Icon === "function" ? (
                          <Icon className="w-4 h-4" />
                        ) : (
                          Icon as React.ReactNode
                        )}
                      </span>
                    )}
                    <span className="font-medium">{option.label}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {error && <p className="text-xs text-state-danger">{error}</p>}
    </div>
  );
}

export default Select;
