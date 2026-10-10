import type { MetadataRoute } from "next";
import { business } from "@/data/business";
import { getCatalog } from "@/lib/commerce";

const pages = ["/about", "/contact", "/faq", "/shipping", "/returns", "/size-guide", "/privacy", "/terms"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => new URL(path, business.url).toString();
  const products = await getCatalog();
  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/shop"), changeFrequency: "weekly", priority: 0.9 },
    ...products.map((p) => ({ url: url(`/shop/${p.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...pages.map((p) => ({ url: url(p), changeFrequency: "monthly" as const, priority: 0.4 })),
  ];
}
