"use client";

import { Avatar } from "@/src/components/common/Avatar";
import { Link } from "@/src/i18n/navigation";
import { getTimeAgo } from "@/src/utils/textUtils";
import { ChevronLeftIcon, SendIcon } from "@/public/assets/icons";
import { useState } from "react";
import { IChatMessage } from "../../Auction/LotDetails/types";

interface ChatThreadPanelProps {
  title: string;
  subtitle?: string;
  peerUserName: string;
  peerAvatar?: string;
  messages: IChatMessage[];
  onSend: (text: string) => void;
  onBack?: () => void;
  showBack?: boolean;
}

export const ChatThreadPanel = ({
  title,
  subtitle,
  peerUserName,
  peerAvatar,
  messages,
  onSend,
  onBack,
  showBack,
}: ChatThreadPanelProps) => {
  const [draft, setDraft] = useState("");


  const send = () => {
    const t = draft.trim();
    if (!t) return;
    onSend(t);
    setDraft("");
  };

  return (
    <div className="flex flex-col h-full min-h-[420px] max-h-[min(72vh,720px)] rounded-2xl bg-surface-secondary/50 border border-border-primary overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-brand-primary/40 to-transparent" />

      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-primary/30 shrink-0 z-10">
        {showBack && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="lg:hidden shrink-0 w-9 h-9 rounded-xl border border-border-primary flex items-center justify-center text-content-secondary hover:bg-surface-tertiary transition-colors"
            aria-label="Back to conversations"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        )}
        <Avatar name={peerUserName} src={peerAvatar} size="sm" className="shrink-0" />
        <div className="min-w-0 flex-1">
          <h2 className="text-[14px] font-bold text-content-primary truncate">{title}</h2>
          {subtitle && <p className="text-[11px] text-content-tertiary truncate">{subtitle}</p>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-2 opacity-80">
            <p className="text-[14px] font-semibold text-content-primary">No messages yet</p>
            <p className="text-[12px] text-content-tertiary max-w-xs">Write the first message in this thread.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.userName === "You";

            return (
              <div key={msg.id} className={`flex gap-3 w-full ${isMe ? "flex-row-reverse" : ""}`}>
                <Avatar name={msg.userName} src={msg.userAvatar} size="sm" className="mt-0.5" />
                <div className={`flex flex-col gap-1 min-w-0 max-w-[88%] ${isMe ? "items-end" : "items-start"}`}>
                  <div className={`flex items-baseline gap-2 flex-wrap ${isMe ? "flex-row-reverse" : ""}`}>
                    <div className={`flex items-center gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                      {!isMe ? (
                        <Link
                          href={`/user/profile/${encodeURIComponent(msg.userName)}`}
                          className="text-[13px] font-bold text-content-primary hover:text-brand-primary transition-colors"
                        >
                          {msg.userName}
                        </Link>
                      ) : (
                        <span className="text-[13px] font-bold text-content-primary">
                          {msg.userName}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-content-tertiary font-mono" suppressHydrationWarning>
                      {getTimeAgo(msg.timestamp)}
                    </span>
                  </div>
                  <div
                    className={`p-3.5 mt-0.5 rounded-2xl text-[13px] leading-relaxed wrap-break-words shadow-sm
                    ${isMe
                        ? "rounded-tr-sm bg-surface-tertiary border border-border-primary text-content-primary"
                        : "rounded-tl-sm bg-surface-primary/40 border border-border-primary/50 text-content-secondary"}`}
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="shrink-0 p-3 border-t border-border-primary/30">
        <div className="flex items-center gap-2 p-1.5 pl-3 rounded-xl bg-surface-tertiary/50 border border-border-primary focus-within:border-brand-primary/50 focus-within:bg-surface-primary transition-all">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Write a message…"
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-content-primary text-[13px] placeholder:text-content-tertiary/70"
          />
          <button
            type="button"
            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-brand-primary text-black hover:bg-brand-primary/90 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
            disabled={!draft.trim()}
            onClick={send}
          >
            <SendIcon className="w-4 h-4 -translate-x-px translate-y-px" />
          </button>
        </div>
      </div>
    </div>
  );
};
