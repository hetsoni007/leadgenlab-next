import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Keep every legacy .html URL working.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:path*/index.html", destination: "/:path*", permanent: true },
      { source: "/:path*.html", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
