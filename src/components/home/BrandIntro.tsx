"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";

const STATEMENT = "Gym clothing should look just as good outside the gym as it does inside it.";

export function BrandIntro() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 50%", scrub: 0.4 },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="story" data-tone="dark" className="gutter scroll-mt-20 bg-ink py-28 text-bone md:py-44">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <p className="label text-stone">Our story</p>
          <h2 data-statement className="display mt-5 text-[2.5rem] leading-[1.08] md:text-[4.25rem]">
            {STATEMENT.split(" ").map((word, i) => (
              <span key={i} data-word>
                {word}{" "}
              </span>
            ))}
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-8 lg:col-span-4">
          <p className="max-w-[42ch] text-lg leading-relaxed text-stone">
            Swolvation takes its cues from old-school bodybuilding and vintage athleticwear. Thoughtful designs and classic
            influences, made to become part of your everyday rotation.
          </p>
          <div>
            <Link href="/about" className="button border-bone/50 text-bone hover:border-bone">
              Read our story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
