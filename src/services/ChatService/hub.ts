import * as signalR from "@microsoft/signalr";
import { getApiHostBaseUrl } from "../apiService";
import { getAccessToken } from "@/src/utils/session";

export const AUCTION_HUB_PATH = "hubs/auction";

/** Server hub event: new direct message payload (DirectMessageDto). */
export const AUCTION_HUB_EVENTS = {
  DIRECT_MESSAGE: "DirectMessage",
  LOT_MESSAGE: "LotMessage",
} as const;

/** Server hub method: send a direct message to recipientUserId. */
export const AUCTION_HUB_METHODS = {
  SEND_DIRECT_MESSAGE: "SendDirectMessage",
  SEND_LOT_MESSAGE: "SendLotMessage",
  JOIN_LOT: "JoinLot",
  LEAVE_LOT: "LeaveLot",
} as const;

/**
 * Auction hub — direct messages and other realtime events.
 * JWT is passed via accessTokenFactory (?access_token=... on /hubs/*).
 */
export function createAuctionHub() {
  const apiHostBase = getApiHostBaseUrl();
  const hubUrl = apiHostBase
    ? `${apiHostBase}/${AUCTION_HUB_PATH}`
    : `/${AUCTION_HUB_PATH}`;

  return new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => getAccessToken() ?? "",
    })
    .withAutomaticReconnect()
    .build();
}
