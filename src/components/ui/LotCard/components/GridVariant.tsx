"use client";

import Link from "next/link";
import { ILot } from "../types";
import { STATUS_CFG, LIVE_STATUSES, ENDED_STATUSES } from "../constants";
import { Countdown } from "./Countdown";
import { StatusBadge } from "./StatusBadge";
import { ImageCarousel } from "./ImageCarousel";
import { ParticipantsIcon } from "@/public/assets/icons";
import { formatCurrency } from "@/src/utils/textUtils";

export const GridVariant = ({ lot, showCategory = true }: { lot: ILot; showCategory?: boolean }) => {
  const c = STATUS_CFG[lot.status];
  const isLive = LIVE_STATUSES.includes(lot.status);
  const isEnded = ENDED_STATUSES.includes(lot.status);
  const href = lot.href ?? `/user/auctions/${lot.category}/${lot.id}`;

  return (
    <Link
      href={href}
      className="group relative flex flex-col h-full overflow-hidden rounded-md transition-all duration-300 hover:-translate-y-[4px] bg-surface-secondary border border-border-primary hover:border-brand-primary/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] z-10"
        style={{
          background: `linear-gradient(90deg, ${c.color}, transparent)`,
          opacity: isLive ? 1 : 0.4,
        }}
      />

      <div className="relative overflow-hidden aspect-[4/3]">
        <ImageCarousel images={lot.images} img={lot.images?.[0]} category={lot.category} />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/90 via-transparent to-black/10 pointer-events-none" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
          <span className="px-2 py-1 rounded-sm font-mono text-[9px] tracking-[0.1em] uppercase bg-black/50 border border-white/10 text-content-secondary backdrop-blur-md">
            #{lot.lotNumber}
          </span>
          <StatusBadge status={lot.status} />
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <div className="flex gap-1.5">
            {isLive && <Countdown endsAt={lot.endsAt} />}
            <span className="px-2 py-[4px] rounded-sm font-mono text-[9px] flex items-center gap-1 bg-black/50 border border-white/10 text-content-secondary backdrop-blur-md">
              <ParticipantsIcon className="w-[10px] h-[10px]" />
              {lot.totalParticipants}
            </span>
          </div>

          <span className="px-2 py-1 rounded-sm font-mono text-[10px] bg-black/50 border border-white/10 text-content-secondary backdrop-blur-md">
            {lot.totalBids} bid{lot.totalBids !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        {showCategory && (
          <span className="font-mono text-[9px] tracking-[0.18em] uppercase mb-1 text-content-tertiary">
            {lot.category}
          </span>
        )}

        <h3 className="font-semibold text-[15px] leading-tight mb-2 text-content-primary group-hover:text-white transition-colors duration-200 line-clamp-2">
          {lot.title}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {lot.condition && (
            <span className="px-2 py-0.5 rounded-full bg-surface-primary border border-border-primary font-mono text-[9px] uppercase text-content-secondary tracking-wider">
              {lot.condition}
            </span>
          )}
          {lot.sex && (
            <span className="px-2 py-0.5 rounded-full bg-brand-primary/5 border border-brand-primary/20 font-mono text-[9px] uppercase text-brand-primary tracking-wider">
              {lot.sex}
            </span>
          )}
          {lot.size && (
            <span className="px-2 py-0.5 rounded-full bg-surface-primary border border-border-primary font-mono text-[9px] uppercase text-content-secondary tracking-wider">
              Size: {lot.size}
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
            by <span className="text-content-secondary">@{lot.sellerUsername}</span>
          </span>
          {lot.publishedAt && (
            <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">
              {new Date(lot.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          )}
        </div>


        <div className="flex items-end justify-between pt-4 mt-auto border-t border-border-primary/50">
          <div>
            <div className="font-mono text-[8px] tracking-[0.14em] uppercase mb-1 text-content-tertiary">
              {isEnded ? "Final price" : "Current bid"}
            </div>
            <div
              className={`font-mono text-[15px] font-bold leading-none ${isEnded ? "text-green-400" : "text-brand-primary"
                }`}
            >
              {formatCurrency(lot.currentBid)}
            </div>
          </div>

          <div className="flex flex-col gap-1 text-right">
            <div className="flex flex-col mt-auto">
              <span className="font-mono text-[8px] tracking-[0.14em] uppercase text-content-tertiary">
                Step
              </span>
              <span className="font-mono text-[12px] font-semibold text-content-secondary">
                {formatCurrency(lot.priceStep)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
