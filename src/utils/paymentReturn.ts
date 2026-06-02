import {
  TOP_UP_QUERY_RETURN,
  TOP_UP_QUERY_VALUE_RETURN,
} from "@/src/constants/payment";
import type { ApiError } from "@/src/services/apiService";

export const CREATE_LOT_TOP_UP_RETURN_PATH = `/user/create-lot?${TOP_UP_QUERY_RETURN}=${TOP_UP_QUERY_VALUE_RETURN}`;

export function isTopUpReturn(searchParams: URLSearchParams): boolean {
  return searchParams.get(TOP_UP_QUERY_RETURN) === TOP_UP_QUERY_VALUE_RETURN;
}

export function clampTopUpAmount(amount: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, amount));
}

export function computeTopUpShortfall(balance: number, required: number, min: number, max: number): number {
  const shortfall = required - balance;
  return clampTopUpAmount(Math.max(min, shortfall), min, max);
}

export function isInsufficientBalanceError(error: unknown): boolean {
  return (error as ApiError)?.status === 402;
}
