import "server-only";
import type { ColorOption, Product, ProductVariant, Size } from "./types";

/*
 * Shopify Storefront API adapter. Not exercised against a live store yet:
 * test it with a development store before launch.
 *
 * Env: SHOPIFY_STORE_DOMAIN (your-store.myshopify.com),
 *      SHOPIFY_STOREFRONT_ACCESS_TOKEN (public Storefront token),
 *      SHOPIFY_API_VERSION (optional, defaults below).
 *
 * In Shopify, give each product "Size" and "Color" options. A product type
 * containing "long" maps to Long sleeves, anything else to Tees. Use the
 * product's sort order or a "featured_rank" isn't needed: products keep the
 * order Shopify returns.
 */

const API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2025-01";
const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const SWATCHES: Record<string, string> = {
  black: "#232120",
  "washed black": "#232120",
  bone: "#e9e2d2",
  cream: "#efe6d2",
  ivory: "#f1ece0",
  white: "#f4f2ed",
  charcoal: "#3a3734",
  grey: "#8f8a82",
  gray: "#8f8a82",
};

export function isShopifyConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

async function storefront<T>(query: string, variables: Record<string, unknown>, revalidate: number | false = 300): Promise<T> {
  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "",
    },
    body: JSON.stringify({ query, variables }),
    ...(revalidate === false ? { cache: "no-store" as const } : { next: { revalidate } }),
  });
  if (!res.ok) throw new Error(`Shopify request failed: ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(`Shopify error: ${json.errors.map((e) => e.message).join("; ")}`);
  return json.data as T;
}

type ShopifyImage = { url: string; altText: string | null; width: number; height: number };
type ShopifyProduct = {
  handle: string;
  title: string;
  description: string;
  productType: string;
  collections: { nodes: { title: string }[] };
  images: { nodes: ShopifyImage[] };
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      quantityAvailable: number | null;
      selectedOptions: { name: string; value: string }[];
      price: { amount: string; currencyCode: string };
    }[];
  };
};

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!) {
    products(first: $first) {
      nodes {
        handle
        title
        description
        productType
        collections(first: 1) { nodes { title } }
        images(first: 10) { nodes { url altText width height } }
        variants(first: 100) {
          nodes {
            id
            availableForSale
            quantityAvailable
            selectedOptions { name value }
            price { amount currencyCode }
          }
        }
      }
    }
  }
`;

function option(v: { selectedOptions: { name: string; value: string }[] }, name: string) {
  return v.selectedOptions.find((o) => o.name.toLowerCase() === name)?.value;
}

function toProduct(p: ShopifyProduct, rank: number): Product {
  const images = p.images.nodes.map((i) => ({ src: i.url, alt: i.altText ?? p.title, width: i.width, height: i.height }));
  const variants: ProductVariant[] = p.variants.nodes
    .map((v) => ({
      id: v.id,
      size: (option(v, "size")?.toUpperCase() ?? "M") as Size,
      color: option(v, "color") ?? "Default",
      inventory: v.availableForSale ? (v.quantityAvailable ?? null) : 0,
    }))
    .sort((a, b) => SIZES.indexOf(a.size) - SIZES.indexOf(b.size));
  const colorNames = [...new Set(variants.map((v) => v.color))];
  const colors: ColorOption[] = colorNames.map((name) => ({ name, swatch: SWATCHES[name.toLowerCase()] ?? "#8f8a82" }));
  const first = p.variants.nodes[0];
  return {
    slug: p.handle,
    name: p.title,
    collection: p.collections.nodes[0]?.title ?? "Collection",
    category: /long/i.test(p.productType) ? "long-sleeve" : "tee",
    price: Math.round(parseFloat(first?.price.amount ?? "0") * 100),
    currency: "USD",
    colors,
    description: p.description,
    material: null,
    fit: null,
    care: null,
    images,
    hoverImage: images[1],
    variants,
    featuredRank: rank,
  };
}

export async function fetchShopifyCatalog(): Promise<Product[]> {
  const data = await storefront<{ products: { nodes: ShopifyProduct[] } }>(PRODUCTS_QUERY, { first: 100 });
  return data.products.nodes.map(toProduct);
}

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
      userErrors { message }
    }
  }
`;

/** Creates a Shopify cart and returns its hosted checkout URL. */
export async function createShopifyCheckout(lines: { variantId: string; quantity: number }[]): Promise<string> {
  const data = await storefront<{
    cartCreate: { cart: { checkoutUrl: string } | null; userErrors: { message: string }[] };
  }>(CART_CREATE, { lines: lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.quantity })) }, false);
  if (!data.cartCreate.cart || data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join("; ") || "Shopify cart failed");
  }
  return data.cartCreate.cart.checkoutUrl;
}
