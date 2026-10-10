import type { Product, ProductImage, Size } from "@/lib/commerce/types";
import { loops, photos, type MediaImage, type MediaVideo } from "./media";
import sizes from "./productImages.json";
import { sizeGuide } from "./sizeGuide";

/*
 * Local catalog, used while COMMERCE_PROVIDER is unset (see src/lib/commerce).
 * With Shopify connected, prices, variants and stock come from Shopify and the
 * merchandising here (gallery media, details, verse) is merged in by handle,
 * so keep the Shopify product handles "strong-courageous" and "through-christ".
 *
 * Owner checklist before launch:
 *   - price              placeholder prices, in cents (Shopify's prices win once connected)
 *   - inventory          null = not tracked here; Shopify supplies real stock
 *   - material/care      null until confirmed with production
 */

const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

function variants(slug: string, color: string) {
  return SIZES.map((size) => ({ id: `${slug}-${size.toLowerCase()}`, size, color, inventory: null }));
}

type Slug = keyof typeof sizes;

/** Product photography processed into public/images/products by `npm run images`. */
function img(slug: Slug, view: string, label: string, alt: string, fit: ProductImage["fit"] = "contain"): ProductImage {
  const [width, height] = (sizes[slug] as Record<string, number[]>)[view];
  return { src: `/images/products/${slug}/${view}.webp`, alt, width, height, label, fit };
}

/** A campaign photo as a gallery view. */
const photo = (p: MediaImage, label: string): ProductImage => ({ ...p, label, fit: "cover" });

/** A looping video as a gallery view (its poster frame is the image). */
const clip = (v: MediaVideo, label: string): ProductImage => ({ ...v.poster, label, fit: "cover", video: v.src });

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
    "Oversized, boxy fit with dropped shoulders",
    "Small thorned cross and Swolvation wordmark on the chest",
    "Large gothic cross between two skulls across the back",
    "Arched blackletter verse with the Joshua 1:9 reference",
    "Distressed cream print on vintage black",
  ],
  description:
    "An oversized short-sleeve tee in vintage black. A small thorned cross and the Swolvation wordmark sit on the chest; the back carries a large gothic cross between two skulls, under an arch of Joshua 1:9.",
  material: null,
  fit: sizeGuide.charts.tee?.fitNote ?? null,
  care: null,
  images: [
    photo(photos.teeFlatLay, "Flat lay"),
    clip(loops.teeTurn, "Turn"),
    photo(photos.teeStudioBack, "Back"),
    photo(photos.teeStudioFront, "Front"),
    img("strong-courageous", "front-detail", "Chest", "Close-up of the chest print: a thorned cross above the Swolvation wordmark on washed black cotton"),
    clip(loops.teeSweep, "Print"),
    photo(photos.teeGymHook, "In the gym"),
  ],
  variants: variants("strong-courageous", VINTAGE_BLACK.name),
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
    "Classic-fit long sleeve",
    "Small thorned cross and Swolvation wordmark on the chest",
    "Cream thorned-vine graphics down both sleeves",
    "Skull on a thorned gothic cross across the back",
    "Arched blackletter verse with the Philippians 4:13 reference",
  ],
  description:
    "A black long sleeve with cream graphics front, back and sleeves. A thorned cross and skull fill the back inside an arch of Philippians 4:13, with a cross and wordmark on the chest and thorned vines down both arms.",
  material: null,
  fit: sizeGuide.charts["long-sleeve"]?.fitNote ?? null,
  care: null,
  images: [
    photo(photos.lsFlatLay, "Flat lay"),
    clip(loops.lsTurn, "Turn"),
    photo(photos.lsStudioBack, "Back"),
    photo(photos.lsStudioFront, "Front"),
    clip(loops.lsDawn, "In the gym"),
    photo(photos.lsLocker, "Locker room"),
  ],
  variants: variants("through-christ", BLACK.name),
  featuredRank: 2,
};

export const products: Product[] = [strongCourageous, throughChrist];

/** Looks up a product image by its gallery label, for editorial sections that feature the garments. */
export function productImage(slug: string, label: string): ProductImage {
  const image = products.find((p) => p.slug === slug)?.images.find((i) => i.label === label);
  if (!image) throw new Error(`No "${label}" image for ${slug}`);
  return image;
}
