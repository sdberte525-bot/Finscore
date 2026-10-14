"use client";

import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), 2400);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="text-sm text-steel-light transition-colors hover:text-paper"
    >
      <span aria-live="polite">
        {state === "copied" ? "Email address copied" : state === "failed" ? "Copy failed. Select the address instead." : "Copy email address"}
      </span>
    </button>
  );
}
