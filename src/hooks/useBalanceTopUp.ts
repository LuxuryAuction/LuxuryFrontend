import { useCallback, useState } from "react";
import {
  startBalanceTopUp,
  TOP_UP_MAX_AMOUNT,
  TOP_UP_MIN_AMOUNT,
} from "@/src/services/PaymentsService";
import { topUpError, topUpLog, topUpWarn } from "@/src/utils/topUpDebugLog";

interface ApiError {
  message: string;
  description?: string;
  status?: number;
}

export const useBalanceTopUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const validateAmount = useCallback((amount: number): string | null => {
    if (!Number.isFinite(amount) || amount < TOP_UP_MIN_AMOUNT) {
      return `Minimum top-up is ${TOP_UP_MIN_AMOUNT} UAH.`;
    }
    if (amount > TOP_UP_MAX_AMOUNT) {
      return `Maximum top-up is ${TOP_UP_MAX_AMOUNT.toLocaleString()} UAH.`;
    }
    return null;
  }, []);

  const startTopUp = useCallback(
    async (amount: number) => {
      topUpLog("hook.startTopUp.called", { amount, minAmount: TOP_UP_MIN_AMOUNT, maxAmount: TOP_UP_MAX_AMOUNT });

      const validationError = validateAmount(amount);
      if (validationError) {
        topUpWarn("hook.startTopUp.validationFailed", { amount, validationError });
        const err = new Error(validationError);
        setError(err);
        throw err;
      }

      setIsLoading(true);
      setError(null);
      topUpLog("hook.startTopUp.loading", { amount });

      try {
        await startBalanceTopUp(amount);
        topUpLog("hook.startTopUp.redirectInitiated", {
          amount,
          note: "startBalanceTopUp returned; form.submit should have fired",
        });
      } catch (err) {
        const apiErr = err as ApiError;
        topUpError("hook.startTopUp.failed", err, {
          amount,
          status: apiErr.status,
          apiMessage: apiErr.message,
        });
        const error =
          err instanceof Error
            ? err
            : new Error(apiErr.message || "Failed to start payment");
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
        topUpLog("hook.startTopUp.finished", { amount });
      }
    },
    [validateAmount],
  );

  return {
    startTopUp,
    validateAmount,
    isLoading,
    error,
    minAmount: TOP_UP_MIN_AMOUNT,
    maxAmount: TOP_UP_MAX_AMOUNT,
  };
};
