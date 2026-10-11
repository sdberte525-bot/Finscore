# Phase 6: Pricing analysis

*Checked 11 Oct 2026. Nothing on this page has been changed in the store. Every price, discount and shipping change below needs your approval.*

## 1. What the store charges today (verified at checkout, 11 Oct 2026)

| | Tee | Long sleeve |
|---|---|---|
| Product price | **$34.99** | **$44.99** |
| Compare-at ("was") price | none | none |
| Standard shipping at checkout | $8.00, labeled "3 to 5 business days" | same |
| Express shipping at checkout | $15.00, labeled "1 to 2 business days" | same |
| Discount codes | Field shown at checkout. No automatic discount is active. | same |
| Payment options | Card, Shop Pay (with installments), PayPal, Google Pay, Venmo | same |

**Method:** a headless mobile browser added size M to the cart and entered a sample Austin, TX address. It used no email, and no payment or order was made.

## 2. What it costs you (PODpartner, public pages, 11 Oct 2026)

| Cost | Tee | Long sleeve | Status |
|---|---|---|---|
| Garment and print | **$16–21 (estimate)** | **$16–24 (estimate)** | **Unconfirmed.** See below. |
| US standard shipping, first item | $4.96 | $5.78 | Confirmed: podpartner.com/shipping |
| US standard shipping, additional item | $2.44 | $3.26 | Confirmed |
| US standard shipping time | **7–12 business days** | 7–12 business days | Confirmed |
| US express shipping, first item | **$27.88** | **$29.30** | Confirmed |
| US express shipping time | **3–5 business days** | 3–5 business days | Confirmed |
| Production | "98% of orders fulfilled in 48 hours"; catalog turnaround is about 2.1–2.5 business days | same | Confirmed |
| Payment processing | 2.9% + $0.30 (Shopify Payments, Basic plan, US card) | same | Assumption. PayPal costs more. |
| Misprint/loss reserve | $1.00 per order | same | Planning allowance |

**Why garment cost is a range:** PodPartner's catalog lists base prices for its blanks:
- The **100% cotton 280GSM Unisex Boxy T-shirt starts at $13.23** (XS–2XL, matching your tee's size range).
- The **210GSM Classic Crew Neck Long Sleeve starts at $8.74** (XS–3XL, matching your long sleeve's sizes).

Your designs print in more places than one: the tee has a chest and back print, and the long sleeve has front, back and both sleeves. Each extra placement adds cost, and I couldn't see those add-ons without logging in. I also can't confirm that these are the exact blanks used.

**Do this (2 minutes):** open PODpartner → each product → the cost breakdown, or your first order's invoice. Enter the per-unit cost in the dashboard's yellow cells (`08_first_sale_dashboard.xlsx` → Unit economics). Every number below then updates.

## 3. Contribution per order (before ad spend)

*Contribution = what the customer pays − payment fee − PODpartner garment and print − PODpartner shipping − $1 reserve. Sales tax passes through and is excluded. The left figure assumes costs at the high end, the right figure the low end.*

### Tee at $34.99

| Scenario | Customer pays | Payment fee | Garment and print | POD shipping | Contribution (high cost → low cost) |
|---|---|---|---|---|---|
| Full price, $8 standard shipping | $42.99 | $1.55 | $16–21 | $4.96 | **$14.48 → $19.48** |
| 10% welcome code, $8 shipping | $39.49 | $1.45 | $16–21 | $4.96 | **$11.09 → $16.09** |
| 15% off, $8 shipping | $37.74 | $1.39 | $16–21 | $4.96 | **$9.39 → $14.39** |
| Free shipping, no code | $34.99 | $1.31 | $16–21 | $4.96 | **$6.72 → $11.72** |
| 10% code **and** free shipping | $31.49 | $1.21 | $16–21 | $4.96 | **$3.32 → $8.32** |
| Express as configured today | $49.99 | $1.75 | $16–21 | **$27.88** | **−$1.64 → $3.36** |

### Long sleeve at $44.99

| Scenario | Customer pays | Payment fee | Garment and print | POD shipping | Contribution (high cost → low cost) |
|---|---|---|---|---|---|
| Full price, $8 standard shipping | $52.99 | $1.84 | $16–24 | $5.78 | **$20.37 → $28.37** |
| 10% welcome code, $8 shipping | $48.49 | $1.71 | $16–24 | $5.78 | **$16.00 → $24.00** |
| 15% off, $8 shipping | $46.24 | $1.64 | $16–24 | $5.78 | **$13.82 → $21.82** |
| Free shipping, no code | $44.99 | $1.60 | $16–24 | $5.78 | **$12.61 → $20.61** |
| 10% code **and** free shipping | $40.49 | $1.47 | $16–24 | $5.78 | **$8.24 → $16.24** |
| Express as configured today | $59.99 | $2.04 | $16–24 | **$29.30** | **$3.65 → $11.65** |

### Two-piece order (tee and long sleeve, $79.98)

| Scenario | Customer pays | Contribution (high cost → low cost) |
|---|---|---|
| Free shipping | $79.98 | **$23.14 → $36.14** |
| Free shipping and 10% code | $71.98 | **$15.37 → $28.37** |

The second item only adds $2.44–3.26 of PODpartner shipping, so two-piece orders are where free shipping pays for itself.

*Recalculate with `scratchpad/econ.py`, or use the dashboard.*

## 4. Problems found (fix these before promoting anything)

1. 🔴 **The delivery promise at checkout is wrong.**
   - The "Standard: 3 to 5 business days" label leaves out production. Real delivery is about 2 days of production plus **7–12 business days** transit, so **about 9–14 business days.**
   - "Express: 1 to 2 business days" is impossible: about 2 days of production plus 3–5 days transit.
   - The FTC's Mail Order Rule requires a reasonable basis for any shipping time you state. Missed promises also cause chargebacks, "where's my order" emails and bad first reviews.
   - **Fix (Shopify admin → Settings → Shipping and delivery → General → Rates):** rename the rates. Suggested names:
     - "Standard: printed to order, arrives in about 2–3 weeks"
     - "Express: printed to order, arrives in about 1–1.5 weeks"
2. 🔴 **Express loses money.**
   - Customers pay $15. PODpartner charges you $27.88 for a tee and $29.30 for a long sleeve.
   - A tee ordered with express makes between −$1.64 and +$3.36.
   - **Fix:** either remove express, or set it to **$29.99** with the honest label above. I recommend removing it until you have orders. One option is easier to understand.
3. 🟠 **Shipping is a surprise.**
   - Nothing before checkout mentions $8.
   - Unexpected extra costs are consistently the most-cited reason people abandon checkout (Baymard Institute's checkout research).
   - **Fix:** show the shipping price on the product page (paste-ready text in `01_CONVERSION_AUDIT.md`), and/or the free-shipping threshold below.
4. 🟠 **There's no visible "sale".**
   - The prices dropped from $49.99/$59.99 to $34.99/$44.99, but there's no compare-at price, so visitors never see a sale.
   - **Don't add a "was $49.99" price unless the products really sold, or were openly offered in good faith, at $49.99 for a meaningful period.** FTC guidance (16 CFR 233.1) treats inflated "former prices" as deceptive. The store only just launched.
   - The honest framing is **"Launch price"**. If you later return to $49.99, you can say so truthfully then.

## 5. Three strategies compared

| | A. Keep prices; raise perceived value | B. Temporary price cut (for example $29.99 / $39.99) | C. Better first-purchase offer |
|---|---|---|---|
| What it is | Keep $34.99/$44.99. Fix trust gaps (honest shipping, returns policy, fabric facts, detail videos, size help). Call it the launch price. | Lower prices for 1–2 weeks | 10% welcome code for email subscribers, plus free US shipping on 2+ pieces |
| Tee contribution | $14.48–19.48 | about $9.70–14.70 at $29.99 | $11.09–16.09 with the code |
| Evidence it fixes the real problem | High. The audit found the store's biggest gaps are trust and clarity, not price. | Low. With near-zero traffic, there isn't enough data to show price is the barrier, and a cut is hard to reverse without looking like a fake sale. | Medium–high. Gives a reason to sign up now, and builds the list you own. |
| Risk | Low | Teaches people to wait for discounts. Weakens the premium dark-streetwear position. Ad budget can't stretch as far. | Low if one use per customer and no stacking |
| Reversible | Yes | Awkward | Yes (expire the code) |

### Recommendation: A + C, and not B
- Keep **$34.99 / $44.99** and call it the launch price.
- **Welcome code: 10% off the first order** for people who sign up by email. One use per customer. Product discount only.
- **Free US standard shipping on orders of $69+.** That's two pieces: tee + tee = $69.98, tee + long sleeve = $79.98.
- **Remove express**, or reprice it to $29.99 with an honest label.
- Revisit price only after **~500 product-page sessions.** Decision rules are in the dashboard: if add-to-cart rate is above 4% but checkout completion is under 25%, price/shipping is the barrier. If add-to-cart is under 2%, it's trust or the product page.

## 6. Can we afford an extra 10% on top of the current price?
**Yes, if it stays a product-only discount with $8 shipping.**
- The tee still contributes **$11.09–16.09** and the long sleeve **$16.00–24.00** before marketing.
- **Don't stack it with free shipping on a single tee.** That leaves only $3.32–8.32, and one return or remake wipes it out.
- The settings in `07_EMAIL_SYSTEM.md` therefore let the 10% code combine with free shipping only when the order reaches the $69 threshold, which is a two-piece order where contribution stays $15+.

## 7. Free shipping vs percentage discount

| | 10% off | Free shipping on everything | Free shipping at $69+ |
|---|---|---|---|
| Cost on a tee order | $3.50 | $8.00 (you lose the $8 the customer would have paid) | $0 on one tee. On a two-piece order, it costs the $8 but earns a second item's ~$10–20. |
| Persuasion | Good for "sign up now" | Strong. Removes checkout surprise. | Strong, and nudges a second piece |
| Verdict | Use as the **email welcome** | Too expensive on a $34.99 tee | **Use as the always-on site offer** |

## 8. Break-even acquisition cost
Break-even acquisition cost is the most you can spend to get one order and still not lose money. Here it equals the contribution:
- **about $11–16** for a tee bought with the 10% code;
- **about $16–24** for a long sleeve bought with the code.

If a paid test costs more than **$15 per order**, stop it, or move the money to creator gifting. `10_ADVERTISING_BUDGETS` in the marketing folder uses old prices; use these numbers instead.

## Needs your approval
- [ ] Rename the shipping rates to honest delivery times *(store setting)*
- [ ] Remove express shipping, or set it to $29.99 *(store setting)*
- [ ] Create a welcome discount: 10% off, one use per customer, email subscribers only *(Discounts)*
- [ ] Create free US standard shipping on orders of $69+ *(Discounts → Free shipping)*
- [ ] Show the "Launch price" and shipping line on product pages *(theme text; I can do this once approved)*
