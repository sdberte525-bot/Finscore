import type { Product, ProductImage, Size } from "@/lib/commerce/types";

/*
 * Local catalog, used while COMMERCE_PROVIDER is unset (see src/lib/commerce).
 * With Shopify connected, products come from the Shopify admin instead.
 *
 * Owner checklist before launch:
 *   - price            placeholder prices, in cents
 *   - inventory        placeholder counts per size; use null to stop tracking
 *   - material/fit/care  null until confirmed with production
 *   - images           generated from the design renders by `npm run images`;
 *                      replace with product photography in public/images/products/<slug>/
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

function img(slug: string, file: string, alt: string, width: number, height: number): ProductImage {
  return { src: `/images/products/${slug}/${file}`, alt, width, height };
}

const WASHED_BLACK = { name: "Washed black", swatch: "#232120" };
const BONE = { name: "Bone", swatch: "#e9e2d2" };

export const products: Product[] = [
  {
    slug: "strengthened-long-sleeve",
    name: "Strengthened Long Sleeve",
    collection: "Scripture Series",
    category: "long-sleeve",
    price: 6800,
    currency: "USD",
    colors: [WASHED_BLACK],
    scripture: { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
    description:
      "A washed-black long sleeve with a thorned cross and skull on the back, framed by Philippians 4:13. Barbed vines run the length of both sleeves, with a small cross and wordmark on the chest.",
    material: null,
    fit: null,
    care: null,
    images: [
      img("strengthened-long-sleeve", "composite.jpg", "Strengthened Long Sleeve in washed black, front and back", 1470, 1838),
      img("strengthened-long-sleeve", "back-print.jpg", "Back print: thorned cross and skull framed by Philippians 4:13", 624, 944),
      img("strengthened-long-sleeve", "chest.jpg", "Chest print: thorned cross above the Swolvation wordmark", 380, 380),
      img("strengthened-long-sleeve", "sleeve.jpg", "Sleeve print: barbed vines running wrist to shoulder", 180, 1120),
    ],
    hoverImage: img("strengthened-long-sleeve", "back-print.jpg", "Back print detail", 624, 944),
    variants: variants("strengthened-long-sleeve", WASHED_BLACK.name, { XS: 4, S: 12, M: 18, L: 18, XL: 10, XXL: 6 }),
    featuredRank: 1,
  },
  {
    slug: "courageous-oversized-tee",
    name: "Courageous Oversized Tee",
    collection: "Scripture Series",
    category: "tee",
    price: 5400,
    currency: "USD",
    colors: [WASHED_BLACK],
    scripture: { text: "Be strong and courageous.", reference: "Joshua 1:9" },
    description:
      "An oversized washed-black tee. On the back, a gothic cross bound between two skulls under an arch of Joshua 1:9; on the chest, a small thorned cross above the wordmark.",
    material: null,
    fit: null,
    care: null,
    images: [
      img("courageous-oversized-tee", "composite.jpg", "Courageous Oversized Tee in washed black, front and back", 1470, 1838),
      img("courageous-oversized-tee", "back-print.jpg", "Back print: gothic cross between two skulls, Joshua 1:9", 640, 928),
      img("courageous-oversized-tee", "scripture.jpg", "Arched lettering across the back: Be strong and courageous", 768, 280),
      img("courageous-oversized-tee", "chest.jpg", "Chest print: thorned cross above the Swolvation wordmark", 340, 340),
    ],
    hoverImage: img("courageous-oversized-tee", "back-print.jpg", "Back print detail", 640, 928),
    variants: variants("courageous-oversized-tee", WASHED_BLACK.name, { XS: 6, S: 14, M: 20, L: 20, XL: 12, XXL: 0 }),
    featuredRank: 2,
  },
  {
    slug: "rise-again-long-sleeve",
    name: "Rise Again Long Sleeve",
    collection: "Scripture Series",
    category: "long-sleeve",
    price: 6800,
    currency: "USD",
    colors: [BONE],
    scripture: { text: "Though I fall, I will rise.", reference: "Micah 7:8" },
    description:
      "A bone long sleeve printed in faded charcoal: a knight kneeling beneath a thorned cross, under Micah 7:8. For anyone who has missed a lift and come back for it. Barbed vines on both sleeves.",
    material: null,
    fit: null,
    care: null,
    images: [
      img("rise-again-long-sleeve", "composite.jpg", "Rise Again Long Sleeve in bone, front and back", 1470, 1838),
      img("rise-again-long-sleeve", "back-print.jpg", "Back print: kneeling knight beneath a thorned cross, Micah 7:8", 598, 912),
      img("rise-again-long-sleeve", "chest.jpg", "Chest print: thorned cross above the Swolvation wordmark", 340, 380),
      img("rise-again-long-sleeve", "sleeve.jpg", "Sleeve print: barbed vines in faded charcoal", 200, 900),
    ],
    hoverImage: img("rise-again-long-sleeve", "back-print.jpg", "Back print detail", 598, 912),
    variants: variants("rise-again-long-sleeve", BONE.name, { XS: 3, S: 10, M: 16, L: 16, XL: 8, XXL: 4 }),
    featuredRank: 3,
  },
];
