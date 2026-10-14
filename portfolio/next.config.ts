import path from "node:path";
import type { NextConfig } from "next";

// `npm run export` builds plain static files (for GitHub Pages or any static host).
// The default build keeps image optimization and security headers for Vercel.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // The repository root holds a separate app; keep this project self-contained.
  turbopack: { root: path.resolve(".") },
  outputFileTracingRoot: path.resolve("."),
  poweredByHeader: false,
  ...(staticExport
    ? {
        output: "export",
        // Static hosts have no image optimizer; the headshot source is already web-sized.
        images: { unoptimized: true },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
          qualities: [75, 85],
        },
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Frame-Options", value: "DENY" },
                { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
