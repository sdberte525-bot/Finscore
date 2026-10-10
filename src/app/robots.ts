import type { MetadataRoute } from "next";
import { business } from "@/data/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/bag", "/checkout", "/api/"] },
    sitemap: new URL("/sitemap.xml", business.url).toString(),
  };
}
