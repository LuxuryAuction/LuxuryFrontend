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
import { useGetLot } from "@/src/hooks/useLots";

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

const MOCK_BIDS = [
  {
    id: "b1",
    userName: "Marcus Aurelius",
    userAvatar: "https://i.pravatar.cc/150?u=marcus",
    amount: 1450,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    isLeading: true,
  },
  {
    id: "b2",
    userName: "Hadrian",
    userAvatar: "https://i.pravatar.cc/150?u=hadrian",
    amount: 1350,
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    isLeading: false,
  },
  {
    id: "b3",
    userName: "Nero Claudius",
    userAvatar: "https://i.pravatar.cc/150?u=nero",
    amount: 1200,
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    isLeading: false,
  },
  {
    id: "b4",
    userName: "Trajan",
    userAvatar: "https://i.pravatar.cc/150?u=trajan",
    amount: 1100,
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    isLeading: false,
  },
];

export const LotDetailsView = ({ id }: LotDetailsViewProps) => {
  const { data: lot } = useGetLot(Number(id))
  const [activeTab, setActiveTab] = useState<"history" | "chat">("history");
  const { showToast } = useToast();

  const handlePlaceBid = (amount: number) => {
    if (!lot) return;

    if (amount <= lot.currentPrice) {
      showToast("error", "Bid must be higher than current price");
      return;
    }

    showToast("success", `You are now the leading bidder at ${formatCurrency(amount, "before")}!`);
  };

  const handleSendMessage = (text: string) => {
    console.log(text);
    showToast('success', `Msg sent ${text}`)
  };


  if (!lot) {
    return <div>No data</div>
  }

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
            <span className="text-[13px] text-content-secondary font-mono">{lot.totalBids} Bids</span>
            <div className="w-1 h-1 rounded-full bg-content-tertiary opacity-30" />
            <span className="text-[13px] text-content-secondary font-mono">{lot.totalParticipants} Participants</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-4 items-start">
        <div className="lg:col-span-7 flex flex-col gap-10">
          <LotInfo
            title={lot.name}
            description={lot.description}
            images={lot.imageUrls}
            attributes={[
              { label: "Size", value: lot.size },
              { label: "Condition", value: lot.condition },
              { label: "Sex", value: lot.sex },
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
              onPlaceBid={handlePlaceBid}
            />
          </div>

          <div className="mt-8 flex flex-col gap-8">
            <Tabs
              variant="switcher"
              className="lg:hidden"
              activeTab={activeTab}
              onChange={(tabId) => setActiveTab(tabId as "history" | "chat")}
              tabs={[
                { id: "history", label: "Bids" },
                { id: "chat", label: "Chat" },
              ]}
            />


            <div className={activeTab === "history" ? "block" : "hidden lg:block"}>
              <BidHistory bids={MOCK_BIDS} />
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
