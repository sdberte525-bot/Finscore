import { business } from "@/data/business";
import { emailConfig, verifyUnsubscribe } from "@/lib/email/config";
import { admin, type UserErrors } from "@/lib/shopifyAdmin";

/*
 * Unsubscribe links from the email sequence. GET shows a confirm button (so link
 * scanners can't unsubscribe people by accident); POST does it. Mail apps' one-click
 * unsubscribe (RFC 8058) POSTs here directly. Shopify records the change, so every
 * future email (ours and Shopify Email campaigns) respects it.
 */

export const dynamic = "force-dynamic";

function page(title: string, body: string, status = 200) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} · ${business.name}</title></head>
<body style="margin:0;background:#0f0e0d;color:#e8e1d3;font:16px/1.6 Helvetica,Arial,sans-serif;display:grid;place-items:center;min-height:100vh;padding:24px;box-sizing:border-box;">
<main style="max-width:420px;text-align:center;"><p style="letter-spacing:5px;font-weight:bold;text-transform:uppercase;">${business.name}</p><h1 style="font:normal 28px/1.2 Georgia,serif;">${title}</h1>${body}</main></body></html>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

function params(url: URL) {
  return { id: url.searchParams.get("c") ?? "", token: url.searchParams.get("t") ?? "" };
}

function valid(id: string, token: string): boolean {
  const cfg = emailConfig();
  return cfg.ok && /^\d{1,20}$/.test(id) && verifyUnsubscribe(cfg.config.signingSecret, id, token);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { id, token } = params(url);
  if (!valid(id, token)) return page("Link not recognised", "<p>This unsubscribe link is invalid or incomplete. Reply to any of our emails and we'll take you off the list.</p>", 400);
  const action = `/api/email/unsubscribe?c=${encodeURIComponent(id)}&t=${encodeURIComponent(token)}`;
  return page(
    "Unsubscribe?",
    `<p>You'll stop getting emails from ${business.name}.</p>
<form method="post" action="${action}"><button type="submit" style="margin-top:12px;padding:14px 26px;background:#e8e1d3;color:#0f0e0d;border:0;font:bold 14px Helvetica,Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;cursor:pointer;">Unsubscribe</button></form>`,
  );
}

export async function POST(request: Request) {
  const { id, token } = params(new URL(request.url));
  if (!valid(id, token)) return page("Link not recognised", "<p>This unsubscribe link is invalid or incomplete.</p>", 400);
  try {
    const data = await admin<{ customerEmailMarketingConsentUpdate: UserErrors }>(
      `mutation($input: CustomerEmailMarketingConsentUpdateInput!) { customerEmailMarketingConsentUpdate(input: $input) { userErrors { field message } } }`,
      {
        input: {
          customerId: `gid://shopify/Customer/${id}`,
          emailMarketingConsent: { marketingState: "UNSUBSCRIBED", consentUpdatedAt: new Date().toISOString() },
        },
      },
    );
    const errors = data.customerEmailMarketingConsentUpdate.userErrors;
    if (errors.length) throw new Error(errors.map((e) => e.message).join("; "));
  } catch (err) {
    console.error("Unsubscribe failed", err);
    return page("Something went wrong", `<p>We couldn't update your preferences just now. Reply to any of our emails, or write to ${business.email ?? "us"}, and we'll remove you by hand.</p>`, 500);
  }
  return page("You're unsubscribed", "<p>You won't get any more marketing emails from us. Order and shipping updates still arrive if you buy something.</p>");
}
