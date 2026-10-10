/**
 * Storefront types. Every page reads these shapes, so the catalog can come
 * from the local data file or from Shopify (see ./index.ts) without UI changes.
 */

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ColorOption = {
  name: string;
  /** Swatch color shown in grids and on the product page. */
  swatch: string;
};

export type ProductVariant = {
  /** Stable id: the SKU locally, the variant GID on Shopify. */
  id: string;
  size: Size;
  color: string;
  /** Units on hand. 0 shows as sold out; null means inventory isn't tracked. */
  inventory: number | null;
};

export type Product = {
  slug: string;
  name: string;
  collection: string;
  category: "long-sleeve" | "tee";
  /** Price in the smallest currency unit (cents). */
  price: number;
  currency: "USD";
  colors: ColorOption[];
  description: string;
  /** Verse printed on the garment, when it carries one. */
  scripture?: { text: string; reference: string };
  /** Leave null until confirmed with production; the product page says details are coming. */
  material: string | null;
  fit: string | null;
  care: string[] | null;
  images: ProductImage[];
  /** Shown on hover in product grids. */
  hoverImage?: ProductImage;
  variants: ProductVariant[];
  /** Lower numbers sort first under "Featured". */
  featuredRank: number;
};

export type CartLine = {
  variantId: string;
  slug: string;
  size: Size;
  color: string;
  quantity: number;
};

export function isVariantAvailable(v: ProductVariant): boolean {
  return v.inventory === null || v.inventory > 0;
}

export function isProductAvailable(p: Product): boolean {
  return p.variants.some(isVariantAvailable);
}

export function maxQuantity(v: ProductVariant): number {
  return v.inventory === null ? 10 : v.inventory;
}
