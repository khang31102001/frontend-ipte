import type { NextConfig } from "next";

/** Origin của backend (ảnh tải lên phục vụ ở /storage) — suy ra từ NEXT_PUBLIC_API_BASE_URL. */
function apiOrigin(): URL | null {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_BASE_URL ?? "");
  } catch {
    return null;
  }
}

const api = apiOrigin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      ...(api
        ? [{ protocol: api.protocol.replace(":", "") as "http" | "https", hostname: api.hostname, ...(api.port ? { port: api.port } : {}), pathname: "/storage/**" }]
        : []),
    ],
  },
};

export default nextConfig;
