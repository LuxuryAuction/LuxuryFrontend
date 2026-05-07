import { LotStatus } from "@/src/components/ui/LotCard/constants";

export interface IBid {
  id: string;
  userName: string;
  userAvatar?: string;
  amount: number;
  timestamp: string;
  isLeading: boolean;
}

export interface IChatMessage {
  id: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  role?: "seller" | "bidder";
}

export interface ILotDetails {
  id: string;
  lotNumber: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  currentPrice: number;
  startingBid: number;
  minStep: number;
  endTime: string;
  status: LotStatus;
  totalParticipants: number;
  totalBids: number;
  publishedAt?: string;
  sex?: string;
  seller: {
    name: string;
    userName: string;
    avatarUrl: string;
    rating: number;
    totalSales: number;
  };
  attributes: { label: string; value: string }[];
  bids: IBid[];
  messages: IChatMessage[];
  winnerId?: string;
}
