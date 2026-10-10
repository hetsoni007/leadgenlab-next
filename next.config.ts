import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Keep every legacy .html URL working.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:path*/index.html", destination: "/:path*", permanent: true },
      // Excludes Google Search Console verification files (google*.html), which must stay as .html.
      { source: "/:path((?!google[a-z0-9]+\\.html$).+)\\.html", destination: "/:path", permanent: true },
    ];
  },
};

export default nextConfig;
