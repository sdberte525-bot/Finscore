"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/commerce/types";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";

export function Collection({ products }: { products: Product[] }) {
  const root = useRef<HTMLElement>(null);
  const collection = products[0]?.collection;

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal-tile]").forEach((tile, i) => {
        const image = tile.querySelector("[data-reveal-image]");
        gsap
          .timeline({ scrollTrigger: { trigger: tile, start: "top 88%", once: true } })
          .fromTo(tile, { clipPath: "inset(16% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.out", delay: i * 0.08 })
          .fromTo(image, { scale: 1.12 }, { scale: 1, duration: 1.8, ease: "expo.out", clearProps: "transform" }, "<");
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="collection" data-tone="light" className="gutter scroll-mt-20 bg-bone pb-28 pt-24 md:pb-40 md:pt-36">
      <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          {collection ? <p className="label">{collection}</p> : null}
          <h2 className="display mt-3 text-[2.75rem] md:text-[4.25rem]">The first collection</h2>
        </div>
        <div className="flex flex-col gap-5 md:col-span-4 md:col-start-9 md:items-end md:text-right">
          <p className="max-w-[38ch] text-charcoal">
            Three pieces to start: two long sleeves and an oversized tee, each with a verse printed large across the back.
          </p>
          <Link href="/shop" className="link-underline text-[0.9375rem]">
            Shop all pieces
          </Link>
        </div>
      </div>

      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {products.slice(0, 6).map((product, i) => (
          <div key={product.slug} className={i === 2 ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto" : ""}>
            <ProductCard product={product} priority={i === 0} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw" />
          </div>
        ))}
      </div>
    </section>
  );
}
