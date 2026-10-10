"use client";

import { useState } from "react";
import { contactTopics } from "@/lib/contactTopics";
import { netlifySubmit } from "@/lib/netlifyForms";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const ORDER_TOPICS = new Set(["An order", "Returns and exchanges"]);

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [topic, setTopic] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus({ kind: "sending" });
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { error?: string; errors?: Record<string, string>; fallback?: string };
      if (!res.ok) {
        setErrors(json.errors ?? {});
        throw new Error(json.error ?? "Your message didn’t send. Try again in a moment.");
      }
      if (json.fallback === "netlify" && !(await netlifySubmit("contact", data as Record<string, string>))) {
        throw new Error("The contact form isn’t connected yet. Email us at swolvation@gmail.com instead.");
      }
      setStatus({ kind: "sent" });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Your message didn’t send." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="border border-ink/15 p-8">
        <p className="display text-[2rem]">Message sent.</p>
        <p className="mt-3 text-charcoal">Thanks for writing. We&rsquo;ll reply to the email address you gave us.</p>
      </div>
    );
  }

  const field = "w-full rounded-none border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-ink focus-visible:outline-none aria-[invalid=true]:border-oxblood";
  const label = "block text-[0.9375rem]";
  const err = (name: string) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-2 text-sm text-oxblood">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={label}>
            Name
          </label>
          <input id="contact-name" name="name" autoComplete="name" required className={field} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className={label}>
            Email
          </label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required className={field} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {err("email")}
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-topic" className={label}>
            What&rsquo;s it about?
          </label>
          <select
            id="contact-topic"
            name="topic"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={`${field} cursor-pointer`}
            aria-invalid={Boolean(errors.topic)}
            aria-describedby={errors.topic ? "topic-error" : undefined}
          >
            <option value="" disabled>
              Choose a topic
            </option>
            {contactTopics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {err("topic")}
        </div>
        {ORDER_TOPICS.has(topic) && (
          <div>
            <label htmlFor="contact-order" className={label}>
              Order number <span className="text-ash">(optional)</span>
            </label>
            <input id="contact-order" name="order" className={field} />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className={label}>
          Message
        </label>
        <textarea id="contact-message" name="message" required rows={6} className={`${field} resize-y`} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
        {err("message")}
      </div>

      {/* Honeypot for spam bots; hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status.kind === "sending"} className="button button-solid sm:min-w-48">
          {status.kind === "sending" ? "Sending" : "Send message"}
        </button>
        <p role="status" className={`text-[0.9375rem] ${status.kind === "error" ? "text-oxblood" : "text-ash"}`}>
          {status.kind === "error" ? status.message : null}
        </p>
      </div>
    </form>
  );
}
