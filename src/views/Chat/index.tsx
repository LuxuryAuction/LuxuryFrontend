"use client";

import { useCallback, useMemo, useState } from "react";
import PageHeader from "@/src/components/ui/PageHeader";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { MOCK_CONVERSATIONS } from "./mockConversations";
import type { IConversation } from "./types";
import { ConversationList } from "./components/ConversationList";
import { ChatThreadPanel } from "./components/ChatThreadPanel";

export const ChatView = () => {
  const isMobile = useIsMobile();
  const [conversations, setConversations] = useState<IConversation[]>(() =>
    MOCK_CONVERSATIONS.map((c) => ({ ...c, messages: c.messages.map((m) => ({ ...m })) })),
  );
  const [activeId, setActiveId] = useState<string | null>(() => MOCK_CONVERSATIONS[0]?.id ?? null);
  const [mobileShowList, setMobileShowList] = useState(true);

  const active = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId],
  );

  const selectConversation = useCallback(
    (id: string) => {
      setActiveId(id);
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)),
      );
      if (isMobile) setMobileShowList(false);
    },
    [isMobile],
  );

  const handleSend = (text: string) => {
    console.log(text)
  }
  const showListColumn = !isMobile || mobileShowList;
  const showThreadColumn = !isMobile || !mobileShowList;

  return (
    <div className="p-5 md:p-7 max-w-7xl mx-auto flex flex-col min-h-0">
      <PageHeader
        label="Messages"
        title="Chats"
      />

      <div className="flex flex-col lg:flex-row gap-4 min-h-0 flex-1">
        {showThreadColumn && (
          <section className={`flex-1 min-w-0 flex flex-col ${isMobile && mobileShowList ? "hidden" : ""}`}>
            {active ? (
              <ChatThreadPanel
                title={active.title}
                subtitle={active.subtitle}
                peerUserName={active.peerUserName}
                peerAvatar={active.peerAvatar}
                messages={active.messages}
                onSend={handleSend}
                showBack={isMobile}
                onBack={() => setMobileShowList(true)}
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-border-primary bg-surface-secondary/30 flex flex-col items-center justify-center min-h-[320px] px-6 text-center">
                <p className="text-content-primary font-semibold mb-1">Select a conversation</p>
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
