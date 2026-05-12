import { useRouter } from "@/src/i18n/navigation";

import { ArrowRightIcon, CheckIcon, CloseIcon } from "@/public/assets/icons";
import { IMockBid } from "../mockBids";
import { LotStatus } from "@/src/components/ui/LotCard/constants";
import { formatCurrency } from "@/src/utils/textUtils";

export const ResultPanel = ({ bid }: { bid: IMockBid }) => {
  const router = useRouter();
  const result = bid.result;
  const won = result?.outcome === "won";
  const isActive = bid.status === LotStatus.Active;
  const isOutbid = isActive && bid.bidStatus === "outbid";
  const showResult = !!result;

  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-3 border-t ${showResult
        ? won
          ? "bg-brand-primary/5 border-brand-primary/20"
          : "bg-surface-primary/40 border-border-primary/30"
        : isOutbid
          ? "bg-[#ef4444]/5 border-[#ef4444]/20"
          : "bg-surface-primary/20 border-border-primary/20"
        }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {showResult ? (
          <>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${won ? "bg-brand-primary/20" : "bg-surface-tertiary"
                }`}
            >
              {won ? (
                <CheckIcon className="w-3.5 h-3.5 text-brand-primary" />
              ) : (
                <CloseIcon className="w-3.5 h-3.5 text-content-tertiary" />
              )}
            </div>
            <div className="min-w-0">
              <div className={`text-xs font-bold ${won ? "text-brand-primary" : "text-content-secondary"}`}>
                {won ? "Auction Won" : "Auction Ended"}
              </div>
              <div className="text-[10px] font-mono text-content-tertiary truncate">
                {won
                  ? `Final price: ${formatCurrency(result!.finalPrice)}`
                  : `Won by @${result!.winnerUsername} · ${formatCurrency(result!.finalPrice)}`
                }
              </div>
            </div>
          </>
        ) : (
          <div className="min-w-0">
            <div className={`text-xs font-bold ${isOutbid ? "text-[#ef4444]" : "text-content-secondary"}`}>
              {isOutbid ? "Outbid" : "Bid status"}
            </div>
            <div className="text-[10px] font-mono text-content-tertiary truncate">
              {isOutbid
                ? `Leading bid: ${formatCurrency(bid.currentPrice)} · Your bid: ${formatCurrency(bid.myBid)}`
                : `Current: ${formatCurrency(bid.currentPrice)} · Your bid: ${formatCurrency(bid.myBid)}`
              }
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isOutbid && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
            style={{ backgroundColor: "#ef4444" }}
            onClick={(e) => { e.stopPropagation(); router.push(`/user/auctions/${bid.category.id}/${bid.id}`); }}
          >
            Raise Bid <ArrowRightIcon className="w-3 h-3" />
          </div>
        )}
        {showResult && won && (
          <div className="w-8 h-8 rounded-lg bg-surface-tertiary/60 flex items-center justify-center text-content-tertiary group-hover:bg-surface-tertiary transition-colors">
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  );
};