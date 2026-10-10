import "server-only";
import { cache } from "react";
import { fetchLocalCatalog } from "./local";
import { fetchShopifyCatalog, isShopifyConfigured } from "./shopify";
import type { Product } from "./types";

/*
 * The storefront's single source of products.
 *
 *   COMMERCE_PROVIDER unset  -> src/data/products.ts, checkout through Stripe (if keyed)
 *   COMMERCE_PROVIDER=shopify -> Shopify Storefront API for products and checkout
 */

export type Provider = "local" | "shopify";

export function provider(): Provider {
  return process.env.COMMERCE_PROVIDER === "shopify" && isShopifyConfigured() ? "shopify" : "local";
}

export const getCatalog = cache(async (): Promise<Product[]> => {
  const list = provider() === "shopify" ? await fetchShopifyCatalog() : await fetchLocalCatalog();
  return [...list].sort((a, b) => a.featuredRank - b.featuredRank);
});

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getCatalog()).find((p) => p.slug === slug);
}
