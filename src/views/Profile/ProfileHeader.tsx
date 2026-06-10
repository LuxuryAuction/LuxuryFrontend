"use client";

import { Avatar } from "@/src/components/common/Avatar";
import { IProfile } from "./types";
import { formatDateTime } from "@/src/utils/textUtils";
import { useTranslations } from "next-intl";
import { ChatIcon, FlagIcon } from "@/public/assets/icons";
import { Link } from "@/src/i18n/navigation";

const actionBtn =
  "flex items-center justify-center gap-1.5 rounded-md px-2.5 sm:px-3 py-[0.35rem] font-mono text-[0.58rem] sm:text-[0.6rem] md:text-[0.65rem] transition-all cursor-pointer shrink-0";

interface ProfileHeaderProps {
  profile: IProfile;
  profileUserName?: string;
  isMe?: boolean;
  isAuthenticated?: boolean;
  onReportClick?: () => void;
}

export const ProfileHeader = ({
  profile,
  profileUserName,
  isMe = true,
  isAuthenticated = false,
  onReportClick,
}: ProfileHeaderProps) => {
  const t = useTranslations("ProfilePage");
  const tReport = useTranslations("ReportModal");

  const peerSlug = profile.userName || profileUserName;
  const chatHref = peerSlug
    ? `/user/chat?user=${encodeURIComponent(peerSlug)}`
    : "/user/chat";

  const userStats = [
    { val: String(profile.lotsSold), label: t("stats.lotsSold") },
    { val: String(profile.lotsBought), label: t("stats.lotsBought") },
    { val: String(profile.activeLots), label: t("stats.activeLots") },
  ];

  return (
    <div className="relative bg-auth-app border border-border-primary rounded-lg px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 flex flex-col lg:flex-row items-stretch lg:items-center gap-4 sm:gap-6 lg:gap-8 mb-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-brand-primary via-[#e87c00] to-transparent opacity-80" />

      <div className="flex flex-row items-start gap-3 sm:gap-4 md:gap-6 flex-1 min-w-0 w-full">
        <Avatar
          name={profile.name}
          src={profile.profileImageUrl}
          size="lg"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] text-[1.2rem] sm:text-[1.4rem] shrink-0"
        />
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-row gap-2 sm:justify-between md:justify-start md:gap-3 min-w-0 items-center md:items-start">
            <div className="text-[1.05rem] sm:text-[1.2rem] md:text-[1.4rem] font-bold text-content-light wrap-break-word min-w-0 leading-tight">
              {profile.name}
            </div>
            {!isMe && isAuthenticated && (
              <div className="flex items-center gap-2 flex-wrap w-auto sm:shrink-0">
                <Link
                  href={chatHref}
                  className={`${actionBtn} sm:flex-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary hover:bg-brand-primary/15 hover:border-brand-primary/35`}
                >
                  <ChatIcon className="w-3 h-3 shrink-0" />
                  <span className="hidden sm:inline">{t("actions.chat")}</span>
                </Link>
                {onReportClick && (
                  <button
                    type="button"
                    onClick={onReportClick}
                    className={`${actionBtn} sm:flex-1 bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.2)] text-[#ef4444] hover:bg-[rgba(239,68,68,0.12)] hover:border-[rgba(239,68,68,0.35)] group`}
                  >
                    <FlagIcon className="w-3 h-3 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">{tReport("reportButton")}</span>
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-0.5 font-mono text-[0.7rem] text-content-tertiary mt-1 sm:mt-0.5 mb-2 sm:mb-3">
            <span className="truncate">@{profile.userName}</span>
            <span className="hidden sm:inline opacity-30">·</span>
            <span className="text-content-tertiary/90">
              {t("memberSince")} {formatDateTime(profile.memberSince)}
            </span>
          </div>
          {profile.isVerified && (
            <div className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 max-w-full bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.2)] rounded-md px-2.5 sm:px-3 py-[0.3rem] font-mono text-[0.55rem] sm:text-[0.6rem] md:text-[0.65rem] text-[#22c55e]">
              <span className="text-[0.65rem] sm:text-[0.7rem] shrink-0">✓</span>
              <span>{t("verifiedSeller")}</span>
              <span className="opacity-20 hidden sm:inline">|</span>
              <span className="wrap-break-word">{t("trustScore", { score: profile.trustScore })}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full lg:w-auto lg:flex lg:items-center lg:justify-end lg:gap-10 xl:gap-12 pt-4 sm:pt-5 lg:pt-0 border-t lg:border-t-0 border-border-primary/50 lg:ml-auto">
        {userStats.map(({ val, label }) => (
          <div key={label} className="flex flex-col items-center justify-center min-w-0 px-1">
            <div className="text-[1.2rem] md:text-[1.3rem] font-bold text-content-light leading-none tabular-nums">
              {val}
            </div>
            <div className="font-mono text-[0.55rem] md:text-[0.58rem] tracking-wider sm:tracking-widest uppercase text-content-tertiary mt-1 sm:mt-1.5 text-center leading-tight max-w-full">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
