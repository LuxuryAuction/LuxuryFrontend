import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/icons";
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
      className="group relative flex flex-col md:flex-row items-center md:items-stretch gap-8 p-6 rounded-[24px] transition-all duration-500 bg-[#0d0f14] border border-white/[0.03] hover:border-brand-primary/30 hover:bg-[#11141d] overflow-hidden animate-bvCatFadeUp"
      style={{
        animationDelay: `${0.06 + index * 0.08}s`,
      }}
    >
      <div className="absolute right-6 -bottom-5 font-black text-[120px] text-white/[0.02] italic select-none pointer-events-none group-hover:text-brand-primary/[0.03] transition-colors duration-500">
        #{index + 1}
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-in-out" />
      </div>

      <div className="relative shrink-0">
        <div
          className="w-20 h-20 rounded-[22px] p-[2px]"
          style={{ background: `linear-gradient(135deg, ${cfg.color}, transparent)` }}
        >
          <div className="w-full h-full rounded-[20px] bg-[#0d0f14] overflow-hidden relative">
            <Avatar
              name={seller.username}
              bgColor={cfg.bg}
              className="w-full h-full text-[1.6rem] !rounded-none !bg-transparent !border-none !text-content-primary"
            />
          </div>
        </div>

        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center bg-[#0d0f14] border border-white/10 shadow-2xl z-10">
          <span className="text-[14px] drop-shadow-md">{cfg.icon}</span>
        </div>
      </div>

      <div className="flex-1 min-w-0 relative z-10 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row md:items-end gap-3 mb-4">
          <div className="min-w-0">
            <h3 className="font-black text-[22px] tracking-tight text-white mb-1 group-hover:text-brand-primary transition-colors truncate">
              {formatDisplayValue(seller.username)}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[11px] text-brand-primary/60 tracking-wider uppercase">@{seller.username}</span>
              <span className="w-1 h-1 rounded-full bg-white/10 hidden sm:block" />
              <span className="font-mono text-[10px] text-content-tertiary uppercase hidden sm:block">Member since {seller.joinedYear}</span>
            </div>
          </div>
          <div className="md:ml-auto">
            <TierBadge tier={tier} />
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-y border-white/[0.04]">
          {[
            { label: 'Sales', val: seller.totalSales.toLocaleString(), primary: true },
            { label: 'Active', val: seller.activeLots },
            { label: 'Avg Price', val: seller.avgPrice }
          ].map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-content-tertiary">{s.label}</span>
              <span className={`font-bold text-[15px] ${s.primary ? 'text-brand-primary' : 'text-content-secondary'}`}>
                {s.val}
              </span>
            </div>
          ))}

          <div className="hidden sm:flex flex-col gap-1 items-end">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-content-tertiary">Trust Score</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(dot => (
                <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot < 5 ? 'bg-brand-primary' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 self-center">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/[0.05] group-hover:bg-brand-primary group-hover:border-brand-primary transition-all duration-300 shadow-xl group-hover:shadow-brand-primary/20">
          <ArrowRightIcon className="w-5 h-5 text-content-tertiary group-hover:text-black transition-colors" />
        </div>
      </div>
    </Link>
  );
};
