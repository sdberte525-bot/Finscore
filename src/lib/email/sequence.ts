import "server-only";
import { business } from "@/data/business";
import { getCatalog } from "@/lib/commerce";
import { addTags, admin } from "@/lib/shopifyAdmin";
import { emailConfig, unsubscribeUrl, type EmailConfig } from "./config";
import { renderStep, type EmailProduct, type StepKey } from "./templates";

/*
 * The subscriber email sequence. Shopify is the record of truth: who is
 * subscribed, whether they've ordered, and (through customer tags) which emails
 * they've already had. Nothing else needs a database.
 *
 *   Before a first order (anchor = when they subscribed):
 *     welcome   right away       story   +2 days     pieces   +4 days     checkin   +7 days
 *     Any order stops these.
 *   After each order (anchor = that order):
 *     thanks    +1 day           fitcheck +21 days   winback  +60 days (only if no newer order)
 *
 * Rules: only customers whose email marketing state is SUBSCRIBED; at most one email
 * per customer per run; a step that is more than 7 days overdue (e.g. older
 * subscribers when this is first switched on) is skipped, not sent late.
 * Tags written: "email:<step>" (or "email:<step>:<order no>"), "email:skip:<step>...".
 */

type Step = { key: StepKey; hours: number };

const PRE_PURCHASE: Step[] = [
  { key: "welcome", hours: 0 },
  { key: "story", hours: 48 },
  { key: "pieces", hours: 96 },
  { key: "checkin", hours: 168 },
];
const POST_PURCHASE: Step[] = [
  { key: "thanks", hours: 24 },
  { key: "fitcheck", hours: 24 * 21 },
  { key: "winback", hours: 24 * 60 },
];
const STALE_HOURS = 24 * 7;
const MAX_SENDS_PER_RUN = 25;
const LOOKBACK_DAYS = 75;

type Customer = {
  id: string;
  email: string | null;
  firstName: string | null;
  tags: string[];
  createdAt: string;
  numberOfOrders: string;
  emailMarketingConsent: { marketingState: string; consentUpdatedAt: string | null } | null;
  lastOrder: { name: string; createdAt: string; lineItems: { nodes: { title: string }[] } } | null;
};

const CUSTOMER_FIELDS = `id email firstName tags createdAt numberOfOrders
  emailMarketingConsent { marketingState consentUpdatedAt }
  lastOrder { name createdAt lineItems(first: 10) { nodes { title } } }`;

export type RunReport = {
  dryRun: boolean;
  checked: number;
  sent: { to: string; step: string }[];
  skipped: { to: string; steps: string[] }[];
  errors: { to: string; error: string }[];
  limited: boolean;
};

function mask(email: string): string {
  const [user, domain] = email.split("@");
  return `${user.slice(0, 1)}***@${domain}`;
}

type Plan = { send: { step: StepKey; tag: string; orderName: string | null } | null; skip: string[] };

/** Decides what (if anything) a customer should get right now. Exported for testing. */
export function planFor(c: Customer, now: number): Plan {
  const orders = Number(c.numberOfOrders) || 0;
  const tags = new Set(c.tags);
  let steps: Step[];
  let anchor: number;
  let suffix = "";
  let orderName: string | null = null;

  if (orders === 0) {
    steps = PRE_PURCHASE;
    anchor = Date.parse(c.emailMarketingConsent?.consentUpdatedAt ?? c.createdAt);
  } else if (c.lastOrder) {
    steps = POST_PURCHASE;
    anchor = Date.parse(c.lastOrder.createdAt);
    orderName = c.lastOrder.name;
    suffix = `:${c.lastOrder.name.replace(/[^\w-]/g, "")}`;
  } else {
    return { send: null, skip: [] };
  }

  const tagFor = (s: Step) => `email:${s.key}${suffix}`;
  const skipTag = (s: Step) => `email:skip:${s.key}${suffix}`;
  const pending = steps.filter((s) => !tags.has(tagFor(s)) && !tags.has(skipTag(s)) && now >= anchor + s.hours * 3_600_000);
  if (!pending.length) return { send: null, skip: [] };

  const latest = pending[pending.length - 1];
  const fresh = now - (anchor + latest.hours * 3_600_000) <= STALE_HOURS * 3_600_000;
  const skip = pending.filter((s) => s !== latest || !fresh).map(skipTag);
  return { send: fresh ? { step: latest.key, tag: tagFor(latest), orderName } : null, skip };
}

async function emailProducts(config: EmailConfig): Promise<EmailProduct[]> {
  const assetBase = (process.env.NEXT_PUBLIC_SITE_URL ?? business.url).replace(/\/+$/, "");
  return (await getCatalog()).map((p) => {
    const src = p.images[0]?.src ?? null;
    return {
      slug: p.slug,
      name: p.name,
      url: `${config.shopUrl}${config.productPath.replace("{slug}", encodeURIComponent(p.slug))}`,
      image: src ? (/^https?:\/\//.test(src) ? src : `${assetBase}${src}`) : null,
      price: p.price,
      description: p.description,
      verse: p.scripture ?? null,
    };
  });
}

async function sendEmail(config: EmailConfig, to: string, customerId: string, idempotencyKey: string, mail: ReturnType<typeof renderStep>) {
  const unsub = unsubscribeUrl(config, customerId);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      from: config.from,
      to: [to],
      reply_to: config.replyTo ?? undefined,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

async function fetchCustomers(query: string): Promise<Customer[]> {
  const out: Customer[] = [];
  let after: string | null = null;
  for (let page = 0; page < 20; page++) {
    const data: { customers: { nodes: Customer[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } } } = await admin(
      `query($q: String!, $after: String) { customers(first: 100, after: $after, query: $q) { nodes { ${CUSTOMER_FIELDS} } pageInfo { hasNextPage endCursor } } }`,
      { q: query, after },
    );
    out.push(...data.customers.nodes);
    if (!data.customers.pageInfo.hasNextPage) break;
    after = data.customers.pageInfo.endCursor;
  }
  return out;
}

/**
 * Runs the sequence for every recently active customer, or for one email address
 * (used right after a sign-up so the welcome email goes out immediately).
 */
export async function runSequence(opts: { email?: string; dryRun?: boolean } = {}): Promise<RunReport | { ok: false; missing: string[] }> {
  const cfg = emailConfig();
  if (!cfg.ok) return cfg;
  const config = { ...cfg.config, dryRun: cfg.config.dryRun || Boolean(opts.dryRun) };
  const report: RunReport = { dryRun: config.dryRun, checked: 0, sent: [], skipped: [], errors: [], limited: false };

  const since = new Date(Date.now() - LOOKBACK_DAYS * 86_400_000).toISOString();
  const customers = await fetchCustomers(opts.email ? `email:"${opts.email.replace(/"/g, "")}"` : `updated_at:>='${since}'`);
  const products = await emailProducts(config);
  const now = Date.now();

  for (const c of customers) {
    if (!c.email || c.emailMarketingConsent?.marketingState !== "SUBSCRIBED") continue;
    report.checked++;
    const plan = planFor(c, now);
    if (!plan.send && !plan.skip.length) continue;
    if (plan.send && report.sent.length >= MAX_SENDS_PER_RUN) {
      report.limited = true;
      continue;
    }
    const to = mask(c.email);
    try {
      if (plan.send) {
        const mail = renderStep(plan.send.step, {
          config,
          firstName: c.firstName?.trim() || null,
          products,
          bought: c.lastOrder?.lineItems.nodes.map((l) => l.title) ?? [],
          orderName: plan.send.orderName,
          unsubscribeUrl: unsubscribeUrl(config, c.id),
        });
        if (!config.dryRun) await sendEmail(config, c.email, c.id, `${c.id}:${plan.send.tag}`, mail);
        report.sent.push({ to, step: plan.send.tag });
      }
      if (plan.skip.length) report.skipped.push({ to, steps: plan.skip });
      const tags = [...(plan.send ? [plan.send.tag] : []), ...plan.skip];
      if (!config.dryRun && tags.length) await addTags(c.id, tags);
      if (plan.send && !config.dryRun) await new Promise((r) => setTimeout(r, 600)); // stay under Resend's rate limit
    } catch (err) {
      report.errors.push({ to, error: err instanceof Error ? err.message : String(err) });
    }
  }
  return report;
}
