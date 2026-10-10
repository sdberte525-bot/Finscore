"use client";

import Link from "next/link";
import { useRef } from "react";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { loops, type MediaVideo } from "@/data/media";
import type { Product } from "@/lib/commerce/types";
import { formatPrice } from "@/lib/format";
import { useReveal } from "@/lib/useReveal";

const TURNS: Record<string, MediaVideo> = { "strong-courageous": loops.teeTurn, "through-christ": loops.lsTurn };

/** Both pieces turning, front to back: the design idea in one glance. */
export function TurnAround({ products }: { products: Product[] }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const items = products.filter((p) => TURNS[p.slug]);
  if (items.length === 0) return null;

  return (
    <section ref={root} data-tone="dark" className="bg-charcoal py-20 text-bone md:py-28">
      <div className="gutter">
        <div data-rise className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="caps text-stone">Front and back</p>
            <h2 className="display mt-4 text-[3.25rem] md:text-[5.5rem]">
              <span className="block">Front: quiet.</span>
              <span className="block text-plaster">Back: loud.</span>
            </h2>
          </div>
          <p className="max-w-[38ch] text-lg leading-relaxed text-stone md:col-span-4 md:col-start-9">
            A small cross and wordmark up front. The statement, and the verse behind it, across the back.
          </p>
        </div>

        <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 md:mt-16 md:gap-x-8">
          {items.map((p) => {
            const v = TURNS[p.slug];
            return (
              <Link key={p.slug} href={`/shop/${p.slug}`} className="group block">
                <LoopVideo
                  src={v.src}
                  poster={v.poster.src}
                  alt={v.poster.alt}
                  sizes="(min-width: 640px) 46vw, 92vw"
                  className="aspect-[4/5] bg-ink"
                />
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-base">{p.name}</p>
                    {p.scripture ? <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone">{p.scripture.reference}</p> : null}
                  </div>
                  <p className="flex items-baseline gap-4 tabular-nums">
                    {formatPrice(p.price)}
                    <span className="caps link-underline text-stone group-hover:text-bone">View</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
