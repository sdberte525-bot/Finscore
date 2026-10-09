import type { Product, ProductImage, Size } from "@/lib/commerce/types";

/*
 * Drop 01 catalog.
 *
 * Prices, inventory, fabric details and fit notes below are placeholders until
 * production specs are final. Images are generated from the design renders by
 * `npm run images`; replace them with photography by dropping files into
 * public/images/products/<slug>/ and updating the paths and sizes here.
 */

const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

function variants(slug: string, stock: Partial<Record<Size, number>>) {
  return SIZES.map((size) => ({
    id: `${slug}-${size.toLowerCase()}`,
    size,
    inventory: stock[size] ?? 0,
  }));
}

function img(slug: string, file: string, alt: string, width: number, height: number): ProductImage {
  return { src: `/images/products/${slug}/${file}`, alt, width, height };
}

export const products: Product[] = [
  {
    slug: "strengthened-long-sleeve",
    name: "Strengthened Long Sleeve",
    colorway: "Washed black",
    category: "long-sleeve",
    price: 6800,
    currency: "USD",
    scripture: {
      text: "I can do all things through Christ who strengthens me.",
      reference: "Philippians 4:13",
    },
    description:
      "Our heaviest long sleeve, washed down to a soft faded black. A thorned cross over a screaming skull on the back, set inside Philippians 4:13, with barbed vines running the length of both sleeves.",
    details: [
      "Heavyweight cotton jersey",
      "Garment washed for a broken-in hand",
      "Distressed screen prints on back, chest and both sleeves",
      "Ribbed cuffs and crew neck",
    ],
    fit: "Relaxed through the body with a dropped shoulder. Take your usual size, or size up for a looser drape.",
    care: ["Wash cold, inside out", "Hang dry to keep the print sharp", "Do not iron the print"],
    images: [
      img("strengthened-long-sleeve", "composite.jpg", "Strengthened Long Sleeve in washed black, front and back", 1470, 1838),
      img("strengthened-long-sleeve", "back-print.jpg", "Back print: thorned cross and skull framed by Philippians 4:13", 624, 944),
      img("strengthened-long-sleeve", "chest.jpg", "Chest print: thorned cross above the Swolvation wordmark", 380, 380),
      img("strengthened-long-sleeve", "sleeve.jpg", "Sleeve print: barbed vines running wrist to shoulder", 180, 1120),
    ],
    hoverImage: img("strengthened-long-sleeve", "back-print.jpg", "Back print detail", 624, 944),
    inkMap: "/images/ink/strengthened-long-sleeve.png",
    variants: variants("strengthened-long-sleeve", { XS: 4, S: 12, M: 18, L: 18, XL: 10, XXL: 6 }),
  },
  {
    slug: "courageous-heavyweight-tee",
    name: "Courageous Heavyweight Tee",
    colorway: "Washed black",
    category: "tee",
    price: 5400,
    currency: "USD",
    scripture: {
      text: "Be strong and courageous.",
      reference: "Joshua 1:9",
    },
    description:
      "A boxy heavyweight tee for the days you need reminding. Twin skulls bound to a gothic cross on the back under Joshua 1:9, with a small thorned cross on the chest.",
    details: [
      "Heavyweight cotton jersey",
      "Boxy cut with a thick ribbed collar",
      "Garment washed for a faded black",
      "Distressed screen prints on back and chest",
    ],
    fit: "Oversized and boxy, cut short in the body with a wide sleeve. Size down for a closer fit.",
    care: ["Wash cold, inside out", "Hang dry to keep the print sharp", "Do not iron the print"],
    images: [
      img("courageous-heavyweight-tee", "composite.jpg", "Courageous Heavyweight Tee in washed black, front and back", 1470, 1838),
      img("courageous-heavyweight-tee", "back-print.jpg", "Back print: gothic cross between two skulls, Joshua 1:9", 640, 928),
      img("courageous-heavyweight-tee", "scripture.jpg", "Arched blackletter: Be strong and courageous", 768, 280),
      img("courageous-heavyweight-tee", "chest.jpg", "Chest print: thorned cross above the Swolvation wordmark", 340, 340),
    ],
    hoverImage: img("courageous-heavyweight-tee", "back-print.jpg", "Back print detail", 640, 928),
    inkMap: "/images/ink/courageous-heavyweight-tee.png",
    variants: variants("courageous-heavyweight-tee", { XS: 6, S: 14, M: 20, L: 20, XL: 12, XXL: 0 }),
  },
  {
    slug: "rise-again-long-sleeve",
    name: "Rise Again Long Sleeve",
    colorway: "Bone",
    category: "long-sleeve",
    price: 6800,
    currency: "USD",
    scripture: {
      text: "Though I fall, I will rise.",
      reference: "Micah 7:8",
    },
    description:
      "The bone colorway, printed in faded charcoal. A kneeling knight at the foot of a thorned cross under Micah 7:8, for anyone who has failed a lift and come back for it.",
    details: [
      "Heavyweight cotton jersey",
      "Undyed bone colorway, garment washed",
      "Distressed screen prints on back, chest and both sleeves",
      "Ribbed cuffs and crew neck",
    ],
    fit: "Relaxed through the body with a dropped shoulder. Take your usual size, or size up for a looser drape.",
    care: ["Wash cold with like colors, inside out", "Hang dry to keep the print sharp", "Do not iron the print"],
    images: [
      img("rise-again-long-sleeve", "composite.jpg", "Rise Again Long Sleeve in bone, front and back", 1470, 1838),
      img("rise-again-long-sleeve", "back-print.jpg", "Back print: kneeling knight beneath a thorned cross, Micah 7:8", 598, 912),
      img("rise-again-long-sleeve", "chest.jpg", "Chest print: thorned cross above the Swolvation wordmark", 340, 380),
      img("rise-again-long-sleeve", "sleeve.jpg", "Sleeve print: barbed vines in faded charcoal", 200, 900),
    ],
    hoverImage: img("rise-again-long-sleeve", "back-print.jpg", "Back print detail", 598, 912),
    inkMap: "/images/ink/rise-again-long-sleeve.png",
    variants: variants("rise-again-long-sleeve", { XS: 3, S: 10, M: 16, L: 16, XL: 8, XXL: 4 }),
  },
];
