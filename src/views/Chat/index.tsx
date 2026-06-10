"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useRouter } from "@/src/i18n/navigation";
import PageHeader from "@/src/components/ui/PageHeader";
import { useAuctionHub } from "@/src/hooks/useAuctionHub";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { RootState } from "@/src/store";
import { chatService, sortMessagesChronological } from "@/src/services/ChatService";
import { collapseChatPreview, normalizeOutgoingChatText } from "@/src/utils/chatText";
import type { IDirectChatDto, IDirectMessageDto } from "@/src/services/ChatService/types";
import type { IChatMessage } from "../Auction/LotDetails/types";
import type { IConversation } from "./types";
import { ConversationList } from "./components/ConversationList";
import { ChatThreadPanel } from "./components/ChatThreadPanel";

const EMPTY_PREVIEW = "No messages yet";

function normalizeUserSlug(slug: string | null): string | null {
  const trimmed = slug?.trim();
  return trimmed ? trimmed.toLowerCase() : null;
}

function toChatMessage(message: IDirectMessageDto, currentUserId: number | null): IChatMessage {
  const isOwn = currentUserId != null && message.senderId === currentUserId;

  return {
    id: String(message.id),
    userName: isOwn ? "You" : message.senderUserName,
    userAvatar: message.senderProfileImage ?? undefined,
    message: message.content,
    timestamp: message.createdAt,
    isOwn,
  };
}

function toConversation(chat: IDirectChatDto, currentUserId: number | null): IConversation {
  const lastMessage = chat.lastMessage;
  const isOwnLastMessage = currentUserId != null && lastMessage?.senderId === currentUserId;

  return {
    id: String(chat.chatId),
    chatId: chat.chatId,
    kind: "direct",
    title: chat.otherUser.userName,
    subtitle: "Direct message",
    otherUserId: chat.otherUser.id,
    peerUserName: chat.otherUser.userName,
    peerAvatar: chat.otherUser.profileImage ?? undefined,
    lastPreview: lastMessage
      ? `${isOwnLastMessage ? "You: " : ""}${collapseChatPreview(lastMessage.content)}`
      : EMPTY_PREVIEW,
    lastAt: chat.updatedAt,
    unreadCount: chat.unreadCount,
    messages: [],
  };
}

export const ChatView = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUserId = useSelector((state: RootState) => state.auth.userId);
  const currentUserSlug = useSelector((state: RootState) => state.auth.userName);
  const activeIdRef = useRef<string | null>(null);
  const loadedChatIdsRef = useRef<Set<number>>(new Set());
  const userSelectedConversationRef = useRef(false);
  const createdDirectChatForSlugsRef = useRef<Set<string>>(new Set());
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const requestedUserSlug = useMemo(() => {
    const slug = searchParams.get("user") ?? searchParams.get("userName");
    return slug?.trim() || null;
  }, [searchParams]);

  const normalizedRequestedSlug = normalizeUserSlug(requestedUserSlug);
  const hasDeepLink = normalizedRequestedSlug != null;
  const [mobileShowList, setMobileShowList] = useState(true);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [loadingMessagesChatId, setLoadingMessagesChatId] = useState<number | null>(null);
  const [sendingChatId, setSendingChatId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const active = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId],
  );

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    loadedChatIdsRef.current.clear();
  }, [currentUserId]);

  const markIncomingAsRead = useCallback(
    async (messages: IDirectMessageDto[], markDirectRead: (messageId: number) => Promise<void>) => {
      if (currentUserId == null) return;

      const unreadForMe = messages.filter(
        (message) => message.recipientId === currentUserId && !message.readAt,
      );

      await Promise.all(
        unreadForMe.map((message) =>
          markDirectRead(message.id).catch(() => chatService.markDirectMessageRead(message.id)),
        ),
      );
    },
    [currentUserId],
  );

  const loadMessages = useCallback(
    async (chatId: number, markDirectRead?: (messageId: number) => Promise<void>) => {
      setLoadingMessagesChatId(chatId);
      setError(null);

      try {
        const messages = sortMessagesChronological(await chatService.getDirectMessages(chatId));
        const mappedMessages = messages.map((message) => toChatMessage(message, currentUserId));

        if (markDirectRead) {
          await markIncomingAsRead(messages, markDirectRead);
        }

        loadedChatIdsRef.current.add(chatId);
        setConversations((prev) =>
          prev.map((conversation) =>
            conversation.chatId === chatId
              ? { ...conversation, messages: mappedMessages, unreadCount: 0 }
              : conversation,
          ),
        );
      } catch {
        setError("Failed to load messages.");
      } finally {
        setLoadingMessagesChatId(null);
      }
    },
    [currentUserId, markIncomingAsRead],
  );

  const hasLoadedConversationsRef = useRef(false);

  const loadConversations = useCallback(async (options?: { silent?: boolean }) => {
    const showFullScreenLoading = !options?.silent && !hasLoadedConversationsRef.current;
    if (showFullScreenLoading) {
      setIsLoadingConversations(true);
    }
    setError(null);

    try {
      let directChats = await chatService.getDirectChats();

      const existingRequestedChat = normalizedRequestedSlug
        ? directChats.find(
          (chat) => chat.otherUser.userName.toLowerCase() === normalizedRequestedSlug,
        )
        : null;

      const isSelfChat =
        normalizedRequestedSlug != null &&
        currentUserSlug != null &&
        normalizedRequestedSlug === currentUserSlug.toLowerCase();

      if (
        requestedUserSlug &&
        normalizedRequestedSlug &&
        !isSelfChat &&
        !existingRequestedChat &&
        !createdDirectChatForSlugsRef.current.has(normalizedRequestedSlug)
      ) {
        createdDirectChatForSlugsRef.current.add(normalizedRequestedSlug);
        try {
          const createdChat = await chatService.createDirectChat({ otherUserName: requestedUserSlug });
          directChats = [
            createdChat,
            ...directChats.filter((chat) => chat.chatId !== createdChat.chatId),
          ];
        } catch {
          createdDirectChatForSlugsRef.current.delete(normalizedRequestedSlug);
          throw new Error("Failed to create direct chat.");
        }
      }

      const mappedConversations = directChats
        .map((chat) => toConversation(chat, currentUserId))
        .sort((a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime());

      setConversations((prev) =>
        mappedConversations.map((conversation) => {
          const existing = prev.find((item) => item.chatId === conversation.chatId);
          return {
            ...conversation,
            messages: existing?.messages ?? [],
          };
        }),
      );

      const requestedConversation = normalizedRequestedSlug
        ? mappedConversations.find(
          (conversation) => conversation.peerUserName.toLowerCase() === normalizedRequestedSlug,
        )
        : null;

      if (hasDeepLink && !requestedConversation) {
        throw new Error("Could not open chat with this user.");
      }

      setActiveId((currentActiveId) => {
        if (hasDeepLink && requestedConversation) {
          return requestedConversation.id;
        }

        if (!userSelectedConversationRef.current && requestedConversation) {
          return requestedConversation.id;
        }

        if (currentActiveId && mappedConversations.some((conversation) => conversation.id === currentActiveId)) {
          return currentActiveId;
        }

        return requestedConversation?.id ?? mappedConversations[0]?.id ?? null;
      });

      if (hasDeepLink && requestedConversation) {
        router.replace("/user/chat");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load chats.");
    } finally {
      hasLoadedConversationsRef.current = true;
      if (showFullScreenLoading) {
        setIsLoadingConversations(false);
      }
    }
  }, [currentUserId, currentUserSlug, requestedUserSlug, normalizedRequestedSlug, hasDeepLink, router]);

  useEffect(() => {
    if (!hasDeepLink) return;

    userSelectedConversationRef.current = false;
    if (isMobile) setMobileShowList(false);
  }, [hasDeepLink, requestedUserSlug, normalizedRequestedSlug, isMobile]);

  useEffect(() => {
    void loadConversations();
  }, [loadConversations]);

  const markDirectReadRef = useRef<((messageId: number) => Promise<void>) | null>(null);

  const handleDirectMessage = useCallback(
    (message: IDirectMessageDto) => {
      const chatMessage = toChatMessage(message, currentUserId);
      const isForMe =
        currentUserId != null && message.recipientId === currentUserId && !message.readAt;

      setConversations((prev) => {
        const existingConversation = prev.find((conversation) => conversation.chatId === message.chatId);
        if (!existingConversation) {
          void loadConversations({ silent: true });
          return prev;
        }

        const isActive = activeIdRef.current === existingConversation.id;
        const messageExists = existingConversation.messages.some((item) => item.id === chatMessage.id);

        if (isActive && isForMe && markDirectReadRef.current) {
          void markDirectReadRef.current(message.id).catch(() =>
            chatService.markDirectMessageRead(message.id),
          );
        }

        return [
          {
            ...existingConversation,
            lastPreview: `${chatMessage.isOwn ? "You: " : ""}${collapseChatPreview(chatMessage.message)}`,
            lastAt: chatMessage.timestamp,
            unreadCount: isActive || chatMessage.isOwn
              ? 0
              : existingConversation.unreadCount + 1,
            messages: messageExists
              ? existingConversation.messages
              : [
                  ...existingConversation.messages.filter((item) => !item.id.startsWith("pending-")),
                  chatMessage,
                ],
          },
          ...prev.filter((conversation) => conversation.chatId !== message.chatId),
        ];
      });
    },
    [currentUserId, loadConversations],
  );

  const {
    sendDirectMessage,
    markDirectRead,
    isConnected,
    error: hubError,
  } = useAuctionHub({
    enabled: currentUserId != null,
    onDirectMessage: handleDirectMessage,
  });

  markDirectReadRef.current = markDirectRead;

  useEffect(() => {
    if (!active || loadedChatIdsRef.current.has(active.chatId)) return;
    void Promise.resolve().then(() => loadMessages(active.chatId, markDirectRead));
  }, [active, loadMessages, markDirectRead]);

  const selectConversation = useCallback(
    (id: string) => {
      userSelectedConversationRef.current = true;
      setActiveId(id);
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)),
      );
      if (isMobile) setMobileShowList(false);
    },
    [isMobile],
  );

  const handleSend = async (text: string) => {
    if (!active) return;

    if (!isConnected) {
      setError("Chat connection is not ready yet.");
      return;
    }

    const normalized = normalizeOutgoingChatText(text);
    if (!normalized) return;

    const now = new Date().toISOString();
    const optimisticId = `pending-${Date.now()}`;
    const optimisticMessage: IChatMessage = {
      id: optimisticId,
      userName: "You",
      message: normalized,
      timestamp: now,
      isOwn: true,
    };

    setConversations((prev) => {
      const updated = prev.map((conversation) =>
        conversation.chatId === active.chatId
          ? {
              ...conversation,
              lastPreview: `You: ${collapseChatPreview(normalized)}`,
              lastAt: now,
              messages: [...conversation.messages, optimisticMessage],
            }
          : conversation,
      );
      const current = updated.find((conversation) => conversation.chatId === active.chatId);
      if (!current) return updated;
      return [current, ...updated.filter((conversation) => conversation.chatId !== active.chatId)];
    });

    setSendingChatId(active.chatId);
    setError(null);

    try {
      await sendDirectMessage(active.otherUserId, normalized);
    } catch {
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.chatId === active.chatId
            ? {
                ...conversation,
                messages: conversation.messages.filter((message) => message.id !== optimisticId),
              }
            : conversation,
        ),
      );
      setError("Failed to send message.");
    } finally {
      setSendingChatId(null);
    }
  };

  const showListColumn = !isMobile || mobileShowList;
  const showThreadColumn = !isMobile || !mobileShowList;
  const visibleError = error ?? (hubError ? "Realtime chat connection failed." : null);

  return (
    <div className="p-5 md:p-7 max-w-7xl mx-auto flex flex-col min-h-0 h-[calc(100dvh-4.5rem)] max-h-[calc(100dvh-4.5rem)]">
      <PageHeader
        label="Messages"
        title="Chats"
      />

      {visibleError && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-[13px] text-red-200 shrink-0">
          {visibleError}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0 overflow-hidden">
        {showThreadColumn && (
          <section className={`flex-1 min-w-0 min-h-0 flex flex-col ${isMobile && mobileShowList ? "hidden" : ""}`}>
            {isLoadingConversations ? (
              <div className="rounded-2xl border border-border-primary bg-surface-secondary/30 flex flex-col items-center justify-center min-h-[320px] px-6 text-center">
                <p className="text-content-primary font-semibold mb-1">Loading chats...</p>
                <p className="text-[13px] text-content-secondary max-w-sm">
                  Fetching your direct conversations.
                </p>
              </div>
            ) : active ? (
              <ChatThreadPanel
                className="flex-1 min-h-0 max-h-none h-full"
                title={active.title}
                subtitle={active.subtitle}
                peerUserName={active.peerUserName}
                peerAvatar={active.peerAvatar}
                messages={active.messages}
                onSend={handleSend}
                showBack={isMobile}
                onBack={() => setMobileShowList(true)}
                isLoading={loadingMessagesChatId === active.chatId}
                isSending={sendingChatId === active.chatId}
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-border-primary bg-surface-secondary/30 flex flex-col items-center justify-center min-h-[320px] px-6 text-center">
                <p className="text-content-primary font-semibold mb-1">No conversation selected</p>
                <p className="text-[13px] text-content-secondary max-w-sm">
                  Choose a thread from the list to read and reply.
                </p>
              </div>
            )}
          </section>
        )}
        {showListColumn && (
          <aside className={`w-full shrink-0 lg:w-[min(100%,380px)] min-h-0 flex flex-col ${!isMobile ? "h-full" : ""} ${!isMobile ? "" : showThreadColumn ? "hidden" : ""}`}>
            <ConversationList
              items={conversations}
              activeId={activeId}
              onSelect={selectConversation}
            />
          </aside>
        )}
      </div>
    </div>
  );
};
