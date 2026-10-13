import "server-only";

/*
 * Minimal Shopify Admin GraphQL client, shared by the email-list sign-up and the
 * email sequence. Env: SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_ACCESS_TOKEN,
 * optional SHOPIFY_API_VERSION.
 */

export function isShopifyAdminConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_ADMIN_ACCESS_TOKEN);
}

export async function admin<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
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

export type UserErrors = { userErrors: { field: string[] | null; message: string }[] };

export async function addTags(id: string, tags: string[]): Promise<void> {
  const data = await admin<{ tagsAdd: UserErrors }>(
    `mutation($id: ID!, $tags: [String!]!) { tagsAdd(id: $id, tags: $tags) { userErrors { field message } } }`,
    { id, tags },
  );
  if (data.tagsAdd.userErrors.length) throw new Error(data.tagsAdd.userErrors.map((e) => e.message).join("; "));
}
