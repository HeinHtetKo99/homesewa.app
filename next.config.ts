import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "homesewa.app" }],
        destination: "https://www.homesewa.app/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon/favicon-48x48.png",
      },
    ];
  },
};

export default nextConfig;
