import { LotStatus } from "@/src/components/ui/LotCard/constants";

export interface ILot {
  id: number;
  lotNumber: string;
  name: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
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
  size: string | null;
  totalBids: number;
  totalParticipants: number;
  images: string[];
  thumbnailUrl: string;
}

export interface ILotDetailsSeller {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  score: number;
}

export interface ILotDetailsImage {
  id: number;
  url: string;
  order: number;
}

export interface ILotDetails {
  id: number;
  lotNumber: string;
  name: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  sellerId: number;
  sellerUsername: string;
  description: string;
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
  imageUrls: string[];
  seller: ILotDetailsSeller;
  images: ILotDetailsImage[];
}

export interface ILotListResponse {
  items: ILot[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface ILotListParams {
  categoryId?: number;
  sex?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  pageSize?: number;
}
