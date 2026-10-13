import { NextResponse } from "next/server";
import { runSequence } from "@/lib/email/sequence";

/*
 * Runs the subscriber email sequence. Called hourly by netlify/functions/email-sequence.mts
 * (or any cron: GitHub Actions, cron-job.org) with "Authorization: Bearer <CRON_SECRET>".
 * Add "?dry=1" to see what would be sent without sending (or set EMAIL_DRY_RUN=1).
 */

export const dynamic = "force-dynamic";

async function handle(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "CRON_SECRET is not set." }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const dryRun = new URL(request.url).searchParams.get("dry") === "1";

  try {
    const report = await runSequence({ dryRun });
    if ("missing" in report) return NextResponse.json({ error: "Email sequence isn't configured.", missing: report.missing }, { status: 503 });
    return NextResponse.json(report);
  } catch (err) {
    console.error("Email sequence run failed", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Run failed" }, { status: 500 });
  }
}

export const GET = handle;
export const POST = handle;
