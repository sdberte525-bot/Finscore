"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { heroPrints } from "@/data/campaign";
import { business } from "@/data/business";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from "@/lib/motion";

const LETTERS = "SWOLVATION".split("");
const HOLD = 6.5;

export function Hero({ prints }: { prints: typeof heroPrints }) {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    registerGsap();
    const root = section.current!;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      const letters = root.querySelectorAll("[data-letter]");
      const fades = root.querySelectorAll("[data-fade]");
      if (reduced) {
        gsap.set(letters, { y: 0, yPercent: 0 });
        gsap.set(fades, { opacity: 1 });
        return;
      }
      gsap
        .timeline({ delay: 0.15 })
        .fromTo(letters, { y: 0, yPercent: 110 }, { yPercent: 0, duration: 1.4, stagger: 0.045, ease: "expo.out" })
        .fromTo(fades, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, "-=0.9");
    }, root);

    if (reduced) return () => ctx.revert();

    let disposed = false;
    let cleanupStage = () => {};

    import("./InkStage").then(({ InkStage }) => {
      if (disposed || !canvas.current || !slot.current) return;
      let stage: InstanceType<typeof InkStage>;
      try {
        stage = new InkStage({
          canvas: canvas.current,
          slot: slot.current,
          maps: prints.map((p) => p.ink),
          paper: "#1a1917",
          ink: "#e6dfd1",
        });
      } catch {
        return; // No WebGL: the static print stays in place.
      }
      const u = stage.uniforms;

      stage.whenReady().then(() => {
        if (disposed) return;
        setLive(true);
        stage.play();

        // The one orchestrated moment: the first print presses onto the page.
        const intro = gsap.fromTo(u.uWear, { value: 1 }, { value: 0, duration: 2.6, ease: "power2.out", delay: 0.2 });

        // Cycle the three back prints.
        let next = 0;
        const cycle = gsap.delayedCall(HOLD, function advance() {
          next = (stage.current + 1) % stage.count;
          stage.prepare(next);
          setActive(next);
          gsap.to(u.uMix, {
            value: 1,
            duration: 2.4,
            ease: "power2.inOut",
            onComplete: () => {
              stage.commit(next);
              cycle.restart(true);
            },
          });
        });

        // Scroll wears the print away and lifts the wordmark off.
        const wear = { value: 0 };
        const mm = gsap.matchMedia();
        mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (c) => {
          const desktop = Boolean(c.conditions?.desktop);
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: desktop ? "+=75%" : "bottom top",
              pin: desktop,
              scrub: 0.6,
              onUpdate: () => {
                if (!intro.isActive()) u.uWear.value = wear.value;
              },
            },
          });
          tl.to(wear, { value: 0.92, ease: "none" }, 0)
            .to(u.uScale, { value: 1.12, ease: "none" }, 0)
            .to(root.querySelectorAll("[data-letter]"), { yPercent: -105, stagger: 0.02, ease: "power1.in" }, 0.15)
            .to(root.querySelectorAll("[data-fade]"), { opacity: 0, ease: "none" }, 0);
          return () => {
            u.uScale.value = 1;
          };
        });

        const onMove = (e: PointerEvent) => {
          stage.pointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        // Only draw while the hero is on screen and the tab is visible. A ScrollTrigger
        // (not an IntersectionObserver) because pinning re-parents the section.
        let onScreen = true;
        const sync = () => {
          if (onScreen && !document.hidden) {
            stage.play();
            cycle.paused(false);
          } else {
            stage.pause();
            cycle.paused(true);
          }
        };
        const visibility = ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            onScreen = self.isActive;
            sync();
          },
        });
        const onVisibility = sync;
        document.addEventListener("visibilitychange", onVisibility);

        cleanupStage = () => {
          intro.kill();
          cycle.kill();
          mm.revert();
          visibility.kill();
          window.removeEventListener("pointermove", onMove);
          document.removeEventListener("visibilitychange", onVisibility);
          stage.dispose();
        };
        ScrollTrigger.refresh();
      });
    });

    return () => {
      disposed = true;
      cleanupStage();
      ctx.revert();
    };
  }, [prints]);

  const current = prints[active];

  return (
    <section
      ref={section}
      data-tone="dark"
      aria-label="Swolvation"
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-bone"
    >
      <canvas
        ref={canvas}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${live ? "opacity-100" : "opacity-0"}`}
      />

      {/* The art slot: the shader fits each print inside this box. */}
      <div
        ref={slot}
        role="img"
        aria-label={current.alt}
        className="absolute left-1/2 top-[13%] h-[50%] w-[82vw] -translate-x-1/2 md:top-[11%] md:h-[56%] md:w-[44vw]"
      >
        {/* Static print, shown before WebGL boots and when motion is reduced. */}
        <img
          src={prints[0].ink.replace(".png", "-dark.jpg")}
          alt=""
          className={`h-full w-full object-contain transition-opacity duration-700 ${live ? "opacity-0" : "opacity-100"}`}
          fetchPriority="high"
        />
      </div>

      <div className="gutter absolute inset-x-0 bottom-0 pb-7 md:pb-9">
        <h1 className="wordmark flex justify-between overflow-hidden text-[11.7vw] leading-[0.9] tracking-normal md:text-[12.4vw]">
          {LETTERS.map((l, i) => (
            <span key={i} data-letter className="inline-block will-change-transform">
              {l}
            </span>
          ))}
        </h1>

        <div className="mt-6 grid gap-5 md:mt-8 md:grid-cols-3 md:items-end">
          <p data-fade className="max-w-[24ch] text-lg md:text-xl">
            {business.tagline}
          </p>
          <p data-fade className="hidden text-sm text-stone md:block md:text-center" aria-live="polite">
            <Link href={`/shop/${current.slug}`} className="link-underline">
              {current.label}, on the {current.name}
            </Link>
          </p>
          <div data-fade className="flex flex-wrap items-center gap-x-7 gap-y-4 md:justify-end">
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
