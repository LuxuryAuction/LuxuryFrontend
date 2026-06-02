"use client";

import { Avatar } from "@/src/components/common/Avatar";
import { ChatComposer } from "@/src/components/chat/ChatComposer";
import { ChatMessageBody } from "@/src/components/chat/ChatMessageBody";
import { ChatMessageList } from "@/src/components/chat/ChatMessageList";
import { CHAT_BUBBLE_MAX_WIDTH_CLASS } from "@/src/components/chat/chatLayout";
import { Link } from "@/src/i18n/navigation";
import { getTimeAgo } from "@/src/utils/textUtils";
import { normalizeOutgoingChatText } from "@/src/utils/chatText";
import { ChevronLeftIcon } from "@/public/assets/icons";
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
  isLoading?: boolean;
  isSending?: boolean;
  className?: string;
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
  isLoading = false,
  isSending = false,
  className = "",
}: ChatThreadPanelProps) => {
  const [draft, setDraft] = useState("");
  const lastMessage = messages.at(-1);
  const isLastMessageOwn =
    lastMessage != null && (lastMessage.isOwn || lastMessage.userName === "You");

  const send = () => {
    const text = normalizeOutgoingChatText(draft);
    if (!text) return;
    onSend(text);
    setDraft("");
  };

  return (
    <div
      className={`flex flex-col h-full min-h-[420px] max-h-[min(72vh,720px)] rounded-2xl bg-surface-secondary/50 border border-border-primary overflow-hidden relative ${className}`.trim()}
    >
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-brand-primary/40 to-transparent" />

      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-primary/30 shrink-0 z-10 bg-surface-secondary/80">
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

      <ChatMessageList
        isLoading={isLoading}
        isEmpty={!isLoading && messages.length === 0}
        messageCount={messages.length}
        lastMessageId={lastMessage?.id}
        scrollOnlyOnOwnMessage
        isLastMessageOwn={isLastMessageOwn}
        loadingContent={
          <div className="flex flex-col items-center justify-center py-16 text-center gap-2 opacity-80">
            <p className="text-[14px] font-semibold text-content-primary">Loading messages...</p>
            <p className="text-[12px] text-content-tertiary max-w-xs">Fetching the latest conversation history.</p>
          </div>
        }
        emptyContent={
          <div className="flex flex-col items-center justify-center py-16 text-center gap-2 opacity-80">
            <p className="text-[14px] font-semibold text-content-primary">No messages yet</p>
            <p className="text-[12px] text-content-tertiary max-w-xs">Write the first message in this thread.</p>
          </div>
        }
      >
        {messages.map((msg) => {
          const isMe = msg.isOwn || msg.userName === "You";

          return (
            <div key={msg.id} className={`flex gap-3 w-full ${isMe ? "flex-row-reverse" : ""}`}>
              <Avatar name={msg.userName} src={msg.userAvatar} size="sm" className="mt-0.5 shrink-0" />
              <div className={`flex flex-col gap-1 min-w-0 ${CHAT_BUBBLE_MAX_WIDTH_CLASS} ${isMe ? "items-end" : "items-start"}`}>
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
                      <span className="text-[13px] font-bold text-content-primary">{msg.userName}</span>
                    )}
                  </div>
                  <span className="text-[10px] text-content-tertiary font-mono" suppressHydrationWarning>
                    {getTimeAgo(msg.timestamp)}
                  </span>
                </div>
                <div
                  className={`p-3.5 mt-0.5 rounded-2xl text-[13px] leading-relaxed shadow-sm w-full
                    ${isMe
                      ? "rounded-tr-sm bg-surface-tertiary border border-border-primary text-content-primary"
                      : "rounded-tl-sm bg-surface-primary/40 border border-border-primary/50 text-content-secondary"}`}
                >
                  <ChatMessageBody text={msg.message} />
                </div>
              </div>
            </div>
          );
        })}
      </ChatMessageList>

      <ChatComposer
        value={draft}
        onChange={setDraft}
        onSend={send}
        isSending={isSending}
      />
    </div>
  );
};
