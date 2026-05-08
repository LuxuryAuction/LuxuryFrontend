"use client";

import { useEffect, useState, useRef } from "react";
import { useDebounceValue } from "@/src/hooks/useDebounce";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { CalendarIcon, ClosedEyeIcon, EmailIcon, EyeIcon, HryvniaIcon, SearchIcon } from "@/public/assets/icons";

const DAYS_OF_WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

type InputSize = "xs" | "sm" | "md" | "lg";
type InputVariant = "primary" | "secondary" | "ghost";
type InputType = "text" | "password" | "search" | "email" | "date" | "textarea" | "currency";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "type"
> & {
  label?: string;
  error?: string;
  className?: string;

  inputSize?: InputSize;
  variant?: InputVariant;
  type?: InputType;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;

  onSearch?: (value?: string) => void;
  onDebounceChange?: (value: string) => void;
  debounceDelay?: number;
  loading?: boolean;
  isEditing?: boolean;
  rows?: number;
};

const sizeClasses: Record<InputSize, string> = {
  xs: "h-9 px-3 text-xs",
  sm: "h-10 px-3 text-sm",
  md: "h-12 px-4 text-sm",
  lg: "h-14 px-5 text-base",
};

const variantClasses: Record<InputVariant, string> = {
  primary: "border border-border-primary bg-surface-secondary",
  secondary: "border border-transparent bg-surface-primary",
  ghost: "border border-border-secondary bg-transparent",
};

type BaseInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  inputSize?: InputSize;
  variant?: InputVariant;
  error?: string;
  onChange?: (value: string) => void;
};

function BaseInput({
  inputSize = "md",
  variant = "primary",
  error,
  className = "",
  onChange,
  ...props
}: BaseInputProps) {
  return (
    <input
      {...props}
      onChange={(e) => onChange?.(e.target.value)}
      className={`
        ${sizeClasses[inputSize]}
        w-full rounded-lg
        ${variantClasses[variant]}
        text-content-primary placeholder:text-content-tertiary
        outline-none transition-colors focus:border-brand-primary
        ${error ? "border-state-danger" : ""}
        ${className}
      `}
    />
  );
}


function PasswordField({
  inputSize,
  variant,
  error,
  className = "",
  onChange,
  ...props
}: Omit<BaseInputProps, "type">) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <BaseInput
        {...props}
        type={show ? "text" : "password"}
        inputSize={inputSize}
        variant={variant}
        error={error}
        onChange={onChange}
        className={`pr-14 ${className}`}
      />

      <button
        type="button"
        onClick={() => setShow((p) => !p)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-primary"
      >
        {show ? (
          <ClosedEyeIcon />
        ) : (
          <EyeIcon />
        )}
      </button>
    </div>
  );
}


function SearchField({
  value,
  onChange,
  onSearch,
  onDebounceChange,
  debounceDelay = 500,
  loading,
  inputSize,
  variant,
  placeholder,
  className = "",
  error,
  isEditing,
  ...props
}: BaseInputProps & {
  onSearch?: (value?: string) => void;
  onDebounceChange?: (value: string) => void;
  debounceDelay?: number;
  loading?: boolean;
  isEditing?: boolean;
}) {
  const [internal, setInternal] = useState<string>((value || props.defaultValue || "") as string);
  const debounced = useDebounceValue(internal, debounceDelay);

  const hasValue = internal.length > 0;

  useEffect(() => {
    if (isEditing !== false) {
      onSearch?.(debounced);
      onDebounceChange?.(debounced);
    }
  }, [debounced]);

  const trigger = () => onSearch?.(internal);

  const clear = () => {
    setInternal("");
    onChange?.("");
    onSearch?.("");
  };

  return (
    <div className="relative w-full flex">
      <BaseInput
        {...props}
        value={internal}
        inputSize={inputSize}
        variant={variant}
        error={error}
        placeholder={placeholder ?? "Search..."}
        onChange={(v) => {
          setInternal(v);
          onChange?.(v);
        }}
        onKeyDown={(e) => e.key === "Enter" && trigger()}
        className={`pr-24 ${className}`}
      />

      {hasValue && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-10 top-1/2 -translate-y-1/2 text-xs text-gray-400"
        >
          ✕
        </button>
      )}

      <button
        type="button"
        onClick={trigger}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-primary"
      >
        {loading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
        ) : (
          <SearchIcon />
        )}
      </button>
    </div>
  );
}

function EmailField({
  value,
  onChange,
  inputSize,
  variant,
  error,
  className = "",
  placeholder,
  ...props
}: BaseInputProps) {
  return (
    <div className="relative w-full">
      <BaseInput
        {...props}
        type="email"
        value={value}
        inputSize={inputSize}
        variant={variant}
        error={error}
        onChange={onChange}
        placeholder={placeholder ?? "Email"}
        className={`pr-10 ${className}`}
      />
      {/* icon */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-content-tertiary">
        <EmailIcon />
      </div>
    </div>
  );
}

function DateField({
  value,
  onChange,
  inputSize,
  variant,
  error,
  className = "",
  type,
  ...props
}: BaseInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const initialDate = value && typeof value === "string" ? new Date(value) : new Date();
  // Ensure invalid dates don't break the component
  const validInitialDate = isNaN(initialDate.getTime()) ? new Date() : initialDate;
  const [currentMonth, setCurrentMonth] = useState(validInitialDate);
  
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleSelectDate = (day: number) => {
    const selected = new Date(year, month, day);
    const formatted = formatDate(selected);
    onChange?.(formatted);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div onClick={() => setIsOpen(true)} className="relative w-full">
        <BaseInput
          {...props}
          type="text"
          readOnly
          value={value || ""}
          inputSize={inputSize}
          variant={variant}
          error={error}
          className={`pr-10 cursor-pointer ${className}`}
          placeholder={props.placeholder || "YYYY-MM-DD"}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-content-tertiary">
          <CalendarIcon />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-surface-secondary border border-border-primary rounded-xl shadow-lg w-[280px] animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 hover:bg-surface-primary rounded-lg text-content-secondary transition-colors cursor-pointer"
            >
              &lt;
            </button>
            <div className="font-medium text-sm text-content-primary capitalize">
              {currentMonth.toLocaleString("en-US", { month: "long", year: "numeric" })}
            </div>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 hover:bg-surface-primary rounded-lg text-content-secondary transition-colors cursor-pointer"
            >
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-content-tertiary py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="p-1" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = value === formatDate(new Date(year, month, day));
              const isToday = formatDate(new Date()) === formatDate(new Date(year, month, day));
              
              return (
                <button
                  key={day}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectDate(day);
                  }}
                  className={`
                    h-8 w-8 rounded-full flex items-center justify-center text-sm transition-all cursor-pointer
                    ${isSelected 
                      ? "bg-brand-primary text-black font-medium" 
                      : isToday
                        ? "bg-surface-primary text-brand-primary font-medium border border-brand-primary/20"
                        : "text-content-primary hover:bg-surface-primary hover:text-brand-primary"
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function CurrencyField({
  value,
  onChange,
  inputSize,
  variant,
  error,
  className = "",
  ...props
}: BaseInputProps) {
  return (
    <div className="relative w-full">
      <BaseInput
        {...props}
        type="number"
        step="0.01"
        min="0.01"
        value={value}
        inputSize={inputSize}
        variant={variant}
        error={error}
        onChange={onChange}
        className={`pr-10 ${className}`}
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "e") e.preventDefault();
        }}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-primary">
        <HryvniaIcon />
      </div>
    </div>
  );
}

export function Input({
  label,
  error,
  className = "",
  type = "text",
  inputSize = "md",
  variant = "primary",
  required = false,
  id,
  onDebounceChange,
  debounceDelay,
  ...props
}: InputProps) {
  const inputId = id ?? props.name ?? undefined;

  const renderField = () => {
    switch (type) {
      case "password":
        return (
          <PasswordField
            {...props}
            inputSize={inputSize}
            variant={variant}
            error={error}
          />
        );

      case "search":
        return (
          <SearchField
            {...props}
            inputSize={inputSize}
            variant={variant}
            error={error}
            onDebounceChange={onDebounceChange}
            debounceDelay={debounceDelay}
          />
        );

      case "email":
        return (
          <EmailField
            {...props}
            inputSize={inputSize}
            variant={variant}
            error={error}
          />
        );

      case "date":
        return (
          <DateField
            {...props}
            type={type}
            inputSize={inputSize}
            variant={variant}
            error={error}
          />
        );

      case "textarea":
        return (
          <textarea
            {...(props as any)}
            id={inputId}
            rows={props.rows ?? 3}
            value={props.value}
            onChange={(e) => props.onChange?.(e.target.value)}
            className={`w-full rounded-lg border bg-surface-secondary text-content-primary placeholder:text-content-tertiary text-sm px-4 py-3 outline-none resize-none transition-colors focus:border-brand-primary leading-relaxed
            ${error ? "border-state-danger" : "border-border-primary"}`}
          />
        );

      case "currency":
        return (
          <CurrencyField
            {...props}
            inputSize={inputSize}
            variant={variant}
            error={error}
          />
        );

      default:
        return (
          <BaseInput
            {...props}
            inputSize={inputSize}
            variant={variant}
            error={error}
            type="text"
          />
        );
    }
  };

  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="font-mono text-[0.62rem] uppercase tracking-widest text-content-tertiary flex items-start gap-1"
        >
          <span>{label}</span>
          {required && (
            <span className="text-state-danger relative -top-[2px]">*</span>
          )}
        </label>
      )}

      {renderField()}

      {error && <p className="text-xs text-state-danger">{error}</p>}
    </div>
  );
}

export default Input;