export interface IUserProfile {
  name: string;
  userName: string;
  memberSince: string;
  avatarName: string;
  isVerified: boolean;
  trustScore: number;
}

// export type NotificationType =
//   | "bid"
//   | "win"
//   | "outbid"
//   | "payment"
//   | "system"
//   | "approval"
//   | "ended";

export interface INotification {
  id: string;
  type: string;
  title: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}