export type NotificationType = "bid" | "win" | "outbid" | "payment" | "system" | "approval" | "ended";

export interface INotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}
