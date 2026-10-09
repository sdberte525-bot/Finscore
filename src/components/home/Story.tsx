"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";

const LEAD =
  "Swolvation started between sets. Garage gyms, chalk on the floor, a radio stuck on one station. The iron taught us patience. Faith told us what the patience was for.";

const notes = [
  { title: "Cut heavy.", body: "Thick cotton, dropped shoulders, room for the pump." },
  { title: "Printed to wear in.", body: "Cracked, distressed prints that look better with every wash. Like most of us." },
  { title: "Rest days are scriptural.", body: "Genesis 2:2. Look it up." },
];

export function Story() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: "[data-lead]", start: "top 78%", end: "bottom 42%", scrub: 0.4 },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: rule, start: "top 90%", once: true } },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="story" data-tone="dark" className="gutter scroll-mt-20 bg-ink py-32 text-bone md:py-48">
      <h2 className="sr-only">Our story</h2>
      <div className="grid gap-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <dl className="space-y-14 lg:sticky lg:top-32">
            <div>
              <dt className="fraktur text-[4.5rem] md:text-[6.5rem]">swol</dt>
              <dd className="mt-4">
                <p className="text-sm italic text-stone">/swōl/ adjective</p>
                <p className="mt-2 text-xl">Big, by way of effort.</p>
              </dd>
            </div>
            <div>
              <dt className="fraktur text-[4.5rem] md:text-[6.5rem]">salvation</dt>
              <dd className="mt-4">
                <p className="text-sm italic text-stone">/sal·vā·shən/ noun</p>
                <p className="mt-2 text-xl">The part you can&rsquo;t earn.</p>
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <p data-lead className="text-2xl leading-[1.3] md:text-[2.5rem] md:leading-[1.2]">
            {LEAD.split(" ").map((word, i) => (
              <span key={i} data-word>
                {word}{" "}
              </span>
            ))}
          </p>
          <p className="mt-10 max-w-[52ch] text-lg text-stone">
            So we make heavy clothes for people who train like it matters and know it isn&rsquo;t everything. Cut
            generous, washed soft, and printed like they&rsquo;ve already survived a few hundred leg days.
          </p>

          <ul className="mt-24 md:mt-32">
            {notes.map((note) => (
              <li key={note.title} className="relative grid gap-2 py-7 md:grid-cols-2 md:gap-8">
                <span data-rule aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left bg-bone/20" />
                <p className="text-lg">{note.title}</p>
                <p className="text-stone">{note.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
