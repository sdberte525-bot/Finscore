import Link from "next/link";
import { categoryLabel, sizeGuide } from "@/data/sizeGuide";
import type { Product } from "@/lib/commerce/types";

export function SizeChart({ category }: { category: Product["category"] }) {
  const chart = sizeGuide.charts[category];

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

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[20rem] text-left text-[0.9375rem]">
          <caption className="sr-only">
            {categoryLabel[category]} measurements in {sizeGuide.unit}
          </caption>
          <thead>
            <tr className="border-b border-ink/20 text-ash">
              {chart.columns.map((c) => (
                <th key={c} scope="col" className="py-3 pr-4 font-normal">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {chart.rows.map(([size, ...cells]) => (
              <tr key={size} className="border-b border-ink/10">
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
      <p className="mt-3 text-sm text-ash">Garment measurements in {sizeGuide.unit}.</p>
    </div>
  );
}
