"use client";

import { useState, useEffect } from "react";
import { LotInfo } from "./components/LotInfo";
import { BiddingPanel } from "./components/BiddingPanel";
import { BidHistory } from "./components/BidHistory";
import { LotChat } from "./components/LotChat";
import { MOCK_LOT_DETAILS } from "./lot-details.config";
import { MOCK_LOTS } from "../MyLots/mockLots";
import { useToast } from "@/src/components/ui/Toast";
import PageHeader from "@/src/components/ui/PageHeader";
import { Tabs } from "@/src/components/ui/Tabs";
import { SellerCard } from "./components/SellerCard";
import { formatCurrency } from "@/src/utils/textUtils";

interface LotDetailsViewProps {
  id?: string;
}

export const LotDetailsView = ({ id }: LotDetailsViewProps) => {
  const [lot, setLot] = useState(MOCK_LOT_DETAILS);
  const [activeTab, setActiveTab] = useState<"history" | "chat">("history");
  const { showToast } = useToast();

  useEffect(() => {
    if (id) {
      const foundLot = MOCK_LOTS.find(l => l.id === id);
      if (foundLot) {
        setLot({
          ...MOCK_LOT_DETAILS,
          id: foundLot.id,
          lotNumber: foundLot.lotNumber,
          title: foundLot.title,
          category: foundLot.category,
          description: foundLot.description || MOCK_LOT_DETAILS.description,
          images: foundLot.images || MOCK_LOT_DETAILS.images,
          currentPrice: foundLot.currentBid,
          startingBid: foundLot.startingBid,
          minStep: foundLot.priceStep,
          endTime: foundLot.endsAt,
          status: foundLot.status,
          totalParticipants: foundLot.totalParticipants,
          totalBids: foundLot.totalBids,
          buyNowPrice: foundLot.buyNowPrice,
          publishedAt: foundLot.publishedAt,
          sex: foundLot.sex,
          attributes: [
            { label: "Size", value: foundLot.size || "N/A" },
            { label: "Condition", value: foundLot.condition || "N/A" },
            { label: "Sex", value: foundLot.sex || "Unisex" }
          ]
        });
      }
    }
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const outbidAmount = lot.currentPrice + 500;
      const systemBid = {
        id: `b-sys-${Date.now()}`,
        userName: "Gaius Julius",
        userAvatar: "https://i.pravatar.cc/150?u=gaius",
        amount: outbidAmount,
        timestamp: new Date().toISOString(),
        isLeading: true
      };

      setLot(prev => ({
        ...prev,
        currentPrice: outbidAmount,
        totalBids: prev.totalBids + 1,
        bids: [systemBid, ...prev.bids.map(b => ({ ...b, isLeading: false }))]
      }));

      showToast("info", `New leading bid: ${formatCurrency(outbidAmount, "before")}!`);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handlePlaceBid = (amount: number) => {
    if (amount <= lot.currentPrice) {
      showToast("error", "Bid must be higher than current price");
      return;
    }

    const newBid = {
      id: `b-${Date.now()}`,
      userName: "You",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200",
      amount,
      timestamp: new Date().toISOString(),
      isLeading: true
    };

    setLot(prev => ({
      ...prev,
      currentPrice: amount,
      totalBids: prev.totalBids + 1,
      bids: [newBid, ...prev.bids.map(b => ({ ...b, isLeading: false }))]
    }));

    showToast("success", `You are now the leading bidder at ${formatCurrency(amount, "before")}!`);
  };

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: `m-${Date.now()}`,
      userName: "You",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200",
      message: text,
      timestamp: new Date().toISOString(),
      role: "bidder" as const
    };

    setLot(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  };

  return (
    <div className="flex flex-col min-h-screen p-5 md:p-8 mx-auto animate-bvCatFadeUp">
      <PageHeader
        label={`LOT #${lot.lotNumber}`}
        title={lot.title}
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
            title={lot.title}
            description={lot.description}
            images={lot.images}
            attributes={lot.attributes}
            lotNumber={lot.lotNumber}
            category={lot.category}
            publishedAt={lot.publishedAt}
          />

          <div className="hidden lg:block">
            <LotChat messages={lot.messages} onSendMessage={handleSendMessage} />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:top-6 z-20">
            <BiddingPanel
              currentPrice={lot.currentPrice}
              startingBid={lot.startingBid}
              minStep={lot.minStep}
              endTime={lot.endTime}
              totalBids={lot.totalBids}
              totalParticipants={lot.totalParticipants}
              buyNowPrice={lot.buyNowPrice}
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
              <BidHistory bids={lot.bids} />
            </div>

            <div className={activeTab === "chat" ? "block lg:hidden" : "hidden"}>
              <LotChat messages={lot.messages} onSendMessage={handleSendMessage} />
            </div>

            <SellerCard seller={lot.seller} />
          </div>
        </div>
      </div>
    </div>
  );
};
