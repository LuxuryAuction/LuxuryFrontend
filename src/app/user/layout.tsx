"use client"

import { useSidebar } from "@/src/hooks/useSidebar";
import { Sidebar } from "@/src/views/Sidebar/Sidebar";
import { NAV_GROUPS } from "@/src/views/Sidebar/sidebar.config";
import { TopBar } from "@/src/views/TopBar";


import { USER_DATA } from "@/src/views/Profile/profile.config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {
    isOpen, isCollapsed, isMounted, toggleDrawer, closeDrawer, toggleCollapse,
  } = useSidebar();

  const marginClass = isMounted && isCollapsed ? "md:ml-16" : "md:ml-[248px]";

  return (
    <div className="min-h-screen bg-auth-app">
      <Sidebar
        groups={NAV_GROUPS}
        user={{
          name: USER_DATA.name,
          role: "Verified Seller",
          avatarUrl: USER_DATA.avatarUrl
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
          userName={USER_DATA.name}
          userAvatar={USER_DATA.avatarUrl}
        />
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}
