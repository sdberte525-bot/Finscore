# 6. Reusable Higgsfield workflow: one character, every video

What's below was tested today, or quoted by Higgsfield's own cost tool. Prices are from 12 Oct 2026; recheck with `get_cost: true` before each run.

## What Higgsfield offers for character consistency (checked, not assumed)
| Feature | What it does | Price | Verdict for us |
|---|---|---|---|
| **AI Influencer sheet** (`ai_influencer_prepare` → `ai_influencer_generate`) | Builds a character sheet from traits (it has an "Ultra Muscular" build) + a brief | **1.125 credits/sheet** (quoted) | Good for exploring *new* looks. Optional; we already have an anchor face. |
| **Soul 2.0, text only** (`soul_2`) | Photoreal UGC-style portraits | **0.12 credits/image** | ✅ Made our anchor (ref 01). Great value for a first face. |
| **Soul 2.0 + image reference** | Supposed to follow a reference | 0.12 | ❌ **Don't use for poses.** It auto-enabled `enhance_prompt` and replaced our prompt with a caption of the reference, giving 5/5 wrong poses and different faces. |
| **Trained Soul** (`show_characters` train → `soul_2` + `soul_id`) | Learns one identity from 5–20 photos | training price shown at the time | Use **after** 5+ approved, consistent references exist (step 3). Works only with Soul 2.0 / Soul Cinema. |
| **Reference Element** (`show_reference_elements`) | Saves a character from one image; `<<<id>>>` in prompts injects it | free to create | ✅ **Created:** `swolvation-athlete-01` = `853d0aaa-2bc3-4850-a0bf-f6964daf5493` |
| **Nano Banana Pro** + Element | Follows pose text and keeps identity | **2 credits** (2k) | ✅ Main still model |
| **Seedream 4.5 / 5 lite** + Element | Cheaper Element-aware stills | **1 credit** | Backup if Nano Banana Pro drifts |
| **Kling 3.0** + start image (+ Element) | Image-to-video, 3–15s, optional end frame (loops) | std silent 10s = 15; **pro silent 1.75/s** (11s = 19.25); default sound-on std 10s = 20 | ✅ Video model |
| **Seedance 2.0 / 2.5** | Alternative video | 45 / 70 credits per 10s | Too expensive for tests |
| **Motion transfer** (`hf_mult_motion_control`) | Copies movement from a driving video onto a character | not priced yet | **Don't** feed the reference creator's video; it would copy a real person's performance. Use only footage SWOLVATION owns. |

## The workflow
1. **Anchor face (0.12):** one Soul 2.0 text-only portrait. Lock the traits in `02_IDENTITY_PROFILE.md` (face, mark, hair, skin, physique).
2. **Save the Element (free):** `show_reference_elements action=create` from the anchor.
3. **Reference set (5 × 2):** Nano Banana Pro + `<<<element>>>`: side, full body, flex, gym pose, casual. **QA each one** (`07_QA_REVIEW.md`). When ≥5 pass, optionally **train a Soul** from them for even tighter faces in Soul 2.0 stills.
4. **For each video:**
   1. Start frame: Nano Banana Pro + Element + scene. QA the face; only then continue.
   2. Kling 3.0 `pro`, `sound: off`, `start_image` = frame, `<<<element>>>` in the prompt, duration 8–15. For loops, set `end_image` to the same frame.
   3. Describe the exercise mechanics in plain physical terms ("elbows pinned, bar from thighs to upper chest, cable stays taut"). Kling gets lifts wrong when the prompt only says "curls".
   4. One take. If it fails QA, change **one** thing (prompt detail, duration, or start frame), then retake once. Never fire random repeats.
5. **Finish in the sandbox (0 credits):** trim, light grade, 1080×1920 H.264, no burned captions. Add the end card from the real logo when branding is needed.
6. **Merchandise:** only from `SWOLVATION_AD_CAMPAIGN/03_APPROVED_PRODUCT_REFERENCES/`. Crop-check every print against `SWOLVATION_PRINT_FILES/source/`. If it isn't exact: plain garment + composited real artwork, or end card only.
7. **Post:**
   - AI label on (TikTok "AI-generated", Meta "AI info", YouTube "altered or synthetic");
   - licensed audio;
   - in-app text;
   - captions from `04_CAPTIONS_AND_AUDIO.md`.
   - Nothing is posted without your approval.

## Account limits seen today
- **Pro plan:** at most **4 concurrent jobs**. A batch of 5 rejects the fifth, so submit in groups of 4.
- **Higgsfield sandbox:** a provider-wide capacity error happened once ("maximum number of concurrent sandboxes"). It cleared on retry.
- **Credits:** 0.11 left after today's tests. Top up before step 3.
