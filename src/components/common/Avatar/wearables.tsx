export type AvatarWearableSlot =
  | "clothes"
  | "headwear"
  | "accessory"
  | "frame";

export type AvatarWearableId =
  | "auction_bomber"
  | "elite_turtleneck"
  | "power_coat"
  | "verified_frame"
  | "velvet_rope_frame"
  | "emerald_trust_ring"
  | "crown_lot"
  | "seller_snapback"
  | "collector_shades"
  | "diamond_earring"
  | "laurel_pin";

export type EquippedAvatarWearables = Partial<Record<AvatarWearableSlot, AvatarWearableId>>;

export type AvatarWearableRarity = "common" | "rare" | "epic" | "legendary";

export interface AvatarWearable {
  id: AvatarWearableId;
  slot: AvatarWearableSlot;
  name: string;
  description: string;
  rarity: AvatarWearableRarity;
  unlockedByBadgeType: string;
}

export const AVATAR_WEARABLES: AvatarWearable[] = [
  {
    id: "auction_bomber",
    slot: "clothes",
    name: "Auction Bomber",
    description: "Куртка продавця для тих, хто виставив перший лот.",
    rarity: "rare",
    unlockedByBadgeType: "first_listing",
  },
  {
    id: "elite_turtleneck",
    slot: "clothes",
    name: "Elite Turtleneck",
    description: "Мінімалістичний luxury-fit для елітних продавців.",
    rarity: "epic",
    unlockedByBadgeType: "seller_50",
  },
  {
    id: "power_coat",
    slot: "clothes",
    name: "Power Seller Coat",
    description: "Темне пальто для користувачів із 100+ продажами.",
    rarity: "legendary",
    unlockedByBadgeType: "power_seller",
  },
  {
    id: "verified_frame",
    slot: "frame",
    name: "Verified Blue Frame",
    description: "Фірмова синя рамка після верифікації.",
    rarity: "epic",
    unlockedByBadgeType: "verified",
  },
  {
    id: "velvet_rope_frame",
    slot: "frame",
    name: "Velvet Rope Frame",
    description: "VIP-рамка для досвідченого продавця.",
    rarity: "rare",
    unlockedByBadgeType: "seller_10",
  },
  {
    id: "crown_lot",
    slot: "headwear",
    name: "Lot Crown",
    description: "Корона за першу перемогу на аукціоні.",
    rarity: "rare",
    unlockedByBadgeType: "first_win",
  },
  {
    id: "collector_shades",
    slot: "accessory",
    name: "Collector Shades",
    description: "Окуляри колекціонера за серію виграних лотів.",
    rarity: "rare",
    unlockedByBadgeType: "collector",
  },
  {
    id: "diamond_earring",
    slot: "accessory",
    name: "Diamond Earring",
    description: "Маленький блиск для серйозного колекціонера.",
    rarity: "epic",
    unlockedByBadgeType: "patron",
  },
  {
    id: "laurel_pin",
    slot: "accessory",
    name: "Laurel Pin",
    description: "Золотий лацкан-пін за 10+ продажів.",
    rarity: "rare",
    unlockedByBadgeType: "seller_10",
  },
];

export const AVATAR_WEARABLE_SLOT_LABELS: Record<AvatarWearableSlot, string> = {
  clothes: "Clothes",
  headwear: "Headwear",
  accessory: "Accessory",
  frame: "Frame",
};

export function getAvatarWearable(id: AvatarWearableId) {
  return AVATAR_WEARABLES.find((wearable) => wearable.id === id) ?? null;
}

interface WearableLayerProps {
  id: AvatarWearableId;
}

export function AvatarWearableLayer({ id }: WearableLayerProps) {
  switch (id) {
    case "auction_bomber":
      return (
        <svg className="pointer-events-none absolute inset-x-[4%] bottom-[-8%] h-[52%] w-[92%]" viewBox="0 0 100 72" fill="none" aria-hidden>
          <path d="M10 69C13 45 28 31 50 31C72 31 87 45 90 69H10Z" fill="#111827" />
          <path d="M26 69C28 49 37 37 50 37C63 37 72 49 74 69H26Z" fill="#f0a500" />
          <path d="M35 34L50 55L65 34" stroke="#fff4cc" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 69C21 49 33 36 50 36C67 36 79 49 82 69" stroke="#05070c" strokeWidth="4" strokeLinecap="round" />
          <path d="M26 69L34 42" stroke="#2b3242" strokeWidth="5" strokeLinecap="round" />
          <path d="M74 69L66 42" stroke="#2b3242" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case "elite_turtleneck":
      return (
        <svg className="pointer-events-none absolute inset-x-[8%] bottom-[-9%] h-[50%] w-[84%]" viewBox="0 0 100 72" fill="none" aria-hidden>
          <path d="M17 70C21 47 34 35 50 35C66 35 79 47 83 70H17Z" fill="#0c0d12" />
          <path d="M37 35C38 25 43 20 50 20C57 20 62 25 63 35V48H37V35Z" fill="#14161f" stroke="#2f3442" strokeWidth="4" />
          <path d="M30 70C31 52 39 42 50 42C61 42 69 52 70 70H30Z" fill="#f7f0df" opacity="0.95" />
          <path d="M37 39H63" stroke="#d6c8ad" strokeWidth="3" strokeLinecap="round" />
          <path d="M29 70L36 43" stroke="#252a35" strokeWidth="5" strokeLinecap="round" />
          <path d="M71 70L64 43" stroke="#252a35" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case "power_coat":
      return (
        <svg className="pointer-events-none absolute inset-x-[3%] bottom-[-10%] h-[56%] w-[94%]" viewBox="0 0 100 76" fill="none" aria-hidden>
          <path d="M9 74C13 45 29 29 50 29C71 29 87 45 91 74H9Z" fill="#07080c" />
          <path d="M28 74L38 33L50 52L62 33L72 74H28Z" fill="#1e2430" />
          <path d="M38 33L50 52L62 33" stroke="#f0a500" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 74C22 51 34 37 50 37C66 37 78 51 81 74" stroke="#05070c" strokeWidth="5" strokeLinecap="round" />
          <path d="M31 54H41" stroke="#f0a500" strokeWidth="3" strokeLinecap="round" />
          <path d="M59 54H69" stroke="#f0a500" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "verified_frame":
      return (
        <svg className="pointer-events-none absolute inset-[-5%] h-[110%] w-[110%]" viewBox="0 0 100 100" fill="none" aria-hidden>
          <circle cx="50" cy="50" r="45" stroke="#05070c" strokeWidth="7" />
          <circle cx="50" cy="50" r="45" stroke="#2F88FF" strokeWidth="5" />
          <circle cx="50" cy="50" r="39" stroke="white" strokeOpacity="0.48" strokeWidth="1.8" strokeDasharray="4 8" />
          <path d="M76 63L80 66L85 66L87 71L91 74L89 79L91 84L87 87L85 92L80 92L76 95L72 92L67 92L65 87L61 84L63 79L61 74L65 71L67 66L72 66L76 63Z" fill="#2F88FF" stroke="#05070c" strokeWidth="3" />
          <path d="M71 79L75 83L82 74" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "velvet_rope_frame":
      return (
        <svg className="pointer-events-none absolute inset-[-5%] h-[110%] w-[110%]" viewBox="0 0 100 100" fill="none" aria-hidden>
          <circle cx="50" cy="50" r="45" stroke="#09090b" strokeWidth="7" />
          <circle cx="50" cy="50" r="45" stroke="#7f1d1d" strokeWidth="5" />
          <circle cx="50" cy="50" r="39" stroke="#f0a500" strokeOpacity="0.7" strokeWidth="2" strokeDasharray="9 6" />
          <path d="M20 80C34 91 66 91 80 80" stroke="#f0a500" strokeWidth="4" strokeLinecap="round" />
          <circle cx="18" cy="79" r="5" fill="#7f1d1d" stroke="#f0a500" strokeWidth="2" />
          <circle cx="82" cy="79" r="5" fill="#7f1d1d" stroke="#f0a500" strokeWidth="2" />
        </svg>
      );

    case "emerald_trust_ring":
      return (
        <svg className="pointer-events-none absolute inset-[-4%] h-[108%] w-[108%]" viewBox="0 0 100 100" fill="none" aria-hidden>
          <circle cx="50" cy="50" r="46" stroke="#052e1a" strokeWidth="7" />
          <circle cx="50" cy="50" r="45" stroke="#22c55e" strokeWidth="4.5" />
          <path d="M50 4L56 13L50 22L44 13L50 4Z" fill="#86efac" stroke="#052e1a" strokeWidth="2" />
          <path d="M50 96L56 87L50 78L44 87L50 96Z" fill="#86efac" stroke="#052e1a" strokeWidth="2" />
          <path d="M4 50L13 44L22 50L13 56L4 50Z" fill="#86efac" stroke="#052e1a" strokeWidth="2" />
          <path d="M96 50L87 44L78 50L87 56L96 50Z" fill="#86efac" stroke="#052e1a" strokeWidth="2" />
        </svg>
      );

    case "crown_lot":
      return (
        <svg className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-[0_5px_8px_rgba(0,0,0,0.5)]" viewBox="0 0 100 58" fill="none" aria-hidden>
          <path d="M13 45L20 19L39 35L50 10L61 35L80 19L87 45H13Z" fill="#f0a500" stroke="#211704" strokeWidth="5" strokeLinejoin="round" />
          <path d="M21 44H79V52H21V44Z" fill="#c47d00" stroke="#211704" strokeWidth="4" />
          <path d="M33 43L50 16L67 43" stroke="#fff2b8" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="10" r="5" fill="#fff2b8" />
          <circle cx="20" cy="19" r="4" fill="#fff2b8" />
          <circle cx="80" cy="19" r="4" fill="#fff2b8" />
        </svg>
      );

    case "seller_snapback":
      return (
        <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[86%] w-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)]" viewBox="0 0 100 48" fill="none" aria-hidden>
          <path d="M20 31C24 13 38 7 55 11C70 15 79 24 82 37C64 29 43 28 20 31Z" fill="#111827" stroke="#05070c" strokeWidth="5" strokeLinejoin="round" />
          <path d="M53 12C63 15 72 23 77 35" stroke="#f0a500" strokeWidth="4" strokeLinecap="round" />
          <path d="M18 31C36 28 60 30 89 39C76 45 51 43 20 35L18 31Z" fill="#f0a500" stroke="#05070c" strokeWidth="4" strokeLinejoin="round" />
          <path d="M39 20H55" stroke="#f0a500" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "collector_shades":
      return (
        <svg className="pointer-events-none absolute left-[17%] top-[36%] h-[21%] w-[66%] drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]" viewBox="0 0 100 40" fill="none" aria-hidden>
          <path d="M7 13C16 10 29 10 40 13C42 21 38 30 28 32C18 34 10 27 7 13Z" fill="#06070a" stroke="#f0a500" strokeWidth="4" />
          <path d="M93 13C84 10 71 10 60 13C58 21 62 30 72 32C82 34 90 27 93 13Z" fill="#06070a" stroke="#f0a500" strokeWidth="4" />
          <path d="M40 17C46 13 54 13 60 17" stroke="#f0a500" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M19 15L32 28" stroke="white" strokeOpacity="0.22" strokeWidth="3" strokeLinecap="round" />
          <path d="M69 15L82 28" stroke="white" strokeOpacity="0.22" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "diamond_earring":
      return (
        <svg className="pointer-events-none absolute right-[17%] top-[47%] h-[18%] w-[18%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]" viewBox="0 0 40 40" fill="none" aria-hidden>
          <path d="M20 4L32 16L20 36L8 16L20 4Z" fill="#dbeafe" stroke="#172554" strokeWidth="3" strokeLinejoin="round" />
          <path d="M8 16H32M20 4L16 16L20 36L24 16L20 4Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "laurel_pin":
      return (
        <svg className="pointer-events-none absolute left-[62%] top-[61%] h-[19%] w-[19%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" viewBox="0 0 42 42" fill="none" aria-hidden>
          <circle cx="21" cy="21" r="15" fill="#f0a500" stroke="#211704" strokeWidth="4" />
          <path d="M15 24C13 18 16 13 21 11C26 13 29 18 27 24C24 22 18 22 15 24Z" fill="#fff2b8" />
          <path d="M21 12V30" stroke="#211704" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    default:
      return null;
  }
}
