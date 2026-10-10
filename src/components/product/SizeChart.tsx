"use client";

import Link from "next/link";
import { useState } from "react";
import { categoryLabel, recommendSize, sizeGuide } from "@/data/sizeGuide";
import type { Product, Size } from "@/lib/commerce/types";

const USUAL: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];
const FITS = [
  { value: "fitted", label: "Closer" },
  { value: "regular", label: "As designed" },
  { value: "relaxed", label: "Roomier" },
] as const;

/** Measurements table plus a two-question fit finder. `onPick` lets the product page select the recommended size. */
export function SizeChart({ category, onPick }: { category: Product["category"]; onPick?: (size: Size) => void }) {
  const chart = sizeGuide.charts[category];
  const [usual, setUsual] = useState<Size | null>(null);
  const [fit, setFit] = useState<(typeof FITS)[number]["value"]>("regular");

  if (!chart) {
    return (
      <div className="border border-ink/15 p-5 text-[0.9375rem] leading-relaxed">
        <p>Measurements for {categoryLabel[category].toLowerCase()} will be published here before launch.</p>
        <p className="mt-2 text-ash">
          Between sizes or unsure?{" "}
          <Link href="/contact" className="underline underline-offset-4">
            Ask us
          </Link>{" "}
          and we&rsquo;ll help you choose.
        </p>
      </div>
    );
  }

  const recommended = usual ? recommendSize(category, usual, fit) : null;
  const recRow = recommended ? chart.rows.find((r) => r[0] === recommended) : null;

  return (
    <div>
      <p className="text-[0.9375rem] leading-relaxed text-charcoal">{chart.fitNote}</p>

      <div className="mt-6 border border-ink/15 bg-plaster/50 p-5">
        <p className="caps text-ash">Find your size</p>
        <fieldset className="mt-4">
          <legend className="text-sm text-charcoal">Your usual size in tees and tops</legend>
          <div className="mt-2 grid grid-cols-6 gap-1.5">
            {USUAL.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={usual === s}
                onClick={() => setUsual(s)}
                className={`h-10 rounded-[2px] border text-sm transition-colors ${usual === s ? "border-ink bg-ink text-bone" : "border-ink/20 bg-bone hover:border-ink"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-4">
          <legend className="text-sm text-charcoal">How you like it to fit</legend>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {FITS.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={fit === f.value}
                onClick={() => setFit(f.value)}
                className={`h-10 rounded-[2px] border text-sm transition-colors ${fit === f.value ? "border-ink bg-ink text-bone" : "border-ink/20 bg-bone hover:border-ink"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </fieldset>
        <div role="status" aria-live="polite" className="mt-5 min-h-12">
          {recommended && recRow ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[0.9375rem]">
                We&rsquo;d go with <strong className="display text-[1.75rem] align-middle">{recommended}</strong>
                <span className="ml-2 text-sm text-ash">
                  {recRow[1]}&Prime; chest, {recRow[2]}&Prime; long
                </span>
              </p>
              {onPick ? (
                <button type="button" onClick={() => onPick(recommended)} className="button button-solid min-h-10 px-5 text-sm">
                  Select {recommended}
                </button>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-ash">Pick your usual size to see our recommendation.</p>
          )}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[20rem] text-left text-[0.9375rem]">
          <caption className="sr-only">
            {categoryLabel[category]} measurements in {sizeGuide.unit}
          </caption>
          <thead>
            <tr className="border-b border-ink/20 text-ash">
              {chart.columns.map((c) => (
                <th key={c} scope="col" className="py-3 pr-4 text-sm font-normal">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {chart.rows.map(([size, ...cells]) => (
              <tr key={size} className={`border-b border-ink/10 ${size === recommended ? "bg-plaster" : ""}`}>
                <th scope="row" className="py-3 pr-4 font-normal">
                  {size}
                </th>
                {cells.map((c, i) => (
                  <td key={i} className="py-3 pr-4">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-ash">
        Garment measurements in {sizeGuide.unit}
        {sizeGuide.approximate ? ", approximate (within about half an inch)" : ""}. &ldquo;Fits chest&rdquo; is the body measurement each size is made for.
      </p>
    </div>
  );
}
