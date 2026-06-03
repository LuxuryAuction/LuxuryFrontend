import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin();

function resolveBackendRootUrl(): string | undefined {
  const explicit = process.env.API_BACKEND_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT?.replace(/\/$/, "");
  if (apiEndpoint?.endsWith("/api")) {
    return apiEndpoint.slice(0, -4);
  }

  return undefined;
}

const backendRoot = resolveBackendRootUrl();

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  allowedDevOrigins: ["192.168.0.104", "192.168.0.109", "192.168.50.54", "192.168.50.255"],
  async rewrites() {
    if (!backendRoot) return [];

    // Client always calls /hubs/* (no locale, no PathBase). backendRoot includes PathBase when set.
    return [
      {
        source: "/hubs/:path*",
        destination: `${backendRoot}/hubs/:path*`,
      },
    ];
  },
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./src/i18n/request.ts",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "ibb.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
    ],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },

      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};
    config.resolve.alias.canvas = false;
    config.resolve.alias["next-intl/config"] = path.join(process.cwd(), "src/i18n/request.ts");

    return config;
  },
};

export default withNextIntl(nextConfig);