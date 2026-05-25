"use client";

import { Link } from "@/src/i18n/navigation";
import { LIVE_STATUSES, ENDED_STATUSES, getStatusConfig } from "../constants";
import { Countdown } from "./Countdown";
import { StatusBadge } from "./StatusBadge";
import { ImageCarousel } from "./ImageCarousel";
import { ParticipantsIcon } from "@/public/assets/icons";
import { formatCurrency } from "@/src/utils/textUtils";
import { formatConditionDisplay } from "@/src/constants/itemCondition";
import { formatSexDisplay } from "@/src/constants/lotSex";
import { formatDeliveryDisplay } from "@/src/constants/lotDelivery";
import { ILot } from "@/src/services/LotsService/types";
import { LotNumber } from "@/src/components/ui/LotNumber";
import { LiveBadge } from "@/src/components/ui/LiveBadge";
import { useTranslations } from "next-intl";

export const GridVariant = ({ lot, showCategory = true, categoryName }: { lot: ILot; showCategory?: boolean; categoryName?: string }) => {
  const t = useTranslations("LotCard");
  const tSex = useTranslations("ItemSex");
  const tDelivery = useTranslations("LotDelivery");
  const c = getStatusConfig(lot.status);
  const isLive = LIVE_STATUSES.includes(lot.status);
  const isEnded = ENDED_STATUSES.includes(lot.status);
  const conditionLabel = formatConditionDisplay(lot.condition);
  const sexLabel = formatSexDisplay(lot.sex, (key) => tSex(key));
  const deliveryLabel = formatDeliveryDisplay(lot.deliveryMethod, (key) => tDelivery(key));

  return (
    <Link
      href={`/user/auctions/${lot.categoryId}/${lot.id}`}
      className="group relative flex flex-col h-full overflow-hidden rounded-md transition-all duration-300 hover:-translate-y-[4px] bg-surface-secondary border border-border-primary hover:border-brand-primary/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] z-10"
        style={{
          background: `linear-gradient(90deg, ${c.color}, transparent)`,
          opacity: isLive ? 1 : 0.4,
        }}
      />

      <div className="relative overflow-hidden aspect-4/3">
        <ImageCarousel images={lot.images} img={lot.images?.[0]} />
        <div className="absolute inset-0 bg-linear-to-t from-surface-primary/90 via-transparent to-black/10 pointer-events-none" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
          <LotNumber lotNumber={lot.lotNumber} variant="md" tone="overlay" />
          {isLive ? (
            <LiveBadge variant="md" tone="overlay" />
          ) : (
            <StatusBadge status={lot.status} />
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <div className="flex gap-1.5">
            {isLive && <Countdown endsAt={lot.endDate} />}
            <span className="px-2 py-[4px] rounded-sm font-mono text-[9px] flex items-center gap-1 bg-black/50 border border-white/10 text-content-secondary backdrop-blur-md">
              <ParticipantsIcon className="w-[10px] h-[10px]" />
              {lot.totalParticipants}
            </span>
          </div>

          <span className="px-2 py-1 rounded-sm font-mono text-[10px] bg-black/50 border border-white/10 text-content-secondary backdrop-blur-md">
            {t("bids", { count: lot.totalBids })}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        {showCategory && categoryName && (
          <span className="font-mono text-[9px] tracking-[0.18em] uppercase mb-1 text-content-tertiary">
            {categoryName}
          </span>
        )}

        <h3 className="font-semibold text-[15px] leading-tight mb-2 text-content-primary group-hover:text-white transition-colors duration-200 line-clamp-2">
          {lot.name}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {conditionLabel && (
            <span className="px-2 py-0.5 rounded-full bg-brand-primary/5 border border-brand-primary/20 font-mono text-[9px] text-brand-primary tracking-wider">
              {conditionLabel}
            </span>
          )}
          {sexLabel && (
            <span className="px-2 py-0.5 rounded-full bg-surface-primary border border-border-primary font-mono text-[9px] uppercase text-content-secondary tracking-wider">
              {sexLabel}
            </span>
          )}
          {lot.size && (
            <span className="px-2 py-0.5 rounded-full bg-surface-primary border border-border-primary font-mono text-[9px] uppercase text-content-secondary tracking-wider">
              {t("size", { size: lot.size })}
            </span>
          )}
          {deliveryLabel && (
            <span className="px-2 py-0.5 rounded-full bg-surface-primary border border-border-primary font-mono text-[9px] text-content-secondary tracking-wider">
              {deliveryLabel}
            </span>
          )}
        </div>
        {lot.description && (
          <p className="text-[11px] text-content-tertiary mb-2 line-clamp-2">
            {lot.description}
          </p>
        )}


        <div className="text-[11px] mb-4 text-content-tertiary font-medium flex items-center justify-between">
          <span>
            {t("by")} <span className="text-content-secondary">@{lot.seller.userName}</span>
          </span>
          {lot.startsAt && (
            <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">
              {new Date(lot.startsAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          )}
        </div>


        <div className="flex items-end justify-between pt-4 mt-auto border-t border-border-primary/50">
          <div>
            <div className="font-mono text-[8px] tracking-[0.14em] uppercase mb-1 text-content-tertiary">
              {isEnded ? t("finalPrice") : t("currentBid")}
            </div>
            <div
              className={`font-mono text-[15px] font-bold leading-none ${isEnded ? "text-green-400" : "text-brand-primary"
                }`}
            >
              {formatCurrency(lot.currentPrice)}
            </div>
          </div>

          <div className="flex flex-col gap-1 text-right">
            <div className="flex flex-col mt-auto">
              <span className="font-mono text-[8px] tracking-[0.14em] uppercase text-content-tertiary">
                {t("step")}
              </span>
              <span className="font-mono text-[12px] font-semibold text-content-secondary">
                {formatCurrency(lot.priceStep)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link >
  );
};
