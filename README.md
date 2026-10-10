# Swolvation

Website and storefront for Swolvation, vintage-inspired training apparel rooted in strength, discipline, and purpose. Built through adversity.

Built with Next.js (App Router), React, TypeScript and Tailwind CSS. Motion uses GSAP with ScrollTrigger and Lenis for smooth scrolling.

**Launch lineup:** Be Strong & Courageous (vintage black oversized tee) and Through Christ Who Strengthens Me (black long sleeve). The white Though I Fall, I Will Rise long sleeve is off the site for now; its source files stay in `assets/source/` and `/shop/though-i-fall` redirects to the shop.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

Copy `.env.example` to `.env.local` (or set the same variables in Netlify) to connect payments, the contact form and the newsletter.

**Going live:** follow [`SHOPIFY_SETUP.md`](SHOPIFY_SETUP.md). It covers the email list on Netlify Forms, the Shopify store, tokens, pre-launch mode and drop day.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, The First Drop, collection feature, Our Story, closing statement |
| `/shop` | Catalog with All products, Short sleeves and Long sleeves filters (only categories that exist are offered) |
| `/new-drop` | The first drop |
| `/shop/[slug]` | Product page: gallery with zoom viewer, color and size selection, size guide, details |
| `/about` | Our story |
| `/contact` | Contact form with topics |
| `/faq`, `/shipping`, `/returns`, `/size-guide` | Customer information |
| `/privacy`, `/terms` | Draft policies |
| `/cart`, `/checkout`, `/checkout/success` | Cart, hand-off to hosted checkout, confirmation (`/bag` redirects to `/cart`) |

## Before launch: what to fill in

Nothing on the site guesses at business details. Anything not yet decided shows as "to be confirmed" or stays hidden. Fill these in and the site updates itself:

- **`src/data/business.ts`**: customer email, registered business name and address, jurisdiction, social accounts (none are shown until added), shipping regions, times and rates, return window, condition, exchanges and refunds.
- **`src/data/products.ts`**: prices (placeholders), inventory per size (placeholders; `null` stops tracking), and `material`, `fit` and `care` for each piece (currently `null`, so the product page says details are coming).
- **`src/data/sizeGuide.ts`**: approximate size charts and the fit finder's rules. Replace them with measured samples and set `approximate: false`.
- **`src/data/campaign.ts`**: campaign photography. Set `hero` and the hero becomes a full-bleed photo. The editorial and About slots show real product close-ups until photos are added. The file includes the art direction for the shoot.
- **`/privacy` and `/terms`** are marked as drafts. They describe what the site actually does, but have them reviewed before launch.

## Commerce

**Recommendation: Shopify for launch.** It gives you a product and inventory admin, orders, shipping labels, taxes and a trusted hosted checkout without editing code. The site uses Shopify only as a back end (its Storefront API), so the design stays exactly as it is.

- Set `COMMERCE_PROVIDER=shopify` plus the Shopify variables. Products, prices, colors, sizes and stock then come from Shopify, and checkout opens Shopify's hosted checkout. Give each product `Size` and `Color` options. The adapter (`src/lib/commerce/shopify.ts`) hasn't been tested against a live store yet, so try it with a development store first.
- Without Shopify, products come from `src/data/products.ts` and `STRIPE_SECRET_KEY` enables Stripe Checkout. This route has no monthly fee, but products and stock are edited in code and stock isn't decremented after a sale.
- With neither, the checkout page says payments aren't connected and no order can be placed.

Prices and stock are always re-checked on the server at checkout; the browser bag (saved on the shopper's device) is never trusted for prices.

## Campaign media

Every campaign video and photo the site uses is listed in `src/data/media.ts`. They're hosted on Higgsfield's CDN: web-optimized loops of about 1 to 2.5 MB, posters, and the launch film. Your two flat lays are in `public/images/campaign/`. To move a file, upload it elsewhere (for example Shopify > Content > Files) and replace its URL in `media.ts`. Remote image hosts are allowed in `next.config.ts`.

## Store status and email list

- **Before launch** (no checkout connected, or `STORE_MODE=prelaunch`): products show "Coming soon", and the buy box becomes a "Notify me" sign-up tagged with the product and size. The announcement bar says "Get first access".
- **After launch:** add to cart, quick add, and an announcement bar pointing to the drop.
- **Sign-ups** go to the first configured destination: Shopify customers (Admin token), then Klaviyo, then a webhook, then Netlify Forms (no setup beyond enabling form detection). See `src/lib/newsletter.ts`.
- A first-access popup appears once per visitor after 15 seconds or half a page of scrolling. It stays away for 14 days after a dismissal, and forever after a sign-up.

## Images

Run `npm run images` (Python 3 with Pillow and numpy) after changing anything in `assets/source/`. It writes web images to `public/images/products/<slug>/`, hero ink maps to `public/images/ink/`, and real pixel sizes to `src/data/productImages.json`. Source files are never modified.

| Source | Used for |
| --- | --- |
| `assets/source/photos/` | High-res product photos (transparent): full backs and close-ups |
| `assets/source/renders/` | Studio renders of each shirt's front and back, cut out as the "Front and back" view |
| `assets/source/reference/multi-angle-sheet.webp` | Not used on the site (see below) |

Each product's gallery views are listed in `src/data/products.ts`, with a label ("Front and back", "Back", "Chest", "Back print", "Sleeve") and whether the image is a cut-out (`contain`) or a close-up crop (`cover`). Shop cards show the first view and switch to the "Back" view on hover (a Back/Front button on touch screens).

**The multi-angle sheet isn't used** because its artwork differs from the high-res photos: different cross, skull and sleeve designs, and garbled lettering in the Philippians 4:13 arch. If the sheet shows the real production artwork, the photos need replacing instead. Side and angled views can be added to the gallery once matching photos exist; a 360° viewer would need a consistent sequence of rotation frames.

**Still needed from the photo shoot:** a full front view of each shirt on its own, a full back of Though I Fall, I Will Rise, and side views. The current "Front and back" images come from the lower-resolution renders.

## Design

- Palette: deep black `#111111`, charcoal `#222222`, warm off-white `#F5F3EF`, vintage cream `#E8E0D1`, muted grey `#888888` for borders and icons, with `#6A6762` as the readable text grey. Tokens are in `src/app/globals.css`.
- Type: Big Shoulders (bold, condensed, uppercase) for the wordmark and headings; Archivo for navigation, prices, sizes, descriptions and forms.
- Header search runs in the browser over the catalog. There's no customer account area yet.
- Motion is limited to short entrance and reveal animations, and respects `prefers-reduced-motion`.

## Deploy

`netlify.toml` configures Netlify. Connect the GitHub repo, set the environment variables above, and every push redeploys.
