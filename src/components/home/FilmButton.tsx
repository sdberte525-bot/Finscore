"use client";

import { useEffect, useRef, useState } from "react";
import { film } from "@/data/media";
import { lockScroll } from "@/lib/motion";

/** "Watch the film" button and player: the launch film with sound, vertical on phones and widescreen above. */
export function FilmButton({ className = "", label = "Watch the film" }: { className?: string; label?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    if (!open) return;
    setWide(window.matchMedia("(min-width: 768px) and (min-aspect-ratio: 1/1)").matches);
    dialog.current?.showModal();
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  const cut = wide ? film.wide : film.vertical;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`group inline-flex items-center gap-3 ${className}`}>
        <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full border border-current transition-colors group-hover:bg-bone group-hover:text-ink">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
            <path d="M0 0l12 7-12 7z" />
          </svg>
        </span>
        <span className="caps">{label}</span>
      </button>
      {open && (
        <dialog
          ref={dialog}
          onClose={() => setOpen(false)}
          onClick={(e) => e.target === dialog.current && dialog.current?.close()}
          aria-label={`${film.title}, a Swolvation film`}
          data-lenis-prevent
          className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/95"
        >
          <div className="relative">
            <video
              src={cut.src}
              poster={cut.poster.src}
              autoPlay
              controls
              playsInline
              className={wide ? "max-h-[85dvh] w-[min(90vw,150dvh)]" : "max-h-[88dvh] w-[min(92vw,49dvh)]"}
            />
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              autoFocus
              className="absolute -top-12 right-0 min-h-11 px-2 text-[0.9375rem] text-bone underline underline-offset-4"
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
