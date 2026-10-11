# Measurement system

**Files:**
- `swolvation_dashboard.xlsx`, with four tabs:
  - **Weekly KPIs:** ratios calculate automatically.
  - **Content log:** per-post performance.
  - **Unit economics:** your break-even customer acquisition cost.
  - **UTM builder.**
- `08_INFLUENCER_OUTREACH/outreach_tracker.csv` for creators.

## 1. What to track, and where it comes from
| Area | Metric | Where to find it | Why it matters |
| --- | --- | --- | --- |
| Instagram | Views, reach, avg watch time, shares (sends), saves, profile visits, new followers, link clicks | Professional dashboard → Insights → each Reel/post | Instagram has said watch time, likes and sends are its top signals, with sends weighted more for reaching non-followers |
| TikTok | Views, avg watch time, completion rate, shares, profile views, bio link clicks | TikTok Studio → Analytics (switch to a free Business account) | Completion and shares predict distribution; profile views → link clicks shows buying interest |
| Shopify | Sessions, email signups, add-to-cart rate, checkouts started, orders, conversion rate, AOV, net sales after discounts | Analytics → Reports: "Sessions by referrer", "Conversion over time", "Sales by discount", "Sessions by UTM" (marketing reports) | Shows whether attention turns into money |
| Contribution margin | Contribution per order | Dashboard → Unit economics (needs your PODpartner costs) | Profit per customer, which sets the break-even customer acquisition cost |
| Email | Signups, welcome-series clicks, orders attributed | Marketing → Shopify Messaging reports | Judge by clicks and orders. Apple Mail inflates open rates |
| Creators | Outreach, replies, collabs, code clicks, code redemptions, attributable orders | Outreach tracker + Analytics → Sales by discount code | Shows whether creator spend pays back |

## 2. UTM rules (every link you post)
- **Format:** `?utm_source=[platform]&utm_medium=[type]&utm_campaign=[campaign]&utm_content=[post id]`
- **Bio links:**
  - Instagram: `utm_source=instagram&utm_medium=social&utm_campaign=bio&utm_content=linkinbio`
  - TikTok: `utm_source=tiktok…`, same pattern.
- **Story link stickers:** `utm_campaign=story&utm_content=day7_list10`, i.e. the calendar day and topic.
- **Creators:**
  - `utm_source=creator&utm_medium=influencer&utm_campaign=gifting&utm_content=[handle]`
  - Their own discount code as well. Codes catch people who type the URL by hand.
- **Emails:** `utm_source=shopify_email&utm_medium=email&utm_campaign=welcome&utm_content=e1_button`.
- **One bio link only:** point it at the homepage or `/collections/all`. Don't use a link-tree page that adds an extra tap; a bio-link app is acceptable only if each link carries its own UTM.
- **Build links in the "UTM builder" tab.** Typos in UTM values split your data.

## 3. Reading the numbers honestly
- **Views aren't customers.** Rank content by **shares per 1K views, saves per 1K and profile visits per 1K.** Those show people who care.
- **Correlation isn't causation.** A sales day after a viral post doesn't prove the post caused it. Only UTM sessions and discount-code orders are attributable. Note "likely influenced" separately.
- **Small numbers swing wildly.** Don't judge a format on one post. Judge it on 3 or more posts, over 3 or more weeks.
- **Change one thing at a time.** For hook tests, keep the same footage and change only the first caption card.

## 4. Starting benchmarks (my planning targets, not promises)
| Metric | Healthy early sign | Act if |
| --- | --- | --- |
| TikTok 3-second hold (from retention graph) | Above 60% | Below 40%: rework the first frame or caption |
| TikTok/IG completion (videos under 10s) | Above 35% | Below 20%: shorten |
| Shares per 1K views | Above 5 | Below 1: no reason to send. Add a "send this to" angle |
| Profile visit → link click | Above 5% | Below 2%: fix the bio and pinned posts |
| Site email signup rate | Above 3% of sessions | Below 1.5%: change the popup offer or timing |
| Add-to-cart rate | Above 4% of sessions | Below 2%: product page trust gaps (photos, shipping clarity, sizing) |
| Checkout → order | Above 40% of checkouts started | Below 25%: shipping cost surprise, payment options |

## 5. Weekly review: Sunday, 30 minutes
1. **Fill one row** in Weekly KPIs (10 min) and the Content log for the week's posts (10 min).
2. **Answer these five questions** in the Notes column (10 min):
   - **What worked?** The top 2 posts by shares/1K and saves/1K. What did their hooks have in common?
   - **What failed?** The bottom 2. Was it the hook, the length or the topic?
   - **What should be repeated?** Make one variation of the top post next week (same idea, new hook or new footage).
   - **What should be improved?** Choose one funnel step from the benchmarks table (e.g. signup rate) and one fix.
   - **What should be stopped?** Any format that has under-performed 3 times in a row.
3. **Monthly (day 30):**
   - Compare weeks 1–4.
   - Decide whether Scenario C (creator gifting) is justified, using the thresholds in `10_ADVERTISING_BUDGETS`.
   - Re-plan the next 30 days around the top 3 formats.

## 6. Daily checklist (30–60 minutes)
- [ ] **(10 min)** Post today's calendar item to TikTok, cross-post to Instagram Reels, and add the YouTube Short when the video suits it. Check the caption, ≤5 hashtags and the UTM-tagged link in bio.
- [ ] **(10 min)** Reply to every comment and DM from the last 24 hours. Pin the best comment.
- [ ] **(10 min)** Leave 3 genuine comments on target creators' posts (from the outreach tracker).
- [ ] **(5 min)** Share one post or Story: your own post to Stories, or a creator's post with credit.
- [ ] **(5 min)** Check yesterday's post: views, shares, saves, profile visits. Log it if it's 48–72 hours old.
- [ ] **(0–15 min)** Shopify: check new orders and signups, and reply to any customer email within 24 hours.
- [ ] **(Saturdays, 30–45 min extra)** Batch-shoot next week's real footage with the light kit.
