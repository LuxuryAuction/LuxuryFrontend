import * as signalR from "@microsoft/signalr";
import { getAccessToken } from "@/src/utils/session";
import { getApiBaseUrl } from "../apiService";

const AUCTION_HUB_PATH = "hubs/auction";

function getRealtimeBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SIGNALR_ENDPOINT?.replace(/\/$/, "");
  if (configured) return configured;

  const apiBaseUrl = getApiBaseUrl();
  if (apiBaseUrl.startsWith("/")) return "";

  return apiBaseUrl.replace(/\/api$/, "");
}

export function createAuctionHub() {
  const baseUrl = getRealtimeBaseUrl();
  const hubUrl = baseUrl ? `${baseUrl}/${AUCTION_HUB_PATH}` : `/${AUCTION_HUB_PATH}`;

  return new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => getAccessToken() ?? "",
    })
    .withAutomaticReconnect()
    .build();
}
