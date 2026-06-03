"use client";

import { SendIcon } from "@/public/assets/icons";
import { useCallback, useEffect, useRef } from "react";

const MAX_TEXTAREA_HEIGHT_PX = 144;

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  isSending?: boolean;
  className?: string;
  /** Set to `null` to hide the keyboard hint line. */
  hint?: string | null;
}

export function ChatComposer({
  value,
  onChange,
  onSend,
  placeholder = "Write a message…",
  disabled = false,
  isSending = false,
  className = "",
  hint = "Enter to send · Shift+Enter for new line",
}: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = useCallback(() => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, MAX_TEXTAREA_HEIGHT_PX)}px`;
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [value, resizeTextarea]);

  const canSend = value.trim().length > 0 && !disabled && !isSending;

  return (
    <form
      className={`shrink-0 p-3 border-t border-border-primary/30 ${className}`.trim()}
      onSubmit={(event) => {
        event.preventDefault();
        if (canSend) onSend();
      }}
    >
      <div className="flex items-end gap-2 min-h-[52px] p-1.5 pl-3 rounded-xl bg-surface-tertiary/50 border border-border-primary focus-within:border-brand-primary/50 focus-within:bg-surface-primary transition-[border-color,background-color]">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              if (canSend) onSend();
            }
          }}
          placeholder={placeholder}
          disabled={disabled || isSending}
          aria-label={placeholder}
          className="flex-1 min-w-0 min-h-[36px] max-h-36 py-2 bg-transparent border-none outline-none resize-none overflow-y-auto text-content-primary text-[13px] leading-relaxed placeholder:text-content-tertiary/70"
        />
        <button
          type="submit"
          className="w-9 h-9 mb-0.5 shrink-0 flex items-center justify-center rounded-lg bg-brand-primary text-black hover:bg-brand-primary/90 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
          disabled={!canSend}
          aria-label="Send message"
        >
          <SendIcon className="w-4 h-4 -translate-x-px translate-y-px" />
        </button>
      </div>
      {hint !== null && (
        <p className="mt-1.5 px-1 text-[10px] text-content-tertiary/80">{hint}</p>
      )}
    </form>
  );
}
