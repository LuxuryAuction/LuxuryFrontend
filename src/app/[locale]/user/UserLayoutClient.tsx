"use client";

import { useLayoutEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { useSidebar } from "@/src/hooks/useSidebar";
import { useGetProfile } from "@/src/hooks/useUserProfile";
import { AppDispatch, RootState } from "@/src/store";
import { setAuth } from "@/src/store/slices/authSlice";
import { TopBar } from "@/src/views/TopBar";
import { Sidebar } from "@/src/views/Sidebar/Sidebar";
import { getProfileHref, getUserNavGroups } from "@/src/views/Sidebar/sidebar.config";
import type { AuthSession } from "@/src/utils/authSession";

type UserLayoutClientProps = {
  children: React.ReactNode;
  initialAuth: AuthSession;
};

export function UserLayoutClient({ children, initialAuth }: UserLayoutClientProps) {
  const dispatch = useDispatch<AppDispatch>();
  const reduxUserName = useSelector((state: RootState) => state.auth.userName);
  const reduxUserRole = useSelector((state: RootState) => state.auth.userRole);
  const reduxIsAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const userName = reduxUserName ?? initialAuth.userName;
  const userRole = reduxUserRole ?? initialAuth.userRole;
  const isAuthenticated = reduxIsAuthenticated || initialAuth.isAuthenticated;

  const t = useTranslations("Sidebar.user");
  const {
    isOpen,
    isCollapsed,
    isMounted,
    toggleDrawer,
    closeDrawer,
    toggleCollapse,
  } = useSidebar();

  useLayoutEffect(() => {
    if (initialAuth.isAuthenticated) {
      dispatch(
        setAuth({
          userId: initialAuth.userId,
          userName: initialAuth.userName,
          userRole: initialAuth.userRole,
        }),
      );
    }
  }, [dispatch, initialAuth]);

  const { data: profile } = useGetProfile(
    isAuthenticated ? (userName ?? undefined) : undefined,
  );

  const navGroups = useMemo(
    () => getUserNavGroups(userName, userRole, isAuthenticated),
    [userName, userRole, isAuthenticated],
  );
  const profileHref = getProfileHref(userName);

  const marginClass = isMounted && isCollapsed ? "md:ml-16" : "md:ml-[248px]";

  return (
    <div className="min-h-screen bg-auth-app">
      <Sidebar
        groups={navGroups}
        user={{
          name: profile?.name || "",
          role: profile?.isVerified ? t("verifiedSeller") : t("member"),
          avatarUrl: profile?.profileImageUrl,
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
          userAvatar={profile?.profileImageUrl}
          initialIsAuthenticated={initialAuth.isAuthenticated}
        />
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}
