"use client";

import { Avatar } from "@/src/components/common/Avatar";
import { BidHistoryEmpty } from "./BidHistoryEmpty";
import { Link } from "@/src/i18n/navigation";
import { ILotDetailsBid } from "@/src/services/LotsService/types";
import { formatCurrency, getTimeAgo, getUserDisplayName } from "@/src/utils/textUtils";
import { useTranslations } from "next-intl";

interface BidHistoryProps {
  bids: ILotDetailsBid[];
}

const RANK_BADGE_STYLES: Record<1 | 2 | 3, string> = {
  1: "bg-brand-primary",
  2: "bg-[#b8bcc4]",
  3: "bg-[#b87333]",
};

export const BidHistory = ({ bids }: BidHistoryProps) => {
  const t = useTranslations("BidHistory");
  return (
    <div className="flex flex-col gap-5 p-6 rounded-[16px] bg-surface-secondary/50 border border-border-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-brand-primary/40 to-transparent" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="h-px w-4 bg-brand-primary/50" />
          <h2 className="text-[10px] font-mono font-bold uppercase tracking-widest text-content-tertiary">
            {t("title")}
          </h2>
        </div>
        <span className="text-[10px] font-mono text-content-tertiary opacity-60">
          {t("total", { count: bids.length })}
        </span>
      </div>

      <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-2 relative z-10">
        {bids.length === 0 ? (
          <BidHistoryEmpty />
        ) : (
        bids.map((bid, i) => {
          const rank = i + 1;
          const rankBadge = rank <= 3 ? (rank as 1 | 2 | 3) : null;
          const displayName = getUserDisplayName(bid.user);

          return (
            <div
              key={bid.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${bid.isBestBid
                ? "bg-brand-primary/0.05 border-brand-primary/30 shadow-[0_4px_20px_rgba(240,165,0,0.05)]"
                : "bg-surface-primary/40 border-border-primary/50 hover:bg-surface-primary/60"
                }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <Link href={`/user/profile/${encodeURIComponent(bid.user.userName)}`} className="flex items-center gap-3 group/user hover:opacity-90 transition-opacity cursor-pointer">
                <div className="relative">
                  <Avatar
                    name={displayName}
                    src={bid.user.profileImageUrl}
                    size="sm"
                    className={
                      rankBadge === 1
                        ? "ring-2 ring-brand-primary/20"
                        : rankBadge === 2
                          ? "ring-2 ring-[#b8bcc4]/30"
                          : rankBadge === 3
                            ? "ring-2 ring-[#b87333]/30"
                            : ""
                    }
                  />
                  {rankBadge && (
                    <div
                      className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center border-2 border-surface-secondary ${RANK_BADGE_STYLES[rankBadge]}`}
                    >
                      <span className="text-[7px] text-black font-black">{rankBadge}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className={`text-[13px] font-bold leading-tight group-hover/user:underline ${bid.isBestBid ? "text-brand-primary" : "text-content-primary"}`}>
                    {displayName}
                  </span>
                  <span className="text-[9px] text-content-tertiary font-mono uppercase tracking-wider opacity-60" suppressHydrationWarning>
                    {getTimeAgo(bid.createdAt)}
                  </span>
                </div>
              </Link>
              <div className="flex flex-col items-end">
                <span className={`text-[15px] font-mono font-bold ${bid.isBestBid ? "text-brand-primary" : "text-content-primary"}`}>
                  {formatCurrency(bid.amount, "before")}
                </span>
                {bid.isBestBid && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-brand-primary animate-pulse" />
                    <span className="text-[8px] font-black uppercase text-brand-primary tracking-widest">
                      {t("highest")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })
        )}
      </div>
    </div>
  );
};
