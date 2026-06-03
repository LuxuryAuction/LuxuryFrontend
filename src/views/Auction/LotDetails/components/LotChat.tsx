"use client";

import { Avatar } from "@/src/components/common/Avatar";
import { ChatComposer } from "@/src/components/chat/ChatComposer";
import { ChatMessageBody } from "@/src/components/chat/ChatMessageBody";
import { ChatMessageList } from "@/src/components/chat/ChatMessageList";
import { CHAT_BUBBLE_MAX_WIDTH_CLASS } from "@/src/components/chat/chatLayout";
import { Link } from "@/src/i18n/navigation";
import { getTimeAgo } from "@/src/utils/textUtils";
import { normalizeOutgoingChatText } from "@/src/utils/chatText";
import { IChatMessage } from "../types";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";

interface LotChatProps {
  messages: IChatMessage[];
  onSendMessage?: (message: string) => void | Promise<void>;
  isLoading?: boolean;
  isSending?: boolean;
  className?: string;
}

export const LotChat = ({
  messages,
  onSendMessage,
  isLoading = false,
  isSending = false,
  className = "",
}: LotChatProps) => {
  const t = useTranslations("LotDetails.chat");
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [newMessage, setNewMessage] = useState("");
  const lastMessage = messages.at(-1);
  const isLastMessageOwn =
    lastMessage != null && (lastMessage.isOwn || lastMessage.userName === "You");

  const trySend = () => {
    if (!isAuthenticated || !onSendMessage) return;
    const text = normalizeOutgoingChatText(newMessage);
    if (!text) return;
    onSendMessage(text);
    setNewMessage("");
  };

  return (
    <div
      className={`flex flex-col min-h-[380px] max-h-[min(68vh,640px)] rounded-[16px] bg-surface-secondary/50 border border-border-primary relative overflow-hidden ${className}`.trim()}
    >
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-brand-primary/40 to-transparent z-10" />

      <header className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-border-primary/30 bg-surface-secondary/80 relative z-10">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-px w-4 bg-brand-primary/50 shrink-0" />
          <div className="min-w-0">
            <h2 className="text-[10px] font-mono font-bold uppercase tracking-widest text-content-tertiary">
              {t("title")}
            </h2>
            <p className="text-[11px] text-content-secondary mt-0.5 truncate">{t("groupSubtitle")}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-tertiary/50 border border-border-primary/50 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_5px_#22c55e]" />
          <span className="text-[9px] text-content-secondary font-mono font-bold">{t("live")}</span>
        </div>
      </header>

      <ChatMessageList
        isLoading={isLoading}
        isEmpty={!isLoading && messages.length === 0}
        messageCount={messages.length}
        lastMessageId={lastMessage?.id}
        scrollOnlyOnOwnMessage
        isLastMessageOwn={isLastMessageOwn}
        loadingContent={
          <div className="flex flex-col items-center justify-center py-10 text-center gap-2 opacity-80">
            <span className="text-[13px] font-bold text-content-primary">{t("loading")}</span>
          </div>
        }
        emptyContent={
          <div className="flex flex-col items-center justify-center py-10 text-center gap-3 opacity-80">
            <div className="w-12 h-12 rounded-full bg-surface-tertiary border border-border-primary flex items-center justify-center shadow-inner">
              <svg
                className="w-5 h-5 text-content-tertiary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-bold text-content-primary">{t("emptyTitle")}</span>
              <span className="text-[11px] text-content-tertiary">{t("emptyDescription")}</span>
            </div>
          </div>
        }
      >
        {messages.map((msg) => {
          const isMe = msg.isOwn || msg.userName === "You";
          const isSeller = msg.role === "seller";

          return (
            <div key={msg.id} className={`flex gap-3 w-full ${isMe ? "flex-row-reverse" : ""}`}>
              <Link
                href={`/user/profile/${encodeURIComponent(msg.userName)}`}
                className="shrink-0 hover:opacity-80 transition-opacity"
              >
                <Avatar name={msg.userName} src={msg.userAvatar} size="sm" className="mt-1" />
              </Link>
              <div className={`flex flex-col gap-1 min-w-0 ${CHAT_BUBBLE_MAX_WIDTH_CLASS} ${isMe ? "items-end" : "items-start"}`}>
                <div className={`flex items-baseline gap-2 flex-wrap ${isMe ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center gap-2 flex-wrap ${isMe ? "flex-row-reverse" : ""}`}>
                    <Link
                      href={`/user/profile/${encodeURIComponent(msg.userName)}`}
                      className="text-[13px] font-bold text-content-primary hover:text-brand-primary transition-colors hover:underline underline-offset-4"
                    >
                      {msg.userName}
                    </Link>
                    {isSeller && (
                      <span className="px-1.5 py-px rounded bg-brand-primary/10 text-brand-primary text-[9px] font-bold uppercase tracking-wider border border-brand-primary/20">
                        {t("sellerBadge")}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-content-tertiary font-mono" suppressHydrationWarning>
                    {getTimeAgo(msg.timestamp)}
                  </span>
                </div>
                <div
                  className={`p-3.5 mt-1 rounded-2xl text-[13px] leading-relaxed shadow-sm w-full
                    ${isMe
                      ? "rounded-tr-sm bg-surface-tertiary border border-border-primary text-content-primary"
                      : isSeller
                        ? "rounded-tl-sm bg-brand-primary/10 border border-brand-primary/20 text-content-primary"
                        : "rounded-tl-sm bg-surface-primary/40 border border-border-primary/50 text-content-secondary"}`}
                >
                  <ChatMessageBody text={msg.message} />
                </div>
              </div>
            </div>
          );
        })}
      </ChatMessageList>

      <div className="shrink-0 relative z-10 bg-surface-secondary/80">
        {isAuthenticated ? (
          <ChatComposer
            value={newMessage}
            onChange={setNewMessage}
            onSend={trySend}
            placeholder={t("placeholder")}
            isSending={isSending}
            className="border-t border-border-primary/30"
          />
        ) : (
          <div className="p-4 pt-3 border-t border-border-primary/30">
            <Link
              href="/login"
              className="block w-full rounded-xl border border-border-primary bg-surface-tertiary/50 py-3.5 px-4 text-center text-[13px] font-semibold text-content-primary hover:border-brand-primary/40 hover:bg-surface-primary transition-all"
            >
              {t("loginToChat")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
