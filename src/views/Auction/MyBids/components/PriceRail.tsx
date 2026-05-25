import { IUserBid, UserBidStatus } from "@/src/services/UsersService/types";
import { DEFAULT_STATUS_META, STATUS_META } from "../constants";
import { formatCurrency } from "@/src/utils/textUtils";
import { getBidResult, getDisplayBidStatus } from "../utils";

export const PriceRail = ({ bid }: { bid: IUserBid }) => {
  const displayStatus = getDisplayBidStatus(bid);
  const meta = STATUS_META[displayStatus] ?? DEFAULT_STATUS_META;
  const result = getBidResult(bid);
  const isCompleted = !!result;

  const rangeMin = bid.startingPrice;
  const rangeMax = Math.max(bid.lotHighestBid, bid.userHighestBid) * 1.05;
  const toPercent = (val: number) =>
    Math.min(98, Math.max(2, ((val - rangeMin) / (rangeMax - rangeMin)) * 100));

  const startPct = 2;
  const isWon = displayStatus === UserBidStatus.Won;
  const myBidPct = isWon ? 98 : toPercent(bid.userHighestBid);
  const currentPct = isWon ? 98 : toPercent(bid.lotHighestBid);

  const isMyBidOnTop = bid.userHighestBid >= bid.lotHighestBid;

  return (
    <div className="w-full flex flex-col gap-1 px-1 mt-1">
      <div className="relative h-10 w-full">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
          <rect x="0" y="18" width="100" height="4" rx="2" fill="rgba(42,46,58,0.8)" />
          <rect
            x="0"
            y="18"
            width={currentPct}
            height="4"
            rx="2"
            fill={meta.bar}
            opacity="0.2"
          />
          <rect
            x="0"
            y="18"
            width={myBidPct}
            height="4"
            rx="2"
            fill={meta.bar}
            opacity="0.55"
          />
        </svg>

        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[2px] h-3.5 bg-content-tertiary/60 rounded-full"
          style={{ left: `${startPct}%` }}
        />

        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-[1.5px] border-[#0d0e12] z-10"
          style={{
            left: `${currentPct}%`,
            backgroundColor: isCompleted ? "#555b6e" : isMyBidOnTop ? meta.bar : "#ef4444",
          }}
        />

        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
          style={{ left: `${myBidPct}%` }}
        >
          <div
            className="w-2.5 h-2.5 border-[1.5px] border-[#0d0e12] rounded-[1px]"
            style={{ backgroundColor: meta.bar, transform: "rotate(45deg)" }}
          />
        </div>
      </div>

      <div className="relative h-4 w-full">
        <span className="absolute left-0 text-[8px] font-mono text-content-tertiary/60 whitespace-nowrap">
          {formatCurrency(bid.startingPrice)}
        </span>
        <span
          className={`absolute text-[8px] font-mono font-bold ${meta.text} transform -translate-x-1/2 whitespace-nowrap z-10`}
          style={{ left: `${myBidPct}%` }}
        >
          {formatCurrency(bid.userHighestBid)}
        </span>
        {Math.abs(myBidPct - currentPct) > 8 && (
          <span
            className="absolute text-[8px] font-mono text-content-tertiary transform -translate-x-1/2 whitespace-nowrap"
            style={{ left: `${currentPct}%` }}
          >
            {formatCurrency(bid.lotHighestBid)}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 mt-0.5">
        <div className="flex items-center gap-1">
          <div
            className="w-2 h-2 rounded-[1px]"
            style={{ backgroundColor: meta.bar, transform: "rotate(45deg)" }}
          />
          <span className="text-[8px] font-mono text-content-tertiary whitespace-nowrap">Your bid</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: isCompleted ? "#555b6e" : "#ef4444" }}
          />
          <span className="text-[8px] font-mono text-content-tertiary whitespace-nowrap">
            {isCompleted ? "Final price" : "Leading bid"}
          </span>
        </div>
      </div>
    </div>
  );
};
