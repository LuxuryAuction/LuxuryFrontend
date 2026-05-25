export interface IUserProfile {
  name: string;
  userName: string;
  memberSince: string;
  lotsSold: number;
  lotsBought: number;
  activeLots: number;
  favoriteCategoryId: number;
  categoryName: string;
  isVerified: boolean;
  trustScore: number;
  balance?: number;
  profileImageUrl: string;
}

export enum NotificationType {
  Outbid = "outbid",
  Win = "win",
  Payment = "payment",
}

export interface INotification {
  id: number;
  title: string;
  text: string;
  notificationType: NotificationType | string;
  actionUrl?: string;
  timestamp: string;
  isRead: boolean;
}

export interface INotificationsListParams {
  page?: number;
  pageSize?: number;
  notificationType?: NotificationType | string;
  isRead?: boolean;
}

export interface INotificationsListResponse {
  items: INotification[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  unreadCount: number;
}

export enum UserBidStatus {
  Ongoing = "Ongoing",
  Winning = "winning",
  Outbid = "outbid",
  Won = "won",
  Lost = "lost",
}

export type BidDisplayStatus =
  | UserBidStatus.Winning
  | UserBidStatus.Outbid
  | UserBidStatus.Won
  | UserBidStatus.Lost;

export interface IUserBidLotCategory {
  id: number;
  name: string;
}

export interface IUserBidLotSeller {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  score: number;
  profileImageUrl: string;
  totalSales: number | null;
}

export interface IUserBidLot {
  id: number;
  lotNumber: string;
  name: string;
  categoryId: number;
  category: IUserBidLotCategory;
  categoryName: string;
  seller: IUserBidLotSeller;
  startingPrice: number;
  currentPrice: number;
  priceStep: number;
  startsAt: string;
  endDate: string;
  status: string;
  sex: string;
  condition: string;
  size: string;
  totalBids: number;
  totalParticipants: number;
  images: string[];
  thumbnailUrl: string;
}

export interface IUserBid {
  bidId: number;
  status: UserBidStatus | string;
  startingPrice: number;
  userHighestBid: number;
  lotHighestBid: number;
  lot: IUserBidLot;
}

export interface IUserBidsListParams {
  page?: number;
  pageSize?: number;
  status?: UserBidStatus | string;
}

export interface IUserBidsListResponse {
  items: IUserBid[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  winningLotsCount: number;
  outbidLotsCount: number;
}
