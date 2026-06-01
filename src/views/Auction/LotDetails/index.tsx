"use client";

import { useCallback, useEffect, useState } from "react";
import { LotInfo } from "./components/LotInfo";
import { BiddingPanel } from "./components/BiddingPanel";
import { BidHistory } from "./components/BidHistory";
import { LotChat } from "./components/LotChat";
import { useToast } from "@/src/components/ui/Toast";
import PageHeader from "@/src/components/ui/PageHeader";
import { Tabs } from "@/src/components/ui/Tabs";
import { SellerCard } from "./components/SellerCard";
import { formatCurrency } from "@/src/utils/textUtils";
import { formatConditionLabel } from "@/src/constants/itemCondition";
import { formatSexDisplay } from "@/src/constants/lotSex";
import { formatDeliveryDisplay } from "@/src/constants/lotDelivery";
import { useTranslations } from "next-intl";
import { useGetLot, usePlaceBid } from "@/src/hooks/useLots";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { useAuctionHub } from "@/src/hooks/useAuctionHub";
import { chatService } from "@/src/services/ChatService";
import type { ILotMessageDto } from "@/src/services/ChatService/types";
import type { IChatMessage } from "./types";

interface LotDetailsViewProps {
  id?: string;
}

function toLotChatMessage(
  message: ILotMessageDto,
  currentUserId: number | null,
  sellerUserId?: number,
): IChatMessage {
  const rawMessage = message as ILotMessageDto & {
    Id?: number;
    SenderId?: number;
    SenderUserName?: string;
    SenderProfileImage?: string | null;
    Content?: string;
    CreatedAt?: string;
  };
  const id = rawMessage.id ?? rawMessage.Id;
  const senderId = rawMessage.senderId ?? rawMessage.SenderId;
  const senderUserName = rawMessage.senderUserName ?? rawMessage.SenderUserName ?? "";
  const senderProfileImage = rawMessage.senderProfileImage ?? rawMessage.SenderProfileImage;
  const content = rawMessage.content ?? rawMessage.Content ?? "";
  const createdAt = rawMessage.createdAt ?? rawMessage.CreatedAt ?? new Date().toISOString();
  const isOwn = currentUserId != null && senderId === currentUserId;

  return {
    id: String(id),
    userName: isOwn ? "You" : senderUserName,
    userAvatar: senderProfileImage ?? undefined,
    message: content,
    timestamp: createdAt,
    role: senderId === sellerUserId ? "seller" : "bidder",
    isOwn,
  };
}

function getLotMessageLotId(message: ILotMessageDto): number | undefined {
  const rawMessage = message as ILotMessageDto & { LotId?: number };
  return rawMessage.lotId ?? rawMessage.LotId;
}

export const LotDetailsView = ({ id }: LotDetailsViewProps) => {
  const lotId = Number(id);
  const { data: lot, refetch } = useGetLot(lotId);
  const { placeBid, isLoading: isPlacingBid } = usePlaceBid();
  const [activeTab, setActiveTab] = useState<"history" | "chat">("history");
  const { showToast } = useToast();
  const tCondition = useTranslations("ItemCondition");
  const tSex = useTranslations("ItemSex");
  const tDelivery = useTranslations("LotDelivery");
  const tLot = useTranslations("LotDetails");
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const currentUserId = useSelector((state: RootState) => state.auth.userId);
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [isSendingChat, setIsSendingChat] = useState(false);

  const handleLotMessage = useCallback(
    (message: ILotMessageDto) => {
      if (Number.isNaN(lotId) || getLotMessageLotId(message) !== lotId) return;

      const mappedMessage = toLotChatMessage(message, currentUserId, lot?.seller.id);
      setChatMessages((prev) => {
        if (prev.some((item) => item.id === mappedMessage.id)) return prev;
        return [...prev, mappedMessage];
      });
    },
    [currentUserId, lot?.seller.id, lotId],
  );

  const {
    sendLotMessage,
    joinLot,
    leaveLot,
    isConnected: isHubConnected,
  } = useAuctionHub({
    enabled: isAuthenticated,
    onLotMessage: handleLotMessage,
  });

  useEffect(() => {
    if (Number.isNaN(lotId) || !lot) return;

    let isMounted = true;

    chatService
      .getLotMessages(lotId)
      .then((messages) => {
        if (!isMounted) return;
        setChatMessages(
          messages.map((message) => toLotChatMessage(message, currentUserId, lot.seller.id)),
        );
      })
      .catch(() => {
        if (isMounted) {
          showToast("error", tLot("toasts.loadMessagesFailed"));
        }
      })

    return () => {
      isMounted = false;
    };
  }, [currentUserId, lot, lotId, showToast, tLot]);

  useEffect(() => {
    if (!isAuthenticated || !isHubConnected || Number.isNaN(lotId)) return;

    void joinLot(lotId).catch(() => {
      showToast("error", tLot("toasts.realtimeChatFailed"));
    });

    return () => {
      void leaveLot(lotId);
    };
  }, [isAuthenticated, isHubConnected, joinLot, leaveLot, lotId, showToast, tLot]);

  const handlePlaceBid = async (amount: number) => {
    if (!lot || Number.isNaN(lotId)) return;

    if (amount <= lot.currentPrice) {
      showToast("error", tLot("toasts.bidTooLow"));
      return;
    }

    try {
      await placeBid(lotId, { amount });
      await refetch();
      showToast(
        "success",
        tLot("toasts.leadingBidder", { amount: formatCurrency(amount, "before") }),
      );
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : tLot("toasts.placeBidFailed");
      showToast("error", message);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!isAuthenticated || Number.isNaN(lotId)) return;

    if (!isHubConnected) {
      showToast("error", tLot("toasts.realtimeChatFailed"));
      return;
    }

    setIsSendingChat(true);

    try {
      await sendLotMessage(lotId, text);
      const messages = await chatService.getLotMessages(lotId);
      setChatMessages(
        messages.map((message) => toLotChatMessage(message, currentUserId, lot?.seller.id)),
      );
      showToast("success", tLot("toasts.messageSent"));
    } catch {
      showToast("error", tLot("toasts.messageSendFailed"));
    } finally {
      setIsSendingChat(false);
    }
  };


  if (!lot) {
    return <div>{tLot("noData")}</div>;
  }

  const images =
    lot.images.length > 0
      ? [...lot.images].sort((a, b) => a.order - b.order).map((img) => img.url)
      : lot.imageUrls;

  return (
    <div className="flex flex-col min-h-screen p-5 md:p-7 max-w-7xl mx-auto animate-bvCatFadeUp">
      <PageHeader
        label={`${lot.lotNumber}`}
        title={lot.name}
        description={
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-[13px] text-[#22c55e] font-semibold">Live Auction</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-content-tertiary opacity-30" />
            <span className="text-[13px] text-content-secondary font-mono">
              {tLot("headerBids", { count: lot.totalBids })}
            </span>
            <div className="w-1 h-1 rounded-full bg-content-tertiary opacity-30" />
            <span className="text-[13px] text-content-secondary font-mono">
              {tLot("headerParticipants", { count: lot.totalParticipants })}
            </span>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-4 items-start">
        <div className="lg:col-span-7 flex flex-col gap-10">
          <LotInfo
            title={lot.name}
            description={lot.description}
            images={images}
            attributes={[
              { label: tLot("size"), value: lot.size },
              { label: tLot("condition"), value: formatConditionLabel(lot.condition, (key) => tCondition(key)) ?? lot.condition },
              { label: tLot("sex"), value: formatSexDisplay(lot.sex, (key) => tSex(key)) ?? lot.sex },
              {
                label: tLot("deliveryMethod"),
                value:
                  formatDeliveryDisplay(lot.deliveryMethod, (key) => tDelivery(key)) ??
                  lot.deliveryMethod ??
                  "—",
              }
            ]}
            lotNumber={lot.lotNumber}
            category={lot.category.name}
            publishedAt={lot.startsAt}
          />

          <div className="hidden lg:block">
            <LotChat
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              isSending={isSendingChat}
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:top-6 z-20">
            <BiddingPanel
              currentPrice={lot.currentPrice}
              startingBid={lot.startingPrice}
              minStep={lot.priceStep}
              endTime={lot.endDate}
              totalBids={lot.totalBids}
              totalParticipants={lot.totalParticipants}
              status={lot.status}
              bidsHistory={lot.bidsHistory ?? []}
              sellerUserName={lot.seller.userName}
              onPlaceBid={handlePlaceBid}
              isPlacingBid={isPlacingBid}
            />
          </div>

          <div className="mt-8 flex flex-col gap-8">
            <Tabs
              variant="switcher"
              className="lg:hidden"
              activeTab={activeTab}
              onChange={(tabId) => setActiveTab(tabId as "history" | "chat")}
              tabs={[
                { id: "history", label: tLot("tabBids") },
                { id: "chat", label: tLot("tabChat") },
              ]}
            />


            <div className={activeTab === "history" ? "block" : "hidden lg:block"}>
              <BidHistory bids={lot.bidsHistory ?? []} />
            </div>

            <div className={activeTab === "chat" ? "block lg:hidden" : "hidden"}>
              <LotChat
                messages={chatMessages}
                onSendMessage={handleSendMessage}
                isSending={isSendingChat}
              />
            </div>

            <SellerCard seller={lot.seller} />
          </div>
        </div>
      </div>
    </div>
  );
};
