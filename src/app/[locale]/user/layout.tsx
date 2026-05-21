"use client"

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useSidebar } from "@/src/hooks/useSidebar";
import { Sidebar } from "@/src/views/Sidebar/Sidebar";
import { getProfileHref, getUserNavGroups } from "@/src/views/Sidebar/sidebar.config";
import { useGetProfile } from "@/src/hooks/useUserProfile";
import { TopBar } from "@/src/views/TopBar";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const t = useTranslations("Sidebar.user");
  const {
    isOpen, isCollapsed, isMounted, toggleDrawer, closeDrawer, toggleCollapse,
  } = useSidebar();

  const { data: profile } = useGetProfile(userId ?? undefined);

  const navGroups = useMemo(() => getUserNavGroups(userId, userRole), [userId, userRole]);
  const profileHref = getProfileHref(userId);

  const marginClass = isMounted && isCollapsed ? "md:ml-16" : "md:ml-[248px]";

  return (
    <div className="min-h-screen bg-auth-app">
      <Sidebar
        groups={navGroups}
        user={{
          name: profile?.name || "",
          role: profile?.isVerified ? t("verifiedSeller") : t("member"),
          avatarUrl: undefined,
          href: profileHref,
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
