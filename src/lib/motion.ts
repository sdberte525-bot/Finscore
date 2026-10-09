"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  registered = true;
  return gsap;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The page-wide Lenis instance, set by <SmoothScroll>. Null when reduced motion is on. */
export const scroller: { lenis: Lenis | null } = { lenis: null };

export function lockScroll(locked: boolean) {
  if (scroller.lenis) {
    if (locked) scroller.lenis.stop();
    else scroller.lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export { gsap, ScrollTrigger };
