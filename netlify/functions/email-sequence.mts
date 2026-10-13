/*
 * Netlify Scheduled Function: runs the subscriber email sequence every hour by
 * calling the site's own /api/email/run route. Needs CRON_SECRET set in Netlify
 * (the same value the route checks). Netlify sets URL to the site's main address.
 */
export default async function emailSequence(): Promise<Response> {
  const base = process.env.URL;
  const secret = process.env.CRON_SECRET;
  if (!base || !secret) {
    console.error("email-sequence: URL or CRON_SECRET missing");
    return new Response("not configured", { status: 503 });
  }
  const res = await fetch(`${base}/api/email/run`, { method: "POST", headers: { Authorization: `Bearer ${secret}` } });
  console.log(`email-sequence: ${res.status} ${(await res.text()).slice(0, 2000)}`);
  return new Response(null, { status: res.ok ? 200 : 500 });
}

export const config = { schedule: "@hourly" };
