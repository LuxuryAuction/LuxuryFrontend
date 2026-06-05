/** Path prefix before `/api` (e.g. `/luxury` from `http://host/luxury/api`). */
export function extractPathBaseFromApiEndpoint(apiEndpoint?: string): string {
  const raw = (apiEndpoint ?? "").replace(/\/$/, "");
  if (!raw) return "";

  try {
    const pathname = raw.startsWith("http") ? new URL(raw).pathname : raw;
    const match = pathname.match(/^(\/.+)\/api$/);
    return match?.[1] ?? "";
  } catch {
    return "";
  }
}

/** Backend root used by Next.js rewrites (PathBase included, no trailing slash). */
export function resolveBackendRootUrl(): string | undefined {
  const explicit = process.env.API_BACKEND_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT?.replace(/\/$/, "");
  if (apiEndpoint?.endsWith("/api")) {
    return apiEndpoint.slice(0, -4);
  }

  return undefined;
}

export function shouldProxyHubThroughDevServer(): boolean {
  if (typeof window === "undefined") return false;

  const host = window.location.hostname;
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.startsWith("192.168.")
  );
}

/**
 * HTTPS pages cannot open WebSocket/HTTP connections to plain http:// backends (mixed content).
 * Use same-origin /hubs/* (Next/Vercel rewrite → VPS) instead of NEXT_PUBLIC_SIGNALR_ENDPOINT.
 */
export function shouldProxyHubThroughAppOrigin(): boolean {
  if (typeof window === "undefined") return false;
  if (window.location.protocol !== "https:") return false;

  const signalr = process.env.NEXT_PUBLIC_SIGNALR_ENDPOINT?.trim();
  if (signalr?.startsWith("http://")) return true;

  const api = process.env.NEXT_PUBLIC_API_ENDPOINT?.trim();
  if (api?.startsWith("http://")) return true;

  return false;
}

export function shouldUseSameOriginHub(): boolean {
  return shouldProxyHubThroughDevServer() || shouldProxyHubThroughAppOrigin();
}

/**
 * Upstream URL for the Next.js `/api/[...path]` proxy.
 * REST controllers: `{host}/luxury/api/...` — SignalR hubs: `{host}/luxury/hubs/...` (no `/api` in path).
 */
export function buildBackendProxyTargetUrl(pathSegments: string[]): string {
  const configured = process.env.API_BACKEND_URL?.replace(/\/$/, "") ?? "";
  const path = pathSegments.join("/");

  if (pathSegments[0] === "hubs") {
    const hostRoot = configured.replace(/\/api$/i, "");
    return `${hostRoot}/${path}`;
  }

  if (configured.endsWith("/api")) {
    return `${configured}/${path}`;
  }

  return `${configured}/api/${path}`;
}
