import { useState, useCallback } from "react";
import { openPaymentWidget, OpenPaymentWidgetParams } from "../services/WayForPayService";
import type { WayForPayResult } from "../services/WayForPayService/types";


export const useWayForPay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<WayForPayResult | null>(null);

  const pay = useCallback(async (params: OpenPaymentWidgetParams): Promise<WayForPayResult> => {
    setIsLoading(true);
    setError(null);
    try {
      const paymentResult = await openPaymentWidget(params);
      setResult(paymentResult);
      
      if (paymentResult.status === "declined") {
        throw new Error(paymentResult.response.reason || "Payment declined");
      }
      
      return paymentResult;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Payment failed");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    pay,
    isLoading,
    error,
    result,
    resetResult: () => setResult(null),
  };
};