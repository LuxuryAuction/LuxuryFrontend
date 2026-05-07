export type BadgeVariant = "danger" | "warning" | "success";

export type NavBadge = {
  count: number;
  variant?: BadgeVariant;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: NavBadge;
  disabled?: boolean;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type SidebarUser = {
  name: string;
  role: string;
  avatarUrl?: string;
  href?: string;
};
