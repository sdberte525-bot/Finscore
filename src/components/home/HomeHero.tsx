"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CampaignImage } from "@/data/campaign";
import type { ProductImage } from "@/lib/commerce/types";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";

const HEADLINE = ["Built", "through", "adversity."];

/**
 * Homepage hero. With campaign photography it runs full-bleed with the copy over
 * the photo; until then it pairs the headline with the product photograph.
 */
export function HomeHero({ campaignImage, productImage }: { campaignImage: CampaignImage | null; productImage: ProductImage }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-image]", { opacity: 0, scale: 1.03, duration: 1.2 }, 0)
        .from("[data-hero-word]", { yPercent: 105, duration: 0.9, stagger: 0.07 }, 0.1)
        .from("[data-hero-fade]", { opacity: 0, y: 12, duration: 0.7, stagger: 0.08 }, 0.5);
    }, root);
    return () => ctx.revert();
  }, []);

  const copy = (light: boolean) => (
    <>
      <p data-hero-fade className={`caps ${light ? "text-plaster" : "text-ash"}`}>
        The first drop
      </p>
      <h1 className="display mt-4 text-[3.75rem] sm:text-[5.25rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[7.75rem]">
        {HEADLINE.map((word) => (
          <span key={word} className="block overflow-hidden pb-[0.04em]">
            <span data-hero-word className="block">
              {word}
            </span>
          </span>
        ))}
      </h1>
      <p data-hero-fade className={`mt-6 max-w-[34ch] text-lg leading-relaxed ${light ? "text-plaster" : "text-charcoal"}`}>
        Vintage-inspired training apparel rooted in strength, discipline, and purpose.
      </p>
      <div data-hero-fade className="mt-9">
        <Link href="/new-drop" className={`button ${light ? "button-light" : "button-solid"}`}>
          Shop the first drop
        </Link>
      </div>
    </>
  );

  if (campaignImage) {
    return (
      <section ref={root} data-tone="dark" className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden bg-ink text-bone">
        <div data-hero-image className="absolute inset-0">
          <Image src={campaignImage.src} alt={campaignImage.alt} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />
        <div className="gutter relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-end pb-16 pt-24 md:justify-center md:pb-24">
          {copy(true)}
        </div>
      </section>
    );
  }

  return (
    <section ref={root} className="relative overflow-hidden bg-plaster">
      <div className="gutter grid items-center gap-y-6 pb-14 pt-10 md:grid-cols-12 md:gap-x-8 md:pb-16 md:pt-12 lg:min-h-[calc(100svh-4.5rem)]">
        <div className="order-last md:order-first md:col-span-6">{copy(false)}</div>
        <div data-hero-image className="relative aspect-[4/5] w-full md:col-span-6 lg:col-span-6 lg:col-start-7 lg:max-h-[calc(100svh-9rem)]">
          <Image
            src={productImage.src}
            alt={productImage.alt}
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 46vw, (min-width: 768px) 50vw, 92vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
