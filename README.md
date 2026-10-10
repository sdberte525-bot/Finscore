# Swolvation

Website and storefront for Swolvation, vintage-inspired gym and lifestyle clothing. Born in the weight room. Worn everywhere.

Built with Next.js (App Router), React, TypeScript and Tailwind CSS. Motion uses GSAP with ScrollTrigger and Lenis for smooth scrolling. Three.js powers one effect: the homepage hero "prints" the garment artwork onto the page until campaign photography replaces it.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

Copy `.env.example` to `.env.local` (or set the same variables in Netlify) to connect payments, the contact form and the newsletter.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, featured collection, editorial spread, brand introduction, closing call to action |
| `/shop` | Catalog with category, color, availability filters and sorting (kept in the URL) |
| `/shop/[slug]` | Product page: gallery with zoom viewer, color and size selection, size guide, details |
| `/about` | Brand story |
| `/contact` | Contact form with topics |
| `/faq`, `/shipping`, `/returns`, `/size-guide` | Customer information |
| `/privacy`, `/terms` | Draft policies |
| `/bag`, `/checkout`, `/checkout/success` | Bag, hand-off to hosted checkout, confirmation |

## Before launch: what to fill in

Nothing on the site guesses at business details. Anything not yet decided shows as "to be confirmed" or stays hidden. Fill these in and the site updates itself:

- **`src/data/business.ts`**: customer email, registered business name and address, jurisdiction, social accounts (none are shown until added), shipping regions, times and rates, return window, condition, exchanges and refunds.
- **`src/data/products.ts`**: prices (placeholders), inventory per size (placeholders; `null` stops tracking), and `material`, `fit` and `care` for each piece (currently `null`, so the product page says details are coming).
- **`src/data/sizeGuide.ts`**: measured size charts per category.
- **`src/data/campaign.ts`**: campaign photography. Set `hero` and the hero becomes a full-bleed photo. The editorial and About slots show real product close-ups until photos are added. The file includes the art direction for the shoot.
- **`/privacy` and `/terms`** are marked as drafts. They describe what the site actually does, but have them reviewed before launch.

## Commerce

**Recommendation: Shopify for launch.** It gives you a product and inventory admin, orders, shipping labels, taxes and a trusted hosted checkout without editing code. The site uses Shopify only as a back end (its Storefront API), so the design stays exactly as it is.

- Set `COMMERCE_PROVIDER=shopify` plus the Shopify variables. Products, prices, colors, sizes and stock then come from Shopify, and checkout opens Shopify's hosted checkout. Give each product `Size` and `Color` options. The adapter (`src/lib/commerce/shopify.ts`) hasn't been tested against a live store yet, so try it with a development store first.
- Without Shopify, products come from `src/data/products.ts` and `STRIPE_SECRET_KEY` enables Stripe Checkout. This route has no monthly fee, but products and stock are edited in code and stock isn't decremented after a sale.
- With neither, the checkout page says payments aren't connected and no order can be placed.

Prices and stock are always re-checked on the server at checkout; the browser bag (saved on the shopper's device) is never trusted for prices.

## Images

- Product images in `public/images/products/<slug>/` are generated from the design renders in `assets/source/` by `npm run images` (Python with Pillow). Replace them with product photography by updating paths and pixel sizes in `src/data/products.ts`.
- The renders are low resolution, so large crops look soft. Real photography (at least 2400px on the long edge for full-width slots) will fix that.

## Design

- Palette: bone `#ECE6DA`, plaster `#D8D0C2`, ash `#6F695F`, charcoal `#34312D`, washed black `#1A1917`, oxblood `#6B2620` as the only accent. Tokens are in `src/app/globals.css`.
- Type: Cormorant Garamond for the wordmark and headings, Archivo for everything people need to read (navigation, prices, sizes, descriptions, forms).
- Motion respects `prefers-reduced-motion`: smooth scrolling, reveals and WebGL are skipped and the hero shows a still image.

## Deploy

`netlify.toml` configures Netlify. Connect the GitHub repo, set the environment variables above, and every push redeploys.
