import { maxQuantity, type CartLine, type Product, type ProductVariant } from "./types";

/* Pure helpers shared by the browser bag and the server checkout. */

export type PricedLine = CartLine & { product: Product; variant: ProductVariant; lineTotal: number };

export function findVariant(products: Product[], variantId: string) {
  for (const product of products) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
}

/** Resolves bag lines against the catalog, dropping anything no longer available. */
export function priceLines(lines: CartLine[], products: Product[]): { lines: PricedLine[]; subtotal: number } {
  const priced: PricedLine[] = [];
  for (const line of lines) {
    const found = findVariant(products, line.variantId);
    if (!found) continue;
    const max = maxQuantity(found.variant);
    if (max <= 0) continue;
    const quantity = Math.max(1, Math.min(line.quantity, max));
    priced.push({ ...line, quantity, ...found, lineTotal: found.product.price * quantity });
  }
  return { lines: priced, subtotal: priced.reduce((sum, l) => sum + l.lineTotal, 0) };
}
