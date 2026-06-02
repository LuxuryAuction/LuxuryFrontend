"use client";

import { ReactNode, useRef } from "react";
import { useChatScrollToBottom } from "@/src/hooks/useChatScrollToBottom";

interface ChatMessageListProps {
  isLoading?: boolean;
  isEmpty?: boolean;
  loadingContent?: ReactNode;
  emptyContent?: ReactNode;
  children: ReactNode;
  messageCount: number;
  lastMessageId?: string;
  /** When true, auto-scroll only on first load and when the latest message is yours. */
  scrollOnlyOnOwnMessage?: boolean;
  isLastMessageOwn?: boolean;
}

export function ChatMessageList({
  isLoading = false,
  isEmpty = false,
  loadingContent,
  emptyContent,
  children,
  messageCount,
  lastMessageId,
  scrollOnlyOnOwnMessage = false,
  isLastMessageOwn = false,
}: ChatMessageListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useChatScrollToBottom(scrollContainerRef, messageCount, lastMessageId, {
    disabled: isLoading,
    onlyWhenLastMessageIsOwn: scrollOnlyOnOwnMessage,
    isLastMessageOwn,
    smooth: false,
  });

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-4 flex flex-col gap-4 overscroll-y-contain"
    >
      {isLoading ? (
        loadingContent
      ) : isEmpty ? (
        emptyContent
      ) : (
        children
      )}
    </div>
  );
}
