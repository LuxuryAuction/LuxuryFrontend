import { INotification } from "./types";

export const MOCK_NOTIFICATIONS: INotification[] = [
  {
    id: "1",
    type: "outbid",
    title: "You've been outbid on \"Roman Statuette\"",
    message: "j_miller84 placed a bid of ₴8,400. Your bid was ₴8,200. New minimum to bid: ₴8,600",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 mins ago
    isRead: false,
    actionUrl: "/user/auctions/fine-art",
  },
  {
    id: "2",
    type: "win",
    title: "Congratulations! You won \"Cartier Brooch\"",
    message: "You are the winning bidder at ₴12,750. Please complete payment within 48 hours to secure your item.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    isRead: false,
    actionUrl: "/user/profile/payments",
  },
  {
    id: "3",
    type: "payment",
    title: "Payment confirmed — Lot #0201",
    message: "Buyer has completed escrow payment for \"Ming Dynasty Vase\" (₴84,500). Funds are held securely until delivery is confirmed.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    isRead: false,
  },
  {
    id: "4",
    type: "outbid",
    title: "You've been outbid on \"Patek Philippe Chronograph\"",
    message: "New bid of ₴95,000 placed. Minimum bid is now ₴96,000",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    isRead: false,
    actionUrl: "/user/auctions/luxury-watches",
  },
  {
    id: "5",
    type: "ended",
    title: "Auction ended — \"Edwardian Diamond Ring\"",
    message: "The auction you were watching has ended. Final price: ₴4,800.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: false,
  },
  {
    id: "6",
    type: "system",
    title: "Your lot \"Abstract Composition No.7\" was extended",
    message: "A bid was placed in the last 10 minutes. The auction has been automatically extended by 24 hours.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    isRead: true,
  },
  {
    id: "7",
    type: "win",
    title: "Lot approved — \"Illuminated Book of Hours\"",
    message: "Your lot has been reviewed and approved by admin. It is now ACTIVE and accepting bids.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    isRead: true,
  },
];

