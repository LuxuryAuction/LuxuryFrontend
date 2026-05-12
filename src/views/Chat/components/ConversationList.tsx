"use client";

import { useMemo } from "react";
import { Avatar } from "@/src/components/common/Avatar";
import { getTimeAgo } from "@/src/utils/textUtils";
import type { IConversation } from "../types";

interface ConversationListProps {
  items: IConversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export const ConversationList = ({ items, activeId, onSelect }: ConversationListProps) => {
  const totalUnread = useMemo(
    () => items.reduce((acc, c) => acc + c.unreadCount, 0),
    [items],
  );

  return (
    <div className="flex flex-col rounded-2xl border border-border-primary bg-surface-secondary/50 overflow-hidden min-h-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] relative">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-brand-primary/50 via-brand-primary/20 to-transparent pointer-events-none" />

      <header className="shrink-0 px-4 pt-4 pb-3 border-b border-border-primary/40 bg-surface-primary/20">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-px w-6 bg-brand-primary/60 shrink-0" aria-hidden />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-content-tertiary">
                Inbox
              </span>
            </div>
            <h2 className="text-[15px] font-bold tracking-tight text-content-primary leading-tight">
              Conversations
            </h2>
            <p className="text-[11px] text-content-tertiary mt-0.5 leading-snug">
              Lot threads and direct messages
            </p>
          </div>
          {totalUnread > 0 ? (
            <span
              className="shrink-0 mt-0.5 inline-flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full border border-brand-primary/35 bg-brand-primary/10 text-brand-primary"
              title="Unread across all threads"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-primary/70 animate-ping" />
              </span>
              <span className="text-[10px] font-mono font-bold tabular-nums">
                Unread {totalUnread > 99 ? "99+" : totalUnread}
              </span>
            </span>
          ) : (
            <span className="shrink-0 mt-0.5 text-[9px] font-mono uppercase tracking-wider text-content-tertiary/80 px-2 py-1 rounded-lg border border-border-primary/50 bg-surface-tertiary/30">
              All caught up
            </span>
          )}
        </div>
      </header>

      <div className="flex-1 min-h-[280px] max-h-[min(59vh,640px)] overflow-y-auto p-2.5 flex flex-col gap-1.5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-dashed border-border-primary/60 bg-surface-primary/20">
            <div className="w-11 h-11 rounded-2xl border border-border-primary bg-surface-tertiary/50 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-content-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className="text-[13px] font-semibold text-content-primary">Nothing here yet</p>
            <p className="text-[11px] text-content-tertiary mt-1 max-w-[200px]">
              New messages will appear in this inbox.
            </p>
          </div>
        ) : (
          items.map((c) => {
            const active = c.id === activeId;
            const hasUnread = c.unreadCount > 0;

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelect(c.id)}
                className={`
                  group w-full text-left rounded-xl border transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary cursor-pointer
                  ${active
                    ? "border-brand-primary/35 bg-linear-to-br from-brand-primary/8 to-transparent shadow-[0_0_0_1px_rgba(240,165,0,0.12),0_12px_40px_-24px_rgba(0,0,0,0.8)]"
                    : "border-transparent bg-surface-primary/25 hover:bg-surface-tertiary/40 hover:border-border-primary/60"
                  }
                `}
              >
                <div className="flex gap-3 p-3">
                  <div className="relative shrink-0">
                    <Avatar
                      name={c.peerUserName}
                      src={c.peerAvatar}
                      size="sm"
                      className={`ring-2 ring-offset-2 ring-offset-surface-secondary transition-all duration-200
                        ${active ? "ring-brand-primary/50" : hasUnread ? "ring-emerald-500/25" : "ring-transparent"}`}
                    />
                    {hasUnread && (
                      <span
                        className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-brand-primary border-2 border-surface-secondary shadow-[0_0_8px_rgba(240,165,0,0.5)]"
                        aria-hidden
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[13px] font-semibold truncate transition-colors
                            ${active ? "text-content-primary" : "text-content-primary group-hover:text-brand-primary/90"}`}
                        >
                          {c.title}
                        </span>
                        {hasUnread && (
                          <span className="inline-flex min-w-5 h-5 px-1 items-center justify-center rounded-full bg-brand-primary text-black text-[10px] font-bold font-mono leading-none shadow-[0_0_12px_rgba(240,165,0,0.35)]">
                            {c.unreadCount > 9 ? "9+" : c.unreadCount}
                          </span>
                        )}
                      </div>
                      <time
                        className={`text-[10px] font-mono shrink-0 tabular-nums ${hasUnread && !active ? "text-brand-primary/90" : "text-content-tertiary"}`}
                        dateTime={c.lastAt}
                        suppressHydrationWarning
                      >
                        {getTimeAgo(c.lastAt)}
                      </time>
                    </div>

                    {c.subtitle && (
                      <p className="text-[10px] text-content-tertiary/90 truncate leading-tight">{c.subtitle}</p>
                    )}

                    <p
                      className={`text-[12px] leading-snug line-clamp-2
                        ${hasUnread && !active ? "text-content-primary/95 font-medium" : "text-content-secondary font-normal"}`}
                    >
                      {c.lastPreview}
                    </p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      <footer className="shrink-0 px-3 py-2 border-t border-border-primary/30 bg-surface-primary/15">
        <p className="text-[9px] font-mono text-center text-content-tertiary/70 tracking-wide">
          {items.length} thread{items.length === 1 ? "" : "s"}
        </p>
      </footer>
    </div>
  );
};
