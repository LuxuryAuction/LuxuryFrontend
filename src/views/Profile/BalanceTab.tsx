"use client";

import { useState } from "react";
import { useBalanceTopUp } from "@/src/hooks/useBalanceTopUp";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { formatCurrency } from "@/src/utils/textUtils";
import { useToast } from "@/src/components/ui/Toast";
import { consumePostTopUpRedirect, peekPostTopUpRedirect } from "@/src/utils/paymentStorage";
import { topUpError, topUpLog } from "@/src/utils/topUpDebugLog";

import { BalanceInfo } from "./components/BalanceInfo";
import { PromoCodeField } from "./components/PromoCodeField";
import { PaymentSummary } from "./components/PaymentSummary";
import { SecurePaymentFooter } from "./components/SecurePaymentFooter";

interface BalanceTabProps {
  balance?: number;
  isConfirmingPayment?: boolean;
}

export const BalanceTab = ({ balance = 0, isConfirmingPayment = false }: BalanceTabProps) => {
  const [amount, setAmount] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoBonus, setPromoBonus] = useState(0);
  const { startTopUp, isLoading, minAmount, maxAmount } = useBalanceTopUp();
  const { showToast } = useToast();

  const handleApplyPromo = (code: string) => {
    setPromoCode(code);
    if (!code) return;
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
    topUpLog("balanceTab.handleTopUp.click", {
      rawAmount: amount,
      amountVal,
      currentBalance: balance,
      pendingRedirect: peekPostTopUpRedirect(),
    });

    if (!amountVal || amountVal <= 0) {
      topUpLog("balanceTab.handleTopUp.invalidAmount", { amountVal });
      showToast("error", "Please enter a valid amount");
      return;
    }

    const clearedRedirect = consumePostTopUpRedirect();
    topUpLog("balanceTab.handleTopUp.clearedRedirect", { clearedRedirect });

    try {
      await startTopUp(amountVal);
      topUpLog("balanceTab.handleTopUp.startTopUpReturned", { amountVal });
    } catch (err) {
      topUpError("balanceTab.handleTopUp.failed", err, { amountVal });
      const message = err instanceof Error ? err.message : "Failed to start payment";
      showToast("error", message);
    }
  };

  const quickAmounts = [50, 100, 200, 400, 500, 1000];

  return (
    <div className="bg-auth-app border border-border-primary rounded-lg p-6 md:p-8 animate-bvFadeIn">
      {isConfirmingPayment && (
        <div className="mb-4 rounded-xl border border-brand-primary/30 bg-brand-primary/10 px-4 py-3 text-[13px] text-content-primary">
          Confirming your payment… Balance will update shortly.
        </div>
      )}

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
              className="mb-2"
              inputSize="lg"
            />
            <p className="text-[11px] text-content-tertiary">
              Min {formatCurrency(minAmount, "after")} · max {formatCurrency(maxAmount, "after")}. You pay the
              amount entered; promo bonus is display-only until supported by the server.
            </p>
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
              isLoading={isLoading || isConfirmingPayment}
              disabled={!amount || Number(amount) <= 0 || isConfirmingPayment}
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
