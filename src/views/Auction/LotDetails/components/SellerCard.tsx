"use client";

import { ArrowRightIcon } from "@/public/assets/icons";
import { ILotDetailsSeller } from "@/src/services/LotsService/types";
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";

interface SellerCardProps {
  seller: ILotDetailsSeller;
}

export const SellerCard = ({ seller }: SellerCardProps) => {
  const t = useTranslations("LotDetails.seller");

  const salesLabel =
    seller.totalSales != null
      ? t("sales", { count: seller.totalSales })
      : t("noSalesYet");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-primary bg-surface-secondary p-4 transition-all group hover:bg-surface-tertiary sm:rounded-[16px] sm:p-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-brand-primary/30 to-transparent" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <Image
              src={seller.profileImageUrl}
              alt={seller.userName}
              width={48}
              height={48}
              className="h-11 w-11 rounded-full border-2 border-border-primary object-cover transition-all group-hover:border-brand-primary/50 sm:h-12 sm:w-12"
              unoptimized
            />
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-surface-primary bg-brand-primary">
              <span className="text-[10px] font-black text-black">★</span>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold leading-tight text-content-primary">
              {seller.firstName} {seller.lastName}
            </span>

            <div className="mt-1 flex flex-row flex-wrap items-center gap-x-2 gap-y-0 sm:mt-0.5 sm:flex-col sm:items-start sm:gap-1 font-mono text-[0.65rem] sm:text-[0.7rem] text-content-tertiary">
              <span className="truncate md:hidden">@{seller.userName}</span>
              <span className="opacity-30 md:hidden">·</span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
                <span className="truncate">{salesLabel}</span>
                <span className="opacity-30">·</span>
                <span className="shrink-0 font-bold text-brand-primary">★ {seller.score}</span>
              </div>
            </div>
          </div>
        </div>

        <Link
          href={`/user/profile/${encodeURIComponent(seller.userName)}`}
          className="flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-brand-primary/20 bg-brand-primary/10 px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-brand-primary transition-all  group/follow sm:w-auto sm:justify-start sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:hover:gap-2"
        >
          {t("viewProfile")}
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover/follow:translate-x-1" />
        </Link>
      </div>
    </div >
  );
};
