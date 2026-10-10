import "server-only";
import { cache } from "react";
import { products as merchandising } from "@/data/products";
import { fetchLocalCatalog } from "./local";
import { fetchShopifyCatalog, isShopifyConfigured } from "./shopify";
import type { Product } from "./types";

/*
 * The storefront's single source of products.
 *
 *   COMMERCE_PROVIDER unset   -> src/data/products.ts, checkout through Stripe (if keyed)
 *   COMMERCE_PROVIDER=shopify -> Shopify Storefront API for products, stock and checkout,
 *                                merged with the merchandising in src/data/products.ts by handle
 */

export type Provider = "local" | "shopify";

export function provider(): Provider {
  return process.env.COMMERCE_PROVIDER === "shopify" && isShopifyConfigured() ? "shopify" : "local";
}

/**
 * Shopify owns what's for sale (title, price, variants, stock); the site keeps its
 * curated gallery (campaign photos and videos), details, verse and fit notes for
 * any product whose Shopify handle matches a local slug.
 */
function merchandise(shop: Product): Product {
  const local = merchandising.find((p) => p.slug === shop.slug);
  if (!local) return shop;
  return {
    ...shop,
    collection: local.collection,
    category: local.category,
    description: shop.description || local.description,
    features: shop.features ?? local.features,
    scripture: shop.scripture ?? local.scripture,
    material: shop.material ?? local.material,
    fit: shop.fit ?? local.fit,
    care: shop.care ?? local.care,
    images: local.images.length ? local.images : shop.images,
    featuredRank: local.featuredRank,
  };
}

export const getCatalog = cache(async (): Promise<Product[]> => {
  const list = provider() === "shopify" ? (await fetchShopifyCatalog()).map(merchandise) : await fetchLocalCatalog();
  return [...list].sort((a, b) => a.featuredRank - b.featuredRank);
});

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getCatalog()).find((p) => p.slug === slug);
}
