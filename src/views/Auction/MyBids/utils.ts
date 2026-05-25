import {
  IUserBid,
  IUserBidLot,
  UserBidStatus,
  BidDisplayStatus,
} from "@/src/services/UsersService/types";
import { LotStatus } from "@/src/components/ui/LotCard/constants";
import { IAuctionResult } from "./types";

function normalizeStatus(status?: string) {
  return (status ?? "").trim().toLowerCase();
}

export function isOngoingBidStatus(status?: string) {
  const normalized = normalizeStatus(status);
  return normalized === "ongoing" || normalized === UserBidStatus.Ongoing.toLowerCase();
}

export function isAuctionActive(lot: IUserBidLot) {
  const normalized = normalizeStatus(lot.status);
  return normalized === "active" || normalized === LotStatus.Active.toLowerCase();
}

export function isBidAuctionOngoing(bid: IUserBid) {
  return isOngoingBidStatus(bid.status) || isAuctionActive(bid.lot);
}

export function getDisplayBidStatus(bid: IUserBid): BidDisplayStatus {
  const normalized = normalizeStatus(bid.status);

  if (normalized === UserBidStatus.Won) return UserBidStatus.Won;
  if (normalized === UserBidStatus.Lost) return UserBidStatus.Lost;

  if (isBidAuctionOngoing(bid)) {
    return bid.userHighestBid >= bid.lotHighestBid
      ? UserBidStatus.Winning
      : UserBidStatus.Outbid;
  }

  if (normalized === UserBidStatus.Winning) return UserBidStatus.Winning;
  if (normalized === UserBidStatus.Outbid) return UserBidStatus.Outbid;

  return bid.userHighestBid >= bid.lotHighestBid
    ? UserBidStatus.Winning
    : UserBidStatus.Outbid;
}

export function getBidResult(bid: IUserBid): IAuctionResult | undefined {
  if (isBidAuctionOngoing(bid)) return undefined;

  const displayStatus = getDisplayBidStatus(bid);

  if (displayStatus === UserBidStatus.Won) {
    return {
      finalPrice: bid.lotHighestBid,
      outcome: "won",
    };
  }

  if (displayStatus === UserBidStatus.Lost) {
    return {
      finalPrice: bid.lotHighestBid,
      outcome: "lost",
    };
  }

  return undefined;
}

export function matchesBidFilterTab(bid: IUserBid, tab: "all" | UserBidStatus): boolean {
  if (tab === "all") return true;

  if (tab === UserBidStatus.Winning || tab === UserBidStatus.Outbid) {
    return isBidAuctionOngoing(bid) && getDisplayBidStatus(bid) === tab;
  }

  return normalizeStatus(bid.status) === tab;
}
