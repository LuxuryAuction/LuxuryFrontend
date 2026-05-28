import { useRouter } from "@/src/i18n/navigation";
import Image from "next/image";
import { IUserBid } from "@/src/services/UsersService/types";
import { DEFAULT_STATUS_META, STATUS_META } from "../constants";
import { ParticipantsIcon } from "@/public/assets/icons";
import { Countdown } from "@/src/components/ui/LotCard/components/Countdown";
import { PriceRail } from "./PriceRail";
import { ResultPanel } from "./ResultPanel";
import { LotNumber } from "@/src/components/ui/LotNumber";
import { LiveBadge } from "@/src/components/ui/LiveBadge";
import { getDisplayBidStatus, isBidAuctionOngoing } from "../utils";

export const BidCard = ({ bid, idx }: { bid: IUserBid; idx: number }) => {
  const router = useRouter();
  const lot = bid.lot;
  const displayStatus = getDisplayBidStatus(bid);
  const meta = STATUS_META[displayStatus] ?? DEFAULT_STATUS_META;
  const isOngoing = isBidAuctionOngoing(bid);

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border-primary/50 bg-surface-secondary cursor-pointer hover:border-border-primary hover:shadow-[0_4px_28px_rgba(0,0,0,0.35)] transition-all duration-300 animate-bvCatFadeUp"
      style={{ animationDelay: `${idx * 0.07}s` }}
      onClick={() => router.push(`/user/auctions/${lot.category.slug}/${lot.id}`)}
    >
      <div className="h-[2px] w-full" style={{ background: meta.bar }} />

      <div className="flex flex-col flex-1">
        <div className="relative w-full h-[180px] shrink-0 overflow-hidden bg-surface-primary">
          <Image
            src={lot.thumbnailUrl || lot.images[0]}
            alt={lot.name}
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute top-2 left-2">
            <LotNumber lotNumber={lot.lotNumber} variant="md" tone="overlay" />
          </div>
          {isOngoing && (
            <div className="absolute top-2 right-2">
              <LiveBadge variant="sm" tone="overlay" />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col min-w-0 p-4 gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[9px] font-mono text-content-tertiary uppercase tracking-widest mb-1">
                {lot.category.name}
              </div>
              <h3 className="text-sm font-bold text-content-primary truncate leading-tight group-hover:text-white transition-colors">
                {lot.name}
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
                <span>{lot.totalParticipants}</span>
              </div>
              <span className="w-px h-3 bg-border-primary/50" />
              <span>{lot.totalBids} bids</span>
              {isOngoing && (
                <>
                  <span className="w-px h-3 bg-border-primary/50" />
                  <Countdown endsAt={lot.endDate} />
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
