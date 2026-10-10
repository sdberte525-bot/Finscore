"use client";

import { useEffect, type RefObject } from "react";
import { gsap, prefersReducedMotion, registerGsap } from "./motion";

/**
 * Restrained scroll motion for a section:
 *   [data-reveal]    image frames unmask upward once, as they enter
 *   [data-parallax]  image layers drift a few percent while in view
 *   [data-rise]      text blocks fade up once
 * Everything is visible by default; with reduced motion nothing moves.
 */
export function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    registerGsap();
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(14% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } },
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(el, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: el.parentElement, scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } },
        );
      });
    }, root);
    return () => ctx.revert();
  }, [root]);
}
