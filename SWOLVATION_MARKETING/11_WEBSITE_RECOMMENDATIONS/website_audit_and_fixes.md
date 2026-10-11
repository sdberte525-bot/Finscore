# Website conversion audit: swolvation.myshopify.com

**Audited 11 Oct 2026** on mobile (390×844, Playwright), plus page requests and a test cart. The cart was emptied; no order was placed.

**Nothing on the live store was changed.** Every fix below is a proposal. The theme lives in this repo (`shopify/theme`), so code changes can be made on a branch and pushed to an unpublished theme for your review first, which keeps them fully reversible.

## What's already strong
- **A premium, distinctive look** that matches the brand on every page. It's fast to grasp on mobile: "Built through adversity", the first-drop grid, "Front: quiet. Back: loud.", "Every piece carries a verse."
- **Clear prices** ($49.99 / $59.99). Size selection works. A sticky add-to-cart bar.
- **Real size charts** on product pages: garment measurements plus "fits chest".
- **An email capture form** that creates Shopify customers. That's the right base for the Shopify Messaging automations.
- **Honest copy:** no fake reviews, counters or scarcity.

## What's costing sales (found on the live store)
1. **Placeholder text is live on both product pages.** Shoppers see:
   - "Shipping times will be confirmed before launch."
   - "Return terms will be confirmed before launch."
   - "Fabric details will be listed here before launch."
   - "Care instructions will be listed here before launch."

   That reads as an unfinished or untrustworthy shop at the exact moment of decision.
2. **Every help page and policy returns 404:**
   - `/pages/size-guide`, `/pages/shipping`, `/pages/returns`, `/pages/faq`, `/pages/about`, `/pages/contact`
   - `/policies/refund-policy`, `/policies/shipping-policy`

   The footer links to all of them.
3. **The delivery time isn't stated anywhere.** It's about 10–14 days from China. FTC rules require a reasonable basis for any time you do state, and an unstated delay leads to chargebacks and angry DMs.
4. **The email popup offers no reason to sign up** ("Drop alerts and restocks only"). The 10% welcome offer isn't mentioned. On mobile it covers the product page within seconds.
5. **Product data:**
   - Handles are `template1` / `template2`.
   - Product type is blank, which weakens the Short sleeves / Long sleeves filters and the size-chart logic.
   - The "heavyweight drape" wording in the tee's Fit text is an unverified fabric claim.
6. **"Hover to zoom, click to enlarge" appears on phones,** where there's no hover.
7. **No custom domain.** The `.myshopify.com` address in your bio and at checkout looks less trustworthy. Without your own domain, emails can't be sent from your own authenticated address.

## The 10 highest-impact improvements (in order)

| # | Fix | Why it gets sales | Effort | Cost |
| --- | --- | --- | --- | --- |
| 1 | **Replace every "before launch" placeholder** with real shipping, returns, material and care text. Copy below; material and care need your PODpartner product specs | Removes the biggest hesitation point at add-to-cart | 20 min in Theme settings / product metafields | $0 |
| 2 | **Create the 6 pages and 4 policies** so no footer link 404s. Pages: Online Store → Pages (templates already exist). Policies: Settings → Policies | Broken help links are the fastest way to look like a scam store | 30 min | $0 |
| 3 | **State the timeline honestly next to add-to-cart:** "Printed to order · usually delivered in 10–14 days (US)". Confirm the exact figure with your sample order | Sets expectations, cuts "where's my order" refunds, stays FTC-compliant | Theme setting + 1 line | $0 |
| 4 | **Make the email offer real and visible:** "Get 10% off your first order" in the popup and footer. Popup on mobile after about 25s or 50% scroll, never over the first product view | An incentive is the main lever on signup rate. A list is the only audience you own | Theme settings (I can prepare) | $0 |
| 5 | **Connect a custom domain** (e.g. swolvation.com, if available) and set it as primary. Then authenticate it in Shopify Messaging | Trust in bio and at checkout; better email deliverability | 15 min | ~$12–20/yr |
| 6 | **Product data:** handles → `be-strong-courageous-tee` and `through-christ-long-sleeve` (Shopify offers to create redirects; tick it). Product types "Tee" and "Long sleeve". SEO titles with search terms, e.g. "Joshua 1:9 Oversized Gym Tee – Be Strong & Courageous" | Search, filters, and cleaner links to share | 10 min | $0 |
| 7 | **Real photos once your sample arrives:** front, back, close-up of the real ink, a real flat lay, and a size reference (on a hanger next to a tape measure) | Shows buyers the actual product. Removes the "is it really like the render?" doubt | 1 hour with the light kit | $0 |
| 8 | **Trust strip under add-to-cart:** secure checkout, payment icons (Shop Pay, Apple Pay, cards), "Questions? swolvation@gmail.com, we answer within 24h", and a one-line returns summary. **No fake reviews.** Add a free reviews app (e.g. Judge.me's free plan) only to collect *real* post-purchase reviews | Reduces checkout anxiety without inventing proof | 30 min | $0 |
| 9 | **Free shipping threshold at $100,** so tee + long sleeve ($109.98) qualifies. Show it in the cart ("You're $X from free shipping") | The cleanest legitimate way to raise order value, which improves every margin number | Shipping setting + theme line | Costs one shipping fee on bundle orders |
| 10 | **Tracking before traffic:** UTM-tag every bio and post link (see `12_ANALYTICS_AND_TRACKING`). Connect the Meta and TikTok sales channels for pixels (free) before any ads. Fix "Hover to zoom" → "Tap to zoom" on touch devices. Check speed in PageSpeed Insights (the API quota was exhausted during this audit, so it's untested) and compress the homepage hero video if mobile LCP is above 2.5s | You can't improve what you can't attribute | 1 hour | $0 |

## Paste-ready copy

**Before publishing, check every [VERIFY] item against PODpartner and your sample order.**

### Product page: Shipping and returns (Theme settings → Shipping and returns)
> **Printed to order for you.** Each piece is printed after you order, so it ships in [VERIFY: 2–5] business days and usually arrives in **10–14 days** in the US. [VERIFY with your sample.] You'll get tracking by email when it ships.
>
> **Something wrong with your order?** If it arrives misprinted, damaged or in the wrong size, email swolvation@gmail.com within 14 days of delivery with a photo. We'll send a replacement or refund you. You won't need to send it back.
>
> **Size exchanges:** because each shirt is printed to order, we can't take returns for fit or change of mind. Check the size guide, or email us before ordering and we'll help you choose.

**Note:** that returns stance is common for print-on-demand. A more generous option is to offer one size exchange per order at your cost (about $25–35 each). Decide based on margin. Whatever you choose, the policy page must say exactly that.

### Product page: Material (metafield `custom.material`)
- **Tee:** [VERIFY from the PODpartner product spec: fibre content, e.g. "100% cotton"; fabric weight only if PODpartner states it]. Boxy fit with dropped shoulders. Back printed with large-format DTG.
- **Long sleeve:** [VERIFY: fibre content]. Slim fit. Printed front, back and both sleeves.

### Product page: Care (metafield `custom.care`)
> Wash cold, inside out · Gentle cycle · Hang dry or tumble dry low · Don't iron on the print · No bleach

These are standard DTG care instructions; adjust them if PODpartner's differ.

### Fit text (tee): remove the unverified claim
> Boxy and relaxed, with dropped shoulders. Take your usual size for the boxy fit, or size up for an oversized look.

This drops "heavyweight drape".

### Email popup (Theme settings → Email popup)
- **Heading:** Get 10% off your first order
- **Body:** Join the list for 10% off, plus first word on new verses and drops. No spam.
- **Button:** Get 10% off
- **Fine print:** One code per subscriber. Unsubscribe anytime.
- **Success message:** You're in. Check your inbox for your code.

The code is delivered by the welcome email, so it only reaches real subscribers.

### FAQ page (6 entries)
1. **How long does delivery take?** Each piece is printed to order. Most US orders arrive in 10–14 days, and you'll get tracking when it ships. [VERIFY]
2. **How does the sizing run?** The tee is boxy and relaxed: take your usual size, or size up for oversized. The long sleeve is slim: size up for a relaxed fit. Full measurements are in the size guide.
3. **What if my order arrives damaged or misprinted?** Email us a photo within 14 days of delivery and we'll replace it or refund you. No return needed.
4. **Can I return it if it doesn't fit?** Every shirt is printed for you, so we can't accept returns for fit. Email us before you order and we'll help you pick a size.
5. **Do you ship outside the US?** [VERIFY your shipping zones.]
6. **What does SWOLVATION mean?** Swole + salvation. Strength built through discipline, with faith underneath it. Every piece carries a verse.

### About page (short; supports anonymity)
> **No founder. No face. Only the Name.**
> SWOLVATION is a gym label for people who train with something bigger than themselves in mind. We make dark, old-school pieces built around scripture: quiet on the front, the verse on the back. There's no personality to follow here, just the work and the Word. *"Take heed that ye do not your alms before men, to be seen of them." (Matthew 6:1, KJV)*

### Email signup and CAN-SPAM
Shopify Messaging requires a physical mailing address in every marketing email. **To stay anonymous, use a USPS PO box or a private mailbox (about $5–25/month), not your home address.**

## What I can do next, once you approve
- Prepare the theme changes listed below on an **unpublished copy** of your live theme so you can preview them, then publish yourself:
  - popup copy and timing;
  - tap-to-zoom label on mobile;
  - delivery line by add-to-cart;
  - free-shipping progress bar.
- You'd make the store-admin items yourself in Shopify admin: pages, policies, domain, discount code, shipping rates and product handles. These steps aren't available through theme access.
