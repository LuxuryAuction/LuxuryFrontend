import { NextRequest, NextResponse } from "next/server";

/**
 * Runtime proxy for SignalR (/hubs/* → VPS).
 * Unlike next.config rewrites, this uses API_BACKEND_URL at request time (Vercel server env).
 */
const BACKEND_URL = process.env.API_BACKEND_URL?.replace(/\/$/, "");

const FORWARDED_HEADERS = [
  "authorization",
  "content-type",
  "accept",
  "accept-language",
  "cookie",
  "user-agent",
];

export const dynamic = "force-dynamic";

async function proxyHubRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  if (!BACKEND_URL) {
    return NextResponse.json(
      {
        message:
          "API_BACKEND_URL is not configured on the server. Set it in Vercel → Environment Variables and redeploy.",
      },
      { status: 500 },
    );
  }

  const { path } = await context.params;
  const hubPath = path.join("/");
  const targetUrl = new URL(`${BACKEND_URL}/hubs/${hubPath}`);

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

export const GET = proxyHubRequest;
export const POST = proxyHubRequest;
export const PUT = proxyHubRequest;
export const PATCH = proxyHubRequest;
export const DELETE = proxyHubRequest;
export const OPTIONS = proxyHubRequest;
