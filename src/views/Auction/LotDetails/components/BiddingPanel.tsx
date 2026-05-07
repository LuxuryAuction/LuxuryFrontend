"use client";

import { useEffect, useState } from "react";
import { ClockIcon, LightningIcon, ShieldIcon, CreditCardIcon, CheckIcon } from "@/public/assets/icons";
import { formatCurrency } from "@/src/utils/textUtils";

interface BiddingPanelProps {
  currentPrice: number;
  startingBid: number;
  minStep: number;
  endTime: string;
  totalBids: number;
  totalParticipants: number;
  buyNowPrice?: number;
  onPlaceBid: (amount: number) => void;
}

export const BiddingPanel = ({
  currentPrice,
  startingBid,
  minStep,
  endTime,
  totalBids,
  totalParticipants,
  buyNowPrice,
  onPlaceBid,
}: BiddingPanelProps) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [bidAmount, setBidAmount] = useState(currentPrice + minStep);
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const end = new Date(endTime).getTime();
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Ended");
        setIsUrgent(false);
        clearInterval(timer);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (d > 0) {
          setTimeLeft(`${d}d ${h}h ${m}m`);
        } else {
          setTimeLeft(`${h}h ${m}m ${s}s`);
        }

        setIsUrgent(diff < 1000 * 60 * 60 * 2);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  useEffect(() => {
    setBidAmount(currentPrice + minStep);
  }, [currentPrice, minStep]);

  return (
    <div className="flex flex-col">
      <div className="rounded-t-[16px] bg-gradient-to-br from-surface-secondary via-surface-secondary to-surface-tertiary/50 border border-border-primary border-b-0 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-primary via-brand-primary/60 to-transparent" />

        <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-primary/8 blur-[60px] pointer-events-none" />

        <div className="flex items-center justify-between px-6 p-5 border-b border-border-primary/40">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#22c55e]">Live</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-content-tertiary">
            <span>{totalParticipants} participants</span>
            <div className="w-px h-3 bg-border-primary/60" />
            <span>{totalBids} bids</span>
          </div>
        </div>

        <div className="px-6 py-5 z-10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-content-tertiary">
              Current Bid
            </span>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${isUrgent ? "bg-red-500/10" : "bg-surface-tertiary/80"}`}>
              <ClockIcon className={`w-3 h-3 ${isUrgent ? "text-red-400" : "text-brand-primary"}`} />
              <span className={`text-[11px] font-bold font-mono ${isUrgent ? "text-red-400 animate-pulse" : "text-brand-primary"}`}>
                {timeLeft}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[44px] font-extrabold text-content-primary leading-none tracking-tighter">
              {formatCurrency(currentPrice, "before")}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border-primary/30">
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-content-tertiary">Start</span>
              <span className="text-[13px] font-bold font-mono text-content-secondary">₴{startingBid.toLocaleString()}</span>
            </div>
            <div className="w-px h-8 bg-border-primary/40" />
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-content-tertiary">Step</span>
              <span className="text-[13px] font-bold font-mono text-content-secondary">+₴{minStep.toLocaleString()}</span>
            </div>
            <div className="w-px h-8 bg-border-primary/40" />
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-content-tertiary">Next min</span>
              <span className="text-[13px] font-bold font-mono text-brand-primary">₴{(currentPrice + minStep).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-b-[16px] bg-surface-secondary/70 backdrop-blur-md border border-border-primary border-t-0 relative overflow-hidden">
        <div className="flex flex-col gap-5 p-6 relative z-10">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-content-tertiary pl-1">
              Your Bid
            </label>
            <div className="flex items-center gap-2 p-1.5 pl-4 rounded-xl bg-surface-primary border border-border-primary focus-within:border-brand-primary/50 focus-within:shadow-[0_0_0_4px_rgba(240,165,0,0.06)] transition-all">
              <span className="text-content-tertiary/60 font-bold text-lg select-none">₴</span>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                className="bg-transparent border-none outline-none text-content-primary font-bold text-xl w-full font-mono tracking-tight"
                min={currentPrice + minStep}
                step={minStep}
              />
              <div className="flex gap-1">
                <button
                  onClick={() => setBidAmount(prev => Math.max(currentPrice + minStep, prev - minStep))}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-tertiary text-content-secondary hover:text-content-primary transition-all text-base font-bold active:scale-95 cursor-pointer"
                >
                  −
                </button>
                <button
                  onClick={() => setBidAmount(prev => prev + minStep)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-black transition-all text-base font-bold active:scale-95 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => onPlaceBid(bidAmount)}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-primary to-[#ffb822] py-4 text-[13px] uppercase tracking-[0.15em] font-black text-black shadow-[0_8px_20px_rgba(240,165,0,0.25)] hover:shadow-[0_12px_25px_rgba(240,165,0,0.4)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-[-20deg]" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Place Bid <span className="opacity-50 font-normal">—</span> {formatCurrency(bidAmount, "before")}
            </span>
          </button>

          {buyNowPrice && (
            <button className="w-full py-3.5 rounded-xl border border-brand-primary/25 text-brand-primary text-[12px] font-bold uppercase tracking-widest hover:bg-brand-primary/5 hover:border-brand-primary/40 transition-all flex items-center justify-center gap-2 group cursor-pointer">
              <LightningIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              Buy Now — {formatCurrency(buyNowPrice, "before")}
            </button>
          )}

          <div className="flex items-center justify-center gap-4 pt-3 border-t border-border-primary/30">
            <div className="flex items-center gap-1.5 text-[9px] text-content-tertiary uppercase tracking-wider">
              <ShieldIcon className="w-3 h-3 text-brand-primary/50" />
              Secure
            </div>
            <div className="w-px h-3 bg-border-primary/30" />
            <div className="flex items-center gap-1.5 text-[9px] text-content-tertiary uppercase tracking-wider">
              <CreditCardIcon className="w-3 h-3 text-brand-primary/50" />
              Escrow
            </div>
            <div className="w-px h-3 bg-border-primary/30" />
            <div className="flex items-center gap-1.5 text-[9px] text-content-tertiary uppercase tracking-wider">
              <CheckIcon className="w-3 h-3 text-brand-primary/50" />
              Verified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
