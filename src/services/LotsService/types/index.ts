import { LotStatus } from "@/src/components/ui/LotCard/constants";
import { ILotCategory } from "../../UsersService/types";

export interface ILot {
  id: number;
  lotNumber: string;
  name: string;
  description: string;
  category: ILotCategory;
  categorySlug: string;
  startingPrice: number;
  currentPrice: number;
  priceStep: number;
  startsAt: string;
  endDate: string;
  status: LotStatus;
  sex: string;
  condition: string;
  size: string;
  deliveryMethod?: string;
  totalBids: number;
  totalParticipants: number;
  images: string[];
  thumbnailUrl: string;
  seller: ILotDetailsSeller;
}

export interface ILotDetailsUser {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  score: number;
  profileImageUrl: string;
  totalSales: number | null;
}

export type ILotDetailsSeller = ILotDetailsUser;

export interface ILotDetailsImage {
  id: number;
  url: string;
  order: number;
}

export interface ILotDetailsBid {
  id: number;
  lotId: number;
  user: ILotDetailsUser;
  amount: number;
  createdAt: string;
  isBestBid: boolean;
}

export interface ILotDetails {
  id: number;
  lotNumber: string;
  name: string;
  category: {
    id: number;
    slug: string;
    name: string;
  };
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
  deliveryMethod?: string;
  totalBids: number;
  totalParticipants: number;
  imageUrls: string[];
  bidsHistory: ILotDetailsBid[];
  seller: ILotDetailsSeller;
  images: ILotDetailsImage[];
}

export interface ILotListResponse {
  categoryName: string;
  items: ILot[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}


export interface ILotListParams {
  slug?: string;
  userName?: string;
  sex?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface IPlaceBidRequest {
  amount: number;
}

export interface ICreateLotRequest {
  name: string;
  categoryId: number;
  description: string;
  startingPrice: number;
  priceStep: number;
  startDate: string;
  draft: boolean;
  sex: string;
  condition: string;
  size: string;
  deliveryMethod: string;
  images: File[];
}
