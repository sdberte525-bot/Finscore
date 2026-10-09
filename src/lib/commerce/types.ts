/**
 * Storefront types. Everything in the UI reads these shapes, so swapping the
 * local catalog for Shopify, Medusa or another backend only means writing a
 * new implementation of `catalog.ts` that returns the same types.
 */

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductVariant = {
  /** Stable id, also used as the SKU sent to checkout. */
  id: string;
  size: Size;
  /** Units on hand. 0 shows the size as sold out. */
  inventory: number;
};

export type Product = {
  slug: string;
  name: string;
  /** Short line shown under the name in grids, usually the colorway. */
  colorway: string;
  category: "long-sleeve" | "tee";
  /** Price in the smallest currency unit (cents). */
  price: number;
  currency: "USD";
  /** The verse printed on the back. */
  scripture: { text: string; reference: string };
  description: string;
  details: string[];
  fit: string;
  care: string[];
  images: ProductImage[];
  /** Shown on hover in product grids. */
  hoverImage: ProductImage;
  /** Grayscale ink map of the back print, used by the hero shader. */
  inkMap: string;
  variants: ProductVariant[];
};

export type CartLine = {
  variantId: string;
  slug: string;
  size: Size;
  quantity: number;
};
