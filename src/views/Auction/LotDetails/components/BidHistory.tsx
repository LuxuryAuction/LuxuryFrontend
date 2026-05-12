"use client";

import { Avatar } from "@/src/components/common/Avatar";
import { Link } from "@/src/i18n/navigation";
import { formatCurrency, getTimeAgo } from "@/src/utils/textUtils";
import { IBid } from "../types";

interface BidHistoryProps {
  bids: IBid[];
}

export const BidHistory = ({ bids }: BidHistoryProps) => {
  return (
    <div className="flex flex-col gap-5 p-6 rounded-[16px] bg-surface-secondary/50 border border-border-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-brand-primary/40 to-transparent" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="h-px w-4 bg-brand-primary/50" />
          <h2 className="text-[10px] font-mono font-bold uppercase tracking-widest text-content-tertiary">
            Bid History
          </h2>
        </div>
        <span className="text-[10px] font-mono text-content-tertiary opacity-60">
          {bids.length} total
        </span>
      </div>

      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 relative z-10">
        {bids.map((bid, i) => (
          <div
            key={bid.id}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${bid.isLeading
              ? "bg-brand-primary/0.05 border-brand-primary/30 shadow-[0_4px_20px_rgba(240,165,0,0.05)]"
              : "bg-surface-primary/40 border-border-primary/50 hover:bg-surface-primary/60"
              }`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Link href={`/user/profile/${bid.userName}`} className="flex items-center gap-3 group/user hover:opacity-90 transition-opacity cursor-pointer">
              <div className="relative">
                <Avatar name={bid.userName} src={bid.userAvatar} size="sm" className={bid.isLeading ? "ring-2 ring-brand-primary/20" : ""} />
                {bid.isLeading && (
                  <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-brand-primary flex items-center justify-center border-2 border-surface-secondary">
                    <span className="text-[7px] text-black font-black">1</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className={`text-[13px] font-bold leading-tight group-hover/user:underline ${bid.isLeading ? "text-brand-primary" : "text-content-primary"}`}>
                  {bid.userName}
                </span>
                <span className="text-[9px] text-content-tertiary font-mono uppercase tracking-wider opacity-60" suppressHydrationWarning>
                  {getTimeAgo(bid.timestamp)}
                </span>
              </div>
            </Link>
            <div className="flex flex-col items-end">
              <span className={`text-[15px] font-mono font-bold ${bid.isLeading ? "text-brand-primary" : "text-content-primary"}`}>
                {formatCurrency(bid.amount, "before")}
              </span>
              {bid.isLeading && (
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1 h-1 rounded-full bg-brand-primary animate-pulse" />
                  <span className="text-[8px] font-black uppercase text-brand-primary tracking-widest">
                    Highest
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
