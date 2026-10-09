"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Plate, PlateShape } from "@/data/gallery";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";

/* Desktop sizes sit on a horizontal track; mobile stacks into two columns. */
const shapeClass: Record<PlateShape, string> = {
  tall: "col-span-2 sm:col-span-1 lg:self-start",
  slit: "col-span-1 lg:self-end",
  wide: "col-span-2 lg:self-center",
  square: "col-span-1 lg:self-start lg:mt-[4vh]",
};

const frameClass: Record<PlateShape, string> = {
  tall: "aspect-[2/3] lg:h-[52vh]",
  slit: "aspect-[1/5] max-lg:w-1/2 max-lg:mx-auto lg:h-[50vh]",
  wide: "aspect-[11/4] lg:w-[38vw]",
  square: "aspect-square lg:h-[32vh]",
};

export function Plates({ plates }: { plates: Plate[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia(root);

    mm.add("(min-width: 1024px)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const scroll = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(progress.current, { scaleX: self.progress }),
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-plate]").forEach((plate) => {
        const frame = plate.querySelector("[data-frame]");
        const inner = plate.querySelector("[data-inner]");
        gsap.fromTo(
          frame,
          { clipPath: "inset(0% 0% 0% 100%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            scrollTrigger: { trigger: plate, containerAnimation: scroll, start: "left 100%", end: "left 55%", scrub: true },
          },
        );
        if (inner) {
          gsap.fromTo(
            inner,
            { xPercent: 6, scale: 1.12 },
            {
              xPercent: -6,
              scale: 1.12,
              ease: "none",
              scrollTrigger: { trigger: plate, containerAnimation: scroll, start: "left right", end: "right left", scrub: true },
            },
          );
        }
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-frame]").forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: frame, start: "top 90%", once: true } },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="plates" data-tone="light" className="relative scroll-mt-0 overflow-hidden bg-bone lg:h-[100svh] lg:motion-reduce:h-auto">
      <div className="gutter flex items-end justify-between pb-10 pt-28 lg:absolute lg:inset-x-0 lg:top-0 lg:pt-28 lg:motion-reduce:static">
        <div>
          <h2 className="fraktur text-[3.25rem] md:text-[5.5rem]">Plates</h2>
          <p className="mt-3 max-w-[40ch] text-ash md:text-lg">Drop 01, up close. Sleeves, chest marks and back prints from all three pieces.</p>
        </div>
        <p className="hidden text-sm text-ash lg:block">Keep scrolling</p>
      </div>

      <div
        ref={track}
        className="gutter grid grid-cols-2 gap-x-4 gap-y-12 pb-28 lg:absolute lg:bottom-[6vh] lg:left-0 lg:flex lg:h-[57vh] lg:w-max lg:items-stretch lg:gap-[5vw] lg:pb-0 lg:pl-[36vw] lg:pr-[12vw] lg:motion-reduce:static lg:motion-reduce:h-[70vh] lg:motion-reduce:w-auto lg:motion-reduce:overflow-x-auto lg:motion-reduce:pb-16 lg:motion-reduce:pl-[clamp(1.25rem,4vw,3.5rem)]"
      >
        {plates.map((plate, i) => (
          <figure key={i} data-plate className={`lg:shrink-0 ${plate.kind === "log" ? "col-span-2 lg:col-span-1 lg:w-[22rem] lg:self-center" : shapeClass[plate.shape]}`}>
            {plate.kind === "image" ? (
              <div data-frame className={`relative overflow-hidden bg-plaster ${frameClass[plate.shape]}`}>
                <div data-inner className="absolute inset-0">
                  <Image
                    src={plate.src}
                    alt={plate.alt}
                    fill
                    sizes={plate.shape === "wide" ? "(min-width: 1024px) 40vw, 92vw" : "(min-width: 1024px) 30vw, 46vw"}
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div data-frame className="bg-plaster px-7 py-8 font-mono text-[0.8125rem] leading-relaxed text-charcoal">
                <p className="flex justify-between border-b border-charcoal/30 pb-3">
                  <span>Training log</span>
                  <span>{plate.title}</span>
                </p>
                <table className="mt-3 w-full">
                  <tbody>
                    {plate.rows.map(([day, work]) => (
                      <tr key={day} className="border-b border-dashed border-charcoal/20">
                        <th scope="row" className="w-14 py-2 text-left font-normal text-ash">
                          {day}
                        </th>
                        <td className="py-2">{work}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <figcaption className="mt-3 flex gap-3 text-xs text-ash lg:max-w-[28ch]">
              <span className="tabular-nums text-charcoal">{String(i + 1).padStart(2, "0")}</span>
              <span>{plate.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 hidden h-px bg-ink/10 lg:block">
        <div ref={progress} className="h-full origin-left scale-x-0 bg-ink" />
      </div>
    </section>
  );
}
