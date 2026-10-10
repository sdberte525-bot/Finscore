import { NextResponse } from "next/server";
import { subscribe } from "@/lib/newsletter";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = "";
  let source = "site";
  let trap = "";
  try {
    const body = (await request.json()) as { email?: unknown; source?: unknown; company?: unknown };
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    source = typeof body.source === "string" && /^[\w:-]{1,40}$/.test(body.source) ? body.source : "site";
    trap = typeof body.company === "string" ? body.company : "";
  } catch {
    return NextResponse.json({ error: "The request couldn’t be read." }, { status: 400 });
  }
  // Bots fill the hidden "company" field; pretend it worked.
  if (trap) return NextResponse.json({ ok: true });
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const result = await subscribe(email, source);
  if (result.ok) return NextResponse.json({ ok: true });
  if ("fallback" in result) return NextResponse.json({ ok: false, fallback: result.fallback });
  return NextResponse.json({ error: result.error }, { status: 502 });
}
