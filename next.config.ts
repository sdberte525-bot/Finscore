import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async redirects() {
    // Earlier product URLs.
    return [
      { source: "/shop/courageous-oversized-tee", destination: "/shop/strong-courageous", permanent: true },
      { source: "/shop/courageous-heavyweight-tee", destination: "/shop/strong-courageous", permanent: true },
      { source: "/shop/rise-again-long-sleeve", destination: "/shop", permanent: false },
      // The white long sleeve is off the launch lineup for now.
      { source: "/shop/though-i-fall", destination: "/shop", permanent: false },
      { source: "/bag", destination: "/cart", permanent: true },
      { source: "/shop/strengthened-long-sleeve", destination: "/shop/through-christ", permanent: true },
    ];
  },
};

export default nextConfig;
