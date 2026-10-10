# Production manifest

Status as of 2026-10-10. Everything listed as **complete** has been rendered, reviewed frame by frame for product accuracy and text clashes, loudness-normalized, and uploaded to the Higgsfield library.

## Where the files are

This cloud workspace's network policy blocks downloads from Higgsfield's CDN, so the media files are **not in this repo**. They are in your Higgsfield account:

- **Everything in one download:** `SWOLVATION_launch_pack.zip`
  https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/4e969d99-3c16-42d6-ad7d-b49d020056d2.zip
  It contains `videos/`, `photos/`, `covers/` and `thumbnails/`, plus a README.
- **Each video separately** (links in the table below, and in your Higgsfield media library).

To keep copies in this repo, allow `d8j0ntlcm91z4.cloudfront.net`, `d2ol7oe51mr4n9.cloudfront.net` and `upload.higgsfield.ai` in the cloud environment's network settings. The empty folders (`final_ads/`, `instagram/`, `tiktok/`, `youtube/`, `product_photography/`, `thumbnails/`, `generated_footage/`, `approved_footage/`) are where they'd go. Keep large media out of git (see `.gitignore`).

## Videos (all 1080p, 30 fps, H.264 High, AAC 320k, ≤20 Mbps, faststart)

| File | Type | Ratio | Length | Campaign | Platforms | Link | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SW_hero_THE-IRON-WAITS_9x16 | Hero film | 9:16 | 25.9s | Underground | Reels, Shorts, TikTok, site | [mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/bdafee41-d6fc-44ad-860c-4f1172496fd7.mp4) | ✅ |
| SW_youtube_THE-IRON-WAITS-15_16x9 | YouTube ad | 16:9 | 15.1s | Underground | YouTube in-stream, site | [mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/9a864a82-bfa6-41c5-a76e-44e8084e1e45.mp4) | ✅ (native 16:9 footage) |
| SW_product_BE-STRONG-COURAGEOUS_9x16 | Product ad | 9:16 | 13.8s | New Gen | Reels, TikTok, Shorts | [mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/34c39458-da1a-48a2-a62a-49b3c0fafb5c.mp4) | ✅ |
| SW_product_THROUGH-CHRIST_9x16 | Product ad | 9:16 | 13.8s | New Gen | Reels, TikTok, Shorts | [mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/6baab506-9cfa-441f-bd3e-afe1b8829b00.mp4) | ✅ |
| SW_teaser_SOUND-ON_9x16 | Teaser | 9:16 | 6.0s | Underground | TikTok, Reels, Stories | [mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/82f1be64-b07c-4b98-9043-d72c2d95677b.mp4) | ✅ |
| SW_teaser_THE-PRINT_9x16 | Teaser | 9:16 | 6.9s | New Gen | TikTok, Reels, Stories | [mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/d51ad9c5-1730-4718-a5fb-0855048d1388.mp4) | ✅ |
| SW_social_5AM-native_9x16 | Social (native) | 9:16 | 11.4s | Underground | TikTok first | [mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/185454b8-6998-45c9-82f6-e42404402fee.mp4) | ✅ |
| SW_social_CULTURE-NEVER-LEFT_9x16 | Social | 9:16 | 14.0s | Vintage Era | Reels first | [mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/fdcc60ce-e71b-4b58-9399-1c70ba4fc438.mp4) | ✅ |
| SW_social_NOT-MADE-TO-BLEND-IN_9x16 | Social | 9:16 | 11.4s | New Gen | Reels, TikTok | [mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/3cfb9aa9-abb6-4e28-9b75-327afbd7ea84.mp4) | ✅ |
| SW_product_tee-turn-and-return_9x16 | Product loop | 9:16 | 20.0s | Studio | Product page, Stories | [mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/a38b0993-07f4-464d-b6e2-9489329ae4ab.mp4) | ✅ (turn and return, **not** a true 360) |
| SW_product_ls-turn_9x16 | Product loop | 9:16 | 10.0s | Studio | Product page | [mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/61c4470b-2386-4015-a19f-bf22a7a095d0.mp4) | ✅ (front to back, 180°) |

Source shots for each edit are listed in `scripts/scripts_and_storyboards.md`. Job IDs and prompts are in `storyboards/shot_list.md`.

## Stills (in the zip)

| Set | Files | Sizes |
| --- | --- | --- |
| Feed photos | tee gym hook, tee flat lay, tee on the rack (underground), tee studio front and back, long-sleeve gym hook, long-sleeve flat lay, long sleeve in the vintage locker room, long-sleeve studio front and back | 4:5 1080×1350 · 1:1 1080×1080 · full resolution |
| Reels/TikTok covers | hero, tee, long sleeve, Culture, 5:02 AM | 1080×1920, titles inside the 3:4 grid crop |
| YouTube thumbnails | "The Iron Waits.", "Built Through Adversity." | 1280×720 |

## Brief deliverables vs. what exists

| Brief item | Status |
| --- | --- |
| Brand analysis, visual direction | ✅ `brand_strategy/brand_direction.md` |
| Three campaigns (objective, audience, hooks, visual and sound direction, CTA) | ✅ `creative_concepts/campaigns.md` |
| Scripts and shot-by-shot storyboards | ✅ `scripts/`, `storyboards/` |
| Hero commercial, 20–30s | ✅ 25.9s |
| One 10–15s ad per garment | ✅ for the two launch garments. The third (white "Though I Fall") was excluded by decision |
| Three short-form social ads | ✅ 5:02 AM, The Culture Never Left, Not Made To Blend In |
| Two teasers, 5–8s | ✅ Sound On (6.0s), The Print (6.9s) |
| YouTube 15s, 16:9 | ✅ |
| YouTube 30s, 16:9 | ⏳ Not made. It needs 4–6 more native 16:9 shots (about 50–75 credits). The 9:16 hero covers Shorts |
| Product photography, covers, thumbnails | ✅ |
| Launch strategy, content strategy, optimization | ✅ `brand_strategy/launch_strategy.md` |
| 30-day calendar | ✅ `marketing_calendar/30_day_calendar.md` |
| Testing plan and metrics | ✅ `performance_testing/testing_plan.md` |
| Hook variants H4 and T2/T4/T5 re-cuts | ⏳ Free to make (re-edits of existing footage), not rendered yet |
| "AVAILABLE NOW" end cards | ⏳ Deliberately not made until checkout is live |

## Limitations and honest notes

- **No people,** by decision. Talent-led content (real lifters in the real shirts) should come from a real shoot once stock exists.
- **Side views are AI interpretations.** The turn clips run between two verified frames (front and back). The side profiles in between were inferred by the model and show plain black sides, which matches the garments. They passed review, but they are not photographs of the real side seams.
- **The tee loop is a turn and return, not a 360.** The second clip rotated back the opposite way. A true 360 would need one more 10s render (17.5 credits).
- **Minor:** one faint speck over the "c" of "courageous" in the wide 16:9 gym shot (`k30`/`v50`). It reads as print distress at that size.
- **Sound:**
  - The music is an original synth score (drones, sub impacts, pulse and beat) built in the sandbox, so it's owned outright with no licensing risk.
  - The room sound and the barbell crash were generated with the footage on Higgsfield. Check Higgsfield's current terms for commercial use of generated media on your plan.
  - A licensed track (for example Artlist or Epidemic Sound, with a commercial license) would lift the hero film. The edit is built to accept a replacement bed.
  - Don't use trending TikTok/Reels audio in ads without confirming commercial rights.
- **Fabric, fit and care aren't mentioned anywhere,** because they aren't confirmed yet.

## Credits used (Higgsfield)

| Stage | Credits |
| --- | --- |
| Earlier session (first photos, studio frames, tee turn clips) | ~51 |
| This production: test batch | 29.25 |
| This production: keyframes and shots | ~172.5 |
| **Total for this production** | **~202** (approved budget ≤230) |
