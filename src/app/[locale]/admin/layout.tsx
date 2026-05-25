"use client"

import { useTranslations } from "next-intl";
import { useSidebar } from "@/src/hooks/useSidebar";
import { Sidebar } from "@/src/views/Sidebar/Sidebar";
import { ADMIN_NAV_GROUPS } from "@/src/views/Sidebar/sidebar.config";
import { useGetProfile } from "@/src/hooks/useUserProfile";
import { TopBar } from "@/src/views/TopBar";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const t = useTranslations("Sidebar.user");
  const {
    isOpen, isCollapsed, isMounted, toggleDrawer, closeDrawer, toggleCollapse,
  } = useSidebar();

  const { data: profile } = useGetProfile(userId ?? undefined);

  const marginClass = isMounted && isCollapsed ? "md:ml-16" : "md:ml-[248px]";

  return (
    <div className="min-h-screen bg-admin-shell">
      <Sidebar
        groups={ADMIN_NAV_GROUPS}
        variant="admin"
        user={{
          name: profile?.name || t("administrator"),
          role: t("systemAdministrator"),
          avatarUrl: profile?.profileImageUrl,
        }}
        logoHref="/admin/dashboard"
        isCollapsed={isCollapsed}
        isOpen={isOpen}
        onClose={closeDrawer}
        onToggleCollapse={toggleCollapse}
      />
      <div
        className={`flex flex-col min-h-screen transition-[margin] duration-300 ${marginClass}`}
      >
        <TopBar
          toggleDrawer={toggleDrawer}
          userName={profile?.name || t("administrator")}
          userAvatar={profile?.profileImageUrl}
        />
        <main className="w-full h-full p-4 md:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
