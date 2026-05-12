import { LotStatus } from "@/src/components/ui/LotCard/constants";

export type BidStatus = "winning" | "outbid" | "won" | "lost";

export interface IAuctionResult {
  finalPrice: number;
  winnerUsername: string;
  outcome: "won" | "lost";
}

export interface IMockBid {
  id: number;
  lotNumber: string;
  name: string;
  category: { id: number; name: string };
  sellerId: number;
  sellerUsername: string;
  startingPrice: number;
  currentPrice: number;
  priceStep: number;
  startsAt: string;
  endDate: string;
  status: LotStatus;
  sex: string;
  condition: string;
  size: string;
  totalBids: number;
  totalParticipants: number;
  images: string[];
  thumbnailUrl: string;
  myBid: number;
  bidStatus: BidStatus;
  result?: IAuctionResult;
}

export const MOCK_BIDS_DATA: IMockBid[] = [
  {
    id: 101,
    lotNumber: "ART-2024-001",
    name: "Ethereal Landscapes #1",
    category: { id: 1, name: "Digital Art" },
    sellerId: 5,
    sellerUsername: "crypto_master",
    startingPrice: 1200,
    currentPrice: 1550,
    priceStep: 50,
    startsAt: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000).toISOString(),
    status: LotStatus.Active,
    sex: "N/A",
    condition: "Digital",
    size: "4K",
    totalBids: 12,
    totalParticipants: 5,
    images: ["https://picsum.photos/seed/bid1/800/600"],
    thumbnailUrl: "https://picsum.photos/seed/bid1/400/300",
    myBid: 1550,
    bidStatus: "winning",
  },
  {
    id: 102,
    lotNumber: "WATCH-772",
    name: "Vintage Rolex Submariner",
    category: { id: 2, name: "Watches" },
    sellerId: 8,
    sellerUsername: "luxury_vault",
    startingPrice: 8500,
    currentPrice: 9500,
    priceStep: 100,
    startsAt: new Date().toISOString(),
    endDate: new Date(Date.now() + 172800000).toISOString(),
    status: LotStatus.Active,
    sex: "Men's",
    condition: "Excellent",
    size: "40mm",
    totalBids: 24,
    totalParticipants: 8,
    images: ["https://picsum.photos/seed/bid2/800/600"],
    thumbnailUrl: "https://picsum.photos/seed/bid2/400/300",
    myBid: 9200,
    bidStatus: "outbid",
  },
  {
    id: 103,
    lotNumber: "BAG-114",
    name: "Hermès Birkin 35",
    category: { id: 3, name: "Bags" },
    sellerId: 12,
    sellerUsername: "fashion_finds",
    startingPrice: 15000,
    currentPrice: 18500,
    priceStep: 500,
    startsAt: new Date().toISOString(),
    endDate: new Date(Date.now() - 3600000).toISOString(),
    status: LotStatus.Completed,
    sex: "Women's",
    condition: "Pristine",
    size: "35cm",
    totalBids: 15,
    totalParticipants: 4,
    images: ["https://picsum.photos/seed/bid3/800/600"],
    thumbnailUrl: "https://picsum.photos/seed/bid3/400/300",
    myBid: 18500,
    bidStatus: "won",
    result: {
      finalPrice: 18500,
      winnerUsername: "you",
      outcome: "won",
    },
  },
  {
    id: 104,
    lotNumber: "CAR-088",
    name: "1968 Ford Mustang GT500",
    category: { id: 4, name: "Automobiles" },
    sellerId: 3,
    sellerUsername: "classiccars_ua",
    startingPrice: 42000,
    currentPrice: 67000,
    priceStep: 1000,
    startsAt: new Date().toISOString(),
    endDate: new Date(Date.now() - 7200000).toISOString(),
    status: LotStatus.Completed,
    sex: "N/A",
    condition: "Restored",
    size: "Full",
    totalBids: 38,
    totalParticipants: 11,
    images: ["https://picsum.photos/seed/bid4/800/600"],
    thumbnailUrl: "https://picsum.photos/seed/bid4/400/300",
    myBid: 55000,
    bidStatus: "lost",
    result: {
      finalPrice: 67000,
      winnerUsername: "motorhead_kyiv",
      outcome: "lost",
    },
  },
];
