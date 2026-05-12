import { useRouter } from "@/src/i18n/navigation";
import Image from "next/image";
import { IMockBid } from "../mockBids";
import { STATUS_META } from "../constants";
import { LotStatus } from "@/src/components/ui/LotCard/constants";
import { ParticipantsIcon } from "@/public/assets/icons";
import { Countdown } from "@/src/components/ui/LotCard/components/Countdown";
import { PriceRail } from "./PriceRail";
import { ResultPanel } from "./ResultPanel";

export const BidCard = ({ bid, idx }: { bid: IMockBid; idx: number }) => {
  const router = useRouter();
  const meta = STATUS_META[bid.bidStatus];
  const isActive = bid.status === LotStatus.Active;

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border-primary/50 bg-surface-secondary cursor-pointer hover:border-border-primary hover:shadow-[0_4px_28px_rgba(0,0,0,0.35)] transition-all duration-300 animate-bvCatFadeUp"
      style={{ animationDelay: `${idx * 0.07}s` }}
      onClick={() => router.push(`/user/auctions/${bid.category.id}/${bid.id}`)}
    >
      <div className="h-[2px] w-full" style={{ background: meta.bar }} />

      <div className="flex flex-col flex-1">
        <div className="relative w-full h-[180px] shrink-0 overflow-hidden bg-surface-primary">
          <Image
            src={bid.thumbnailUrl}
            alt={bid.name}
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          {isActive && (
            <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/10">
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-[#22c55e]" />
              </span>
              <span className="text-[8px] font-mono font-bold text-[#22c55e] uppercase tracking-widest">Live</span>
            </div>
          )}
          <div className="absolute top-2 right-2 p-1.5 rounded-sm bg-black/60 backdrop-blur-sm">
            <div className="text-[7px] font-mono text-brand-primary">#{bid.lotNumber}</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 p-4 gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[9px] font-mono text-content-tertiary uppercase tracking-widest mb-1">
                {bid.category.name}
              </div>
              <h3 className="text-sm font-bold text-content-primary truncate leading-tight group-hover:text-white transition-colors">
                {bid.name}
              </h3>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border shrink-0 ${meta.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.dot}`} />
              <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${meta.text}`}>
                {meta.label}
              </span>
            </div>
          </div>

          <PriceRail bid={bid} />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3 text-[10px] font-mono text-content-tertiary">
              <div className="flex items-center gap-1">
                <ParticipantsIcon className="w-3 h-3" />
                <span>{bid.totalParticipants}</span>
              </div>
              <span className="w-px h-3 bg-border-primary/50" />
              <span>{bid.totalBids} bids</span>
              {isActive && (
                <>
                  <span className="w-px h-3 bg-border-primary/50" />
                  <Countdown endsAt={bid.endDate} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <ResultPanel bid={bid} />
    </div>
  );
};
