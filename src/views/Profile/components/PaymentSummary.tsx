import { formatCurrency } from "@/src/utils/textUtils";

interface PaymentSummaryProps {
  amount: number;
  promoBonus: number;
  bonusAmount: number;
  totalCredited: number;
}

export const PaymentSummary = ({ amount, promoBonus, bonusAmount, totalCredited }: PaymentSummaryProps) => {
  if (amount <= 0) return null;

  return (
    <div className="bg-[#1c1f27] border border-border-primary/50 rounded-xl p-4 space-y-2 animate-bvFadeIn">
       <div className="flex justify-between text-[0.75rem]">
          <span className="text-content-tertiary">Payment Amount:</span>
          <span className="text-content-primary font-medium">{formatCurrency(amount)}</span>
       </div>
       {promoBonus > 0 && (
         <div className="flex justify-between text-[0.75rem]">
            <span className="text-content-tertiary">Bonus (+{promoBonus}%):</span>
            <span className="text-[#22c55e] font-medium">+{formatCurrency(bonusAmount)}</span>
         </div>
       )}
       <div className="h-[1px] bg-border-primary/30 my-1" />
       <div className="flex justify-between text-[0.85rem] items-center">
          <span className="text-content-light font-bold">Total Credited:</span>
          <span className="text-brand-primary font-bold">{formatCurrency(totalCredited)}</span>
       </div>
    </div>
  );
};
