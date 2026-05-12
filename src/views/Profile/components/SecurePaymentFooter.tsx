import { ShieldIcon } from "@/public/assets/icons";

export const SecurePaymentFooter = () => (
  <div className="mt-8 pt-6 border-t border-border-primary/30 cursor-pointer">
    <div className="flex items-center justify-center gap-3 group">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-primary/50 border border-border-primary/50 backdrop-blur-sm transition-all duration-500 group-hover:border-brand-primary/40 group-hover:bg-brand-primary/5">
        <ShieldIcon className="w-3.5 h-3.5 text-brand-primary opacity-60 group-hover:opacity-100 transition-opacity" />
        <span className="text-[0.62rem] font-mono uppercase tracking-[0.15em] text-content-tertiary group-hover:text-brand-primary transition-colors">
          Secure<span className="hidden md:inline md:ml-0.5">Payment</span>
        </span>
      </div>
      <div className="h-4 w-[1px] bg-border-primary/50" />
      <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0">
        <span className="text-[0.6rem] font-mono text-content-tertiary">via</span>
        <span className="text-[0.85rem] font-bold tracking-tight text-content-primary">
          WayForPay
        </span>
      </div>
    </div>
  </div>
);
