"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { HubConnection } from "@microsoft/signalr";
import { useSelector } from "react-redux";
import PageHeader from "@/src/components/ui/PageHeader";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { RootState } from "@/src/store";
import { chatService } from "@/src/services/ChatService";
import { createAuctionHub } from "@/src/services/ChatService/hub";
import type { IDirectChatDto, IDirectMessageDto } from "@/src/services/ChatService/types";
import type { IChatMessage } from "../Auction/LotDetails/types";
import type { IConversation } from "./types";
import { ConversationList } from "./components/ConversationList";
import { ChatThreadPanel } from "./components/ChatThreadPanel";

const EMPTY_PREVIEW = "No messages yet";

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
    lastPreview: lastMessage ? `${isOwnLastMessage ? "You: " : ""}${lastMessage.content}` : EMPTY_PREVIEW,
    lastAt: chat.updatedAt,
    unreadCount: chat.unreadCount,
    messages: [],
  };
}

export const ChatView = () => {
  const isMobile = useIsMobile();
  const currentUserId = useSelector((state: RootState) => state.auth.userId);
  const connectionRef = useRef<HubConnection | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const loadedChatIdsRef = useRef<Set<number>>(new Set());
  const userSelectedConversationRef = useRef(false);
  const requestedChatCreatedRef = useRef(false);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [requestedUserId] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const value = new URLSearchParams(window.location.search).get("userId");
    if (!value) return null;

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  });
  const [requestedUserName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("userName");
  });
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

  const loadMessages = useCallback(async (chatId: number) => {
    setLoadingMessagesChatId(chatId);
    setError(null);

    try {
      const messages = await chatService.getDirectMessages(chatId);
      const mappedMessages = messages.map((message) => toChatMessage(message, currentUserId));

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
  }, [currentUserId]);

  const loadConversations = useCallback(async () => {
    setIsLoadingConversations(true);
    setError(null);

    try {
      let directChats = await chatService.getDirectChats();

      const existingRequestedChat = requestedUserId
        ? directChats.find((chat) => chat.otherUser.id === requestedUserId)
        : null;

      if (
        requestedUserId &&
        requestedUserId !== currentUserId &&
        !existingRequestedChat &&
        !requestedChatCreatedRef.current
      ) {
        requestedChatCreatedRef.current = true;
        const createdChat = await chatService.createDirectChat({ otherUserId: requestedUserId });
        directChats = [
          createdChat,
          ...directChats.filter((chat) => chat.chatId !== createdChat.chatId),
        ];
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

      setActiveId((currentActiveId) => {
        const requestedConversation = requestedUserId
          ? mappedConversations.find((conversation) => conversation.otherUserId === requestedUserId)
          : requestedUserName
          ? mappedConversations.find(
            (conversation) => conversation.peerUserName.toLowerCase() === requestedUserName.toLowerCase(),
          )
          : null;

        if (!userSelectedConversationRef.current && requestedConversation) {
          return requestedConversation.id;
        }

        if (currentActiveId && mappedConversations.some((conversation) => conversation.id === currentActiveId)) {
          return currentActiveId;
        }

        return requestedConversation?.id ?? mappedConversations[0]?.id ?? null;
      });
    } catch {
      setError("Failed to load chats.");
    } finally {
      setIsLoadingConversations(false);
    }
  }, [currentUserId, requestedUserId, requestedUserName]);

  useEffect(() => {
    void Promise.resolve().then(loadConversations);
  }, [loadConversations]);

  useEffect(() => {
    if (!active || loadedChatIdsRef.current.has(active.chatId)) return;
    void Promise.resolve().then(() => loadMessages(active.chatId));
  }, [active, loadMessages]);

  useEffect(() => {
    if (!currentUserId) return;

    const connection = createAuctionHub();
    connectionRef.current = connection;

    connection.on("DirectMessage", (message: IDirectMessageDto) => {
      const chatMessage = toChatMessage(message, currentUserId);

      setConversations((prev) => {
        const existingConversation = prev.find((conversation) => conversation.chatId === message.chatId);
        if (!existingConversation) {
          void loadConversations();
          return prev;
        }

        const isActive = activeIdRef.current === existingConversation.id;
        const messageExists = existingConversation.messages.some((item) => item.id === chatMessage.id);

        return [
          {
            ...existingConversation,
            lastPreview: `${chatMessage.isOwn ? "You: " : ""}${chatMessage.message}`,
            lastAt: chatMessage.timestamp,
            unreadCount: isActive || chatMessage.isOwn
              ? 0
              : existingConversation.unreadCount + 1,
            messages: messageExists
              ? existingConversation.messages
              : [...existingConversation.messages, chatMessage],
          },
          ...prev.filter((conversation) => conversation.chatId !== message.chatId),
        ];
      });
    });

    connection.start().catch(() => {
      setError("Realtime chat connection failed.");
    });

    return () => {
      connection.off("DirectMessage");
      void connection.stop();
      connectionRef.current = null;
    };
  }, [currentUserId, loadConversations]);

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

    const connection = connectionRef.current;
    if (!connection) {
      setError("Chat connection is not ready yet.");
      return;
    }

    setSendingChatId(active.chatId);
    setError(null);

    try {
      await connection.invoke("SendDirectMessage", active.otherUserId, text);
      await loadMessages(active.chatId);
      await loadConversations();
    } catch {
      setError("Failed to send message.");
    } finally {
      setSendingChatId(null);
    }
  };

  const showListColumn = !isMobile || mobileShowList;
  const showThreadColumn = !isMobile || !mobileShowList;

  return (
    <div className="p-5 md:p-7 max-w-7xl mx-auto flex flex-col min-h-0">
      <PageHeader
        label="Messages"
        title="Chats"
      />

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-[13px] text-red-200">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 min-h-0 flex-1">
        {showThreadColumn && (
          <section className={`flex-1 min-w-0 flex flex-col ${isMobile && mobileShowList ? "hidden" : ""}`}>
            {isLoadingConversations ? (
              <div className="rounded-2xl border border-border-primary bg-surface-secondary/30 flex flex-col items-center justify-center min-h-[320px] px-6 text-center">
                <p className="text-content-primary font-semibold mb-1">Loading chats...</p>
                <p className="text-[13px] text-content-secondary max-w-sm">
                  Fetching your direct conversations.
                </p>
              </div>
            ) : active ? (
              <ChatThreadPanel
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
          <aside className={`w-full shrink-0 lg:w-[min(100%,380px)] ${!isMobile ? "" : showThreadColumn ? "hidden" : ""}`}>
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
