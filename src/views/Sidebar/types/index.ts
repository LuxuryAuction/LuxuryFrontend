export type BadgeVariant = "danger" | "warning" | "success";

export type NavBadge = {
  count: number;
  variant?: BadgeVariant;
};

export type NavItem = {
  id: string;
  /** Message key under `Sidebar` (e.g. `nav.login`). */
  labelKey: string;
  href: string;
  icon: React.ReactNode;
  badge?: NavBadge;
  disabled?: boolean;
};

export type NavGroup = {
  /** Message key under `Sidebar` (e.g. `groups.auth`). */
  titleKey: string;
  items: NavItem[];
};

export type SidebarUser = {
  name: string;
  role: string;
  avatarUrl?: string;
  href?: string;
};
