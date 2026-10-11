# Email marketing system

**Drafts only. Nothing has been sent or switched on.**

**Tool: Shopify Messaging** (formerly Shopify Email).
- **Cost:** 10,000 emails a month are free, then $1 per 1,000. Abandoned-checkout emails are free and don't count toward the limit.
- **Automations:** it has built-in welcome-series, abandoned-checkout, first-purchase upsell and winback automations.
- **Signup forms:** the theme's signup forms already use Shopify's native customer form, so new subscribers can trigger them. Third-party forms can't trigger the welcome automation.

## What I checked on your store
- The popup and footer forms subscribe people to email marketing as Shopify customers, tagged by source (`newsletter`, `source:popup` / `source:footer`).
- **The popup and footer don't currently mention 10% off.** Update them using the copy in `11_WEBSITE_RECOMMENDATIONS`.
- **I couldn't find the "existing sale."** No compare-at prices are set, and no automatic discount applied in a test cart. Tell me the code if there is one.
- I haven't changed any prices.

## Discount setup (do this in Shopify admin before switching anything on)
Go to **Discounts → Create discount → Amount off products.**
- **Code:** `IRON10`.
- **Value:** 10%. **Applies to:** all products.
- **Eligibility:** customer segment **"Email subscribers."** This means a code leaked to a coupon site won't work for non-subscribers.
- **Limit:** one use per customer.
- **Combinations:** shipping discounts only. **Not** other product or order discounts.
- **Sale interaction:** if you later add a compare-at sale price, Shopify applies `IRON10` on top of the sale price. If that hurts margin, limit `IRON10` to a non-sale collection.
- **No end date.** Don't invent urgency. If you ever add a real expiry, state it truthfully in emails 1 and 4.

## The sequence at a glance
| Email | Type | Trigger / timing | Audience |
| --- | --- | --- | --- |
| 1. Welcome to SWOLVATION | **Automated** (welcome series step 1) | Immediately when someone subscribes | All new subscribers |
| 2. The Meaning Behind SWOLVATION | **Automated** (step 2) | 2 days after email 1 | Subscribers who haven't purchased |
| 3. The Collection | **Automated** (step 3) | 4 days after email 1 | Subscribers who haven't purchased |
| 4. The Reminder | **Automated** (step 4) | 7 days after email 1 | Subscribers who **haven't purchased and haven't used IRON10** |
| 5. New Releases and Community | **Campaign** (sent manually, monthly) | When there's real news: a new design, or a community feature built from real customer posts shared with permission | All subscribers |

In the welcome-series automation editor, add the condition **"has not placed an order"** before steps 2–4. Check the condition names in your admin; they move occasionally.

**Every email:**
- Uses plain, short copy, one CTA and one image. The header images are already made (`13_FINAL_ASSETS/email_headers/`).
- Has a footer with the required **physical mailing address.** Use a PO box or private mailbox to stay anonymous. Shopify adds the unsubscribe link automatically.
- Sends from your **authenticated custom domain** once it's connected. Until then, Shopify sends on your behalf.

---

## Email 1: Welcome to SWOLVATION
- **Subject:** Your 10% is inside
- **Alt subject (test):** Welcome to SWOLVATION
- **Preview text:** Swole + salvation. Here's what that means, and your code.
- **Target audience:** everyone who just subscribed.
- **Trigger:** customer subscribes to email marketing (welcome series, immediately).
- **Design direction:**
  - Black background, bone text, Big Shoulders headline, Archivo body.
  - Header image `email1_welcome.png` (both shirts on a steel bar).
  - The code is shown large in a bordered box.
- **CTA:** Shop the first drop → /collections/all (with UTM tags, see below).

**Body:**
> **Welcome to SWOLVATION.**
>
> Swole + salvation. Strength built through discipline, with faith underneath it.
>
> We make dark, old-school gym pieces with a verse on every back. Quiet on the front. Scripture on the back. No hype, no fake drops, nobody to follow. Just the work and the Word.
>
> As promised, here's 10% off your first order:
>
> **IRON10**
>
> One thing you should know before you order: every piece is printed for you after you buy, so it takes about 10–14 days to reach you in the US. We'd rather tell you now than surprise you later.
>
> [ Shop the first drop ]
>
> Built in silence,
> SWOLVATION

---

## Email 2: The Meaning Behind SWOLVATION
- **Subject:** Why there's a verse on the back
- **Alt subject:** Faith. Discipline. Iron.
- **Preview text:** The idea the whole brand is built on.
- **Target audience:** subscribers who haven't purchased.
- **Trigger:** welcome series, 2 days after email 1.
- **Design direction:**
  - Header `email2_meaning.png` (B&W macro of the cross).
  - One pull quote in large type.
  - No product grid. This email is the story.
- **CTA:** Read the verses → /pages/about. Secondary text link: Shop.

**Body:**
> Most gym clothes say something loud about the person wearing them.
>
> Ours say something about why we train at all.
>
> **"Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest."** (Joshua 1:9, KJV)
>
> Discipline in the gym is a small, daily version of a bigger obedience: showing up when nobody is watching, carrying weight you didn't choose, getting a little stronger in secret.
>
> That's why the front of every piece stays quiet, just a small thorned cross, and the verse goes on the back. You don't wear it to be seen. You wear it to remember.
>
> Faith. Discipline. Iron. In that order.
>
> [ Read the verses behind each piece ]
>
> SWOLVATION

---

## Email 3: The Collection
- **Subject:** Two pieces. Two verses.
- **Alt subject:** The first drop, up close
- **Preview text:** The tee, the long sleeve, and the details you'd miss in a photo.
- **Target audience:** subscribers who haven't purchased.
- **Trigger:** welcome series, 4 days after email 1.
- **Design direction:**
  - Header `email3_collection.png` (both pieces on off-white).
  - Then two blocks: image, name, three detail lines, price, button.
  - Add a small "size guide" text link under each.
- **CTA:** Shop the tee / Shop the long sleeve (one button each).

**Body:**
> **The first drop is two pieces. Each one carries a verse.**
>
> **Be Strong & Courageous Tee, $49.99**
> - "Be strong and courageous." arched in blackletter across the shoulders
> - A gothic cross wrapped in thorns, between two skulls, with Joshua 1:9 beneath
> - Boxy fit with dropped shoulders. Take your usual size, or size up for oversized.
>
> [ Shop the tee ]
>
> **Through Christ Long Sleeve, $59.99**
> - "I can do all things through Christ who strengthens me." framing a skull beneath a thorned cross
> - Thorn vines printed down both sleeves
> - Slim fit. Size up for relaxed.
>
> [ Shop the long sleeve ]
>
> Not sure about your size? Reply to this email with your height, weight and how you like a shirt to fit, and we'll tell you honestly.
>
> Your code IRON10 still takes 10% off.
>
> SWOLVATION

---

## Email 4: The Reminder
- **Subject:** Your 10% is still here
- **Alt subject:** Still thinking it over?
- **Preview text:** No countdown. Just a reminder.
- **Target audience:** subscribers who haven't purchased and haven't used IRON10.
- **Trigger:** welcome series, 7 days after email 1.
- **Design direction:**
  - Header `email4_reminder.png` (tee front).
  - Short and plain, almost a personal note.
  - One button.
- **CTA:** Use my 10% → `https://[your-domain]/discount/IRON10?redirect=/collections/all`
  - This is Shopify's shareable discount-link format. It applies the code automatically at checkout.
  - The customer-segment restriction still applies, so it only works for subscribers.

**Body:**
> No countdown timer, no "last chance." We don't do that.
>
> Just a reminder that your 10% code is still waiting if you want it:
>
> **IRON10**
>
> If something's holding you back (sizing, delivery time, how the print looks in person), hit reply and ask. A real person reads every email.
>
> [ Use my 10% ]
>
> SWOLVATION

**No invented scarcity:** don't add a deadline unless the code really expires. If it does, say the exact date.

---

## Email 5: New Releases and Community (campaign, not automated)
- **Subject (template):** Chapter II: [verse reference]
  - Use this only when a new design is real.
  - Community-only alternative: "What you lifted in this week."
- **Preview text:** First look for the list, before anywhere else.
- **Target audience:** all subscribers. Optionally segment buyers and non-buyers to vary the opening line.
- **Trigger:** manual campaign, about monthly, only when there's something real to say.
- **Design direction:**
  - Header: the new design's best image, or a community image (real customer photos, shared with permission).
  - A verse block.
  - A "lift of the month" text section.
- **CTA:** See it first / Vote on the next verse (link to an Instagram Story poll or a reply-to-vote).

**Body (template):**
> **For the list first.**
>
> [If there's a new design:] The next piece is built around [verse reference]: *"[verse text]."* Here's a first look before it goes anywhere else. [Image] [ See it first ]
>
> [Community section:] **From the floor this month.** [A real customer photo or quote, shared with written permission. Never invented.] Wearing yours? Reply with a photo and tell us whether we can share it.
>
> **Help choose the next verse.** Reply with the one that's carried you through a hard season. We read every one.
>
> Built in silence,
> SWOLVATION

---

## Other automations to switch on (free in Shopify)
1. **Abandoned checkout.** Turn it on in Marketing → Automations. Send it 10 hours after abandonment (Shopify's default); that timing suits a $50 considered purchase.
   - **Subject:** You left something behind
   - **Body:** "Your [product] is still in your cart. Printed to order, delivered in about 10–14 days. Questions about sizing? Just reply." Button: Return to checkout.
   - **No discount in the first email.** You'd be training people to abandon carts to get a code.
2. **Order confirmation edit** (Settings → Notifications → Order confirmation). Add: "Your piece is printed to order. Expect tracking in [2–5] business days and delivery in about 10–14 days [VERIFY]." This one line prevents most "where's my order?" emails.
3. **Post-purchase, 7 days after the order ships** (Flow or the Messaging automation):
   - **Subject:** How to keep the print sharp
   - **Body:** care instructions, how others style it (your own photos), and "Reply with a photo when it arrives. We'd love to see it."
4. **Review request, about 21 days after the order** (once a reviews app is installed):
   - Ask for an honest review.
   - **Never offer a reward in exchange for a positive review.**
   - Any incentive must apply to all reviews regardless of rating, and must be disclosed.
5. **First-purchase upsell, 30 days after the first order:** "The other half of the drop", showing the piece they didn't buy. Use only real offers, such as the free-shipping-over-$100 threshold if you adopt it.

## UTM tags for email links
Use `?utm_source=shopify_email&utm_medium=email&utm_campaign=welcome&utm_content=e1_button` and change `utm_content` per email and button. Shopify Messaging also reports its own attributed sales.

## Compliance checklist (CAN-SPAM)
- [ ] Accurate From name ("SWOLVATION") and an honest subject line.
- [ ] A physical postal address in the footer (a PO box is fine).
- [ ] A working unsubscribe link (Shopify adds it automatically). Honour opt-outs within 10 business days.
- [ ] Email only people who subscribed. **Never upload purchased lists.**
- [ ] Discount terms are honest. No fake deadlines.
