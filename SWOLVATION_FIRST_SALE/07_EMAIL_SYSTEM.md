# Phase 7: Email capture system

**Status, 11 Oct 2026:**
- **Signup capture works and is live.**
- **The 10% offer is not live yet.** It needs a discount and an automation that only you can create in Shopify admin. My access covers the theme only.
- Nothing has been sent. No discount has been created.

## 1. What's already working (verified)

| Check | Result | How it was checked |
|---|---|---|
| Popup form | ✅ Opens after 30s on the homepage and collection pages. On product pages it opens only after 30s (no longer when scrolling). Shown once; after "No thanks" it stays hidden for 14 days. | Headless iPhone 13, live theme, 11 Oct |
| Footer form | ✅ On every page | Same |
| Where emails go | ✅ Both forms post to Shopify's native customer form (`form_type=customer`) and tag the customer `newsletter` plus `source:popup` or `source:footer`. Shopify Messaging welcome automations need this native form to trigger. | Form markup inspected |
| Consent wording | ✅ "Drop alerts and restocks only. Unsubscribe anytime." appears under every form. Only the person typing their email can subscribe. Nothing is pre-filled. | Visual check |
| Checkout signup | ⚠️ The checkbox "Email me with news and offers" is **pre-ticked**. That's acceptable for US-only customers. If you ever ship to Canada, the EU or the UK, untick it: Settings → Checkout → Marketing options. | Checkout screenshot |
| Real submit test | Not done. A submit creates a real customer record in your store. Do it yourself with your own email (step 4 of the test plan). | n/a |
| Mobile | ✅ Popup fits a 390px screen with a full-width input and a 48px button. "No thanks" is visible without scrolling. | Screenshot |

## 2. Setup (about 15 minutes in Shopify admin), in this order

### Step 1: Welcome discount
Go to **Discounts → Create discount → Amount off products.**
- **Code:** `IRON10`
- **Value:** 10% off all products.
- **Eligibility:** customer segment **Email subscribers** ("Specific customer segments" → *Email subscribers*). A code leaked to a coupon site then won't work for non-subscribers.
- **Limits:**
  - ✅ Limit to one use per customer.
  - Leave "total number of uses" empty.
- **Combinations:** ✅ **Shipping discounts.** Leave product discounts and order discounts **off**.
- **Dates:** start today, **no end date**. There's no fake urgency. If you ever add an expiry, say so truthfully in the emails.

*Alternative:* the Shopify Messaging "Welcome new subscribers with a discount" template can generate the discount for you. If you use it, apply the same settings on the discount it creates.

### Step 2: Free shipping at $69+
Go to **Discounts → Create discount → Free shipping → Automatic discount.**
- **Title:** "Free US shipping on $69+"
- **Countries:** United States.
- ✅ **Exclude shipping rates over $10.** This keeps express (if you keep it) paid.
- **Minimum purchase amount:** $69.00.
- **Combinations:** ✅ **Product discounts.** This lets IRON10 work alongside it.

Shopify checks the minimum against the cart subtotal. Test one two-tee order with IRON10 (test step 8) to see whether the code drops the order below $69 in your store's setup.

### Step 3: Welcome automation
Go to **Marketing → Automations → Create automation → "Welcome new subscribers with a discount"** (Shopify Messaging).
1. **Email 1:** paste Email 1 below and point the discount block at IRON10.
2. **Wait 2 days → condition "Customer has not placed an order" → Email 2.**
3. **Wait 2 more days → same condition → Email 3.**
4. Set the sender name to **SWOLVATION**. Fill in the footer's physical address. A PO box or private mailbox keeps you anonymous and satisfies CAN-SPAM.
5. **Turn it on only after the test plan passes.**

### Step 4: Abandoned checkout (free, doesn't count toward the 10K monthly emails)
Go to **Marketing → Automations → "Recover abandoned checkout."**
- Send after 1 hour (Shopify's default is fine).
- Copy: "Your [product] is still in your cart. Printed to order once you check out. Questions? Reply to this email." **No discount** in the first reminder. Don't train people to abandon checkout.

### Step 5: Update the popup copy (Online Store → Customize → Theme settings → Email popup, no code)
Do this **only after steps 1 and 3 are live**:
- **Heading:** `10% off your first order.`
- **Text:** `New pieces and restocks by email. Nothing else. Your code arrives in the first email.`

The footer signup heading lives in the Footer section settings. Set it to `10% off your first order`.

## 3. Test plan (do it once on your phone; about 10 minutes)

| # | Do this | Expected | ✓ |
|---|---|---|---|
| 1 | Open the store in a private window and wait 30s on the homepage | Popup shows the 10% copy | |
| 2 | Tap "No thanks" and reload | Popup stays hidden | |
| 3 | Open a product page and scroll for 20s | No popup interrupts you | |
| 4 | In a new private window, enter **your own** email in the popup | "You're on the list." message appears | |
| 5 | Admin → Customers | You appear, subscribed to email, tagged `newsletter, source:popup` | |
| 6 | Your inbox (check spam) | Email 1 arrives within ~5 min with IRON10 | |
| 7 | Add 1 tee → checkout → enter IRON10 | $34.99 → $31.49; shipping $8.00 | |
| 8 | Add 2 tees → checkout → IRON10 | 10% off, and free shipping if the order still qualifies. Note the result. | |
| 9 | Try IRON10 again with a **different, non-subscribed email** | Code rejected (segment eligibility) | |
| 10 | Complete step 7 with your own card, then refund and cancel in admin | Full flow works. A refund returns the payment, but Shopify keeps the original processing fee (about $1.45). | |
| 11 | Unsubscribe from Email 1 | Admin shows "Unsubscribed" | |
| 12 | Check Email 1 on your phone | Images load, button is thumb-sized, code is readable | |

## 4. The three emails

*Facts only: printed to order, about 2–3 weeks to arrive. That's PODpartner's ~2-day production plus 7–12 business days standard shipping. Fix the shipping label first (`06_PRICING_ANALYSIS.md`). The emails make no fabric-weight claims, no fake scarcity and no fake reviews. Header images were already produced in `SWOLVATION_MARKETING/13_FINAL_ASSETS/email_headers/`.*

### Email 1: Welcome and discount (immediately)
- **Subject:** Your 10% is inside
- **A/B subject:** Welcome to SWOLVATION
- **Preview text:** Strong and courageous. Here's your code.
- **Image:** `email1_welcome.png`
- **Button:** Shop the collection → `https://swolvation.myshopify.com/collections/all?utm_source=shopify_email&utm_medium=email&utm_campaign=welcome&utm_content=e1_button`

> **Welcome to SWOLVATION.**
>
> Swole + salvation. Training as discipline, with faith underneath it.
>
> Dark, old-school gym pieces. A small mark on the front. Scripture across the back.
>
> Here's 10% off your first order:
>
> **IRON10**
>
> One honest note: every piece is printed for you after you order, so it takes about 2–3 weeks to arrive in the US. Free US shipping on orders of $69 or more.
>
> **[ Shop the collection ]**
>
> Be strong and courageous.
> SWOLVATION
>
> *Questions about sizing? Just reply to this email.*

### Email 2: The story (day 2, non-buyers only)
- **Subject:** Why the verse is on the back
- **A/B subject:** Quiet on the front. Loud on the back.
- **Preview text:** The idea behind every piece.
- **Image:** `email2_meaning.png`
- **Button:** See the verses → `/?utm_source=shopify_email&utm_medium=email&utm_campaign=welcome&utm_content=e2_button#story`. The About page doesn't exist yet, so this links to the homepage story section.

> Most gym clothes say something loud about the person wearing them.
>
> We wanted the opposite. A small cross on the chest. And across the back, where you can't see it but everyone behind you can, the words that carry you through the last rep.
>
> **Joshua 1:9.** *Be strong and courageous.* Written to a man about to walk into something bigger than him.
>
> **Philippians 4:13.** *I can do all things through Christ who strengthens me.* Written from a prison cell, not a podium.
>
> The skulls are on purpose too. Strength fades. The body doesn't last. What you build in it, and who you build it for, does.
>
> No founder to follow. No face on the brand. Just the work and the Word.
>
> **[ See the verses ]**
>
> Your code **IRON10** still works.
>
> SWOLVATION

### Email 3: Product showcase (day 4, non-buyers only)
- **Subject:** Two pieces. Two verses.
- **A/B subject:** Which verse are you carrying?
- **Preview text:** The tee and the long sleeve, up close.
- **Image:** two stacked product images (the tee back `ffc80151` flat lay; the long sleeve back `80f39842`)
- **Buttons:**
  - Shop the tee → `/products/template1?utm_source=shopify_email&utm_medium=email&utm_campaign=welcome&utm_content=e3_tee`
  - Shop the long sleeve → `/products/template2?…&utm_content=e3_ls`

> **The tee: "Be strong and courageous."**
> Boxy, relaxed fit in vintage black. A thorned cross and wordmark on the chest. On the back, a gothic cross between two skulls under an arch of Joshua 1:9. **$34.99**
>
> **[ Shop the tee ]**
>
> **The long sleeve: "Through Christ who strengthens me."**
> A closer fit in black, with cream graphics front, back and down both sleeves. A thorned cross and skull under an arch of Philippians 4:13. **$44.99**
>
> **[ Shop the long sleeve ]**
>
> **Sizing:** each product page has a measurement chart. Measure a shirt you already own, flat, pit to pit, and pick the closest. Not sure? Reply with your height and usual size and we'll help.
>
> **Both together:** $79.98, with free US shipping (orders $69+). IRON10 works too.
>
> SWOLVATION

## 5. What to measure (also in the dashboard)
- **Signup rate:** signups ÷ sessions. Aim for over 3%; act if it's under 1.5%.
- **Code usage:** IRON10 redemptions ÷ subscribers. Find it under Analytics → Reports → Sales by discount.
- **Email 1 click rate:** judge by clicks, not opens. Apple Mail inflates open rates.
