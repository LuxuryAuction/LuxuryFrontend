import { useRouter } from "@/src/i18n/navigation";

import { ArrowRightIcon, CheckIcon, CloseIcon } from "@/public/assets/icons";
import { IUserBid, UserBidStatus } from "@/src/services/UsersService/types";
import { formatCurrency } from "@/src/utils/textUtils";
import { getBidResult, getDisplayBidStatus } from "../utils";

export const ResultPanel = ({ bid }: { bid: IUserBid }) => {
  const router = useRouter();
  const lot = bid.lot;
  const displayStatus = getDisplayBidStatus(bid);
  const result = getBidResult(bid);
  const won = result?.outcome === "won";
  const isOutbid = displayStatus === UserBidStatus.Outbid;
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
                  : `Won by · ${formatCurrency(result!.finalPrice)}`}
              </div>
            </div>
          </>
        ) : (
          <div className="min-w-0">
            <div className={`text-xs font-bold ${isOutbid ? "text-[#ef4444]" : "text-[#22c55e]"}`}>
              {isOutbid ? "Outbid" : "Leading bidder"}
            </div>
            <div className="text-[10px] font-mono text-content-tertiary truncate">
              {isOutbid
                ? `Leading bid: ${formatCurrency(bid.lotHighestBid)} · Your bid: ${formatCurrency(bid.userHighestBid)}`
                : `Your bid: ${formatCurrency(bid.userHighestBid)} · Leading: ${formatCurrency(bid.lotHighestBid)}`}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isOutbid && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
            style={{ backgroundColor: "#ef4444" }}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/user/auctions/${lot.slug}/${lot.id}`);
            }}
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
