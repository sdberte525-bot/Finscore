# Swolvation

Storefront for Swolvation, heavyweight gym clothing with scripture prints. Old iron. Older faith.

Built with Next.js (App Router), React, TypeScript and Tailwind CSS. Motion uses GSAP with ScrollTrigger and Lenis for momentum scrolling. Three.js runs two small WebGL effects: the hero "screen print" and the hover distortion on product tiles.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

Copy `.env.example` to `.env.local` to configure payments, the newsletter and the public URL.

## Deploy

The site deploys to Netlify from GitHub (`netlify.toml` pins the build). Set the same variables from `.env.example` under Site configuration → Environment variables, and every push to the deployed branch redeploys.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, featured collection, story, Plates gallery, community, footer |
| `/shop` | All products, filterable by category |
| `/shop/[slug]` | Product page: gallery, size selection, size guide, details, related pieces |
| `/bag` | Full bag view (a drawer also opens from every page) |
| `/checkout` | Order summary and hand-off to payment |
| `/checkout/success` | Confirmation after Stripe redirects back |
| `/info/[topic]` | Shipping and returns, size guide, contact |

## Adding real products and photography

Everything a shopper sees comes from a few data files:

- **Products**: `src/data/products.ts`. Names, prices (in cents), verses, descriptions, fit, care, images and per-size inventory. A size with `inventory: 0` shows as sold out. Prices, inventory, fabric details and measurements are placeholders until production specs are final.
- **Images**: put photography in `public/images/products/<slug>/` and point the product's `images` (and `hoverImage`) at it with the real pixel sizes. The first image is the grid and social-share image.
- **Hero prints**: each product's `inkMap` is a grayscale PNG of its back print (white = ink). They're generated from the renders in `assets/source/` by `npm run images` (`scripts/prepare-images.py`, needs Python with Pillow). Add a new source render plus an entry in that script to put a new design in the hero rotation.
- **Plates gallery**: `src/data/gallery.ts`. Append lifestyle or gym photography as `image` entries.
- **Community wall**: `src/data/community.ts`. Add customer photos (with permission) to `posts` and announced partners to `collaborations`. While either list is empty, the section shows an invitation instead.
- **Brand details**: `src/data/site.ts` (social links, emails, tagline) and `src/data/info.ts` (policies and size chart). The social handles, email addresses, policy terms and size chart are placeholders to confirm before launch.

## Commerce architecture

- `src/lib/commerce/types.ts` defines the storefront's types. `catalog.ts` is the only place that reads product data. To move to Shopify, Medusa or another backend, re-implement those functions against its API and the UI won't need to change.
- The bag lives in React context (`src/components/cart/CartProvider.tsx`) and is saved to `localStorage` on the shopper's device. Line prices are always re-derived from the catalog.
- `POST /api/checkout` re-prices the bag on the server, checks inventory, and creates a hosted **Stripe Checkout** session when `STRIPE_SECRET_KEY` is set. Without a key, the checkout page says payments aren't connected and no order can be placed. Inventory isn't decremented after payment; add a Stripe webhook (`checkout.session.completed`) to do that once a real inventory source exists.
- `POST /api/subscribe` forwards newsletter signups as JSON to `NEWSLETTER_WEBHOOK_URL`. Without it, the form tells visitors signups aren't open yet.

## Design notes

- Palette: bone `#ECE6DA`, plaster `#D8D0C2`, ash `#6F695F`, charcoal `#34312D`, washed black `#1A1917`, with oxblood `#6B2620` as the only accent. Tokens live in `src/app/globals.css`.
- Type: UnifrakturMaguntia (blackletter, taken from the garments' scripture lettering) for display, Archivo for everything else, and Cinzel only for the wordmark, matching the chest print.
- Motion respects `prefers-reduced-motion`: Lenis, scroll scrubs and WebGL are skipped, the hero shows a static print, and the Plates gallery becomes a normal scrollable row.
