/*
 * Size charts per product category. A null chart shows "measurements coming
 * soon" instead of guessed numbers. Fill in from measured production samples:
 *
 *   "long-sleeve": {
 *     columns: ["Size", "Chest", "Length", "Sleeve"],
 *     rows: [["S", "21.5", "28", "33"], ...],
 *   },
 */

export type SizeChartData = { columns: string[]; rows: string[][] };

export const sizeGuide = {
  unit: "inches",
  howToMeasure: [
    "Chest: lay the garment flat and measure straight across, armpit to armpit.",
    "Length: measure from the highest point of the shoulder down to the hem.",
    "Sleeve: measure from the shoulder seam to the end of the cuff.",
  ],
  charts: {
    "long-sleeve": null as SizeChartData | null,
    tee: null as SizeChartData | null,
  },
};

export const categoryLabel = { "long-sleeve": "Long sleeves", tee: "Tees" } as const;
