import { products } from "@/data/products";
import type { CartLine, Product, ProductVariant } from "./types";

/*
 * Catalog access. The storefront only calls these functions, so moving to a
 * hosted backend means re-implementing them (they can become async) against
 * that backend's API.
 */

export function getProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getVariant(variantId: string): { product: Product; variant: ProductVariant } | undefined {
  for (const product of products) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
}

export function isSoldOut(product: Product): boolean {
  return product.variants.every((v) => v.inventory <= 0);
}

export type PricedLine = CartLine & { product: Product; variant: ProductVariant; lineTotal: number };

/** Resolves bag lines against the catalog, dropping anything that no longer exists. */
export function priceLines(lines: CartLine[]): { lines: PricedLine[]; subtotal: number } {
  const priced: PricedLine[] = [];
  for (const line of lines) {
    const found = getVariant(line.variantId);
    if (!found) continue;
    const quantity = Math.max(1, Math.min(line.quantity, found.variant.inventory));
    if (found.variant.inventory <= 0) continue;
    priced.push({ ...line, quantity, ...found, lineTotal: found.product.price * quantity });
  }
  return { lines: priced, subtotal: priced.reduce((sum, l) => sum + l.lineTotal, 0) };
}
