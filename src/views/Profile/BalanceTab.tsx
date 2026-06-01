"use client";

import { useState } from "react";
import { useTopUpBalance } from "@/src/hooks/useTopUpBalance";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { useToast } from "@/src/components/ui/Toast";

import { BalanceInfo } from "./components/BalanceInfo";
import { PromoCodeField } from "./components/PromoCodeField";
import { PaymentSummary } from "./components/PaymentSummary";
import { SecurePaymentFooter } from "./components/SecurePaymentFooter";

type BalanceTabProps = {
  balance?: number;
  onTopUpSuccess?: () => void;
};

export const BalanceTab = ({ balance = 0, onTopUpSuccess }: BalanceTabProps) => {
  const [amount, setAmount] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoBonus, setPromoBonus] = useState(0); // percentage bonus
  const { topUpAndPay, isLoading } = useTopUpBalance();
  const { showToast } = useToast();

  const handleApplyPromo = (code: string) => {
    setPromoCode(code);
    if (!code) return;
    // Mock promo logic
    if (code.toUpperCase() === "LUXURY10") {
      setPromoBonus(10);
      showToast("success", "Promo code applied: +10% bonus!");
    } else if (code.toUpperCase() === "WELCOME") {
      setPromoBonus(5);
      showToast("success", "Promo code applied: +5% bonus!");
    } else {
      setPromoBonus(0);
      showToast("error", "Invalid promo code");
    }
  };

  const numAmount = Number(amount) || 0;
  const bonusAmount = (numAmount * promoBonus) / 100;
  const totalCredited = numAmount + bonusAmount;

  const handleTopUp = async () => {
    const amountVal = Number(amount);
    if (!amountVal || amountVal <= 0) {
      showToast("error", "Please enter a valid amount");
      return;
    }

    try {
      const result = await topUpAndPay(amountVal);

      if (result.status === "approved") {
        showToast("success", "Balance successfully topped up!");
        setAmount("");
        onTopUpSuccess?.();
      } else {
        showToast("error", "Payment was not successful.");
      }
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Payment failed or was cancelled";
      showToast("error", message);
    }
  };

  const quickAmounts = [50, 100, 200, 400, 500, 1000];

  return (
    <div className="bg-auth-app border border-border-primary rounded-lg p-6 md:p-8 animate-bvFadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <BalanceInfo balance={balance} />

        <div className="bg-surface-secondary/50 border border-border-primary rounded-xl p-6">
          <div className="mb-6">
            <label className="font-mono text-[0.62rem] uppercase tracking-widest text-content-tertiary block mb-3">
              Custom Amount (₴)
            </label>
            <Input
              type="currency"
              placeholder="Enter amount"
              value={amount}
              onChange={setAmount}
              className="mb-4"
              inputSize="lg"
            />
          </div>

          <div className="mb-2">
            <label className="font-mono text-[0.62rem] uppercase tracking-widest text-content-tertiary block mb-3">
              Quick Selection
            </label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(String(q))}
                  className={`
                    py-2 rounded-lg text-[0.75rem] font-medium border transition-all cursor-pointer
                    ${amount === String(q)
                      ? "bg-brand-primary border-brand-primary text-black shadow-[0_0_15px_rgba(240,165,0,0.3)]"
                      : "bg-[#1c1f27] border-border-primary text-content-secondary hover:border-brand-primary/40 hover:text-brand-primary"
                    }
                  `}
                >
                  +{q}
                </button>
              ))}
            </div>
          </div>

          <PromoCodeField onApply={handleApplyPromo} promoBonus={promoBonus} />

          <PaymentSummary
            amount={numAmount}
            promoBonus={promoBonus}
            bonusAmount={bonusAmount}
            totalCredited={totalCredited}
          />

          <div className="pt-4">
            <Button
              variant="primary"
              className="w-full h-14 text-[0.95rem] font-bold uppercase tracking-wider shadow-[0_10px_30px_-5px_rgba(240,165,0,0.2)]"
              onClick={handleTopUp}
              isLoading={isLoading}
              disabled={!amount || Number(amount) <= 0}
            >
              Add Balance
            </Button>

            <SecurePaymentFooter />
          </div>
        </div>
      </div>
    </div>
  );
};
