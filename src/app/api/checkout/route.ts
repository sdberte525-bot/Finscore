import { NextResponse } from "next/server";
import { createCheckout } from "@/lib/commerce/checkout";
import type { CartLine } from "@/lib/commerce/types";

export async function POST(request: Request) {
  let lines: CartLine[];
  try {
    const body = (await request.json()) as { lines?: CartLine[] };
    lines = Array.isArray(body.lines) ? body.lines.slice(0, 50) : [];
  } catch {
    return NextResponse.json({ error: "The request couldn't be read." }, { status: 400 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  const result = await createCheckout(lines, origin);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ url: result.url });
}
