# Swolvation on Shopify

The storefront is now a custom Shopify Online Store 2.0 theme in [`shopify/theme`](shopify/theme). It recreates the Netlify site (same layout, fonts, colours, photography, video, animation and interactions) on Shopify's own products, cart, checkout, customers and orders.

Nothing about the Netlify site has changed. It keeps running from this repository until you point your domain at Shopify. The pre-migration version is saved on the `backup/netlify-site` branch.

## What's where

| Path | What it is |
| --- | --- |
| `shopify/theme/` | The theme Shopify hosts: `layout`, `sections`, `snippets`, `templates`, `config`, `locales`, `assets` |
| `shopify/src/theme.css` | Stylesheet source. Uses the same design tokens as the Next.js site and compiles to `theme/assets/theme.css` |
| `shopify/scripts/` | `build.mjs` (CSS, fonts, scripts, image snippet) and `fetch-media.mjs` (campaign photos → Shopify-hosted WebP) |
| `shopify/import/products.csv` | Both launch shirts, ready for **Products → Import** |
| `shopify/import/redirects.csv` | Old Netlify URLs → Shopify URLs, ready for **URL redirects → Import** |

## Page addresses

Shopify fixes some URL patterns, so a few addresses change. `redirects.csv` sends every old address to its new one.

| Netlify | Shopify |
| --- | --- |
| `/` | `/` |
| `/shop` | `/collections/all` |
| `/shop/strong-courageous` | `/products/strong-courageous` |
| `/shop/through-christ` | `/products/through-christ` |
| `/new-drop` | `/collections/new-drop` |
| `/about`, `/faq`, `/shipping`, `/returns`, `/size-guide`, `/contact` | `/pages/about`, `/pages/faq`, … |
| `/privacy`, `/terms` | `/policies/privacy-policy`, `/policies/terms-of-service` |
| `/cart` | `/cart` |

## 1. Store setup (about 30 minutes, all in Shopify admin)

### Products
**Products → Import →** upload `shopify/import/products.csv`.

This creates both shirts with:
- sizes XS to XXL
- placeholder prices of $54 and $68
- descriptions, SEO text and images

If you'll sell through print-on-demand, see section 2 first. You may want the POD app to create the products instead.

### Pages
**Online Store → Pages → Add page**, six times. Leave the content empty. The theme supplies everything, editable in the theme editor.

| Title | URL handle (under "Search engine listing") | Template |
| --- | --- | --- |
| Our story | `about` | `page.about` |
| FAQ | `faq` | `page.faq` |
| Shipping | `shipping` | `page.shipping` |
| Returns and exchanges | `returns` | `page.returns` |
| Size guide | `size-guide` | `page.size-guide` |
| Contact us | `contact` | `page.contact` |

### Collection
**Products → Collections → Create collection**:
- Title: "New drop"
- Handle: `new-drop`
- Conditions: automated, "Product tag is equal to first-drop". The imported shirts have that tag.

It gets the dark "The first drop" header automatically.

### Redirects
In the admin search bar, type **URL redirects**, choose **Import**, and upload `shopify/import/redirects.csv`.

### Policies
**Settings → Policies:** create the refund, privacy, terms of service and shipping policies. Shopify can generate drafts for you to edit. The footer links to them.

### Selling basics
- **Settings → Payments:** Shopify Payments, which covers cards, Apple Pay, Google Pay and Shop Pay.
- **Settings → Shipping and delivery:** rates and regions.
- **Settings → Taxes and duties:** let Shopify calculate.
- **Settings → Notifications:** order confirmation and shipping emails are on by default. Add your logo, and set the sender email to swolvation@gmail.com.
- **Discounts → Create discount:** codes are entered at checkout.
- **Settings → Customer accounts:** optional. When on, "Sign in" appears in the menu and footer.

### Email list
Every sign-up becomes a Shopify customer subscribed to email marketing. It comes from:
- the popup
- the footer
- the homepage
- the password page
- "Notify me" on product pages

Each sign-up is tagged with where it came from:
- `source:popup`, `source:footer`, `source:home`
- `notify:through-christ:L`, meaning someone wants the long sleeve in L

Find them in **Customers** (filter by tag), and email them with **Marketing → Shopify Email**.

## 2. Print-on-demand (Printify or Printful)

The theme reads standard Shopify products, so either official app works without code. Fulfilment runs through Shopify:
1. A customer orders.
2. The POD app receives the order.
3. They print and ship.
4. Tracking flows back to Shopify and the customer.

1. Install the app from the Shopify App Store (**Printify** or **Printful**) and connect your store.
2. Create each shirt in the app: choose the blank, upload the artwork, enable only the colour you sell, and set the retail price. Publish it to Shopify.
3. In Shopify, open the product and make sure of three things:
   - The **URL handle** is `strong-courageous` or `through-christ`. That's how the theme attaches the verse, details, turn video and campaign photos. A title containing "Strong & Courageous" or "Through Christ" also works.
   - The options are named **Color** and **Size**. Both apps use these names.
   - **Product type** is "Tee" or "Long sleeve". This drives the size chart and the Short/Long sleeves filter.
4. Mockups: the launch shirts keep the campaign photography even if the app uploads mockups. That's set in **Theme settings → Products → "Photos for the two launch pieces"**. New products show their Shopify photos.
5. If you imported `products.csv` first:
   - **Printful** can link those existing products: Printful → Stores → Products → Edit → choose the Printful product for each variant.
   - **Printify** works best publishing its own: delete the imported product, then set the same handle on the one Printify publishes.

Stock: POD variants are usually untracked, which means always available. If you track inventory, sold-out sizes are crossed out automatically and quantities are capped at what's in stock.

## 3. Everyday editing (no code)

- **New shirt:** add the product (or publish it from the POD app), with photos, price and sizes. It appears in the shop, search and the homepage grid automatically. To give it a verse and details like the launch pieces, add these product metafields (**Settings → Custom data → Products → Add definition**, namespace `custom`):

  | Name | Key | Type |
  | --- | --- | --- |
  | Scripture text | `custom.scripture_text` | Single line text |
  | Scripture reference | `custom.scripture_reference` | Single line text |
  | Details | `custom.details` | Multi-line text (one per line) |
  | Material | `custom.material` | Multi-line text |
  | Care | `custom.care` | Multi-line text (one per line) |
  | Turn video URL | `custom.turn_video_url` | URL (optional; otherwise the product's first video plays on hover) |

  Image alt text written as `Label | description` (e.g. `Back | The back print`) names the gallery thumbnails.
- **Homepage, About, FAQ and the rest:** **Online Store → Themes → Customize**. Every heading, paragraph, button, image, video and section can be edited, reordered, hidden or added.
- **Theme settings** (the gear icon in the editor):
  - store status
  - brand email and socials
  - shipping and returns details (shown on the Shipping, Returns, FAQ and product pages)
  - size charts and fit finder
  - popup timing and text
- **Videos:** the campaign loops play from Higgsfield's CDN by default. To host them on Shopify:
  1. Upload the MP4s in **Content → Files**.
  2. Pick them in the matching section's "Video" setting.

## 4. Deploying the theme (developer steps)

Requires Node 22.12+ and the Shopify CLI.

```bash
cd shopify
npm ci
npm run media        # downloads and converts the campaign photos into theme/assets (needs internet)
npm run build        # compiles CSS, copies fonts and scripts, generates the image snippet
npx shopify theme check --path theme
npx shopify theme push --path theme --unpublished --store your-store.myshopify.com
```

The first CLI command opens Shopify's browser login. Approve it with your Shopify account; no passwords or API keys are shared. Use `npx shopify theme dev --path theme --store …` for a live local preview.

## 5. Going live

1. Preview the unpublished theme. Check every page, then test checkout with Shopify's test mode, or by placing and refunding a real order.
2. **Online Store → Themes → Swolvation → Publish**.
3. Choose a Shopify plan, then **Online Store → Preferences → Password protection → off**.
4. **Settings → Domains → Connect existing domain**, and follow Shopify's DNS steps. Once the domain points at Shopify, the Netlify site can be retired. Delete it only when you're sure.
5. Before launch, set **Theme settings → Store status** to **Pre-launch** if you want "Coming soon / Notify me" instead of add to cart. Switch it back to **Open** on drop day.
