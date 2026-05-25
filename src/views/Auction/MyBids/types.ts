import { UserBidStatus } from "@/src/services/UsersService/types";

export type { IUserBid } from "@/src/services/UsersService/types";
export { UserBidStatus };

export interface IAuctionResult {
  finalPrice: number;
  outcome: "won" | "lost";
}

export type BidStatus = UserBidStatus;
