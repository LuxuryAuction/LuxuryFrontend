"use client"

import { useTranslations } from "next-intl";
import { useSidebar } from "@/src/hooks/useSidebar";
import { Sidebar } from "@/src/views/Sidebar/Sidebar";
import { NAV_GROUPS } from "@/src/views/Sidebar/sidebar.config";
import { useUserProfile } from "@/src/hooks/useUserProfile";
import { TopBar } from "@/src/views/TopBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations("Sidebar.user");
  const {
    isOpen, isCollapsed, isMounted, toggleDrawer, closeDrawer, toggleCollapse,
  } = useSidebar();

  const { data: profile } = useUserProfile();

  const marginClass = isMounted && isCollapsed ? "md:ml-16" : "md:ml-[248px]";

  return (
    <div className="min-h-screen bg-auth-app">
      <Sidebar
        groups={NAV_GROUPS}
        user={{
          name: profile?.name || "",
          role: profile?.isVerified ? t("verifiedSeller") : t("member"),
          avatarUrl: undefined
        }}
        logoHref="/"
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
          userName={profile?.name || ""}
          userAvatar={undefined}
        />
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}
