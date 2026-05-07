"use client";

import { CloseIcon, InfoIcon, TickIcon } from "@/public/assets/icons";
import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { createPortal } from "react-dom";

type ToastVariant = "success" | "error" | "info";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
  position: ToastPosition;
}

interface ToastContextType {
  showToast: (variant: ToastVariant, message: string, position?: ToastPosition, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

export const ToastProvider: React.FC<{
  children: React.ReactNode;
  position?: ToastPosition;
}> = ({ children, position: defaultPosition = "bottom-right" }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((
    variant: ToastVariant,
    message: string,
    position?: ToastPosition,
    duration = 4000
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toastPosition = position || defaultPosition;
    setToasts((prev) => [...prev, { id, message, variant, duration, position: toastPosition }]);
    setTimeout(() => removeToast(id), duration);
  }, [removeToast, defaultPosition]);

  const value = {
    showToast: addToast,
  };

  const toastsByPosition = toasts.reduce((acc, toast) => {
    if (!acc[toast.position]) acc[toast.position] = [];
    acc[toast.position].push(toast);
    return acc;
  }, {} as Record<ToastPosition, Toast[]>);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {Object.entries(toastsByPosition).map(([pos, posToasts]) => (
        <ToastContainer
          key={pos}
          toasts={posToasts}
          removeToast={removeToast}
          position={pos as ToastPosition}
        />
      ))}
    </ToastContext.Provider>
  );
};

const ToastContainer: React.FC<{
  toasts: Toast[];
  removeToast: (id: string) => void;
  position: ToastPosition;
}> = ({ toasts, removeToast, position }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const positionClasses: Record<ToastPosition, string> = {
    "top-right": "top-5 right-5 items-end",
    "top-left": "top-5 left-5 items-start",
    "bottom-right": "bottom-5 right-5 items-end flex-col-reverse",
    "bottom-left": "bottom-5 left-5 items-start flex-col-reverse",
    "top-center": "top-5 left-1/2 -translate-x-1/2 items-center",
    "bottom-center": "bottom-5 left-1/2 -translate-x-1/2 items-center flex-col-reverse",
  };

  return createPortal(
    <div className={`fixed z-[100] flex flex-col gap-3 pointer-events-none ${positionClasses[position]}`}>
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} position={position} />
      ))}
    </div>,
    document.body
  );
};

const ToastItem: React.FC<{
  toast: Toast;
  onRemove: () => void;
  position: ToastPosition;
}> = ({ toast, onRemove, position }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const variantStyles: Record<ToastVariant, string> = {
    success: "border-emerald-500/30 bg-[#0b0c0f]/80 text-emerald-400",
    error: "border-red-500/30 bg-[#0b0c0f]/80 text-red-400",
    info: "border-brand-primary/30 bg-[#0b0c0f]/80 text-brand-primary",
  };

  const getAnimationClasses = () => {
    if (position.includes("right")) return isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0";
    if (position.includes("left")) return isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0";
    if (position.includes("top")) return isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0";
    return isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0";
  };

  const icons: Record<ToastVariant, React.ReactNode> = {
    success: <TickIcon className="w-5 h-5" />,
    error: <CloseIcon className="w-5 h-5" />,
    info: <InfoIcon className="w-5 h-5" />,
  };

  return (
    <div
      onClick={onRemove}
      className={`
        pointer-events-auto cursor-pointer
        min-w-[320px] max-w-md px-4 py-3.5 rounded-xl border backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]
        flex items-center gap-3 transition-all duration-500 ease-out
        ${variantStyles[toast.variant]}
        ${getAnimationClasses()}
      `}
    >
      <div className="shrink-0 p-2 rounded-lg bg-white/5">{icons[toast.variant]}</div>
      <div className="flex-1 text-sm font-medium text-[#e8eaf0] tracking-wide leading-relaxed">
        {toast.message}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="text-content-tertiary hover:text-white transition-colors p-1"
      >
        <CloseIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ToastProvider;
