"use client";

import { ArrowDownIcon, HamburgerIcon, NotificationIcon } from "@/public/assets/icons";
import { Avatar } from "@/src/components/common/Avatar";
import { Select } from "@/src/components/ui/Select";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { routing } from "@/src/i18n/routing";
import { useToast } from "@/src/components/ui/Toast";
import { languages, userOptions } from "./config";
import { capitalize } from "@/src/utils/textUtils";
import { useAuth } from "@/src/hooks/useAuth";

interface TopBarProps {
  toggleDrawer: () => void;
  userName: string;
  userAvatar?: string;
}


function useBreadcrumb() {
  const t = useTranslations("TopBar");
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = ["BidVault", ...segments.map(capitalize)];
  const pageTitle = segments.length > 0 ? capitalize(segments[segments.length - 1]) : t("home");
  return { crumbs, pageTitle, pathname };
}

export const TopBar = ({ toggleDrawer, userName, userAvatar }: TopBarProps) => {
  const t = useTranslations("TopBar");
  const { crumbs, pageTitle, pathname } = useBreadcrumb();
  const router = useRouter();
  const locale = useLocale();
  const { showToast } = useToast();
  const { logout } = useAuth();

  const handleLocaleChange = (next: string) => {
    if (routing.locales.includes(next as (typeof routing.locales)[number])) {
      router.replace(pathname, { locale: next });
    }
  };

  const handleUserAction = async (action: string) => {
    switch (action) {
      case "logout":
        await logout();
        showToast("success", t("logoutSuccess"), "bottom-right");
        router.push("/login");
        break;
      case "profile":
        router.push("/user/profile");
        break;
      case "settings":
        router.push("/user/settings");
        break;
    }
  };

  return (
    <header className="sticky top-0 z-40 h-14 flex items-center justify-between px-5 gap-4 bg-[#0b0c0f] border-b border-[#2a2e3a]">

      <div className="flex items-center gap-3">
        <button
          onClick={toggleDrawer}
          aria-label="Open menu"
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-[8px] bg-[#1c1f27] border border-[#2a2e3a] text-[#4a5270] hover:text-[#e8eaf0] hover:border-[#353a4a] transition-all"
        >
          <HamburgerIcon className="w-4 h-4" />
        </button>

        <div className="flex flex-col justify-center">
          <span className="text-md font-semibold text-white leading-tight">
            {pageTitle}
          </span>
          <span className="hidden md:block text-[0.65rem] text-[#4a5270] leading-tight tracking-wide">
            {crumbs.join(" / ")}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Select
          options={languages}
          value={locale}
          onChange={handleLocaleChange}
          align="right"
          renderTrigger={(isOpen) => (
            <button className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#2a2e3a] bg-[#13151a] text-xs font-medium text-[#8892a8] hover:text-[#e8eaf0] hover:border-[#353a4a] transition-all cursor-pointer ${isOpen ? "border-brand-primary/50 text-[#e8eaf0]" : ""}`}>
              <span className="uppercase">{locale}</span>
              <ArrowDownIcon className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
          )}
        />

        <button
          onClick={() => router.push("/user/notifications")}
          aria-label="Notifications"
          className="relative w-8 h-8 flex items-center justify-center rounded-[8px] bg-[#13151a] border border-[#2a2e3a] text-[#4a5270] hover:text-brand-primary hover:border-brand-primary/30 transition-all shrink-0 cursor-pointer group/nav"
        >
          <NotificationIcon className="w-4 h-4 transition-transform group-hover/nav:scale-110" />

          <span className="absolute top-[6px] right-[6px] w-[7px] h-[7px] rounded-full bg-brand-primary border-2 border-[#0b0c0f] animate-bvPulseSoft shadow-[0_0_8px_rgba(240,165,0,0.5)]" />
        </button>

        <Select
          options={userOptions.map(opt => ({ ...opt, label: t(`userOptions.${opt.value}`) }))}
          onChange={handleUserAction}
          align="right"
          renderTrigger={(isOpen) => (
            <Avatar
              name={userName}
              src={userAvatar}
              size="md"
              className={`transition-all duration-300 ${isOpen
                ? "ring-4 ring-brand-primary/30 border-brand-primary scale-110 shadow-[0_0_20px_rgba(240,165,0,0.3)]"
                : "hover:scale-105 hover:border-brand-primary/50"
                }`}
            />
          )}
        />
      </div>
    </header>
  );
};