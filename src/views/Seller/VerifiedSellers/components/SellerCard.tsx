import { Link } from "@/src/i18n/navigation";
import { Avatar } from "@/src/components/common/Avatar";
import { ISeller } from "../types";
import { TIER_CONFIG, getTier } from "../sellerConfig";
import { TierBadge } from "./TierBadge";
import { formatDisplayValue } from "@/src/utils/textUtils";

interface SellerCardProps {
  seller: ISeller;
  index: number;
}

export const SellerCard = ({ seller, index }: SellerCardProps) => {
  const tier = getTier(seller.totalSales);
  const cfg = TIER_CONFIG[tier];

  return (
    <Link
      href={`/sellers/${seller.id}`}
      className="group relative flex flex-col md:flex-row items-start md:items-center py-8 border-b border-white/5 gap-8 hover:bg-white/[0.01] transition-colors -mx-4 px-4 sm:-mx-6 sm:px-6 animate-bvCatFadeUp"
      style={{
        animationDelay: `${0.06 + index * 0.08}s`,
      }}
    >
      <div className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-[120px] text-white/[0.01] italic select-none pointer-events-none group-hover:text-brand-primary/[0.02] transition-colors duration-500">
        #{index + 1}
      </div>

      <div className="flex items-center gap-6 md:w-1/3">
        <div className="relative shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[1px] bg-white/10 group-hover:bg-brand-primary/30 transition-colors">
            <div className="w-full h-full rounded-full bg-[#0d0f14] overflow-hidden">
              <Avatar
                name={seller.username}
                bgColor={cfg.bg}
                className="w-full h-full text-[1.4rem] sm:text-[1.6rem] !rounded-none !bg-transparent !border-none !text-content-primary"
              />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center bg-[#0d0f14] border border-white/10 z-10">
            <span className="text-[10px]">{cfg.icon}</span>
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-xl sm:text-2xl text-white tracking-tight mb-1 group-hover:text-brand-primary transition-colors truncate">
            {formatDisplayValue(seller.username)}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] sm:text-xs text-white/30 uppercase">@{seller.username}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full md:w-auto">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Sales', val: seller.totalSales.toLocaleString(), primary: true },
            { label: 'Active', val: seller.activeLots },
            { label: 'Avg Price', val: seller.avgPrice }
          ].map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/20">{s.label}</span>
              <span className={`font-bold text-sm sm:text-base ${s.primary ? 'text-brand-primary' : 'text-white/60'}`}>
                {s.val}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between w-full md:w-1/4 shrink-0 gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/20">Trust Score</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(dot => (
              <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot < 5 ? 'bg-brand-primary' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <TierBadge tier={tier} />
          
          <svg className="w-5 h-5 text-white/10 group-hover:text-white transition-colors -rotate-45 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
};
