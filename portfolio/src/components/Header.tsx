"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { person } from "@/data/profile";
import { navItems } from "@/lib/site";
import { DownloadIcon } from "./Icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section that occupies the band just below the header.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    const hero = document.getElementById("top");
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(null);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    if (hero) heroObserver.observe(hero);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) menuButton.current?.focus();
  }, []);

  // Mobile menu: lock scroll, move focus in, keep Tab inside, close on Escape.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Same order as the DOM: the toggle button sits just before the panel.
    const focusable = () =>
      (menuButton.current ? [menuButton.current as HTMLElement] : ([] as HTMLElement[])).concat(
        Array.from(panel.current?.querySelectorAll<HTMLElement>("a, button") ?? []),
      );
    panel.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close(true);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) close(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        open
          ? "border-b border-rule bg-paper"
          : solid
          ? "border-b border-rule bg-paper/92 backdrop-blur-md supports-[backdrop-filter]:bg-paper/85"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[78rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="display text-[0.95rem] font-medium tracking-[0.16em] text-navy uppercase"
          onClick={() => open && close(false)}
        >
          {person.name}
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className={`link-draw text-sm transition-colors ${
                    active === item.href ? "text-navy" : "text-charcoal/75 hover:text-navy"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="border-l border-rule pl-8">
              <a
                href={person.resume}
                download
                className="group inline-flex items-center gap-2 text-sm font-medium text-navy"
              >
                <DownloadIcon className="size-4 text-steel transition-transform duration-300 group-hover:translate-y-0.5" />
                <span className="link-draw">Résumé</span>
                <span className="sr-only">(PDF)</span>
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={menuButton}
          type="button"
          className="-mr-2 inline-flex h-11 items-center gap-3 px-2 text-sm text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => (open ? close(false) : setOpen(true))}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-navy transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0.5"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-navy transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-2.5"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panel}
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-rule bg-paper lg:hidden"
      >
        <nav aria-label="Primary" className="px-5 pt-6 pb-10 sm:px-8">
          <ul>
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <a
                  href={item.href}
                  onClick={() => close(false)}
                  aria-current={active === item.href ? "true" : undefined}
                  className="display flex items-center justify-between py-4 text-2xl text-navy"
                >
                  {item.label}
                  {active === item.href && <span className="size-1.5 rounded-full bg-steel" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4 text-sm">
            <a href={person.resume} download className="inline-flex items-center gap-2 font-medium text-navy">
              <DownloadIcon className="size-4 text-steel" />
              Download résumé (PDF)
            </a>
            <a href={`mailto:${person.email}`} className="text-charcoal/80">
              {person.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
