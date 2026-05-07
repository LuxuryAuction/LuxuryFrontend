"use client";

import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "default" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
type ButtonTextSize = "xs" | "sm" | "md" | "lg" | "xl" | "inherit";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  textSize?: ButtonTextSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

const baseClasses =
  "inline-flex items-center gap-2 rounded-md border cursor-pointer transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-primary text-black border-brand-primary hover:bg-[#d4920a]",
  secondary: "rounded-lg bg-white/5 border border-white/10 text-content-tertiary hover:text-brand-primary hover:bg-brand-primary/5 hover:border-brand-primary/20 transition-all active:scale-[0.98] shadow-lg shadow-black/20",
  danger:
    "bg-[rgba(239,68,68,0.1)] text-state-danger border-[rgba(239,68,68,0.3)] hover:bg-[rgba(239,68,68,0.2)] text-[#ef4444]",
  ghost: "bg-transparent text-text-tertiary border-border-primary hover:text-text-primary hover:border-border-secondary",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "px-3 py-2 text-xs",
  xl: "px-[1rem] py-[0.7rem] text-xl [&_svg]:size-6",
  lg: "px-[0.95rem] py-[0.6rem] text-lg [&_svg]:size-5 h-12",
  md: "px-[0.85rem] py-[0.5rem] text-md [&_svg]:size-4 h-11",
  sm: "px-[0.75rem] py-[0.4rem] text-sm [&_svg]:size-4 h-10",
  xs: "px-[0.5rem] py-[0.2rem] text-xs [&_svg]:size-3 h-9",
  xxs: "px-[0.35rem] py-[0.15rem] text-xs [&_svg]:size-3 h-6",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "default",
      textSize,
      leftIcon,
      rightIcon,
      isLoading = false,
      loadingText,
      disabled,
      fullWidth = false,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;
    const resolvedContent = isLoading && loadingText ? loadingText : children;

    return (
      <button
        ref={ref}
        type={props.type ?? "button"}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full justify-center" : ""} ${className}`}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon
        )}

        {resolvedContent && (
          <span className={textSize && textSize !== "inherit" ? `text-${textSize}` : ""}>
            {resolvedContent}
          </span>
        )}

        {!isLoading ? rightIcon : null}
      </button >
    );
  },
);

Button.displayName = "Button";

export default Button;
