"use client";

import { useState } from "react";
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

interface LotDetailsViewProps {
  id?: string;
}

const MOCK_MESSAGES = [
  {
    id: "m1",
    userName: "Trajan",
    userAvatar: "https://i.pravatar.cc/150?u=trajan",
    message: "Does it come with original box and papers?",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    role: "bidder" as const,
  },
  {
    id: "m2",
    userName: "Alex Kovalenko",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200",
    message: "This listing is for the watch only. However, it was recently serviced by an authorized Rolex center.",
    timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    role: "seller" as const,
  },
  {
    id: "m3",
    userName: "Marcus Aurelius",
    userAvatar: "https://i.pravatar.cc/150?u=marcus",
    message: "Beautiful piece! Is the lume still glowing?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    role: "bidder" as const,
  },
];

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

  const handleSendMessage = (text: string) => {
    if (!isAuthenticated) return;
    console.log(text);
    showToast("success", tLot("toasts.messageSent"));
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
            <LotChat messages={MOCK_MESSAGES} onSendMessage={handleSendMessage} />
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
              <LotChat messages={MOCK_MESSAGES} onSendMessage={handleSendMessage} />
            </div>

            <SellerCard seller={lot.seller} />
          </div>
        </div>
      </div>
    </div>
  );
};
