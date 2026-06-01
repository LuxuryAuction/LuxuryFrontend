export interface ITopUpRequest {
  amount: number;
}

export interface ITopUpWayForPayFields {
  amount: string;
  currency: string;
  merchantAccount: string;
  merchantAuthType: string;
  merchantDomainName: string;
  merchantSignature: string;
  orderDate: string;
  orderReference: string;
  orderTimeout?: string;
  "productCount[]"?: string;
  "productName[]"?: string;
  "productPrice[]"?: string;
  returnUrl?: string;
  serviceUrl?: string;
}

/** Payment session returned by POST /payments/top-up */
export interface ITopUpResponse {
  orderReference: string;
  amount: number;
  currency: string;
  payUrl: string;
  fields: ITopUpWayForPayFields;
}
