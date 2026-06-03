import { useCallback, useState } from "react";
import { paymentsService } from "../services/PaymentsService";
import { openPaymentSession } from "../services/WayForPayService";
import type { WayForPayResult } from "../services/WayForPayService/types";

export const useTopUpBalance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const topUpAndPay = useCallback(async (amount: number): Promise<WayForPayResult> => {
    setIsLoading(true);
    setError(null);
    try {
      const session = await paymentsService.topUp({ amount });
      const result = await openPaymentSession(session);

      if (result.status === "declined") {
        throw new Error(result.response.reason || "Payment declined");
      }

      return result;
    } catch (err) {
      const topUpError =
        err instanceof Error ? err : new Error("Failed to top up balance");
      setError(topUpError);
      throw topUpError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { topUpAndPay, isLoading, error };
};
