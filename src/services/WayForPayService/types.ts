export interface IWayForPayWidgetParams {
  merchantAccount: string;
  merchantDomainName: string;
  authorizationType: string;
  merchantSignature: string;
  orderReference: string;
  orderDate: string;
  amount: string;
  currency: string;
  productName: string;
  productPrice: string;
  productCount: string;
  clientFirstName?: string;
  clientLastName?: string;
  clientEmail?: string;
  clientPhone?: string;
  language?: string;
  straightWidget?: boolean;
}

export interface IWayForPayResponse {
  merchantAccount: string;
  orderReference: string;
  merchantSignature: string;
  amount: number;
  currency: string;
  authCode: string;
  email: string;
  phone: string;
  createdDate: number;
  processingDate: number;
  cardPan: string;
  cardType: string;
  issuerBankCountry: string;
  issuerBankName: string;
  recToken: string;
  transactionStatus: "Approved" | "Declined" | "Pending" | "InProcessing";
  reason: string;
  reasonCode: number;
  fee: number;
  paymentSystem: string;
}

export interface IWayForPaySignRequest {
  orderReference: string;
  orderDate: number;
  amount: number;
  currency: string;
  productName: string[];
  productCount: number[];
  productPrice: number[];
}

export interface IWayForPaySignResponse {
  merchantAccount: string;
  merchantDomainName: string;
  merchantSignature: string;
}

export type WayForPayResult = 
  | { status: "approved"; response: IWayForPayResponse }
  | { status: "declined"; response: IWayForPayResponse }
  | { status: "pending"; response: IWayForPayResponse };

declare global {
  class Wayforpay {
    run(
      params: Record<string, unknown>,
      onApproved?: (response: IWayForPayResponse) => void,
      onDeclined?: (response: IWayForPayResponse) => void,
      onPending?: (response: IWayForPayResponse) => void,
    ): void;
    closeit(): void;
  }

  interface Window {
    Wayforpay: typeof Wayforpay;
  }
}
