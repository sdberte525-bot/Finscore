"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { business } from "@/data/business";
import type { CampaignImage } from "@/data/campaign";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";

/** Full-bleed photographic hero, used once campaign.hero is set. */
export function PhotoHero({ image }: { image: CampaignImage }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current!;
    const letters = el.querySelectorAll("[data-letter]");
    const fades = el.querySelectorAll("[data-fade]");
    if (prefersReducedMotion()) {
      gsap.set(letters, { y: 0, yPercent: 0 });
      gsap.set(fades, { opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.1 })
        .fromTo("[data-photo]", { scale: 1.08 }, { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
        .fromTo(letters, { y: 0, yPercent: 110 }, { yPercent: 0, duration: 1.3, stagger: 0.04, ease: "expo.out" }, 0.3)
        .fromTo(fades, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.9);
      gsap.to("[data-photo-wrap]", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-tone="dark" aria-label="Swolvation" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-bone">
      <div data-photo-wrap className="absolute inset-0">
        <div data-photo className="absolute inset-0">
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

      <div className="gutter absolute inset-x-0 bottom-0 pb-7 md:pb-9">
        <h1 className="wordmark flex justify-between overflow-hidden text-[11.4vw] leading-[0.9] tracking-normal md:text-[12vw]">
          {"SWOLVATION".split("").map((l, i) => (
            <span key={i} data-letter className="inline-block">
              {l}
            </span>
          ))}
        </h1>
        <div className="mt-6 flex flex-col gap-5 md:mt-8 md:flex-row md:items-end md:justify-between">
          <p data-fade className="max-w-[24ch] text-lg md:text-xl">
            {business.tagline}
          </p>
          <div data-fade className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/shop" className="button button-light">
              Shop the collection
            </Link>
            <Link href="/about" className="link-underline py-2 text-[0.9375rem]">
              Our story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
