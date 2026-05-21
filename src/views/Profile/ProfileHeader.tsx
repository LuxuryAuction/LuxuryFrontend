import { Avatar } from "@/src/components/common/Avatar";
import { USER_STATS } from "./profile.config";
import { IProfile } from "./types";
import { formatDateTime } from "@/src/utils/textUtils";
import { useTranslations } from "next-intl";
import { FlagIcon } from "@/public/assets/icons";

interface ProfileHeaderProps {
  profile: IProfile;
  isMe?: boolean;
  onReportClick?: () => void;
}

export const ProfileHeader = ({ profile, isMe = true, onReportClick }: ProfileHeaderProps) => {
  const t = useTranslations("ReportModal");

  return (
    <div className="relative bg-auth-app border border-border-primary rounded-lg px-4 md:px-8 py-5 md:py-6 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 mb-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-brand-primary via-[#e87c00] to-transparent opacity-80" />

      <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0 w-full">
        <Avatar name={profile.name} size="lg" className="w-16 h-16 md:w-[72px] md:h-[72px] text-[1.4rem] shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 justify-between md:justify-start">
            <div className="text-[1.2rem] md:text-[1.4rem] font-bold text-content-light truncate">{profile.name}</div>
            {!isMe && onReportClick && (
              <button
                onClick={onReportClick}
                className="flex items-center gap-1.5 bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.2)] rounded-md px-3 py-[0.3rem] font-mono text-[0.6rem] md:text-[0.65rem] text-[#ef4444] hover:bg-[rgba(239,68,68,0.12)] hover:border-[rgba(239,68,68,0.35)] transition-all cursor-pointer group"
              >
                <FlagIcon className="w-3 h-3 group-hover:scale-110 transition-transform" />
                {t("reportButton")}
              </button>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-1 items-centergap-2 font-mono text-[0.65rem] md:text-[0.7rem] text-content-tertiary mt-0.5 mb-3">
            @{profile.userName} <span className="hidden md:block opacity-30 mx-1">·</span> <div>Member since {formatDateTime(profile.memberSince)}</div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            {profile.isVerified && (
              <div className="flex items-center gap-2 bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.2)] rounded-md px-3 py-[0.3rem] font-mono text-[0.6rem] md:text-[0.65rem] text-[#22c55e]">
                <span className="text-[0.7rem]">✓</span> Verified Seller <span className="opacity-20 mx-1">|</span> Trust Score: {profile.trustScore}/100
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-start lg:justify-end gap-6 sm:gap-10 md:gap-12 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-border-primary/50 lg:ml-auto px-4 lg:px-0">
        {USER_STATS.map(({ val, label }) => (
          <div key={label} className="flex flex-col items-center">
            <div className="text-[1.2rem] md:text-[1.3rem] font-bold text-content-light leading-none">{val}</div>
            <div className="font-mono text-[0.55rem] md:text-[0.58rem] tracking-widest uppercase text-content-tertiary mt-1.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
