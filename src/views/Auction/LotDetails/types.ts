export interface IChatMessage {
  id: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  role?: "seller" | "bidder";
  isOwn?: boolean;
}