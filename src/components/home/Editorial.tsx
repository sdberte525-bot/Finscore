"use client";

import { useRef } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { campaign } from "@/data/campaign";
import { productImage } from "@/data/products";
import { useReveal } from "@/lib/useReveal";

/*
 * Magazine-style spread. Campaign photos take over the two large frames as
 * soon as they're set in src/data/campaign.ts; until then the frames show the
 * product photography.
 */

const log: [string, string][] = [
  ["Mon", "Chest and back"],
  ["Tue", "Legs (yes, legs)"],
  ["Wed", "Shoulders and arms"],
  ["Thu", "Legs again"],
  ["Fri", "Back, then breakfast"],
  ["Sat", "Whatever’s left"],
  ["Sun", "Rest"],
];

export function Editorial() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="editorial" data-tone="light" className="gutter bg-bone pb-28 md:pb-40">
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-12">
        <figure className="md:col-span-6">
          <EditorialImage
            image={campaign.editorialLead}
            fallback={productImage("through-christ", "Back")}
            aspect="aspect-[4/5]"
            sizes="(min-width: 768px) 48vw, 92vw"
          />
          <figcaption className="mt-3 text-sm text-ash">Through Christ Who Strengthens Me, back</figcaption>
        </figure>

        <div className="flex flex-col justify-between gap-14 md:col-span-5 md:col-start-8 md:pt-20">
          <div data-rise>
            <h2 className="display text-[2.5rem] md:text-[3.5rem]">Worth a second look</h2>
            <p className="mt-6 max-w-[40ch] text-lg text-charcoal">
              The detail is where the clothes do their talking. A large print across the back, a small mark on the chest,
              and line work that runs the length of the sleeves.
            </p>
          </div>
          <figure className="w-full max-w-[420px]">
            <EditorialImage
              image={null}
              fallback={productImage("strong-courageous", "Chest")}
              aspect="aspect-square"
              sizes="(min-width: 768px) 420px, 92vw"
            />
            <figcaption className="mt-3 text-sm text-ash">The chest mark, on every piece</figcaption>
          </figure>
        </div>

        <div data-rise className="self-end md:col-span-4">
          <div className="bg-plaster px-7 py-8 font-mono text-[0.8125rem] leading-relaxed text-charcoal">
            <p className="flex justify-between border-b border-charcoal/25 pb-3">
              <span>Training log</span>
              <span>Week 14</span>
            </p>
            <table className="mt-3 w-full">
              <caption className="sr-only">A classic weekly training split</caption>
              <tbody>
                {log.map(([day, work]) => (
                  <tr key={day} className="border-b border-dashed border-charcoal/20">
                    <th scope="row" className="w-14 py-2 text-left font-normal text-ash">
                      {day}
                    </th>
                    <td className="py-2">{work}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ash">The split hasn&rsquo;t changed much since the golden era. Neither have we.</p>
        </div>

        <figure className={campaign.editorialWide ? "md:col-span-7 md:col-start-6" : "md:col-span-5 md:col-start-7"}>
          <EditorialImage
            image={campaign.editorialWide}
            fallback={productImage("though-i-fall", "Chest")}
            aspect={campaign.editorialWide ? "aspect-[3/2]" : "aspect-[4/5]"}
            sizes="(min-width: 768px) 42vw, 92vw"
          />
          <figcaption className="mt-3 text-sm text-ash">Though I Fall, I Will Rise, chest and sleeve</figcaption>
        </figure>

      </div>
    </section>
  );
}
