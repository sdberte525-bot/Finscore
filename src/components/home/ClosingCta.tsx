"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Product } from "@/lib/commerce/types";
import { useReveal } from "@/lib/useReveal";

export function ClosingCta({ product }: { product?: Product }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const image = product?.images[0];

  return (
    <section ref={root} data-tone="light" className="gutter bg-plaster py-24 md:py-36">
      <div className="grid items-center gap-14 md:grid-cols-12 md:gap-8">
        <div data-rise className="md:col-span-6">
          <h2 className="display text-[2.75rem] md:text-[4.5rem]">Made for the rotation</h2>
          <p className="mt-6 max-w-[40ch] text-lg text-charcoal">
            Long sleeves and an oversized tee that are as easy to wear to dinner as they are to the gym.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/shop" className="button button-solid">
              Shop the collection
            </Link>
            <Link href="/size-guide" className="link-underline py-2 text-[0.9375rem]">
              Find your size
            </Link>
          </div>
        </div>
        {image && product ? (
          <Link href={`/shop/${product.slug}`} className="group block md:col-span-5 md:col-start-8">
            <div data-reveal className="relative aspect-[4/5] overflow-hidden bg-studio">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 40vw, 92vw" className="object-contain p-[7%]" />
            </div>
            <p className="mt-3 flex justify-between text-sm text-ash">
              <span className="link-underline">{product.name}</span>
              <span>{product.colors[0]?.name}</span>
            </p>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
