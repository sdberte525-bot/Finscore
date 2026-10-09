"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/commerce/types";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";

export function Collection({ products }: { products: Product[] }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>("[data-reveal-tile]");
      tiles.forEach((tile, i) => {
        const image = tile.querySelector("[data-reveal-image]");
        gsap
          .timeline({ scrollTrigger: { trigger: tile, start: "top 88%", once: true } })
          .fromTo(
            tile,
            { clipPath: "inset(18% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.out", delay: i * 0.08 },
          )
          .fromTo(image, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: "expo.out" }, "<");
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="collection" data-tone="light" className="gutter scroll-mt-20 bg-bone pb-32 pt-28 md:pb-44 md:pt-40">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
        <div>
          <h2 className="fraktur text-[3.25rem] md:text-[5.5rem]">The Scripture Series</h2>
          <p className="mt-4 max-w-[46ch] text-ash md:mt-6 md:text-lg">
            Drop 01. Three heavyweight pieces, each carrying a verse on the back and thorns down the sleeves.
          </p>
        </div>
        <Link href="/shop" className="link-underline text-sm">
          Shop all pieces
        </Link>
      </div>

      <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {products.map((product, i) => (
          <div key={product.slug} className={i === 1 ? "lg:mt-28" : i === 2 ? "sm:col-span-2 sm:mx-auto sm:w-1/2 lg:col-span-1 lg:mx-0 lg:w-auto lg:mt-14" : ""}>
            <ProductCard
              product={product}
              priority={i === 0}
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
