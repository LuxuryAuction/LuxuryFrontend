import { Avatar } from "@/src/components/common/Avatar";
import { USER_DATA, USER_STATS } from "./profile.config";

export const ProfileHeader = () => {
  return (
    <div className="relative bg-auth-app border border-border-primary rounded-lg px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-5 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#f0a500] via-[#e87c00] to-transparent" />
      <Avatar name={USER_DATA.avatarName} size="lg" className="w-[72px] h-[72px] text-[1.4rem]" />

      <div className="flex-1 min-w-0">
        <div className="text-[1.2rem] font-bold text-content-light">{USER_DATA.name}</div>
        <div className="font-mono text-[0.65rem] text-content-tertiary mb-[0.6rem]">
          {USER_DATA.username} · Member since {USER_DATA.memberSince}
        </div>
        <div className="flex gap-1.5 flex-wrap items-center">
          {USER_DATA.isVerified && (
            <div className="flex items-center gap-1 bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.2)] rounded-md px-4 py-[0.3rem] font-mono text-[0.6rem] text-[#22c55e]">
              ✓ Verified Seller · Trust Score: {USER_DATA.trustScore}/100
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-6 sm:gap-8 text-center md:ml-auto">
        {USER_STATS.map(({ val, label }) => (
          <div key={label}>
            <div className="text-[1.3rem] font-bold text-content-light">{val}</div>
            <div className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-content-tertiary mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
