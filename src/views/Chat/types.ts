import { IChatMessage } from "../Auction/LotDetails/types";

export interface IConversation {
  id: string;
  chatId: number;
  kind: "direct" | "lot";
  title: string;
  subtitle?: string;
  otherUserId: number;
  peerUserName: string;
  peerAvatar?: string;
  lastPreview: string;
  lastAt: string;
  unreadCount: number;
  messages: IChatMessage[];
}
