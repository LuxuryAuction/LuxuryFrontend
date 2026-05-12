import { TickIcon } from "@/public/assets/icons";
import { formatCurrency } from "@/src/utils/textUtils";

export const BalanceInfo = ({ balance }: { balance: number }) => (
  
  <div className="space-y-6">
    <div>
      <h3 className="text-[1.1rem] font-bold text-content-light mb-2">Account Balance</h3>
      <p className="text-[0.75rem] text-content-tertiary leading-relaxed max-w-sm">
        Use your internal balance for quick bidding and instant payment of commission fees. 
        Top up securely via WayForPay.
      </p>
    </div>

    <div className="relative bg-[#1c1f27] border border-border-primary rounded-xl px-6 py-5 overflow-hidden group hover:border-brand-primary/30 transition-colors">
      <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary" />
      <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-content-tertiary mb-1">Current Funds</div>
      <div className="text-[2.4rem] font-bold text-brand-primary leading-none font-serif tracking-tight">
        {formatCurrency(balance)}
      </div>
    </div>

    <div className="bg-surface-secondary/30 rounded-lg p-4 border border-border-primary/50">
       <div className="flex items-center gap-3 text-[0.7rem] text-content-tertiary">
          <TickIcon className="w-5 h-5 text-brand-primary" />
          <span>Funds are credited instantly after a successful transaction.</span>
       </div>
    </div>
  </div>
);
