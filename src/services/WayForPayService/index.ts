import type { IWayForPaySignRequest, IWayForPaySignResponse, WayForPayResult } from "./types";

/**
 * Request HMAC_MD5 signature from our Next.js API route
 */
async function getPaymentSignature(data: IWayForPaySignRequest): Promise<IWayForPaySignResponse> {
  const response = await fetch("/api/wayforpay/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to get payment signature");
  }

  return response.json();
}

/**
 * Generate a unique order reference for this transaction
 */
function generateOrderReference(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LOT-${timestamp}-${random}`;
}

export interface OpenPaymentWidgetParams {
  amount: number;
  productName: string;
  clientEmail?: string;
  clientPhone?: string;
  clientFirstName?: string;
  clientLastName?: string;
}

/**
 * Open the WayForPay payment widget and return a promise that resolves
 * with the payment result (approved/declined/pending).
 */
export function openPaymentWidget(params: OpenPaymentWidgetParams): Promise<WayForPayResult> {
  return new Promise(async (resolve, reject) => {
    let messageHandler: ((event: MessageEvent) => void) | null = null;

    const cleanup = () => {
      if (messageHandler) {
        window.removeEventListener("message", messageHandler);
        messageHandler = null;
      }
    };

    try {
      // Check if the Wayforpay widget script is loaded
      if (typeof Wayforpay === "undefined") {
        throw new Error("WayForPay widget script not loaded. Please refresh the page.");
      }

      const orderReference = generateOrderReference();
      const orderDate = Math.floor(Date.now() / 1000);

      // Get the server-side HMAC_MD5 signature
      const signData: IWayForPaySignRequest = {
        orderReference,
        orderDate,
        amount: params.amount,
        currency: "UAH",
        productName: [params.productName],
        productCount: [1],
        productPrice: [params.amount],
      };

      const { merchantAccount, merchantDomainName, merchantSignature } =
        await getPaymentSignature(signData);

      messageHandler = (event: MessageEvent) => {
        if (event.data === "WfpWidgetEventClose") {
          cleanup();
          reject(new Error("Payment window closed by user"));
        }
      };
      window.addEventListener("message", messageHandler);

      const wayforpay = new Wayforpay();

      wayforpay.run(
        {
          merchantAccount,
          merchantDomainName,
          authorizationType: "SimpleSignature",
          merchantSignature,
          orderReference,
          orderDate: String(orderDate),
          amount: String(params.amount),
          currency: "UAH",
          productName: [params.productName],
          productPrice: [String(params.amount)],
          productCount: ["1"],
          clientFirstName: params.clientFirstName || "",
          clientLastName: params.clientLastName || "",
          clientEmail: params.clientEmail || "",
          clientPhone: params.clientPhone || "",
          language: "UA",
          straightWidget: true,
        },
        // onApproved
        (response) => {
          cleanup();
          resolve({ status: "approved", response });
        },
        // onDeclined
        (response) => {
          cleanup();
          resolve({ status: "declined", response });
        },
        // onPending
        (response) => {
          cleanup();
          resolve({ status: "pending", response });
        },
      );
    } catch (error) {
      cleanup();
      reject(error);
    }
  });
}
