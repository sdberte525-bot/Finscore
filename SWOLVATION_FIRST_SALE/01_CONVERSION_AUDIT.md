# Phase 1 and 9: Conversion audit and funnel

**Audited:** 11 Oct 2026, swolvation.myshopify.com.

**Method:**
- A headless iPhone 13 browser on the live store.
- Public product JSON.
- A full theme backup and code read.
- A checkout walk-through with a sample address. No email was entered, nothing was paid, and no order was placed.
- PODpartner's public catalog and shipping pages.

**Access limits:** theme only. I have no Admin API and can't see analytics, orders, discounts or shipping settings.

## The 3 biggest reasons a visitor hesitates today

1. **"Is this real, and what happens after I pay?"**
   - There are no reviews and no About page.
   - There's no shipping or returns policy. Both were 404s and the product page said "will be confirmed before launch".
   - The founder is anonymous, and the address is a `.myshopify.com` domain.
   - A first-time buyer from TikTok has nothing to reassure them.
2. **"What does it really cost, and when will it arrive?"**
   - The $8 shipping charge first appears at checkout. Unexpected costs are the most-cited reason for abandoning checkout in Baymard Institute's research.
   - Checkout promises **3–5 business days**, but print-on-demand delivery is really about **9–14 business days**. That's a broken promise waiting to happen.
3. **"Will it fit, and is it any good?"**
   - There's no fabric or material information.
   - No one is shown wearing the shirts. That's the brand rule, so other content has to answer fit, through measurements and flat-lay size content.
   - Until recently the product page showed "Fabric details will be listed here before launch," which made the store look unfinished.

## Prioritized audit

**Legend:**
- ✅ fixed and verified live
- 🟡 ready for you, about 2–15 minutes in admin with paste-ready text below
- 🔴 needs your decision or approval

| # | Area | Finding | Severity | Status |
|---|---|---|---|---|
| 1 | Navigation | The announcement bar's **"SHOP NOW"** and the homepage hero button linked to `/collections/new-drop`, **which returned 404.** These are the first buttons a visitor taps. | Critical | ✅ They now go to the full collection, and switch to the new-drop collection automatically if you create one. |
| 2 | Navigation | The header menu, mobile menu, footer and collection page linked to **6 pages that don't exist:** About, FAQ, Shipping, Returns, Size guide and Terms. | High | ✅ Links only appear once the page exists. A crawl of every link on 5 key pages found 0 broken links. |
| 3 | Product page | "Shipping times / return terms / fabric details / care instructions will be confirmed **before launch**" was showing on a live store. | High | ✅ Empty rows are hidden. Shipping now says "Shipping options and costs are shown at checkout, before you pay." Returns says "Questions about sizing, an order or a return? Contact us." |
| 4 | Claims | The fit note said "heavyweight drape", but fabric weight is unverified. | Medium | ✅ Now reads "Boxy and relaxed." |
| 5 | Email popup | Pre-launch copy ("Be the first to know when the drop goes live") on a store that's already live. On mobile it opened on scroll and covered the product page mid-read. | High | ✅ Live-store copy ("Hear it first."). Opens after 30s and never on scroll on product pages. Still shown once, then hidden for 14 days. |
| 6 | Shipping promise | Checkout says Standard "3 to 5 business days" and Express "1 to 2 business days". PODpartner: about 2 days production, then 7–12 business days standard or 3–5 days express. | **Critical (legal and trust)** | 🔴 Rename the rates (06_PRICING_ANALYSIS §4) |
| 7 | Shipping cost | Express charges the customer $15 but costs you $27.88–29.30 | High | 🔴 Remove, or set to $29.99 |
| 8 | Policies | No refund, shipping or terms policy. Shopify's policy pages return 404. | High | 🟡 Drafts below. You choose the exchange rule. |
| 9 | Info pages | About, FAQ, Shipping, Returns and Size guide templates **already exist in the theme**, but the pages were never created | High | 🟡 Create 5 pages (steps below) |
| 10 | Price clarity | The $8 shipping isn't mentioned anywhere before checkout | High | 🟡 Fill in "Shipping rates" in theme settings (below) and add the free-shipping-at-$69 discount |
| 11 | Material facts | No fabric content or care information | Medium | 🟡 Copy the exact fabric and care details from PODpartner's product page into the product metafields `custom.material` / `custom.care`. Don't guess. |
| 12 | Email offer | Signup works, but there's no reason to sign up yet (no 10% offer) | Medium | 🟡 07_EMAIL_SYSTEM.md |
| 13 | Tracking | No Meta or TikTok pixel. Shopify's own analytics is running. | Medium | 🟡 Install the free **Facebook & Instagram** and **TikTok** sales channels. That adds pixels and lets you tag products in posts. Use UTM links. |
| 14 | Domain | `swolvation.myshopify.com` looks less trustworthy than a custom domain | Medium | 🔴 About $10–20 a year. Your call. |
| 15 | Checkout | Works. Card, Shop Pay (with installments), PayPal, Google Pay and Venmo. The discount-code field is visible. | ✅ Good | Verified |
| 16 | Mobile | Product page loads (`load` event) in about 0.7s on a fast connection. The gallery says "Tap to enlarge" on touch devices and "hover" on desktop. Cart is clear: "Shipping: Calculated at checkout." | ✅ Good | PageSpeed not measured; run pagespeed.web.dev once yourself |
| 17 | SEO/share | Meta descriptions and Open Graph images are present, and the sitemap is live. `product_type` is empty, so set it to "T-Shirt" / "Long Sleeve" for Google and Shop. | Low | 🟡 Optional, 1 minute |
| 18 | Checkout consent | The "Email me with news and offers" box is pre-ticked. That's fine for US-only customers. | Low | Note |

**Rollback:**
- A full backup of the live theme from before these changes is in the sandbox at `~/backup/live-20261011`.
- In git, the previous theme state is commit `2b00b6b`. The changes are commits `bfe905f` and `f89bbce`.
- The staging copy is the unpublished theme "Swolvation fixes staging 2026-10-11". You can delete it.

## 🟡 Paste-ready: make the info pages work (about 15 minutes)

### Step A: Theme settings
Go to **Online Store → Customize → ⚙ Theme settings → Shipping and returns.** These values appear on product pages, FAQ, Shipping and Returns automatically.

| Field | Paste this | Notes |
|---|---|---|
| Where you ship | `the United States` | Confirm. Checkout showed US addresses. |
| Processing time | `2–3 business days (each piece is printed to order)` | PODpartner turnaround is about 2.1–2.5 days |
| Delivery estimate | `7–12 business days after it ships, within the US` | PODpartner standard |
| Shipping rates | `$8 standard. Free US shipping on orders of $69 or more.` | Only once the free-shipping discount exists. Until then: `$8 standard, shown at checkout.` |
| Return window (days) | `30` | 🔴 Your decision |
| Return condition | `Misprinted, damaged or defective items, or the wrong item: send us a photo and we'll replace or refund it free.` | Matches how PODpartner handles reprints |
| Exchanges | **Option A** (lowest cost): `Because every piece is printed for you, we can't accept returns for size or change of mind. Check the size chart, or ask us before you order.` **Option B** (more reassuring, costs about $21–30 per exchange): `One free size exchange within 30 days of delivery. Unworn and unwashed.` | 🔴 Choose one |
| Refunds | `Refunds go back to your original payment method within 5–10 business days of approval.` | |

### Step B: Create the pages
Go to **Online Store → Pages → Add page.** For each page, set the template in the right-hand panel. Leave the content empty; the templates fill it.

| Title | Template | Handle (check under "Search engine listing") |
|---|---|---|
| About | `page.about` | `about` |
| FAQ | `page.faq` | `faq` |
| Shipping | `page.shipping` | `shipping` |
| Returns and exchanges | `page.returns` | `returns` |
| Size guide | `page.size-guide` | `size-guide` |

The menu and footer links come back on their own once each page exists.

### Step C: Store policies
Go to **Settings → Policies.**
- Use "Create from template" for **Refund**, **Shipping** and **Terms of service**.
- Then edit Refund and Shipping to match Step A exactly.
- Shopify's templates are generic. Check every sentence matches what you'll actually do.

### Step D: Product page "launch price and shipping" line (needs approval; I can add it to the theme)
Proposed text under the price:

> **Launch price.** $8 US shipping, free on 2+ pieces ($69+). Printed to order, arrives in about 2–3 weeks.

## Phase 9: Funnel (TikTok/Instagram → profile → site → product → cart → checkout)

| Step | What leaks today | Fix (honest, no fake proof) | Measure |
|---|---|---|---|
| **Video → profile** | New account, no history | Hook in the first second. 7–12s product-only cuts. Pin 3 posts: both shirts with price, the verse story, how sizing works. | Profile visits per 1K views |
| **Profile → website** | The bio doesn't say what, why or where | **Bio:** `Christian gym wear. Scripture on the back. Printed to order ↓`, plus one UTM link to `/collections/all`. Same name and avatar on both platforms. | Link clicks ÷ profile visits (target over 5%) |
| **Website → product page** | Homepage is long; video visitors want the shirt | Link bios and captions straight to `/collections/all`. For single-product posts, link the product page itself (TikTok link stickers aren't available to small accounts, so say "link in bio, the tee is the first one"). | Product page views ÷ sessions |
| **Product page → cart** | No reviews, no fabric facts, shipping cost and time unclear, fit uncertainty without models | ✅ Placeholders removed. 🟡 Policies, shipping line, fabric facts. Add a flat-lay "measured" image (ruler across pit-to-pit) as the last gallery image. Use "Ask us about sizing" (contact link). | Add-to-cart rate (target over 4%) |
| **Cart → checkout** | $8 shipping surprise | Free shipping at $69+. Show "Free shipping at $69" in the cart. *(Theme change, needs approval.)* | Checkouts ÷ carts |
| **Checkout → order** | Delivery promise; payment trust | Honest rate names. Shop Pay installments are already on. Abandoned-checkout email is free. | Orders ÷ checkouts (target over 40%) |

### Building trust with zero reviews (authentic only)
- **Show the process, not people:** the real print file next to the finished garment, a measurement flat lay, and a close-up of the print texture once you own a sample.
- **Order one sample of each shirt yourself (about $45–55 with shipping).** It's the single best trust investment: real macro footage, real fabric facts, real delivery time to quote. Every claim then becomes verifiable.
- **Be specific and plain:** "Printed to order in 2–3 days. Arrives in about 2–3 weeks (US)." Specific honesty reads as real.
- **Keep a visible contact route.** The contact page and "reply to any email" already work.
- **First customers:** after delivery, ask once, politely, for an honest photo and review. Never offer something in exchange for a positive review. A discount for *any* honest review is allowed only if disclosed; simpler not to.
- **Never:** fake reviews, "X people are viewing", invented stock counters, or "as seen in".

### Tracking checklist (so the first sale can be attributed)
- [ ] Every bio, caption and DM link uses a UTM (builder in `SWOLVATION_MARKETING/12_ANALYTICS_AND_TRACKING/swolvation_dashboard.xlsx`).
- [ ] Each creator gets their own code (for example `NAME10`) so you can attribute orders.
- [ ] Install the Facebook & Instagram and TikTok sales channels (free) for pixels.
- [ ] Shopify → Analytics → Reports: "Sessions by referrer", "Sessions by UTM campaign", "Sales by discount".
- [ ] Log each day in `08_first_sale_dashboard.xlsx`.
