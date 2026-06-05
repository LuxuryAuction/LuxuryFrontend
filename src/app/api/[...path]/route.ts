import { NextRequest, NextResponse } from "next/server";
import { buildBackendProxyTargetUrl } from "@/src/services/apiUrls";

export const dynamic = "force-dynamic";

const FORWARDED_HEADERS = [
  "authorization",
  "content-type",
  "accept",
  "accept-language",
  "cookie",
  "user-agent",
];

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  if (!process.env.API_BACKEND_URL) {
    return NextResponse.json(
      { message: "API_BACKEND_URL is not configured on the server" },
      { status: 500 },
    );
  }

  const { path } = await context.params;
  const target = buildBackendProxyTargetUrl(path);
  if (!target) {
    return NextResponse.json(
      { message: "Could not resolve backend proxy URL" },
      { status: 500 },
    );
  }

  const targetUrl = new URL(target);

  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  const headers = new Headers();
  FORWARDED_HEADERS.forEach((name) => {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  });

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const body = hasBody ? await request.arrayBuffer() : undefined;

  const backendResponse = await fetch(targetUrl.toString(), {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  });

  const responseHeaders = new Headers(backendResponse.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("transfer-encoding");

  return new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
