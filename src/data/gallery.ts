/*
 * Plates: the editorial gallery on the home page.
 *
 * Add lifestyle and gym photography by appending `image` entries; `shape`
 * controls how much room a plate takes on the horizontal track (desktop) and
 * in the two-column stack (mobile).
 */

export type PlateShape = "tall" | "slit" | "wide" | "square";

export type Plate =
  | { kind: "image"; src: string; alt: string; width: number; height: number; caption: string; shape: PlateShape; tone?: "light" | "dark" }
  | { kind: "log"; caption: string; title: string; rows: [string, string][] };

export const plates: Plate[] = [
  {
    kind: "image",
    src: "/images/products/strengthened-long-sleeve/back-print.jpg",
    alt: "Back print of the Strengthened Long Sleeve: a thorned cross over a skull inside an arch of blackletter scripture",
    width: 624,
    height: 944,
    caption: "Back print, Strengthened Long Sleeve. Philippians 4:13.",
    shape: "tall",
  },
  {
    kind: "log",
    title: "Week 14",
    caption: "The program hasn’t changed much since 1977.",
    rows: [
      ["Mon", "Chest and back"],
      ["Tue", "Legs (yes, legs)"],
      ["Wed", "Shoulders and arms"],
      ["Thu", "Legs again"],
      ["Fri", "Back, then pancakes"],
      ["Sat", "Whatever’s left"],
      ["Sun", "Church, then rest"],
    ],
  },
  {
    kind: "image",
    src: "/images/products/rise-again-long-sleeve/sleeve.jpg",
    alt: "Sleeve of the Rise Again Long Sleeve, printed with barbed vines in faded charcoal",
    width: 200,
    height: 900,
    caption: "Sleeve, Rise Again Long Sleeve.",
    shape: "slit",
  },
  {
    kind: "image",
    src: "/images/products/courageous-heavyweight-tee/scripture.jpg",
    alt: "Arched blackletter reading Be strong and courageous across the back of a black tee",
    width: 768,
    height: 280,
    caption: "Arched blackletter, Courageous Heavyweight Tee.",
    shape: "wide",
  },
  {
    kind: "image",
    src: "/images/products/courageous-heavyweight-tee/chest.jpg",
    alt: "Chest print: a small thorned cross above the Swolvation wordmark",
    width: 340,
    height: 340,
    caption: "The chest mark. Same on every piece.",
    shape: "square",
  },
  {
    kind: "image",
    src: "/images/products/rise-again-long-sleeve/back-print.jpg",
    alt: "Back print of the Rise Again Long Sleeve: a knight kneeling beneath a thorned cross",
    width: 598,
    height: 912,
    caption: "Back print, Rise Again Long Sleeve. Micah 7:8.",
    shape: "tall",
    tone: "light",
  },
  {
    kind: "image",
    src: "/images/products/strengthened-long-sleeve/sleeve.jpg",
    alt: "Sleeve of the Strengthened Long Sleeve, printed with cream barbed vines on washed black",
    width: 180,
    height: 1120,
    caption: "Sleeve, Strengthened Long Sleeve.",
    shape: "slit",
  },
  {
    kind: "image",
    src: "/images/products/courageous-heavyweight-tee/back-print.jpg",
    alt: "Back print of the Courageous Heavyweight Tee: a gothic cross bound between two skulls",
    width: 640,
    height: 928,
    caption: "Back print, Courageous Heavyweight Tee. Joshua 1:9.",
    shape: "tall",
  },
];
