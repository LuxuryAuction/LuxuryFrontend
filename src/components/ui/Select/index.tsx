"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BV_IGNORE_OUTSIDE_CLICK_ATTR } from "@/src/hooks/useClickOutside";

export type SelectOption = {
  label: string;
  value: string;
  icon?: React.ReactNode | React.ElementType;
  disabled?: boolean;
};

type SelectSize = "xs" | "sm" | "md" | "lg";
export type SelectVariant = "primary" | "secondary" | "ghost" | "admin";

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

const MIN_MENU_WIDTH_PX = 224;
const MENU_GAP_PX = 8;
const VIEWPORT_PAD_PX = 8;

function estimateMenuHeight(optionCount: number) {
  if (optionCount === 0) return 52;
  const rowPx = 42;
  const chromePx = 28;
  return Math.min(chromePx + optionCount * rowPx, 220);
}

/** Prefer below anchor; flip above when not enough room below and above is better. */
function pickMenuTop(anchorRect: DOMRect, menuHeight: number, gap: number, pad: number): number {
  const spaceBelow = window.innerHeight - anchorRect.bottom - gap - pad;
  const spaceAbove = anchorRect.top - gap - pad;
  const topBelow = anchorRect.bottom + gap;
  const topAbove = anchorRect.top - menuHeight - gap;

  const fitsBelow = menuHeight <= spaceBelow;
  const fitsAbove = menuHeight <= spaceAbove;

  if (fitsBelow && !fitsAbove) return topBelow;
  if (fitsAbove && !fitsBelow) return Math.max(pad, topAbove);
  if (fitsBelow && fitsAbove) {
    return spaceBelow >= spaceAbove ? topBelow : Math.max(pad, topAbove);
  }
  if (spaceAbove > spaceBelow) {
    return Math.max(pad, Math.min(topAbove, window.innerHeight - menuHeight - pad));
  }
  return Math.min(topBelow, window.innerHeight - menuHeight - pad);
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
  admin: "border border-white/6 bg-white/2 backdrop-blur-xl",
};

function triggerTextClass(variant: SelectVariant, hasSelection: boolean) {
  if (variant === "admin") {
    return hasSelection ? "text-white/90" : "text-white/45";
  }
  return hasSelection ? "text-content-primary" : "text-content-tertiary";
}

function triggerFocusOpenClass(variant: SelectVariant, isOpen: boolean) {
  if (variant === "admin") {
    return `outline-none transition-all duration-300 focus:border-admin-accent ${isOpen ? "border-admin-accent ring-1 ring-admin-accent/30" : ""}`;
  }
  return `outline-none transition-all duration-300 focus:border-brand-primary ${isOpen ? "border-brand-primary ring-1 ring-brand-primary" : ""}`;
}

function dropdownPanelSurfaceClass(variant: SelectVariant) {
  const base =
    "rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-md transition-opacity duration-200";
  if (variant === "admin") {
    return `${base} border border-white/10 bg-admin-panel/95`;
  }
  return `${base} border border-[#2a2e3a] bg-[#1c1f27]/95`;
}

function optionsListClass(variant: SelectVariant) {
  const scroll =
    variant === "admin"
      ? "scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-transparent"
      : "scrollbar-thin scrollbar-thumb-[#2a2e3a] scrollbar-track-transparent";
  return `py-1.5 max-h-[200px] overflow-y-auto ${scroll}`;
}

function optionRowClass(variant: SelectVariant, isSelected: boolean, disabled?: boolean) {
  const base =
    "group relative flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200";
  if (disabled) {
    return `${base} cursor-not-allowed opacity-40 text-content-tertiary`;
  }
  if (variant === "admin") {
    return `${base} cursor-pointer ${isSelected ? "bg-admin-accent/15 text-admin-accent-hi" : "text-white/80 hover:bg-admin-accent/10 hover:pl-5 hover:text-admin-accent-hi"}`;
  }
  return `${base} cursor-pointer ${isSelected ? "bg-[#F0A50014] text-brand-primary" : "text-[#e8eaf0] hover:bg-[#F0A50014] hover:pl-5 hover:text-brand-primary"}`;
}

function optionBarClass(variant: SelectVariant, isSelected: boolean) {
  const bar = variant === "admin" ? "bg-admin-accent" : "bg-brand-primary";
  return `
    absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full transition-all duration-200 ${bar}
    ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
  `;
}

function emptyStateClass(variant: SelectVariant) {
  return variant === "admin" ? "p-3 text-center text-sm text-white/50" : "p-3 text-center text-sm text-content-tertiary";
}

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
  const anchorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<CSSProperties | null>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const applyMenuPosition = useCallback(
    (heightGuess: number) => {
      const el = anchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const width = Math.max(rect.width, MIN_MENU_WIDTH_PX);
      let left = align === "right" ? rect.right - width : rect.left;
      left = Math.min(
        Math.max(left, VIEWPORT_PAD_PX),
        window.innerWidth - width - VIEWPORT_PAD_PX,
      );
      const top = pickMenuTop(rect, heightGuess, MENU_GAP_PX, VIEWPORT_PAD_PX);
      setMenuStyle({
        position: "fixed",
        top,
        left,
        width,
        zIndex: 100,
      });
    },
    [align],
  );

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }
    const el = anchorRef.current;
    if (!el) return;

    applyMenuPosition(estimateMenuHeight(options.length));

    const refine = () => {
      const h = menuRef.current?.getBoundingClientRect().height ?? estimateMenuHeight(options.length);
      applyMenuPosition(h);
    };
    const raf = requestAnimationFrame(refine);

    window.addEventListener("scroll", refine, true);
    window.addEventListener("resize", refine);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", refine, true);
      window.removeEventListener("resize", refine);
    };
  }, [isOpen, align, options.length, value, applyMenuPosition]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (selectRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const menuBody = (
    <>
      {options.length === 0 ? (
        <div className={emptyStateClass(variant)}>
          No options available
        </div>
      ) : (
        <ul className={optionsListClass(variant)}>
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = value === option.value;
            const isDisabled = !!option.disabled;
            return (
              <li
                key={option.value}
                title={isDisabled ? option.label : undefined}
                onClick={() => {
                  if (isDisabled) return;
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                className={optionRowClass(variant, isSelected, isDisabled)}
              >
                <span className={optionBarClass(variant, isSelected)} />
                {Icon && (
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center text-current opacity-70">
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
    </>
  );

  return (
    <div className={`flex w-full flex-col gap-1 ${className}`} ref={selectRef}>
      {label && (
        <label
          className={`flex items-start gap-1 font-mono text-[0.62rem] uppercase tracking-widest ${variant === "admin" ? "text-white/45" : "text-content-tertiary"}`}
        >
          <span>{label}</span>
          {required && (
            <span className="text-state-danger relative -top-[2px]">*</span>
          )}
        </label>
      )}

      <div className="relative" ref={anchorRef}>
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
              ${triggerTextClass(variant, !!selectedOption)}
              ${triggerFocusOpenClass(variant, isOpen)}
              ${error ? "border-state-danger" : ""}
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
      </div>

      {typeof document !== "undefined" && isOpen && menuStyle
        ? createPortal(
            <div
              ref={menuRef}
              {...{ [BV_IGNORE_OUTSIDE_CLICK_ATTR]: "" }}
              className={dropdownPanelSurfaceClass(variant)}
              style={menuStyle}
            >
              {menuBody}
            </div>,
            document.body,
          )
        : null}

      {error && <p className="text-xs text-state-danger">{error}</p>}
    </div>
  );
}

export default Select;
