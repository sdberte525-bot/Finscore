import type { Product, ProductImage, Size } from "@/lib/commerce/types";
import sizes from "./productImages.json";

/*
 * Local catalog, used while COMMERCE_PROVIDER is unset (see src/lib/commerce).
 * With Shopify connected, products come from the Shopify admin instead.
 *
 * Owner checklist before launch:
 *   - price              placeholder prices, in cents
 *   - inventory          placeholder counts per size; use null to stop tracking
 *   - material/fit/care  null until confirmed with production
 *   - images             built by `npm run images` from assets/source/; pixel sizes
 *                        come from src/data/productImages.json
 */

const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

function variants(slug: string, color: string, stock: Partial<Record<Size, number>>) {
  return SIZES.map((size) => ({
    id: `${slug}-${size.toLowerCase()}`,
    size,
    color,
    inventory: stock[size] ?? 0,
  }));
}

type Slug = keyof typeof sizes;

function img(slug: Slug, view: string, label: string, alt: string, fit: ProductImage["fit"] = "contain"): ProductImage {
  const [width, height] = (sizes[slug] as Record<string, number[]>)[view];
  return { src: `/images/products/${slug}/${view}.webp`, alt, width, height, label, fit };
}

const VINTAGE_BLACK = { name: "Vintage black", swatch: "#2b2927" };
const BLACK = { name: "Black", swatch: "#1a1918" };

const strongCourageous: Product = {
  slug: "strong-courageous",
  name: "Be Strong & Courageous",
  collection: "Scripture Series",
  category: "tee",
  price: 5400,
  currency: "USD",
  colors: [VINTAGE_BLACK],
  scripture: { text: "Be strong and courageous.", reference: "Joshua 1:9" },
  features: [
    "Oversized short-sleeve fit",
    "Small cross and Swolvation logo on the front",
    "Large gothic cross and skull graphic on the back",
    "Joshua 1:9 reference",
    "Distressed cream-colored print",
  ],
  description:
    "An oversized short-sleeve tee in vintage black. A small thorned cross and the Swolvation wordmark sit on the chest; the back carries a large gothic cross between two skulls, under an arch of Joshua 1:9.",
  material: null,
  fit: null,
  care: null,
  images: [
    img("strong-courageous", "front-back", "Front and back", "Be Strong & Courageous tee in vintage black, shown from the front and the back"),
    img("strong-courageous", "back", "Back", "Back of the Be Strong & Courageous tee: a gothic cross between two skulls under the words Be strong and courageous, Joshua 1:9"),
    img("strong-courageous", "front-detail", "Chest", "Close-up of the chest print: a thorned cross above the Swolvation wordmark on washed black cotton"),
    img("strong-courageous", "back-detail", "Back print", "Close-up of the back lettering and cross on the Be Strong & Courageous tee", "cover"),
  ],
  variants: variants("strong-courageous", VINTAGE_BLACK.name, { XS: 6, S: 14, M: 20, L: 20, XL: 12, XXL: 0 }),
  featuredRank: 1,
};

const throughChrist: Product = {
  slug: "through-christ",
  name: "Through Christ Who Strengthens Me",
  collection: "Scripture Series",
  category: "long-sleeve",
  price: 6800,
  currency: "USD",
  colors: [BLACK],
  scripture: { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
  features: [
    "Long sleeves",
    "Small cross and Swolvation logo on the front",
    "Cream thorned-vine graphics down both sleeves",
    "Large gothic skull-and-cross graphic on the back",
    "Philippians 4:13 reference",
  ],
  description:
    "A black long sleeve with cream graphics front, back and sleeves. A thorned cross and skull fill the back inside an arch of Philippians 4:13, with a cross and wordmark on the chest and thorned vines down both arms.",
  material: null,
  fit: null,
  care: null,
  images: [
    img("through-christ", "front-back", "Front and back", "Through Christ Who Strengthens Me long sleeve in black, shown from the front and the back"),
    img("through-christ", "back", "Back", "Back of the Through Christ Who Strengthens Me long sleeve: a thorned cross and skull inside an arch of Philippians 4:13, with vines down both sleeves"),
    img("through-christ", "back-detail", "Back print", "Close-up of the skull and thorned cross on the back print", "cover"),
    img("through-christ", "sleeve-detail", "Sleeve", "Close-up of the cream thorned-vine print running down the sleeve"),
  ],
  variants: variants("through-christ", BLACK.name, { XS: 4, S: 12, M: 18, L: 18, XL: 10, XXL: 6 }),
  featuredRank: 2,
};

export const products: Product[] = [strongCourageous, throughChrist];


/** Looks up a product image by its gallery label, for editorial sections that feature the garments. */
export function productImage(slug: string, label: string): ProductImage {
  const image = products.find((p) => p.slug === slug)?.images.find((i) => i.label === label);
  if (!image) throw new Error(`No "${label}" image for ${slug}`);
  return image;
}
