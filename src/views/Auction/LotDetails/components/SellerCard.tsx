"use client";

import { ILotDetailsSeller } from "@/src/services/LotsService/types";
import Image from "next/image";
import Link from "next/link";

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
            src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200"}
            alt={seller.userName}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full border-2 border-border-primary group-hover:border-brand-primary/50 transition-all object-cover"
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
            {/* <span className="text-[11px] text-content-tertiary">{seller.totalSales} sales</span> */}
            <span className="text-[11px] text-content-tertiary">99 sales</span>

            <div className="w-1 h-1 rounded-full bg-content-tertiary/30" />
            <span className="text-[11px] text-brand-primary font-bold">★ {seller.score}</span>
          </div>
        </div>
      </div>
      <button className="text-[11px] font-black uppercase tracking-widest text-brand-primary hover:gap-2 transition-all flex items-center gap-1.5 cursor-pointer">
        <Link href={`user/profile/${seller.id}`}>Follow <span>→</span></Link>
      </button>
    </div>
  );
};
