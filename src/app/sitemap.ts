import type { MetadataRoute } from "next";
import { infoPages } from "@/data/info";
import { site } from "@/data/site";
import { getProducts } from "@/lib/commerce/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/shop"), changeFrequency: "weekly", priority: 0.9 },
    ...getProducts().map((p) => ({ url: url(`/shop/${p.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...Object.keys(infoPages).map((t) => ({ url: url(`/info/${t}`), changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
