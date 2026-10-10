"use client";

import { useRef } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { campaign } from "@/data/campaign";
import { useReveal } from "@/lib/useReveal";

/*
 * Magazine-style spread. Campaign photos take over the two large frames as
 * soon as they're set in src/data/campaign.ts; until then the frames show
 * close-ups of the real garments.
 */

const detail = (slug: string, file: string, alt: string, width: number, height: number) => ({
  src: `/images/products/${slug}/${file}`,
  alt,
  width,
  height,
});

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
        <figure className={campaign.editorialLead ? "md:col-span-7" : "md:col-span-5"}>
          <EditorialImage
            image={campaign.editorialLead}
            fallback={detail("strengthened-long-sleeve", "back-print.jpg", "Back print of the Strengthened Long Sleeve, a thorned cross and skull framed by lettering", 624, 944)}
            aspect="aspect-[4/5]"
            sizes="(min-width: 768px) 42vw, 92vw"
          />
          <figcaption className="mt-3 text-sm text-ash">Strengthened Long Sleeve, back print</figcaption>
        </figure>

        <div className="flex flex-col justify-between gap-14 md:col-span-5 md:col-start-8 md:pt-24">
          <div data-rise>
            <h2 className="display text-[2.5rem] md:text-[3.5rem]">Worth a second look</h2>
            <p className="mt-6 max-w-[40ch] text-lg text-charcoal">
              The detail is where the clothes do their talking. A large print across the back, a small mark on the chest,
              and line work that runs the length of the sleeves.
            </p>
          </div>
          <figure className="w-full max-w-[340px]">
            <EditorialImage
              image={null}
              fallback={detail("courageous-oversized-tee", "chest.jpg", "The Swolvation chest mark: a small thorned cross above the wordmark", 340, 340)}
              aspect="aspect-square"
              sizes="340px"
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

        <figure className="md:col-span-7 md:col-start-6">
          <EditorialImage
            image={campaign.editorialWide}
            fallback={detail("courageous-oversized-tee", "scripture.jpg", "Arched lettering across the back of the Courageous Oversized Tee", 768, 280)}
            aspect={campaign.editorialWide ? "aspect-[3/2]" : "aspect-[11/4]"}
            sizes="(min-width: 768px) 56vw, 92vw"
          />
          <figcaption className="mt-3 text-sm text-ash">Courageous Oversized Tee, lettering across the back</figcaption>
        </figure>

      </div>
    </section>
  );
}
