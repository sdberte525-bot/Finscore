import { NextResponse } from "next/server";
import { business } from "@/data/business";
import { contactTopics } from "@/lib/contactTopics";

/*
 * Delivers contact-form messages. Configure one of:
 *   RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL): sends an email through Resend
 *   CONTACT_WEBHOOK_URL: POSTs the message as JSON (Zapier, Make, Formspree, your helpdesk)
 * With neither set, the form tells visitors it isn’t connected yet.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Message = { name: string; email: string; topic: string; order: string; message: string };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "The message couldn’t be read. Try again." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.company, 200)) return NextResponse.json({ ok: true });

  const msg: Message = {
    name: clean(body.name, 120),
    email: clean(body.email, 254),
    topic: clean(body.topic, 60),
    order: clean(body.order, 60),
    message: clean(body.message, 5000),
  };
  const errors: Record<string, string> = {};
  if (!msg.name) errors.name = "Enter your name.";
  if (!EMAIL.test(msg.email)) errors.email = "Enter a valid email address.";
  if (!contactTopics.includes(msg.topic as (typeof contactTopics)[number])) errors.topic = "Choose a topic.";
  if (msg.message.length < 10) errors.message = "Write a little more so we can help.";
  if (Object.keys(errors).length) return NextResponse.json({ error: "Check the highlighted fields.", errors }, { status: 400 });

  const subject = `[${business.name}] ${msg.topic}: ${msg.name}`;
  const text = [`From: ${msg.name} <${msg.email}>`, `Topic: ${msg.topic}`, msg.order ? `Order: ${msg.order}` : null, "", msg.message]
    .filter((l) => l !== null)
    .join("\n");

  try {
    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? `${business.name} <onboarding@resend.dev>`,
          to: process.env.CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
          reply_to: msg.email,
          subject,
          text,
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
      return NextResponse.json({ ok: true });
    }
    if (process.env.CONTACT_WEBHOOK_URL) {
      const res = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...msg, subject, source: business.url }),
      });
      if (!res.ok) throw new Error(`Webhook ${res.status}`);
      return NextResponse.json({ ok: true });
    }
  } catch (err) {
    console.error("Contact delivery failed", err);
    return NextResponse.json({ error: "Your message didn’t send. Try again in a moment." }, { status: 502 });
  }

  return NextResponse.json(
    {
      error: business.email
        ? `The contact form isn’t connected yet. Email us at ${business.email} instead.`
        : "The contact form isn’t connected yet, so this message wasn’t sent.",
    },
    { status: 503 },
  );
}
