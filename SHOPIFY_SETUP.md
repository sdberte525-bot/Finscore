# Going live: Shopify, email list and Netlify

This takes about an hour, start to finish. You don't need to touch any code: everything is environment variables in Netlify.

## 0. Before you start

- The site is deployed on Netlify from this GitHub repo (see `netlify.toml`).
- Product handles must stay **`strong-courageous`** and **`through-christ`**. That's how the site attaches its gallery, videos, verse and fit notes to your Shopify products.

## 1. Email list on day one (Netlify Forms, free)

This works before Shopify, with no accounts or keys.

1. Netlify dashboard → your site → **Forms** → **Enable form detection** → redeploy (Deploys → Trigger deploy).
2. After the deploy you'll see two forms: **newsletter** and **contact**.
3. Forms → **Form notifications** → **Add notification** → **Email notification** → `swolvation@gmail.com` for each form, so every sign-up and message lands in your inbox.
4. Test it: sign up on the site with your own email, and send a message from the contact page.

Each sign-up records **where it came from**:
- `popup`
- `footer`
- `home`
- `notify:strong-courageous:M`, meaning someone wants the tee in M

That last kind tells you size demand before you order stock. Export everything as CSV any time from Forms.

Netlify's free plan includes 100 form submissions a month. Once Shopify is connected (step 3), sign-ups go to Shopify instead, with no limit.

## 2. Create the Shopify store

1. Sign up at shopify.com. The **Basic** plan is enough.
2. **Settings → Payments**: turn on Shopify Payments (cards, Apple Pay, Google Pay, Shop Pay).
3. **Settings → Shipping and delivery**: set your rates and the regions you ship to.
4. **Settings → Taxes**: let Shopify calculate them.
5. **Settings → Policies**: generate refund, privacy, terms and shipping policies, then edit them.
6. **Products → Add product**, twice:

| Field | Tee | Long sleeve |
| --- | --- | --- |
| Title | Be Strong & Courageous | Through Christ Who Strengthens Me |
| Handle (under "Search engine listing") | `strong-courageous` | `through-christ` |
| Product type | Tee | Long sleeve |
| Price | your price | your price |
| Options | **Size**: XS, S, M, L, XL, XXL · **Color**: Vintage black | **Size**: XS, S, M, L, XL, XXL · **Color**: Black |
| Inventory | real counts per size | real counts per size |
| Images | upload the flat lay and back photo (used in Shopify's checkout and order emails) | same |

7. Set each product to **Active** and make sure it's available on the **Headless** sales channel (step 3).

## 3. Connect the site to Shopify

### A. Storefront token (products, stock, checkout)

1. In Shopify, open the **Shopify App Store**, search **Headless**, and install Shopify's free **Headless** channel.
2. Headless → **Create storefront** → open it → copy the **public access token**.
3. Under Storefront API permissions, make sure these are on:
   - product listings
   - product inventory
   - checkouts

### B. Admin token (email list into Shopify)

1. **Settings → Apps and sales channels → Develop apps → Create an app** (name it "Website").
2. **Configure Admin API scopes**: tick `write_customers`, `read_customers` and `read_orders` (`read_orders` is for the email sequence, see EMAIL_SEQUENCE.md). Save, then **Install app**.
3. Copy the **Admin API access token**. It's shown once.

### C. Add the variables in Netlify

Netlify → Site configuration → Environment variables:

| Key | Value |
| --- | --- |
| `COMMERCE_PROVIDER` | `shopify` |
| `SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | token from A |
| `SHOPIFY_ADMIN_ACCESS_TOKEN` | token from B |
| `STORE_MODE` | `prelaunch` until drop day, then delete it (or set `open`) |
| `NEXT_PUBLIC_SITE_URL` | your live URL, e.g. `https://swolvation.com` |

Redeploy. Then check that:
- The prices on the site match Shopify.
- The product pages show "Coming soon / Notify me" while `STORE_MODE=prelaunch`.
- A test sign-up appears in **Shopify → Customers**, tagged `newsletter`, with email marketing "Subscribed".

## 4. Drop day

1. Netlify → environment variables → delete `STORE_MODE` (or set it to `open`) → redeploy.
2. The announcement bar switches to "The first drop is live / Shop now". Add to cart and quick add appear, and checkout opens Shopify's secure checkout.
3. Place one real order yourself, then refund it in Shopify, to confirm payments and order emails.
4. Email the list. In Shopify, go to **Marketing → Create campaign → Shopify Email** and send to customers tagged `newsletter`. Sizes people asked for are in the tags (`source:notify:through-christ:L`).

## 5. Optional

- **Contact form by email without Netlify:** set `RESEND_API_KEY` and `CONTACT_TO_EMAIL=swolvation@gmail.com` (free tier at resend.com).
- **Klaviyo instead of Shopify Email:** set `KLAVIYO_PRIVATE_API_KEY` and `KLAVIYO_LIST_ID`, and leave `SHOPIFY_ADMIN_ACCESS_TOKEN` unset.
- **Move the campaign videos and photos to Shopify:** upload them in **Content → Files**, then replace the URLs in `src/data/media.ts`.

## What's still yours to fill in

- `src/data/business.ts`:
  - shipping regions, times and rates
  - return window and conditions
  - legal business name and address

  These show on the shipping, returns, privacy and terms pages.
- `src/data/products.ts`: material and care (null until confirmed). Prices there are placeholders; Shopify's prices replace them once connected.
- `src/data/sizeGuide.ts`: the measurements are approximate. Replace them with measured samples and set `approximate: false`.
