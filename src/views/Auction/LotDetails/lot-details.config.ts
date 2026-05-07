import { ILotDetails } from "./types";

export const MOCK_LOT_DETAILS: ILotDetails = {
  id: "1",
  lotNumber: "8492",
  title: "Vintage Rolex Submariner 1969 Ref. 5513",
  category: "Luxury Watches",
  description: "Exceptional vintage Submariner with original 'meters first' matte dial. Kept in a safe for 20 years, untouched case with thick lugs and chamfers.",
  images: [
    "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
    "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&q=80",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80"
  ],
  currentPrice: 1450,
  startingBid: 8000,
  minStep: 100,
  endTime: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString(),
  status: "ACTIVE",
  totalParticipants: 8,
  totalBids: 24,
  buyNowPrice: 500,
  publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  sex: "Male",
  seller: {
    name: "Alex Kovalenko",
    userName: "zaluzh",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.9,
    totalSales: 47
  },
  attributes: [
    { label: "Size", value: "42" },
    { label: "Condition", value: "1/10" },
    { label: "Sex", value: "Male" },
  ],
  bids: [
    {
      id: "b1",
      userName: "Marcus Aurelius",
      userAvatar: "https://i.pravatar.cc/150?u=marcus",
      amount: 1450,
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      isLeading: true
    },
    {
      id: "b2",
      userName: "Hadrian",
      userAvatar: "https://i.pravatar.cc/150?u=hadrian",
      amount: 1350,
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      isLeading: false
    },
    {
      id: "b3",
      userName: "Nero Claudius",
      userAvatar: "https://i.pravatar.cc/150?u=nero",
      amount: 1200,
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      isLeading: false
    },
    {
      id: "b4",
      userName: "Trajan",
      userAvatar: "https://i.pravatar.cc/150?u=trajan",
      amount: 1100,
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      isLeading: false
    }
  ],
  messages: [
    {
      id: "m1",
      userName: "Trajan",
      userAvatar: "https://i.pravatar.cc/150?u=trajan",
      message: "Does it come with original box and papers?",
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      role: "bidder"
    },
    {
      id: "m2",
      userName: "Alex Kovalenko",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200",
      message: "This listing is for the watch only. However, it was recently serviced by an authorized Rolex center.",
      timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
      role: "seller"
    },
    {
      id: "m3",
      userName: "Marcus Aurelius",
      userAvatar: "https://i.pravatar.cc/150?u=marcus",
      message: "Beautiful piece! Is the lume still glowing?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      role: "bidder"
    }
  ],
  winnerId: "b1",
};
