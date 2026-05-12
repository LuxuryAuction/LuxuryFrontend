"use client";

import { Link } from "@/src/i18n/navigation";
import Image from "next/image";
import { ILot } from "@/src/services/LotsService/types";
import { LIVE_STATUSES, ENDED_STATUSES, STATUS_CFG } from "../constants";
import { StatusBadge } from "./StatusBadge";
import { Countdown } from "./Countdown";
import { ImgPlaceholder } from "./ImgPlaceholder";
import { ArrowRightIcon, ParticipantsIcon } from "@/public/assets/icons";
import { formatCurrency } from "@/src/utils/textUtils";

export const ListVariant = ({ lot, showCategory = true }: { lot: ILot; showCategory?: boolean }) => {
  const c = STATUS_CFG[lot.status];
  const isLive = LIVE_STATUSES.includes(lot.status);
  const isEnded = ENDED_STATUSES.includes(lot.status);

  return (
    <Link
      href={`/user/auctions/${lot.categoryId}/${lot.id}`}
      className="group relative flex items-center gap-4 px-4 py-3 rounded-[12px] transition-all duration-200 bg-surface-secondary border border-border-primary hover:border-brand-primary/30 hover:bg-surface-tertiary"
    >
      <div
        className="absolute left-0 top-[15%] bottom-[15%] w-[2px] rounded-full"
        style={{ background: c.color, opacity: 0.65 }}
      />

      <div className="relative rounded-[10px] overflow-hidden shrink-0 w-16 h-16 bg-surface-tertiary">
        <LotThumbnail lot={lot} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[9px] tracking-widest uppercase text-content-tertiary">
            #{lot.lotNumber}
          </span>
          <StatusBadge status={lot.status} />
          {showCategory && (
            <span className="font-mono text-[9px] uppercase text-content-tertiary opacity-60">
              {lot.category.name}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-[14px] leading-tight truncate text-content-primary group-hover:text-white transition-colors duration-150">
          {lot.name}
        </h3>
        {/* {lot.description && (
          <p className="text-[11px] text-content-tertiary mb-1 line-clamp-1 truncate">
            {lot.description}
          </p>
        )} */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          {lot.condition && (
            <span className="px-1.5 py-0.5 rounded-full bg-surface-primary border border-border-primary font-mono text-[8px] uppercase text-content-tertiary tracking-wider">
              {lot.condition}
            </span>
          )}
          {lot.sex && (
            <span className="px-1.5 py-0.5 rounded-full bg-brand-primary/5 border border-brand-primary/20 font-mono text-[8px] uppercase text-brand-primary tracking-wider">
              {lot.sex}
            </span>
          )}
          {lot.size && (
            <span className="px-1.5 py-0.5 rounded-full bg-surface-primary border border-border-primary font-mono text-[8px] uppercase text-content-tertiary tracking-wider">
              Size: {lot.size}
            </span>
          )}
          <span className="text-[10px] text-content-tertiary ml-1">
            by @{lot.sellerUsername}
          </span>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <div
          className={`font-mono text-sm font-bold leading-none mb-1.5 ${isEnded ? "text-green-400" : "text-brand-primary"
            } `}
        >
          {formatCurrency(lot.currentPrice)}
        </div>

        <div className="font-mono text-[10px] flex items-center justify-end gap-2 text-content-tertiary">
          {isLive && (
            <Countdown endsAt={lot.endDate} />
          )}
          <span>{lot.totalBids} bids</span>
          <span className="flex items-center gap-1">
            <ParticipantsIcon className="w-[10px] h-[10px]" />
            {lot.totalParticipants}
          </span>
          <span className="text-content-secondary font-semibold">
            +{formatCurrency(lot.priceStep)}
          </span>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-surface-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 -mr-1 shrink-0">
        <ArrowRightIcon className="w-4 h-4 text-brand-primary" />
      </div>
    </Link>
  );
};


function LotThumbnail({ lot }: { lot: ILot }) {
  const src = lot.images?.[0];
  if (!src) return <ImgPlaceholder category={lot.category.name} />;
  return (
    <Image
      src={src}
      alt={lot.name}
      fill
      className="object-cover"
      sizes="64px"
    />
  );
}

