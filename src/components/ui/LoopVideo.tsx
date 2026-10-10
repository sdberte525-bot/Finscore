"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A muted, looping video over an optimized poster image. The video only loads
 * once it's near the viewport, pauses when it scrolls away, and never plays for
 * people who prefer reduced motion (they see the poster).
 */
export function LoopVideo({
  src,
  poster,
  alt,
  sizes,
  priority = false,
  className = "",
  fit = "cover",
  playing = true,
}: {
  src: string;
  poster: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  fit?: "cover" | "contain";
  /** Set false to hold on the poster (e.g. hover-to-play cards). */
  playing?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current?.parentElement;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
        setVisible(e.intersectionRatio > 0.05);
      },
      { rootMargin: "300px 0px", threshold: [0, 0.05] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !near || reduced) return;
    if (playing && visible) v.play().catch(() => {});
    else v.pause();
  }, [near, visible, playing, reduced]);

  const objectFit = fit === "cover" ? "object-cover" : "object-contain";
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={poster} alt={alt} fill sizes={sizes} priority={priority} quality={90} className={objectFit} />
      {!reduced && (
        <video
          ref={ref}
          src={near ? src : undefined}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => setReady(true)}
          className={`absolute inset-0 h-full w-full ${objectFit} transition-opacity duration-700 ${ready && playing ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
