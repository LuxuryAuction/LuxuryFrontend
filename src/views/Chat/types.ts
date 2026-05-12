import { IChatMessage } from "../Auction/LotDetails/types";

export interface IConversation {
  id: string;
  kind: "direct" | "lot";
  title: string;
  subtitle?: string;
  peerUserName: string;
  peerAvatar?: string;
  lastPreview: string;
  lastAt: string;
  unreadCount: number;
  messages: IChatMessage[];
}
