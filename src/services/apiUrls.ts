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
