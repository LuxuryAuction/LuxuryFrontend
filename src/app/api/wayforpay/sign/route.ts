import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const MERCHANT_ACCOUNT = process.env.NEXT_PUBLIC_WFP_MERCHANT_ACCOUNT || "test_merch_n1";
const SECRET_KEY = process.env.WFP_SECRET_KEY || "flk3409refn54t54t*FNJRET";
const MERCHANT_DOMAIN = process.env.NEXT_PUBLIC_WFP_MERCHANT_DOMAIN || "localhost";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderReference,
      orderDate,
      amount,
      currency,
      productName,
      productCount,
      productPrice,
    } = body;

    if (!orderReference || !orderDate || !amount || !currency || !productName || !productCount || !productPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }


    const signatureComponents: string[] = [
      MERCHANT_ACCOUNT,
      MERCHANT_DOMAIN,
      orderReference,
      String(orderDate),
      String(amount),
      currency,
      ...(Array.isArray(productName) ? productName : [productName]),
      ...(Array.isArray(productCount) ? productCount.map(String) : [String(productCount)]),
      ...(Array.isArray(productPrice) ? productPrice.map(String) : [String(productPrice)]),
    ];

    const signatureString = signatureComponents.join(";");

    const merchantSignature = crypto
      .createHmac("md5", SECRET_KEY)
      .update(signatureString, "utf8")
      .digest("hex");

    return NextResponse.json({
      merchantAccount: MERCHANT_ACCOUNT,
      merchantDomainName: MERCHANT_DOMAIN,
      merchantSignature,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}
