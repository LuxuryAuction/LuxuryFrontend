import { AdminDashboardIcon } from "@/public/assets/icons";
import { NavGroup, SidebarUser } from "./types";

function Ico({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      {children}
    </svg>
  );
}

const Icons = {
  home: (
    <Ico>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </Ico>
  ),

  lot: (
    <Ico>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </Ico>
  ),

  plus: (
    <Ico>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Ico>
  ),

  user: (
    <Ico>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Ico>
  ),

  file: (
    <Ico>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </Ico>
  ),

  bell: (
    <Ico>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </Ico>
  ),

  shield: (
    <Ico>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </Ico>
  ),

  dashboard: (
    <Ico>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </Ico>
  ),

  /** Admin Command Center — окремий asset `admin-dashboard-icon.svg`. */
  adminDashboard: <AdminDashboardIcon className="h-full w-full" aria-hidden />,

  eye: (
    <Ico>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </Ico>
  ),

  list: (
    <Ico>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </Ico>
  ),

  ban: (
    <Ico>
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </Ico>
  ),

  chart: (
    <Ico>
      <path d="M3 3v18h18" />
      <polyline points="18 17 13 12 9 16 3 10" />
    </Ico>
  ),

  chat: (
    <Ico>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Ico>
  ),

  card: (
    <Ico>
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </Ico>
  ),

  categories: (
    <Ico>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </Ico>
  ),
  users: (
    <Ico>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Ico>
  ),
  info: (
    <Ico>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </Ico>
  ),

  rules: (
    <Ico>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </Ico>
  ),
};

export const NAV_GROUPS: NavGroup[] = [
  {
    titleKey: "groups.main",
    items: [
      { id: "profile", labelKey: "nav.profile", href: "/user/profile", icon: Icons.user },
      { id: "categories", labelKey: "nav.categories", href: "/user/categories", icon: Icons.categories },
      { id: "create-lot", labelKey: "nav.createLot", href: "/user/create-lot", icon: Icons.plus },

      { id: "my-lots", labelKey: "nav.myLots", href: "/user/lots", icon: Icons.file },
      { id: "my-bids", labelKey: "nav.myBids", href: "/user/my-bids", icon: Icons.chart },
      {
        id: "notifications",
        labelKey: "nav.notifications",
        href: "/user/notifications",
        icon: Icons.bell,
        badge: { count: 5, variant: "danger" },
      },
      { id: "verified-sellers", labelKey: "nav.verifiedSellers", href: "/user/verified-sellers", icon: Icons.users },
    ],
  },
  {
    titleKey: "groups.direction",
    items: [
      { id: "info", labelKey: "nav.directionInfo", href: "/user/info", icon: Icons.info },
      {
        id: "auction-rules",
        labelKey: "nav.auctionRules",
        href: "/user/auction-rules",
        icon: Icons.rules,
      },
      { id: "trust", labelKey: "nav.trustSafety", href: "/user/trust", icon: Icons.shield },
    ],
  },
  {
    titleKey: "groups.sellers",
    items: [
      { id: "chat", labelKey: "nav.chats", href: "/user/chat", icon: Icons.chat },
    ],
  },
  {
    titleKey: "groups.admin",
    items: [
      { id: "dashboard", labelKey: "nav.dashboard", href: "/admin/dashboard", icon: Icons.home },
    ],
  },
];

export const DEFAULT_USER: SidebarUser = {
  name: "Alex Kovalenko",
  role: "User · Verified",
  href: "/user/profile",
};

export const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    titleKey: "groups.systemControl",
    items: [
      { id: "dashboard", labelKey: "adminNav.dashboard", href: "/admin/dashboard", icon: Icons.adminDashboard },
      { id: "categories", labelKey: "adminNav.categories", href: "/admin/categories", icon: Icons.categories },
      { id: "monitoring", labelKey: "adminNav.lotMonitoring", href: "/admin/lots", icon: Icons.eye, badge: { count: 12, variant: "warning" }, disabled: true },
      { id: "users", labelKey: "adminNav.userManagement", href: "/admin/users", icon: Icons.users },
    ],
  },
  {
    titleKey: "groups.financeSupport",
    items: [
      { id: "orders", labelKey: "adminNav.ordersPayments", href: "/admin/orders", icon: Icons.list, disabled: true },
      { id: "disputes", labelKey: "adminNav.disputes", href: "/admin/disputes", icon: Icons.chat, badge: { count: 3, variant: "danger" }, disabled: true },
    ],
  },
  {
    titleKey: "groups.enforcement",
    items: [
      { id: "reports", labelKey: "adminNav.reports", href: "/admin/reports", icon: Icons.file, disabled: true },
      { id: "bans", labelKey: "adminNav.banRegistry", href: "/admin/bans", icon: Icons.ban, disabled: true },
    ],
  },
  {
    titleKey: "groups.return",
    items: [
      { id: "exit", labelKey: "adminNav.backToApp", href: "/user/lots", icon: Icons.home },
    ],
  },
];