/*
 * Size charts per product category, in inches. These are approximate
 * measurements for the cuts (oversized tee, classic long sleeve); replace them
 * with measured production samples when they arrive and set `approximate` to
 * false.
 */

import type { Size } from "@/lib/commerce/types";

export type SizeChartData = {
  columns: string[];
  rows: string[][];
  /** How the cut fits, shown above the chart and used by the fit finder. */
  fitNote: string;
  /** Sizes to move by for each fit preference, relative to the customer's usual size. */
  fitShift: { fitted: number; regular: number; relaxed: number };
};

export const sizeGuide = {
  unit: "inches",
  approximate: true,
  howToMeasure: [
    "Chest: lay the garment flat and measure straight across, armpit to armpit.",
    "Length: measure from the highest point of the shoulder down to the hem.",
    "Sleeve: measure from the centre of the back of the collar, over the shoulder, to the end of the cuff.",
  ],
  /** Body chest measurement each size is made for. */
  bodyChest: { XS: "32–34", S: "35–37", M: "38–40", L: "41–43", XL: "44–47", XXL: "48–51" } as Partial<Record<Size, string>>,
  charts: {
    tee: {
      columns: ["Size", "Chest (pit to pit)", "Length", "Fits chest"],
      rows: [
        ["XS", "21", "27", "32–34"],
        ["S", "22", "28", "35–37"],
        ["M", "23", "29", "38–40"],
        ["L", "24", "30", "41–43"],
        ["XL", "25.5", "31", "44–47"],
        ["XXL", "27", "32", "48–51"],
      ],
      fitNote: "Oversized and boxy, with dropped shoulders. Take your usual size for the intended look, or size down for a closer fit.",
      fitShift: { fitted: -1, regular: 0, relaxed: 1 },
    },
    "long-sleeve": {
      columns: ["Size", "Chest (pit to pit)", "Length", "Sleeve", "Fits chest"],
      rows: [
        ["XS", "19", "26.5", "32.5", "32–34"],
        ["S", "20", "27.5", "33.5", "35–37"],
        ["M", "21.5", "28.5", "34.5", "38–40"],
        ["L", "23", "29.5", "35.5", "41–43"],
        ["XL", "24.5", "30.5", "36", "44–47"],
        ["XXL", "26", "31.5", "36.5", "48–51"],
      ],
      fitNote: "A classic fit: close through the body without clinging. Take your usual size, or size up for a relaxed look.",
      fitShift: { fitted: 0, regular: 0, relaxed: 1 },
    },
  } as Record<"tee" | "long-sleeve", SizeChartData | null>,
};

export const categoryLabel = { "long-sleeve": "Long sleeves", tee: "Short sleeves" } as const;

const ORDER: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

/** Recommends a size from the customer's usual size and how they like things to fit. */
export function recommendSize(category: keyof typeof sizeGuide.charts, usual: Size, fit: "fitted" | "regular" | "relaxed"): Size {
  const chart = sizeGuide.charts[category];
  const shift = chart ? chart.fitShift[fit] : 0;
  const i = Math.min(ORDER.length - 1, Math.max(0, ORDER.indexOf(usual) + shift));
  return ORDER[i];
}
