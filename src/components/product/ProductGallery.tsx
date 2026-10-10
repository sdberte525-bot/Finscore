"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/lib/commerce/types";
import { gsap, lockScroll, prefersReducedMotion, registerGsap } from "@/lib/motion";

function frameFor(img: ProductImage) {
  const ratio = img.width / img.height;
  if (ratio < 0.3) return "slit";
  if (ratio > 2) return "wide";
  if (ratio > 0.9) return "square";
  return "portrait";
}

// Details sit in pairs at one height so the grid stays even.
const frameClass = {
  portrait: "aspect-[4/5]",
  square: "aspect-[4/5]",
  wide: "col-span-2 aspect-[11/4]",
  slit: "aspect-[4/5]",
};

/**
 * Desktop: an editorial stack, lead image full width and details paired below.
 * Mobile: a swipeable strip with a counter. Any image opens a full-screen
 * viewer with zoom (click or tap to zoom in, move to pan).
 */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const strip = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);

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
        gsap.fromTo(
          frame,
          { clipPath: "inset(12% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: frame, start: "top 90%", once: true } },
        );
      });
    }, stack);
    return () => ctx.revert();
  }, []);

  const [lead, ...rest] = images;
  const zoomLabel = (img: ProductImage) => `View larger: ${img.alt}`;

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
            <button
              key={img.src}
              type="button"
              onClick={() => setViewer(i)}
              aria-label={zoomLabel(img)}
              className="relative aspect-[4/5] w-full shrink-0 snap-center bg-plaster"
            >
              <Image src={img.src} alt={img.alt} fill priority={i === 0} sizes="100vw" className={frameFor(img) === "slit" ? "object-contain" : "object-cover"} />
            </button>
          ))}
        </div>
        <div className="gutter mt-3 flex items-center justify-between text-sm text-ash">
          <p className="tabular-nums" aria-live="polite">
            {index + 1} / {images.length}
          </p>
          <p>Tap an image to zoom</p>
        </div>
      </div>

      <div ref={stack} className="hidden gap-4 lg:grid lg:grid-cols-2">
        <button
          type="button"
          data-pdp-frame
          onClick={() => setViewer(0)}
          aria-label={zoomLabel(lead)}
          className="group relative col-span-2 aspect-[4/5] cursor-zoom-in overflow-hidden bg-plaster"
        >
          <Image src={lead.src} alt={lead.alt} fill priority sizes="58vw" className="object-cover" />
        </button>
        {rest.map((img, i) => {
          const frame = frameFor(img);
          return (
            <button
              key={img.src}
              type="button"
              data-pdp-frame
              onClick={() => setViewer(i + 1)}
              aria-label={zoomLabel(img)}
              className={`relative cursor-zoom-in overflow-hidden bg-plaster ${frameClass[frame]}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={frame === "wide" ? "58vw" : "29vw"}
                className={frame === "slit" ? "object-contain py-8" : frame === "square" ? "object-contain p-[12%]" : "object-cover"}
              />
            </button>
          );
        })}
      </div>

      {viewer !== null && <Viewer images={images} start={viewer} name={name} onClose={() => setViewer(null)} />}
    </>
  );
}

function Viewer({ images, start, name, onClose }: { images: ProductImage[]; start: number; name: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(start);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const img = images[i];

  const go = useCallback(
    (d: number) => {
      setZoom(false);
      setI((v) => (v + d + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    const d = dialog.current!;
    d.showModal();
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [go]);

  const pointAt = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      aria-label={`${name}, image ${i + 1} of ${images.length}`}
      data-lenis-prevent
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-bone p-0 text-ink backdrop:bg-ink/60"
    >
      <div className="flex h-full flex-col">
        <div className="gutter flex h-16 shrink-0 items-center justify-between text-[0.9375rem]">
          <p className="tabular-nums text-ash">
            {i + 1} / {images.length}
          </p>
          <button type="button" onClick={() => dialog.current?.close()} className="link-underline py-2" autoFocus>
            Close
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <button
            type="button"
            onClick={(e) => {
              pointAt(e as unknown as React.PointerEvent<HTMLElement>);
              setZoom((z) => !z);
            }}
            onPointerMove={(e) => zoom && e.pointerType === "mouse" && pointAt(e)}
            aria-label={zoom ? "Zoom out" : "Zoom in"}
            className={`relative block h-full w-full ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          >
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              sizes="100vw"
              className="object-contain transition-transform duration-300 ease-out"
              style={{ transform: zoom ? "scale(2.2)" : "scale(1)", transformOrigin: origin }}
            />
          </button>
        </div>

        <div className="gutter flex h-20 shrink-0 items-center justify-between gap-4 text-[0.9375rem]">
          <button type="button" onClick={() => go(-1)} className="button min-h-11 px-5">
            Previous
          </button>
          <p className="hidden truncate text-center text-ash sm:block">{img.alt}</p>
          <button type="button" onClick={() => go(1)} className="button min-h-11 px-5">
            Next
          </button>
        </div>
      </div>
    </dialog>
  );
}
