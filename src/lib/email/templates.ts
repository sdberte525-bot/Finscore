import "server-only";
import { business } from "@/data/business";
import { formatPrice } from "@/lib/format";
import type { EmailConfig } from "./config";

/*
 * The sequence, written like a real person on the team: short, direct, helpful,
 * and honest. No fake deadlines, fake scarcity or fake reviews. Offers appear only
 * when the matching code is configured (and exists in Shopify).
 */

export type StepKey = "welcome" | "story" | "pieces" | "checkin" | "thanks" | "fitcheck" | "winback";

export type EmailProduct = {
  slug: string;
  name: string;
  url: string;
  image: string | null;
  price: number;
  description: string;
  verse: { text: string; reference: string } | null;
};

export type RenderContext = {
  config: EmailConfig;
  firstName: string | null;
  products: EmailProduct[];
  /** Line-item titles of the customer's latest order (post-purchase steps). */
  bought: string[];
  orderName: string | null;
  unsubscribeUrl: string;
};

export type RenderedEmail = { subject: string; preview: string; html: string; text: string };

/* ---------- tiny HTML builder ---------- */

const C = { bg: "#0f0e0d", card: "#181716", text: "#e8e1d3", muted: "#9b948a", line: "#2b2927", button: "#e8e1d3", buttonText: "#0f0e0d" };
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Helvetica, Arial, sans-serif";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

type Block =
  | { t: "h"; text: string }
  | { t: "p"; text: string }
  | { t: "code"; code: string; label: string }
  | { t: "product"; product: EmailProduct; cta: string }
  | { t: "button"; label: string; href: string }
  | { t: "list"; items: string[] }
  | { t: "sign" };

function utm(url: string, step: StepKey, content: string): string {
  const u = new URL(url);
  u.searchParams.set("utm_source", "email");
  u.searchParams.set("utm_medium", "email");
  u.searchParams.set("utm_campaign", `sequence_${step}`);
  u.searchParams.set("utm_content", content);
  return u.toString();
}

function renderHtml(step: StepKey, preview: string, blocks: Block[], ctx: RenderContext): string {
  const body = blocks
    .map((b) => {
      switch (b.t) {
        case "h":
          return `<h1 style="margin:0 0 18px;font:normal 28px/1.2 ${SERIF};color:${C.text};">${esc(b.text)}</h1>`;
        case "p":
          return `<p style="margin:0 0 16px;font:16px/1.6 ${SANS};color:${C.text};">${esc(b.text)}</p>`;
        case "list":
          return `<ul style="margin:0 0 16px;padding-left:20px;font:16px/1.6 ${SANS};color:${C.text};">${b.items
            .map((i) => `<li style="margin:0 0 8px;">${esc(i)}</li>`)
            .join("")}</ul>`;
        case "code":
          return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 22px;"><tr><td align="center" style="border:1px dashed ${C.muted};padding:18px;">
<div style="font:12px/1.4 ${SANS};letter-spacing:2px;text-transform:uppercase;color:${C.muted};">${esc(b.label)}</div>
<div style="font:bold 26px/1.3 ${SANS};letter-spacing:4px;color:${C.text};margin-top:6px;">${esc(b.code)}</div></td></tr></table>`;
        case "product": {
          const p = b.product;
          const href = esc(utm(p.url, step, p.slug));
          const img = p.image
            ? `<a href="${href}"><img src="${esc(p.image)}" alt="${esc(p.name)}" width="496" style="display:block;width:100%;max-width:496px;height:auto;border:0;background:${C.card};"></a>`
            : "";
          const verse = p.verse
            ? `<p style="margin:0 0 10px;font:italic 15px/1.5 ${SERIF};color:${C.muted};">“${esc(p.verse.text)}” ${esc(p.verse.reference)}</p>`
            : "";
          return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:${C.card};"><tr><td style="padding:0;">${img}</td></tr><tr><td style="padding:18px 20px 20px;">
<p style="margin:0 0 6px;font:normal 20px/1.3 ${SERIF};color:${C.text};">${esc(p.name)} <span style="font:15px ${SANS};color:${C.muted};">${esc(formatPrice(p.price))}</span></p>
${verse}<a href="${href}" style="display:inline-block;margin-top:6px;padding:12px 22px;background:${C.button};color:${C.buttonText};font:bold 14px ${SANS};letter-spacing:1px;text-transform:uppercase;text-decoration:none;">${esc(b.cta)}</a></td></tr></table>`;
        }
        case "button":
          return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;"><tr><td style="background:${C.button};"><a href="${esc(
            utm(b.href, step, "button"),
          )}" style="display:inline-block;padding:15px 28px;color:${C.buttonText};font:bold 14px ${SANS};letter-spacing:1px;text-transform:uppercase;text-decoration:none;">${esc(b.label)}</a></td></tr></table>`;
        case "sign":
          return `<p style="margin:24px 0 0;font:16px/1.6 ${SANS};color:${C.text};">Be strong and courageous.<br>${esc(business.name)}</p>`;
      }
    })
    .join("\n");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>${esc(business.name)}</title></head>
<body style="margin:0;padding:0;background:${C.bg};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.bg};">${esc(preview)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:536px;">
<tr><td style="padding:0 0 28px;font:bold 15px ${SANS};letter-spacing:5px;color:${C.text};text-transform:uppercase;border-bottom:1px solid ${C.line};">${esc(business.name)}</td></tr>
<tr><td style="padding:28px 0 8px;">${body}</td></tr>
<tr><td style="padding:28px 0 0;border-top:1px solid ${C.line};font:12px/1.6 ${SANS};color:${C.muted};">
You're getting this because you joined the ${esc(business.name)} list or ordered from us. Reply anytime — a real person reads it.<br>
${esc(ctx.config.postalAddress)}<br>
<a href="${esc(ctx.unsubscribeUrl)}" style="color:${C.muted};">Unsubscribe</a></td></tr>
</table></td></tr></table></body></html>`;
}

function renderText(blocks: Block[], ctx: RenderContext, step: StepKey): string {
  const lines = blocks.map((b) => {
    switch (b.t) {
      case "h":
      case "p":
        return b.text;
      case "list":
        return b.items.map((i) => `- ${i}`).join("\n");
      case "code":
        return `${b.label}: ${b.code}`;
      case "product":
        return `${b.product.name} (${formatPrice(b.product.price)})${b.product.verse ? `\n"${b.product.verse.text}" ${b.product.verse.reference}` : ""}\n${utm(b.product.url, step, b.product.slug)}`;
      case "button":
        return `${b.label}: ${utm(b.href, step, "button")}`;
      case "sign":
        return `Be strong and courageous.\n${business.name}`;
    }
  });
  return `${lines.join("\n\n")}\n\n--\nReply anytime, a real person reads it.\n${ctx.config.postalAddress}\nUnsubscribe: ${ctx.unsubscribeUrl}\n`;
}

/* ---------- copy ---------- */

function hi(ctx: RenderContext): string {
  return ctx.firstName ? `Hey ${ctx.firstName},` : "Hey,";
}

function shippingLine(ctx: RenderContext): string {
  const free = ctx.config.freeShippingMin ? ` Shipping is free in the US on orders of $${ctx.config.freeShippingMin} or more.` : "";
  return `${ctx.config.deliveryNote}${free}`;
}

function notBought(ctx: RenderContext): EmailProduct[] {
  const owned = ctx.bought.map((t) => t.toLowerCase());
  return ctx.products.filter((p) => !owned.some((t) => t.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(t)));
}

function codeBlock(code: { code: string; label: string } | null): Block[] {
  return code ? [{ t: "code", code: code.code, label: code.label }] : [];
}

function build(step: StepKey, ctx: RenderContext): { subject: string; preview: string; blocks: Block[] } {
  const { config, products } = ctx;
  const shop = config.shopUrl;
  const welcome = config.welcomeCode;
  const cards = (list: EmailProduct[], cta = "Shop it"): Block[] => list.map((product) => ({ t: "product", product, cta }));

  switch (step) {
    case "welcome":
      return {
        subject: welcome ? `Your ${welcome.label.replace(/ off.*/, "")} is inside` : `Welcome to ${business.name}`,
        preview: "Be strong and courageous. Here's where to start.",
        blocks: [
          { t: "p", text: hi(ctx) },
          { t: "p", text: `Thanks for joining. Glad you're here.` },
          {
            t: "p",
            text: `${business.name} is training wear for people who lift with purpose: heavy black cotton, a small cross on the chest, and scripture across the back — where everyone behind you can read it.`,
          },
          ...(welcome ? [{ t: "p", text: "Here's a thank-you for signing up. Use it at checkout:" } as Block, ...codeBlock(welcome)] : []),
          { t: "p", text: products.length > 1 ? `Right now there are ${products.length} pieces:` : "Here's the piece that started it:" },
          ...cards(products),
          {
            t: "p",
            text: "Not sure on sizing? Hit reply with your height, weight and the size you usually wear, and I'll tell you what I'd pick.",
          },
          { t: "p", text: shippingLine(ctx) },
          { t: "sign" },
        ],
      };

    case "story":
      return {
        subject: "Why the verse is on the back",
        preview: "Quiet on the front. Loud on the back.",
        blocks: [
          { t: "p", text: hi(ctx) },
          { t: "p", text: "Most gym clothes shout about the person wearing them. We wanted the opposite." },
          {
            t: "p",
            text: "A small cross on the chest. And across the back — where you can't see it, but everyone behind you can — the words that get you through the last rep.",
          },
          ...products
            .filter((p) => p.verse)
            .map((p) => ({ t: "p", text: `${p.verse!.reference}: “${p.verse!.text}”` }) as Block),
          { t: "p", text: "Strength fades. What you build with it, and who you build it for, doesn't." },
          { t: "button", label: "See the pieces", href: `${shop}${config.collectionPath}` },
          ...(welcome ? [{ t: "p", text: `Your code ${welcome.code} still works whenever you're ready.` } as Block] : []),
          { t: "sign" },
        ],
      };

    case "pieces": {
      const total = products.reduce((s, p) => s + p.price, 0);
      const both =
        products.length > 1
          ? `Both together come to ${formatPrice(total)}${config.freeShippingMin && total / 100 >= config.freeShippingMin ? ", and that ships free in the US" : ""}.`
          : null;
      return {
        subject: "Which verse are you carrying?",
        preview: "Both pieces, up close.",
        blocks: [
          { t: "p", text: hi(ctx) },
          { t: "p", text: "Quick look at both pieces, so you can pick the one that fits how you train." },
          ...products.map(
            (p) =>
              ({
                t: "product",
                product: { ...p, verse: p.verse },
                cta: `Shop ${p.name.split(" ").slice(0, 3).join(" ")}`,
              }) as Block,
          ),
          ...(both ? [{ t: "p", text: both } as Block] : []),
          {
            t: "p",
            text: "Sizing tip: lay a shirt you already love flat, measure pit to pit, and match it to the chart on the product page. Or just reply with your usual size and I'll help.",
          },
          ...(welcome ? [{ t: "p", text: `${welcome.code} gets you ${welcome.label}.` } as Block] : []),
          { t: "sign" },
        ],
      };
    }

    case "checkin":
      return {
        subject: ctx.firstName ? `Quick question, ${ctx.firstName}` : "Quick question",
        preview: "Anything I can answer before you order?",
        blocks: [
          { t: "p", text: hi(ctx) },
          { t: "p", text: "Most people have one of three questions before their first order, so here are straight answers:" },
          {
            t: "list",
            items: [
              "Size: every product page has a measurement chart. Reply with your height, weight and usual size and I'll recommend one.",
              `Delivery: ${config.deliveryNote}`,
              "Anything else — fit, fabric, an order for your team — reply and ask. I answer these myself.",
            ],
          },
          ...(welcome ? [{ t: "p", text: `And your code ${welcome.code} (${welcome.label}) is still good.` } as Block] : []),
          { t: "button", label: "Shop now", href: `${shop}${config.collectionPath}` },
          { t: "sign" },
        ],
      };

    case "thanks":
      return {
        subject: ctx.firstName ? `Thank you, ${ctx.firstName}` : "Thank you for your order",
        preview: "Here's what happens next.",
        blocks: [
          { t: "p", text: hi(ctx) },
          { t: "p", text: `Thank you for your order${ctx.orderName ? ` (${ctx.orderName})` : ""}. Genuinely — it means a lot to a small brand.` },
          { t: "p", text: `What happens next: ${config.deliveryNote} You'll get a tracking email as soon as it ships.` },
          {
            t: "p",
            text: "To keep the print looking right longer, wash it inside out in cold water and hang it to dry.",
          },
          {
            t: "p",
            text: "When it lands, send us a photo of you training in it — reply to this email or tag @swolvation. We'd love to see it.",
          },
          { t: "sign" },
        ],
      };

    case "fitcheck": {
      const others = notBought(ctx);
      const ret = config.returnCode;
      return {
        subject: "How's it fitting?",
        preview: "Honest feedback shapes the next drop.",
        blocks: [
          { t: "p", text: hi(ctx) },
          {
            t: "p",
            text: `Your ${ctx.bought[0] ?? "order"} should be with you by now. How does it fit? How's the print holding up after a few washes? Hit reply and tell me straight — it shapes what we make next.`,
          },
          ...(others.length
            ? [{ t: "p", text: others.length === 1 ? "If you want to complete the set:" : "If you want to add to the rotation:" } as Block, ...cards(others)]
            : [{ t: "p", text: "You've got the full set — thank you for backing us from the start." } as Block]),
          ...(ret ? [{ t: "p", text: "A thank-you for coming back:" } as Block, ...codeBlock(ret)] : []),
          { t: "sign" },
        ],
      };
    }

    case "winback": {
      const others = notBought(ctx);
      const ret = config.returnCode;
      return {
        subject: "Still training?",
        preview: "Checking in from the team.",
        blocks: [
          { t: "p", text: hi(ctx) },
          { t: "p", text: "It's been a couple of months since your order — hope the training's going strong." },
          { t: "p", text: "When the next drop is ready, you'll hear about it here first. Until then:" },
          ...(others.length ? cards(others) : [{ t: "button", label: "Shop the collection", href: `${shop}${config.collectionPath}` } as Block]),
          ...(ret ? [{ t: "p", text: `Your ${ret.label} code still works:` } as Block, ...codeBlock(ret)] : []),
          { t: "p", text: "And if there's something you'd want us to make, reply and tell me." },
          { t: "sign" },
        ],
      };
    }
  }
}

export function renderStep(step: StepKey, ctx: RenderContext): RenderedEmail {
  const { subject, preview, blocks } = build(step, ctx);
  return { subject, preview, html: renderHtml(step, preview, blocks, ctx), text: renderText(blocks, ctx, step) };
}
