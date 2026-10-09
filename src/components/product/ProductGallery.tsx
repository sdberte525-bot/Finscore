"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/lib/commerce/types";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";

function frameFor(img: ProductImage) {
  const ratio = img.width / img.height;
  if (ratio < 0.3) return "aspect-[1/3]";
  if (ratio > 2) return "aspect-[11/4]";
  if (ratio > 0.9) return "aspect-square";
  if (ratio < 0.72) return "aspect-[2/3]";
  return "aspect-[4/5]";
}

/**
 * Desktop: an editorial stack, the first image full width and details paired below.
 * Mobile: a swipeable strip with a counter.
 */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const strip = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-pdp-frame]").forEach((frame, i) => {
        if (i === 0) return;
        const img = frame.querySelector("img");
        gsap.fromTo(
          frame,
          { clipPath: "inset(12% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: frame, start: "top 90%", once: true } },
        );
        gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: frame, scrub: true } });
      });
    }, stack);
    return () => ctx.revert();
  }, []);

  const [lead, ...rest] = images;

  return (
    <>
      <div className="lg:hidden">
        <div
          ref={strip}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label={`${name} images`}
          role="region"
          tabIndex={0}
        >
          {images.map((img, i) => (
            <div key={img.src} className="relative aspect-[4/5] w-full shrink-0 snap-center bg-plaster">
              <Image src={img.src} alt={img.alt} fill priority={i === 0} sizes="100vw" className={img.width / img.height < 0.3 ? "object-contain" : "object-cover"} />
            </div>
          ))}
        </div>
        <p className="gutter mt-3 text-xs tabular-nums text-ash" aria-live="polite">
          {index + 1} / {images.length}
        </p>
      </div>

      <div ref={stack} className="hidden gap-4 lg:grid lg:grid-cols-2">
        <div data-pdp-frame className="relative col-span-2 aspect-[4/5] overflow-hidden bg-plaster">
          <Image src={lead.src} alt={lead.alt} fill priority sizes="58vw" className="object-cover" />
        </div>
        {rest.map((img) => {
          const frame = frameFor(img);
          const wide = frame === "aspect-[11/4]";
          return (
            <div
              key={img.src}
              data-pdp-frame
              className={`relative overflow-hidden bg-plaster ${wide ? "col-span-2 aspect-[11/4]" : frame === "aspect-[1/3]" ? "aspect-[2/3]" : frame}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={wide ? "58vw" : "29vw"}
                className={`scale-[1.1] ${frame === "aspect-[1/3]" ? "object-contain" : "object-cover"}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
