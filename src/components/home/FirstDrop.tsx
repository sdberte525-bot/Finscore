"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/commerce/types";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";

export function FirstDrop({ products }: { products: Product[] }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal-tile]").forEach((tile, i) => {
        gsap.from(tile, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: tile, start: "top 90%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const columns = products.length <= 2 ? "sm:grid-cols-2" : products.length === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section ref={root} id="first-drop" className="gutter scroll-mt-24 bg-bone py-20 md:py-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
        <div>
          <h2 className="display text-[3rem] md:text-[4.75rem]">The first drop</h2>
          <p className="mt-3 text-lg text-ash">Purpose in every piece.</p>
        </div>
        <Link href="/shop" className="caps link-underline py-2">
          View all
        </Link>
      </div>
      <div className={`grid gap-x-5 gap-y-12 md:gap-x-8 ${columns}`}>
        {products.map((product, i) => (
          <ProductCard
            key={product.slug}
            product={product}
            priority={i === 0}
            sizes={products.length <= 2 ? "(min-width: 640px) 48vw, 92vw" : "(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw"}
          />
        ))}
      </div>
    </section>
  );
}
