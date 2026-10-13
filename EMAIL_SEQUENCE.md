# Subscriber email sequence (built in, written like a sales rep)

Every new subscriber gets a short, personal sequence that sells. Every buyer gets follow-ups that bring them back. The code is done, but it **sends nothing until you add the settings below.**

## What each person gets
**Before a first order.** These start when they subscribe and stop the moment they order.

| When | Email | Job |
|---|---|---|
| Right away (within the hour for Shopify-store signups) | **Welcome**: "Your 10% is inside" | Thanks them, shows the code and both pieces, and offers personal sizing help ("reply with your height, weight, usual size") |
| Day 2 | **Story**: "Why the verse is on the back" | The meaning behind the brand, the verses, and a code reminder |
| Day 4 | **Pieces**: "Which verse are you carrying?" | Both products up close with prices, the bundle total, and a sizing tip |
| Day 7 | **Check-in**: "Quick question, Sam" | Straight answers to the three questions people have before buying (size, delivery, anything else), plus the code |

**After every order.** This cycle repeats for each new order, which is what builds returning customers.

| When | Email | Job |
|---|---|---|
| 1 day after the order | **Thank you** | What happens next (printed to order, tracking email), print-care tips, and a request for a training photo (tag @swolvation) |
| Day 21 | **Fit check**: "How's it fitting?" | Asks for honest feedback, recommends the piece they don't own yet, and includes the returning-customer code (if set) |
| Day 60, if no newer order | **Win-back**: "Still training?" | A check-in, the next drop announced here first, the other piece, and the code |

The rules, in code:
- Only people whose email marketing state in Shopify is **Subscribed** get anything.
- At most one email per person per run.
- A step more than 7 days overdue is skipped, not sent late. So switching this on doesn't blast your existing list with four emails.
- Unsubscribe works with one click: the link in every footer and the native "Unsubscribe" button in Gmail and Apple Mail. Shopify records it.
- No fake deadlines, scarcity or reviews. Prices and products come from your live catalog. The discount and free-shipping lines appear only once you've switched them on.

## How it works (no extra database)
- **Shopify is the memory.** It stores who's subscribed and who's ordered. Each email sent is recorded as a customer tag (`email:welcome`, `email:thanks:1001`), so you can see in Shopify admin exactly who got what.
- **The welcome email is sent the moment someone signs up on the website.**
- **An hourly job** (`netlify/functions/email-sequence.mts`, which calls `/api/email/run`) handles everything else. That includes signups made on the Shopify storefront itself and every order follow-up.
- **Resend** sends the emails: 3,000/month free, about 100/day.

Code: `src/lib/email/` (config, templates, sequence), `src/app/api/email/run`, `src/app/api/email/unsubscribe`, and the hook in `src/app/api/subscribe`.

## Setup (about 20 minutes)

1. **Resend** (resend.com):
   1. Create an account and **add your domain**. Add the DNS records it shows (SPF/DKIM), so emails land in the inbox, not spam.
   2. Copy an API key.
   3. You need a domain for this. A Gmail address can't send through Resend.
2. **Shopify Admin token scopes:** the "Website" app needs `read_customers`, `write_customers` **and `read_orders`**.
   - Settings → Apps → Develop apps → Website → Configuration. Add the scope, save, then reinstall.
3. **Discount codes** (optional but recommended). Create them in Shopify first. The email only shows a code that exists.
   - `IRON10`: 10% off, subscribers only, one per customer (see `SWOLVATION_FIRST_SALE/07_EMAIL_SYSTEM.md`, step 1).
   - `SECOND10` (or your choice) for returning customers: limit it to customers with at least 1 order, one use each.
4. **Netlify → Site configuration → Environment variables**:

| Key | Value |
|---|---|
| `RESEND_API_KEY` | from step 1 |
| `EMAIL_FROM` | `Swolvation <hello@yourdomain.com>` (on the verified domain) |
| `EMAIL_POSTAL_ADDRESS` | a mailing address for the footer, required by US law (CAN-SPAM). A PO box or virtual mailbox keeps you anonymous. |
| `EMAIL_SIGNING_SECRET` | any random string of 32+ characters |
| `CRON_SECRET` | another random string |
| `EMAIL_REPLY_TO` | optional; defaults to swolvation@gmail.com |
| `WELCOME_CODE` | `IRON10` (once it exists) |
| `RETURN_CODE` | `SECOND10` (once it exists) |
| `FREE_SHIPPING_MIN` | `69`, only once that free-shipping discount is live |
| `EMAIL_SHOP_URL` | where "Shop" buttons go. Leave empty to use this website. |
| `EMAIL_PRODUCT_PATH` / `EMAIL_COLLECTION_PATH` | only when sending people to the Shopify storefront: `/products/{slug}` and `/collections/all` |
| `EMAIL_DRY_RUN` | `1` for the first day (see testing below) |

5. Redeploy.

**Important:** if you also turned on Shopify Messaging's "Welcome new subscribers" automation, turn it **off**. Otherwise people get two welcome emails.

## Test it before it's live
1. With `EMAIL_DRY_RUN=1`, run this (replace `CRON_SECRET` and your site address):
   `curl -X POST -H "Authorization: Bearer CRON_SECRET" https://your-site/api/email/run`
   It returns who *would* get which email. Nothing is sent or tagged.
2. Remove `EMAIL_DRY_RUN` and redeploy. Sign up on the site with your own email. The welcome email should arrive within about 10 seconds. Check it on your phone.
3. In Shopify admin → Customers → you, the tag `email:welcome` appears.
4. Click Unsubscribe in the email and confirm. Shopify should show you as Unsubscribed.
5. Watch the hourly runs in Netlify → Logs → Functions → `email-sequence`.

## What to watch
- **Resend dashboard:** delivered, bounced and complained. Keep complaints under 0.1%.
- **Shopify → Analytics → Sales by discount:** redemptions of `IRON10` (first orders) and `SECOND10` (returning customers).
- **Links:** every link carries `utm_campaign=sequence_<step>`, so Shopify and Google Analytics can show which email drove each sale.
