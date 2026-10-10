"use client";

import { useState } from "react";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

export function NewsletterForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "That didn’t go through. Try again in a moment.");
      setState({ kind: "done" });
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : "That didn’t go through." });
    }
  }

  if (state.kind === "done") {
    return (
      <p role="status" className="text-lg">
        You&rsquo;re on the list. We&rsquo;ll only write when there&rsquo;s something new.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <label htmlFor="newsletter-email" className="mb-3 block text-sm text-stone">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-describedby="newsletter-status"
          className="field border-bone/40 text-bone focus:border-bone"
        />
        <button type="submit" className="button button-light shrink-0" disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Signing up" : "Sign up"}
        </button>
      </div>
      <p id="newsletter-status" role="status" className={`mt-3 min-h-5 text-xs ${state.kind === "error" ? "text-bone" : "text-stone"}`}>
        {state.kind === "error" ? state.message : "Unsubscribe anytime."}
      </p>
    </form>
  );
}
