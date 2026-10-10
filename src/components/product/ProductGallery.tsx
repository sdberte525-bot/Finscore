"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/lib/commerce/types";
import { lockScroll } from "@/lib/motion";

/**
 * Product gallery: a swipeable, scroll-snapping track (touch, trackpad, or the
 * arrow buttons and keys), labelled thumbnails, hover-to-zoom on desktop, and a
 * full-screen viewer with tap-to-zoom, drag-to-pan, pinch and swipe.
 */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIndex(Math.round(el.scrollLeft / el.clientWidth)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = (i + images.length) % images.length;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ left: next * el.clientWidth, behavior: reduced ? "auto" : "smooth" });
      setIndex(next);
    },
    [images.length],
  );

  return (
    <div className="flex flex-col lg:flex-row lg:gap-4">
      <ul className="order-last mt-3 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] lg:order-first lg:mt-0 lg:w-20 lg:shrink-0 lg:flex-col lg:px-0" aria-label={`${name} views`}>
        {images.map((img, i) => (
          <li key={img.src} className="shrink-0">
            <button
              type="button"
              onClick={() => go(i)}
              aria-current={i === index ? "true" : undefined}
              aria-label={`Show ${img.label ?? `image ${i + 1}`}`}
              className={`group block w-16 text-left lg:w-20 ${i === index ? "" : "opacity-60 hover:opacity-100"} transition-opacity`}
            >
              <span className={`relative block aspect-[4/5] overflow-hidden bg-studio ring-1 ${i === index ? "ring-ink" : "ring-transparent"}`}>
                <Image src={img.src} alt="" fill sizes="80px" className={img.fit === "cover" ? "object-cover" : "object-contain p-1"} />
              </span>
              <span className="mt-1.5 block truncate text-xs text-ash">{img.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="relative min-w-0 flex-1">
        <div
          ref={track}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${name} images, ${index + 1} of ${images.length}: ${images[index]?.label ?? ""}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(index + 1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(index - 1);
            } else if (e.key === "Enter") {
              setViewer(index);
            }
          }}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-offset-[-2px] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <Slide key={img.src} image={img} priority={i === 0} onOpen={() => setViewer(i)} />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-bone/85 text-lg backdrop-blur-md transition-colors hover:bg-bone md:grid"
            >
              <span aria-hidden="true">&#8592;</span>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-bone/85 text-lg backdrop-blur-md transition-colors hover:bg-bone md:grid"
            >
              <span aria-hidden="true">&#8594;</span>
            </button>
          </>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-sm text-charcoal">
          <span className="rounded-full bg-bone/85 px-3 py-1 tabular-nums backdrop-blur-md" aria-hidden="true">
            {images[index]?.label ?? `${index + 1} / ${images.length}`}
          </span>
          <span className="hidden rounded-full bg-bone/85 px-3 py-1 backdrop-blur-md pointer-fine:inline">Hover to zoom, click to enlarge</span>
          <span className="rounded-full bg-bone/85 px-3 py-1 backdrop-blur-md pointer-fine:hidden">Tap to enlarge</span>
        </div>
      </div>

      {viewer !== null && <Viewer images={images} start={viewer} name={name} onClose={(last) => { setViewer(null); go(last); }} />}
    </div>
  );
}

/** One slide. On desktop the image magnifies under the cursor. */
function Slide({ image, priority, onOpen }: { image: ProductImage; priority: boolean; onOpen: () => void }) {
  const [zoom, setZoom] = useState<string | null>(null);
  const contain = image.fit !== "cover";

  return (
    <button
      type="button"
      tabIndex={-1}
      onClick={onOpen}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        setZoom(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
      }}
      onPointerLeave={() => setZoom(null)}
      aria-label={`Enlarge: ${image.alt}`}
      className="relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden bg-studio pointer-fine:cursor-zoom-in"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 52vw, 100vw"
        quality={90}
        className={`${contain ? "object-contain p-[5%]" : "object-cover"} transition-transform duration-200 ease-out motion-reduce:transition-none`}
        style={zoom ? { transform: "scale(2)", transformOrigin: zoom } : undefined}
      />
    </button>
  );
}

type Pan = { x: number; y: number };

function Viewer({ images, start, name, onClose }: { images: ProductImage[]; start: number; name: string; onClose: (last: number) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(start);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState<Pan>({ x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ startX: number; startY: number; pan: Pan; dist: number; scale: number; moved: boolean } | null>(null);
  const img = images[i];
  const last = useRef(start);
  last.current = i;

  const reset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };
  const go = useCallback(
    (d: number) => {
      setScale(1);
      setPan({ x: 0, y: 0 });
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

  const distance = () => {
    const [a, b] = [...pointers.current.values()];
    return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0;
  };

  return (
    <dialog
      ref={dialog}
      onClose={() => onClose(last.current)}
      aria-label={`${name}: ${img.label ?? `image ${i + 1}`}, ${i + 1} of ${images.length}`}
      data-lenis-prevent
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-studio p-0 text-ink backdrop:bg-ink/60"
    >
      <div className="flex h-full flex-col">
        <div className="gutter flex h-16 shrink-0 items-center justify-between text-[0.9375rem]">
          <p className="text-charcoal">
            {img.label} <span className="tabular-nums text-ash">{i + 1} / {images.length}</span>
          </p>
          <button type="button" onClick={() => dialog.current?.close()} className="link-underline py-2" autoFocus>
            Close
          </button>
        </div>

        <div
          className="relative min-h-0 flex-1 touch-none select-none overflow-hidden"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
            gesture.current = { startX: e.clientX, startY: e.clientY, pan, dist: distance(), scale, moved: false };
          }}
          onPointerMove={(e) => {
            if (!pointers.current.has(e.pointerId) || !gesture.current) return;
            pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
            const g = gesture.current;
            if (pointers.current.size === 2 && g.dist > 0) {
              g.moved = true;
              setScale(Math.min(4, Math.max(1, (g.scale * distance()) / g.dist)));
              return;
            }
            const dx = e.clientX - g.startX;
            const dy = e.clientY - g.startY;
            if (Math.abs(dx) + Math.abs(dy) > 6) g.moved = true;
            if (scale > 1) setPan({ x: g.pan.x + dx / scale, y: g.pan.y + dy / scale });
          }}
          onPointerUp={(e) => {
            const g = gesture.current;
            pointers.current.delete(e.pointerId);
            if (!g || pointers.current.size > 0) return;
            const dx = e.clientX - g.startX;
            if (!g.moved) {
              // Tap or click: zoom in on that spot, or back out.
              if (scale > 1) reset();
              else {
                const r = e.currentTarget.getBoundingClientRect();
                setScale(2.5);
                setPan({ x: (r.width / 2 - (e.clientX - r.left)) / 2.5 * 1.5, y: (r.height / 2 - (e.clientY - r.top)) / 2.5 * 1.5 });
              }
            } else if (scale === 1 && Math.abs(dx) > 60) {
              go(dx < 0 ? 1 : -1);
            } else if (scale <= 1.02) {
              // A pinch that ended at (almost) full size snaps back to centre.
              reset();
            }
            gesture.current = null;
          }}
          onPointerCancel={(e) => pointers.current.delete(e.pointerId)}
        >
          <div
            className={`absolute inset-0 ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"} transition-transform duration-200 ease-out motion-reduce:transition-none`}
            style={{ transform: `scale(${scale}) translate(${pan.x}px, ${pan.y}px)` }}
          >
            <Image key={img.src} src={img.src} alt={img.alt} fill sizes="100vw" quality={90} className="object-contain p-4" draggable={false} />
          </div>
        </div>

        <div className="gutter flex min-h-20 shrink-0 items-center justify-between gap-4 pb-[env(safe-area-inset-bottom,0px)] text-[0.9375rem]">
          <button type="button" onClick={() => go(-1)} className="button min-h-11 px-5">
            Previous
          </button>
          <p className="hidden text-center text-ash sm:block">
            {scale > 1 ? "Drag to look around. Click to zoom out." : "Click or pinch to zoom. Swipe or use the arrow keys to change image."}
          </p>
          <button type="button" onClick={() => go(1)} className="button min-h-11 px-5">
            Next
          </button>
        </div>
      </div>
    </dialog>
  );
}
