import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "The request couldn’t be read." }, { status: 400 });
  }
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "Email signups aren’t open yet. Check back soon." }, { status: 503 });
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "swolvation.com" }),
  });
  if (!res.ok) {
    return NextResponse.json({ error: "That didn’t go through. Try again in a moment." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
