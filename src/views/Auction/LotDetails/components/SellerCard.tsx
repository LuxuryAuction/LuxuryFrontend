"use client";

import { ArrowRightIcon } from "@/public/assets/icons";
import { ILotDetailsSeller } from "@/src/services/LotsService/types";
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";

interface SellerCardProps {
  seller: ILotDetailsSeller
}

export const SellerCard = ({ seller }: SellerCardProps) => {
  return (
    <div className="p-6 rounded-[16px] bg-surface-secondary border border-border-primary flex items-center justify-between group hover:bg-surface-tertiary transition-all relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-brand-primary/30 to-transparent" />
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={seller.profileImageUrl}
            alt={seller.userName}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full border-2 border-border-primary group-hover:border-brand-primary/50 transition-all object-cover"
            unoptimized
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center border-2 border-surface-primary">
            <span className="text-[10px] text-black font-black">★</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-content-primary leading-tight">{seller.firstName} {seller.lastName}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] text-content-tertiary">@{seller.userName}</span>
            <div className="w-1 h-1 rounded-full bg-content-tertiary/30" />
            <span className="text-[11px] text-content-tertiary">
              {seller.totalSales != null ? `${seller.totalSales} sales` : "No sales yet"}
            </span>

            <div className="w-1 h-1 rounded-full bg-content-tertiary/30" />
            <span className="text-[11px] text-brand-primary font-bold">★ {seller.score}</span>
          </div>
        </div>
      </div>
      <Link
        href={`/user/profile/${seller.id}`}
        className="text-[11px] font-black uppercase tracking-widest text-brand-primary flex items-center gap-1.5 shrink-0 transition-all hover:gap-2 group/follow"
      >
        Follow
        <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover/follow:translate-x-1" />
      </Link>
    </div>
  );
};
