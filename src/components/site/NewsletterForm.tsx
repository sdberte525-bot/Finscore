"use client";

import { useId, useState } from "react";
import { joinList } from "@/lib/netlifyForms";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

/**
 * Email sign-up used across the site. `source` tags where the sign-up came from
 * (footer, popup, homepage, notify:<product>:<size>) so the list can be segmented.
 */
export function NewsletterForm({
  source = "footer",
  tone = "dark",
  cta = "Sign up",
  done = "You’re on the list. We’ll only write when there’s something worth opening.",
  onDone,
}: {
  source?: string;
  tone?: "dark" | "light";
  cta?: string;
  done?: string;
  onDone?: () => void;
}) {
  const id = useId();
  const [state, setState] = useState<State>({ kind: "idle" });
  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ kind: "error", message: "Enter a valid email address." });
      return;
    }
    setState({ kind: "sending" });
    try {
      await joinList(email, source, String(form.get("company") ?? ""));
      setState({ kind: "done" });
      try {
        localStorage.setItem("swolvation.subscribed", "1");
      } catch {}
      onDone?.();
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : "That didn’t go through." });
    }
  }

  if (state.kind === "done") {
    return (
      <p role="status" className={`text-lg leading-snug ${dark ? "text-bone" : "text-ink"}`}>
        {done}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="Your email address"
          aria-describedby={`${id}-status`}
          aria-invalid={state.kind === "error"}
          className={`field ${dark ? "border-bone/40 text-bone placeholder:text-stone focus:border-bone" : "border-ink/30 text-ink placeholder:text-ash focus:border-ink"}`}
        />
        <button type="submit" className={`button shrink-0 ${dark ? "button-light" : "button-solid"}`} disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Joining" : cta}
        </button>
      </div>
      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <p id={`${id}-status`} role="status" className={`mt-3 min-h-5 text-xs ${state.kind === "error" ? (dark ? "text-bone" : "text-oxblood") : dark ? "text-stone" : "text-ash"}`}>
        {state.kind === "error" ? state.message : "Drop alerts and restocks only. Unsubscribe anytime."}
      </p>
    </form>
  );
}
