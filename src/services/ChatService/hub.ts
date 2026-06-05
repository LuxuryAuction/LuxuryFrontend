import * as signalR from "@microsoft/signalr";
import { HttpTransportType, LogLevel } from "@microsoft/signalr";
import { getApiHostBaseUrl } from "../apiService";
import { shouldUseSameOriginHub } from "../apiUrls";
import { getAccessToken } from "@/src/utils/session";

export const AUCTION_HUB_PATH = "hubs/auction";

/** Server hub event: new direct message payload (DirectMessageDto). */
export const AUCTION_HUB_EVENTS = {
  DIRECT_MESSAGE: "DirectMessage",
  DIRECT_MESSAGE_READ: "DirectMessageRead",
  LOT_MESSAGE: "LotMessage",
} as const;

/** Server hub method: send a direct message to recipientUserId. */
export const AUCTION_HUB_METHODS = {
  SEND_DIRECT_MESSAGE: "SendDirectMessage",
  SEND_LOT_MESSAGE: "SendLotMessage",
  JOIN_LOT: "JoinLot",
  LEAVE_LOT: "LeaveLot",
  MARK_DIRECT_READ: "MarkDirectRead",
} as const;

/**
 * Auction hub — direct messages and other realtime events.
 * JWT is passed via accessTokenFactory (?access_token=... on the hub URL).
 *
 * On Vercel/localhost we use /api/hubs/... so the existing app/api/[...path] proxy
 * forwards to the backend (plain /hubs/... often 404s on Vercel deployments).
 */
function buildAuctionHubUrl(apiHostBase: string): string {
  if (!apiHostBase) {
    return `/api/${AUCTION_HUB_PATH}`;
  }

  if (apiHostBase.startsWith("http://") || apiHostBase.startsWith("https://")) {
    return `${apiHostBase.replace(/\/$/, "")}/${AUCTION_HUB_PATH}`;
  }

  const base = apiHostBase.startsWith("/") ? apiHostBase : `/${apiHostBase}`;
  return `${base}/${AUCTION_HUB_PATH}`;
}

export function createAuctionHub() {
  const hubUrl = buildAuctionHubUrl(getApiHostBaseUrl());
  // Vercel/serverless cannot proxy WebSocket upgrades; long-polling works via /hubs route handler.
  const useLongPollingOnly = shouldUseSameOriginHub();

  return new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => getAccessToken() ?? "",
      ...(useLongPollingOnly ? { transport: HttpTransportType.LongPolling } : {}),
    })
    .withAutomaticReconnect()
    .configureLogging(process.env.NODE_ENV === "development" ? LogLevel.Warning : LogLevel.Error)
    .build();
}
