"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { loops } from "@/data/media";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";
import { FilmButton } from "./FilmButton";

const HEADLINE = ["Built", "through", "adversity."];

/** Homepage hero: the campaign loop beside (or, on phones, above) the headline, with the film one tap away. */
export function HomeHero({ storeOpen }: { storeOpen: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-media]", { opacity: 0, scale: 1.04, duration: 1.4 }, 0)
        .from("[data-hero-word]", { yPercent: 105, duration: 0.9, stagger: 0.07 }, 0.15)
        .from("[data-hero-fade]", { opacity: 0, y: 12, duration: 0.7, stagger: 0.08 }, 0.55);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-tone="dark" className="relative overflow-hidden bg-ink text-bone">
      <div className="grid lg:min-h-[calc(100svh-6.75rem)] lg:grid-cols-12">
        <div data-hero-media className="relative lg:order-last lg:col-span-6">
          <LoopVideo
            src={loops.lsDawn.src}
            poster={loops.lsDawn.poster.src}
            alt={loops.lsDawn.poster.alt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="aspect-[4/5] lg:absolute lg:inset-0 lg:aspect-auto"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent lg:inset-y-0 lg:left-0 lg:h-auto lg:w-32 lg:bg-gradient-to-r" />
        </div>

        <div className="gutter relative flex flex-col justify-center pb-14 pt-4 lg:col-span-6 lg:py-20">
          <p data-hero-fade className="caps text-stone">
            The first drop <span className="text-muted">/</span> Scripture Series
          </p>
          <h1 className="display mt-4 text-[4rem] sm:text-[5.5rem] lg:text-[6.25rem] xl:text-[8rem]">
            {HEADLINE.map((word) => (
              <span key={word} className="block overflow-hidden pb-[0.04em]">
                <span data-hero-word className="block">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p data-hero-fade className="mt-6 max-w-[34ch] text-lg leading-relaxed text-stone">
            Vintage-inspired training apparel rooted in strength, discipline and faith.
          </p>
          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Link href="/new-drop" className="button button-light">
              {storeOpen ? "Shop the first drop" : "See the first drop"}
            </Link>
            <FilmButton className="text-bone" />
          </div>
        </div>
      </div>
    </section>
  );
}
