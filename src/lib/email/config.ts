import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { business } from "@/data/business";
import { isShopifyAdminConfigured } from "@/lib/shopifyAdmin";

/*
 * Settings for the subscriber email sequence. Required:
 *   RESEND_API_KEY          sends the email (resend.com)
 *   EMAIL_FROM              e.g. "Swolvation <hello@swolvation.com>", on a domain verified in Resend
 *   EMAIL_POSTAL_ADDRESS    mailing address printed in every footer (CAN-SPAM); a PO box is fine
 *   EMAIL_SIGNING_SECRET    any long random string; signs unsubscribe links
 *   SHOPIFY_STORE_DOMAIN + SHOPIFY_ADMIN_ACCESS_TOKEN (read_customers, write_customers, read_orders)
 * Optional:
 *   EMAIL_SHOP_URL          where links point (default NEXT_PUBLIC_SITE_URL)
 *   EMAIL_PRODUCT_PATH      product link path, default "/shop/{slug}"; use "/products/{slug}" for the Shopify storefront
 *   EMAIL_COLLECTION_PATH   "shop all" link path, default "/shop"; use "/collections/all" for the Shopify storefront
 *   EMAIL_REPLY_TO          default the public address in src/data/business.ts
 *   WELCOME_CODE            first-order discount code that exists in Shopify (e.g. IRON10); omitted when unset
 *   WELCOME_CODE_LABEL      how it's described, default "10% off your first order"
 *   RETURN_CODE             returning-customer code (e.g. SECOND10); omitted when unset
 *   RETURN_CODE_LABEL       default "10% off your next order"
 *   FREE_SHIPPING_MIN       e.g. "69" once the free-shipping discount is live; omitted when unset
 *   EMAIL_DELIVERY_NOTE     overrides the "printed to order" delivery sentence
 *   EMAIL_DRY_RUN=1         report what would be sent without sending or tagging
 *   CRON_SECRET             protects /api/email/run
 */

export type EmailConfig = {
  resendKey: string;
  from: string;
  replyTo: string | null;
  postalAddress: string;
  signingSecret: string;
  shopUrl: string;
  productPath: string;
  collectionPath: string;
  welcomeCode: { code: string; label: string } | null;
  returnCode: { code: string; label: string } | null;
  freeShippingMin: number | null;
  deliveryNote: string;
  dryRun: boolean;
};

const DEFAULT_DELIVERY =
  "Every piece is printed for you after you order, so it takes about 2–3 weeks to reach you in the US.";

export function emailConfig(): { ok: true; config: EmailConfig } | { ok: false; missing: string[] } {
  const env = process.env;
  const missing: string[] = [];
  if (!env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!env.EMAIL_FROM) missing.push("EMAIL_FROM");
  if (!env.EMAIL_POSTAL_ADDRESS) missing.push("EMAIL_POSTAL_ADDRESS");
  if (!env.EMAIL_SIGNING_SECRET || env.EMAIL_SIGNING_SECRET.length < 16) missing.push("EMAIL_SIGNING_SECRET (16+ chars)");
  if (!isShopifyAdminConfigured()) missing.push("SHOPIFY_STORE_DOMAIN + SHOPIFY_ADMIN_ACCESS_TOKEN");
  if (missing.length) return { ok: false, missing };

  const min = Number(env.FREE_SHIPPING_MIN);
  return {
    ok: true,
    config: {
      resendKey: env.RESEND_API_KEY!,
      from: env.EMAIL_FROM!,
      replyTo: env.EMAIL_REPLY_TO ?? business.email,
      postalAddress: env.EMAIL_POSTAL_ADDRESS!,
      signingSecret: env.EMAIL_SIGNING_SECRET!,
      shopUrl: (env.EMAIL_SHOP_URL ?? business.url).replace(/\/+$/, ""),
      productPath: env.EMAIL_PRODUCT_PATH ?? "/shop/{slug}",
      collectionPath: env.EMAIL_COLLECTION_PATH ?? "/shop",
      welcomeCode: env.WELCOME_CODE
        ? { code: env.WELCOME_CODE, label: env.WELCOME_CODE_LABEL ?? "10% off your first order" }
        : null,
      returnCode: env.RETURN_CODE ? { code: env.RETURN_CODE, label: env.RETURN_CODE_LABEL ?? "10% off your next order" } : null,
      freeShippingMin: Number.isFinite(min) && min > 0 ? min : null,
      deliveryNote: env.EMAIL_DELIVERY_NOTE ?? DEFAULT_DELIVERY,
      dryRun: env.EMAIL_DRY_RUN === "1" || env.EMAIL_DRY_RUN === "true",
    },
  };
}

/* ---------- Signed unsubscribe links ---------- */

function sign(secret: string, customerId: string): string {
  return createHmac("sha256", secret).update(`unsubscribe:${customerId}`).digest("base64url").slice(0, 32);
}

export function unsubscribeUrl(config: EmailConfig, customerId: string): string {
  const id = customerId.split("/").pop() ?? customerId;
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? business.url).replace(/\/+$/, "");
  return `${base}/api/email/unsubscribe?c=${encodeURIComponent(id)}&t=${sign(config.signingSecret, id)}`;
}

export function verifyUnsubscribe(secret: string, id: string, token: string): boolean {
  const expected = Buffer.from(sign(secret, id));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
