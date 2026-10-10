import "server-only";

/*
 * Email-list sign-ups. The first configured destination wins:
 *
 *   1. Shopify customers   SHOPIFY_STORE_DOMAIN + SHOPIFY_ADMIN_ACCESS_TOKEN (scope: write_customers)
 *                          Subscribers become Shopify customers with email marketing consent,
 *                          tagged "newsletter" and "source:<form>", ready for Shopify Email.
 *   2. Klaviyo             KLAVIYO_PRIVATE_API_KEY + KLAVIYO_LIST_ID
 *   3. Any webhook         NEWSLETTER_WEBHOOK_URL (receives JSON { email, source, tags })
 *   4. Netlify Forms       nothing to configure: the browser submits the "newsletter" form defined
 *                          in public/__forms.html (enable form detection in the Netlify dashboard)
 */

export type SubscribeResult = { ok: true } | { ok: false; fallback: "netlify" } | { ok: false; error: string };

export async function subscribe(email: string, source: string): Promise<SubscribeResult> {
  const tags = ["newsletter", `source:${source}`.slice(0, 40)];
  try {
    if (process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
      await subscribeShopify(email, tags);
      return { ok: true };
    }
    if (process.env.KLAVIYO_PRIVATE_API_KEY && process.env.KLAVIYO_LIST_ID) {
      await subscribeKlaviyo(email, source);
      return { ok: true };
    }
    if (process.env.NEWSLETTER_WEBHOOK_URL) {
      const res = await fetch(process.env.NEWSLETTER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, tags }),
      });
      if (!res.ok) throw new Error(`Webhook ${res.status}`);
      return { ok: true };
    }
  } catch (err) {
    console.error("Newsletter sign-up failed", err);
    return { ok: false, error: "That didn’t go through. Try again in a moment." };
  }
  return { ok: false, fallback: "netlify" };
}

/* ---------- Shopify Admin API ---------- */

async function admin<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const version = process.env.SHOPIFY_API_VERSION ?? "2025-01";
  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${version}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ?? "" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Shopify Admin ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  return json.data as T;
}

type UserErrors = { userErrors: { field: string[] | null; message: string }[] };

async function subscribeShopify(email: string, tags: string[]) {
  const consent = { marketingState: "SUBSCRIBED", marketingOptInLevel: "SINGLE_OPT_IN", consentUpdatedAt: new Date().toISOString() };
  const created = await admin<{ customerCreate: UserErrors & { customer: { id: string } | null } }>(
    `mutation($input: CustomerInput!) { customerCreate(input: $input) { customer { id } userErrors { field message } } }`,
    { input: { email, tags, emailMarketingConsent: consent } },
  );
  if (created.customerCreate.customer) return;

  // Already a customer: find them, then record consent and add the tags.
  const taken = created.customerCreate.userErrors.some((e) => /taken|exists/i.test(e.message));
  if (!taken) throw new Error(created.customerCreate.userErrors.map((e) => e.message).join("; ") || "customerCreate failed");
  const found = await admin<{ customers: { nodes: { id: string }[] } }>(
    `query($q: String!) { customers(first: 1, query: $q) { nodes { id } } }`,
    { q: `email:"${email.replace(/"/g, "")}"` },
  );
  const id = found.customers.nodes[0]?.id;
  if (!id) throw new Error("Existing customer not found");
  const updated = await admin<{ customerEmailMarketingConsentUpdate: UserErrors }>(
    `mutation($input: CustomerEmailMarketingConsentUpdateInput!) { customerEmailMarketingConsentUpdate(input: $input) { userErrors { field message } } }`,
    { input: { customerId: id, emailMarketingConsent: consent } },
  );
  if (updated.customerEmailMarketingConsentUpdate.userErrors.length) {
    throw new Error(updated.customerEmailMarketingConsentUpdate.userErrors.map((e) => e.message).join("; "));
  }
  await admin(`mutation($id: ID!, $tags: [String!]!) { tagsAdd(id: $id, tags: $tags) { userErrors { message } } }`, { id, tags });
}

/* ---------- Klaviyo ---------- */

async function subscribeKlaviyo(email: string, source: string) {
  const res = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs", {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
      revision: "2024-10-15",
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          custom_source: source,
          profiles: { data: [{ type: "profile", attributes: { email, subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } } } }] },
        },
        relationships: { list: { data: { type: "list", id: process.env.KLAVIYO_LIST_ID } } },
      },
    }),
  });
  if (!res.ok) throw new Error(`Klaviyo ${res.status}: ${await res.text()}`);
}
