export type LotStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "ACTIVE"
  | "EXTENDED"
  | "PAID"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED"
  | "RETURNED";

export interface ILot {
  id: string;
  lotNumber: string;
  title: string;
  category: string;
  sellerUsername: string;
  images?: string[];
  condition?: string;
  description?: string;
  publishedAt?: string;
  sex?: string;
  size?: string;
  currentBid: number;
  startingBid: number;
  priceStep: number;
  totalBids: number;
  totalParticipants: number;
  status: LotStatus;
  endsAt: string;
  buyNowPrice?: number;
  href?: string;
}

export type ViewVariant = "grid" | "list";

export interface LotCardProps {
  lot: ILot;
  variant?: ViewVariant;
  showCategory?: boolean;
}
