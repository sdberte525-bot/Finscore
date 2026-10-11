# SWOLVATION: First Sale Growth Mission

*11 Oct 2026. Phase 10 final deliverable.*

**What I did not do:** nothing was posted, sent or paid for, and no prices, discounts, shipping rates or store policies were changed. Website fixes are limited to the theme. They're low-risk, verified live, and reversible.

## Executive summary
- **The store can take a sale today.**
  - Product → cart → checkout works on mobile.
  - Card, Shop Pay with installments, PayPal, Google Pay and Venmo are all available.
  - Email signup works and feeds Shopify's native customer list.
- **What stands between a visitor and a first order is trust and clarity, not price.**
- **Four problems were found that can't be fixed from the theme:**
  1. 🔴 **Checkout promises delivery that print-on-demand can't meet.**
     - "Standard: 3–5 business days" is really about 9–14 business days: about 2 days printing plus PODpartner's published 7–12 business days in transit.
     - "Express: 1–2 business days" is impossible.
  2. 🔴 **Express shipping loses money.** You charge $15, and PODpartner charges $27.88–29.30.
  3. 🟠 **No shipping, returns or terms policy.** The info pages were never created, even though the theme already has templates for them.
  4. 🟠 **The $8 shipping charge first appears at checkout.**
- **Unit economics are healthy at the current prices.**
  - Contribution per order before marketing, with $8 shipping: tee about $14–19, long sleeve about $20–28.
  - Garment cost is an estimate until you check one PODpartner invoice.
  - An extra 10% welcome discount is affordable, as long as it isn't stacked with free shipping on a single tee.
- **Recommendation:**
  - Keep $34.99 / $44.99 and call it the **launch price**.
  - Add a **10% email welcome code (IRON10)** and **free US shipping on orders of $69+**, which is two pieces.
  - Don't cut prices further, and don't show a "was $49.99" price.
- **Content is ready to post:**
  - 5 campaign packages, each with 3 hook variants (15 videos), 5 Reel covers, and captions for Instagram and TikTok.
  - 30 ranked concepts.
  - A 7-day sprint.
  - 20 vetted creators, 7 of whom publish a business email, with personalized drafts.
- **Credits:** 0 Higgsfield credits were used in this mission.

## Why visitors hesitate (top 3)
1. **"Is this real, and what if something goes wrong?"** No reviews, no About page, no returns or shipping policy, an anonymous brand, and a `.myshopify.com` address.
2. **"What will it really cost, and when will it arrive?"** Shipping cost is hidden until checkout, and the delivery promise is wrong.
3. **"Will it fit, and is it good?"** No fabric facts, and no on-body reference (that's by design). Measurement and size content has to carry it.

## The 3 actions that matter most, in order
| # | Action | Who | Time |
|---|---|---|---|
| 1 | **Make checkout honest:** rename the shipping rates to real delivery times, and remove express or set it to $29.99 | You, in Shopify admin → Settings → Shipping (`06_PRICING_ANALYSIS.md` §4) | 10 min |
| 2 | **Give buyers something to trust:** create the 5 info pages and 3 policies (paste-ready text), IRON10, free shipping at $69+, and the welcome email | You, in admin. Everything is drafted (`01_CONVERSION_AUDIT.md`, `07_EMAIL_SYSTEM.md`) | 30–45 min |
| 3 | **Get eyes on it daily for 7 days:** post the 5 packages with hook tests (Instagram Trial Reels), engage genuinely, and send the 7 approved creator emails | You post and send. Everything is ready (`04`, `05`) | 45–60 min a day |

## Approvals I need from you
- [ ] **Shipping rate labels and the express change.** This is a store setting; you make it.
- [ ] **Return and exchange rule:** Option A (defects and misprints only) or B (one free size exchange). See `01_CONVERSION_AUDIT.md`.
- [ ] **Create IRON10 (10%, subscribers only) and free shipping at $69+.**
- [ ] **Product-page line:** "Launch price. $8 US shipping, free on 2+ pieces ($69+). Printed to order, arrives in about 2–3 weeks." I'll add it to the theme once you approve and the discount exists.
- [ ] **Popup copy:** "10% off your first order." Only once IRON10 and the automation are live.
- [ ] **Outreach:** which of the 7 email drafts and 5 DM targets to send.
- [ ] **Gifting budget:** about $125–165 for 5 shirts, through PODpartner orders.
- [ ] **Optional:** order one sample of each shirt yourself (about $45–55). That gives real macro footage, real fabric facts and a real delivery time.
- [ ] **Optional:** a custom domain (about $10–20 a year).

## Website improvements completed (live on theme "Swolvation", id 189136994503)
| Fix | Verified how | Result |
|---|---|---|
| "SHOP NOW" in the announcement bar and the hero button pointed to a 404 (`/collections/new-drop`) | Mobile browser on the live site, plus a link crawl | Both now go to `/collections/all` |
| 6 menu and footer links went to missing pages (About, FAQ, Shipping, Returns, Size guide, Terms) | Crawled every internal link on 5 key pages | **0 broken links** out of 10. Links reappear automatically once you create the pages. |
| "…will be confirmed **before launch**" placeholders on product pages | Searched the live HTML on 5 pages | **0 placeholders**. Shipping and returns now show checkout facts and a contact link. Empty material and care rows are hidden. |
| Unverified "heavyweight drape" claim | Read the live fit text | Now reads "Boxy and relaxed…" |
| Pre-launch popup copy; popup interrupted product-page scrolling on mobile | Timed test on the live site | "Hear it first." Opens after 30s, not at 20s. No popup after scrolling a product page for 12s. |
| Pre-launch footer signup heading | Read the live footer | "Hear it first" |

**How it was done:**
- Live theme backed up first.
- Changes staged on an unpublished theme and verified there.
- Then only the 13 changed files were pushed to the live theme.
- Shopify's theme check reported no issues.

**Rollback:**
- Git: the previous state is commit `2b00b6b`; the changes are `bfe905f` and `f89bbce`.
- A full live-theme backup is in the sandbox at `~/backup/live-20261011`.

## Measurable first-sale plan
**Week-1 goals (not guarantees):** 100 followers, 500 site visits, 10 subscribers, 1 sale. Track them daily in `08_first_sale_dashboard.xlsx`.

**What the numbers imply.** These are planning assumptions to check against your real data:
- New Shopify stores often convert **about 0.5–1.5%** of sessions. At that rate, **1 order takes roughly 70–200 sessions**, so 500 visits gives several chances at a first sale. *This is an assumption, not data from your store.*
- Most visits will come from **profile → link** taps.
  - At about 2–5% of profile visitors clicking the link, 500 visits needs roughly **10K–25K profile visits**.
  - That realistically means **several videos breaking out**, or creators sharing you.
  - Buffer's data shows a median of about **500 views per post**. Expect week 1 to fall short on visits unless a video pops or a creator posts. The plan accounts for that:
    - post daily;
    - test hooks for free with Trial Reels;
    - 7 creator emails and 5 DMs;
    - church and campus groups.
- **Decision rules** (in the dashboard) say what to change based on where the funnel leaks:
  - views → profile;
  - profile → link;
  - product → cart;
  - cart → order.

**Attribution:**
- UTM links on every bio and caption link.
- A personal code per creator.
- Shopify reports: "Sessions by referrer", "Sessions by UTM", "Sales by discount".

## What's in this folder
| File | Phase |
|---|---|
| `01_CONVERSION_AUDIT.md` | 1, 9: audit, hesitation reasons, fixes, paste-ready pages and policies, funnel, trust-building with no reviews |
| `02_TREND_RESEARCH.md` | 2: dated sources, each item labeled CONFIRMED or HYPOTHESIS |
| `03_30_CONTENT_IDEAS.md` | 3: 30 ranked concepts, 13 fields each |
| `04_CAMPAIGN_PACKAGES/README.md` | 4: 5 packages, 15 videos, 5 covers, captions, hook test plan, download links |
| `05_7_DAY_SPRINT_AND_OUTREACH.md`, `05_outreach_tracker.csv` | 5: daily plan, 20 creators, drafts (not sent) |
| `06_PRICING_ANALYSIS.md` | 6: unit economics, 3 strategies, the extra-10% question, free shipping vs % |
| `07_EMAIL_SYSTEM.md` | 7: verified capture, admin setup, 12-step test, 3 emails |
| `08_first_sale_dashboard.xlsx` | 8: daily tracker, sprint goals, metric sources (unavailable data marked), decision rules, unit economics |
