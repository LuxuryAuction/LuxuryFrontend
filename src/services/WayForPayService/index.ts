import type { ITopUpResponse } from "../PaymentsService/types";
import type { WayForPayResult } from "./types";

function mapTopUpFieldsToWidgetParams(
  fields: ITopUpResponse["fields"],
): Record<string, unknown> {
  const productName = fields["productName[]"];
  const productPrice = fields["productPrice[]"];
  const productCount = fields["productCount[]"];

  return {
    merchantAccount: fields.merchantAccount,
    merchantDomainName: fields.merchantDomainName,
    authorizationType: fields.merchantAuthType,
    merchantSignature: fields.merchantSignature,
    orderReference: fields.orderReference,
    orderDate: fields.orderDate,
    amount: fields.amount,
    currency: fields.currency,
    ...(productName ? { productName: [productName] } : {}),
    ...(productPrice ? { productPrice: [productPrice] } : {}),
    ...(productCount ? { productCount: [productCount] } : {}),
    language: "UA",
    straightWidget: true,
  };
}

/** Open WayForPay widget using payment session from backend (e.g. POST /payments/top-up). */
export function openPaymentSession(session: ITopUpResponse): Promise<WayForPayResult> {
  return new Promise((resolve, reject) => {
    let messageHandler: ((event: MessageEvent) => void) | null = null;

    const cleanup = () => {
      if (messageHandler) {
        window.removeEventListener("message", messageHandler);
        messageHandler = null;
      }
    };

    if (typeof Wayforpay === "undefined") {
      reject(new Error("WayForPay widget script not loaded. Please refresh the page."));
      return;
    }

    messageHandler = (event: MessageEvent) => {
      if (event.data === "WfpWidgetEventClose") {
        cleanup();
        reject(new Error("Payment window closed by user"));
      }
    };
    window.addEventListener("message", messageHandler);

    const wayforpay = new Wayforpay();
    wayforpay.run(
      mapTopUpFieldsToWidgetParams(session.fields),
      (response) => {
        cleanup();
        resolve({ status: "approved", response });
      },
      (response) => {
        cleanup();
        resolve({ status: "declined", response });
      },
      (response) => {
        cleanup();
        resolve({ status: "pending", response });
      },
    );
  });
}
