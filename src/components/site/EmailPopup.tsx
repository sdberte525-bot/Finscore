"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { photos } from "@/data/media";
import { lockScroll } from "@/lib/motion";
import { NewsletterForm } from "./NewsletterForm";

const DISMISS_KEY = "swolvation.popup.dismissed";
const SUBSCRIBED_KEY = "swolvation.subscribed";
const QUIET_DAYS = 14;
const SKIP = ["/cart", "/checkout", "/contact"];

function shouldShow() {
  try {
    if (localStorage.getItem(SUBSCRIBED_KEY)) return false;
    const dismissed = Number(localStorage.getItem(DISMISS_KEY) ?? 0);
    return Date.now() - dismissed > QUIET_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

/** First-access sign-up, shown once per visitor after 15 seconds or half a page of scrolling. */
export function EmailPopup() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (SKIP.some((p) => pathname.startsWith(p)) || !shouldShow()) return;
    let fired = false;
    const fire = () => {
      if (fired || !shouldShow() || document.querySelector("dialog[open]")) return;
      fired = true;
      setOpen(true);
    };
    const timer = window.setTimeout(fire, 15_000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.5) fire();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const d = dialog.current;
    if (d && !d.open) {
      d.showModal();
      // Focus the dialog itself so phones don't open the keyboard uninvited.
      d.focus();
    }
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setOpen(false);
  }

  if (!open) return null;

  return (
    <dialog
      ref={dialog}
      onClose={dismiss}
      onClick={(e) => e.target === dialog.current && dismiss()}
      aria-labelledby="popup-title"
      tabIndex={-1}
      data-lenis-prevent
      className="m-auto w-[min(56rem,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-auto bg-ink p-0 text-bone backdrop:bg-ink/70 backdrop:backdrop-blur-sm focus:outline-none"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[32rem]">
          <Image src={photos.lsGymHook.src} alt="" fill sizes="(min-width: 768px) 28rem, 100vw" className="object-cover object-[50%_35%]" />
        </div>
        <div className="flex flex-col justify-center p-7 md:p-10">
          <p className="caps text-stone">The first drop</p>
          <h2 id="popup-title" className="display mt-3 text-[2.75rem] md:text-[3.5rem]">
            {joined ? "You’re in." : "Get first access."}
          </h2>
          <p className="mt-4 max-w-[34ch] leading-relaxed text-stone">
            {joined
              ? "We’ll email you the moment the drop goes live. Follow @swolvation for everything in between."
              : "Be the first to know when the drop goes live, before it’s announced anywhere else."}
          </p>
          <div className="mt-7">
            <NewsletterForm source="popup" cta="Get access" done="You’re on the list." onDone={() => setJoined(true)} />
          </div>
          <button type="button" onClick={dismiss} className="link-underline mt-2 self-start py-2 text-sm text-stone">
            {joined ? "Close" : "No thanks"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
