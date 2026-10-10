"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { photos, type MediaImage } from "@/data/media";
import type { Product } from "@/lib/commerce/types";
import { useReveal } from "@/lib/useReveal";

const BACKS: Record<string, MediaImage> = { "strong-courageous": photos.teeStudioBack, "through-christ": photos.lsStudioBack };

/** The verse printed on each piece, set large beside the print itself. */
export function Scripture({ products }: { products: Product[] }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const items = products.filter((p) => p.scripture && BACKS[p.slug]);
  if (items.length === 0) return null;

  return (
    <section ref={root} className="gutter bg-bone py-20 md:py-32">
      <div data-rise className="max-w-3xl">
        <p className="caps text-ash">Worn with purpose</p>
        <h2 className="display mt-4 text-[3.25rem] md:text-[5rem]">Every piece carries a verse.</h2>
      </div>
      <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
        {items.map((p, i) => (
          <div key={p.slug} className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
            <div className={`md:col-span-5 ${i % 2 ? "md:order-last md:col-start-8" : ""}`}>
              <div data-reveal className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                <Image src={BACKS[p.slug].src} alt={BACKS[p.slug].alt} fill sizes="(min-width: 768px) 40vw, 92vw" quality={90} className="object-cover" />
              </div>
            </div>
            <figure data-rise className={`md:col-span-6 ${i % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-7"}`}>
              <blockquote className="display text-[2.5rem] leading-[1.02] md:text-[4rem]">
                <p>&ldquo;{p.scripture!.text}&rdquo;</p>
              </blockquote>
              <figcaption className="caps mt-6 text-ash">{p.scripture!.reference}</figcaption>
              <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-charcoal">{p.description}</p>
              <Link href={`/shop/${p.slug}`} className="button button-solid mt-8">
                {p.category === "tee" ? "Shop the tee" : "Shop the long sleeve"}
              </Link>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
