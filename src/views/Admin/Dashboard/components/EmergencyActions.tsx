"use client";

import Button from "@/src/components/ui/Button";
import { ArrowRightIcon } from "@/public/assets/icons";

export const EmergencyActions = () => {
  return (
    <div className="rounded-3xl border border-admin-accent/10 bg-admin-accent/5 p-6 backdrop-blur-xl">
      <h3 className="mb-4 text-xs font-mono uppercase tracking-widest text-admin-accent/50">Emergency Protocol</h3>
      <div className="flex flex-col gap-3">
        <Button
          variant="admin-primary"
          rightIcon={
            <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-white/20 transition-colors group-hover:text-admin-accent-lo" />
          }
        >
          Halt All Auctions
        </Button>
        <Button
          variant="admin-danger"
          rightIcon={
            <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-rose-500/50 transition-colors group-hover:text-rose-400" />
          }
        >
          Lockdown Mode
        </Button>
      </div>
    </div>
  );
};
