import { API_ENDPOINTS } from "@/src/constants/api";
import { api } from "../apiService";
import type { ApiError } from "../apiService";
import {
  topUpError,
  topUpLog,
  topUpLogWayForPayFields,
  topUpWarn,
} from "@/src/utils/topUpDebugLog";
import type { ITopUpRequest, ITopUpResponse } from "./types";

export { TOP_UP_MIN_AMOUNT, TOP_UP_MAX_AMOUNT } from "./types";
export type { ITopUpRequest, ITopUpResponse } from "./types";

export const paymentsService = {
  initiateTopUp: async (amount: number): Promise<ITopUpResponse> => {
    topUpLog("service.initiateTopUp.request", {
      amount,
      endpoint: API_ENDPOINTS.PAYMENTS.TOP_UP,
    });

    try {
      const response = await api.post<ITopUpResponse>(API_ENDPOINTS.PAYMENTS.TOP_UP, {
        amount,
      } satisfies ITopUpRequest);

      topUpLog("service.initiateTopUp.response", {
        orderReference: response.orderReference,
        amount: response.amount,
        currency: response.currency,
        payUrl: response.payUrl,
        fieldCount: Object.keys(response.fields ?? {}).length,
      });

      return response;
    } catch (err) {
      const apiErr = err as ApiError;
      topUpError("service.initiateTopUp.failed", err, {
        status: apiErr.status,
        message: apiErr.message,
        description: apiErr.description,
      });
      throw err;
    }
  },
};

/**
 * POST signed fields to WayForPay hosted page. Do not modify field keys/values.
 */
export function redirectToWayForPay(payUrl: string, fields: Record<string, string>): void {
  topUpLog("service.redirectToWayForPay.start", {
    payUrl,
    fieldCount: Object.keys(fields).length,
  });
  topUpLogWayForPayFields(fields);

  const form = document.createElement("form");
  form.method = "POST";
  form.action = payUrl;
  form.acceptCharset = "utf-8";
  form.style.display = "none";

  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  topUpLog("service.redirectToWayForPay.submitting", { payUrl });
  form.submit();
  topUpWarn("service.redirectToWayForPay.submitted", {
    note: "Navigation to WayForPay should occur; user leaves the app",
  });
}

export async function startBalanceTopUp(amount: number): Promise<void> {
  topUpLog("service.startBalanceTopUp.start", { amount });

  const initiation = await paymentsService.initiateTopUp(amount);

  topUpLog("service.startBalanceTopUp.redirecting", {
    orderReference: initiation.orderReference,
    payUrl: initiation.payUrl,
  });

  redirectToWayForPay(initiation.payUrl, initiation.fields);
}
