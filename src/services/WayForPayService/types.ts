export interface ITopUpRequest {
  amount: number;
}

export interface ITopUpResponse {
  orderReference: string;
  amount: number;
  currency: string;
  payUrl: string;
  fields: Record<string, string>;
}

export const TOP_UP_MIN_AMOUNT = 1;
export const TOP_UP_MAX_AMOUNT = 100_000;
