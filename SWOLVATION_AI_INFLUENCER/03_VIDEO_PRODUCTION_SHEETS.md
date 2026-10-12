# 3. Video production sheets: 3 launch videos

**Status: NOT RENDERED.** These are complete, ready-to-run plans. They wait on two things:
1. your approval of the reference set (`01_CHARACTER_REFERENCES/`);
2. credits: about **60 credits** for the three videos, **about 70** including the reference redos, **about 95** at most with retakes. See `00_START_HERE.md`.

No video has been generated, and none will be claimed as finished until it exists and has passed QA (`07_QA_REVIEW.md`).

## How every video is made (one validated path)
1. **Start frame (Nano Banana Pro, 2 credits):**
   - the identity Element `<<<853d0aaa-2bc3-4850-a0bf-f6964daf5493>>>` + the scene prompt;
   - 9:16, 2k;
   - QA the face against reference 01 before any video spend.
2. **Motion (Kling 3.0, `pro` mode, `sound: off`, 9:16):**
   - the approved start frame as `start_image`;
   - Element placeholder in the prompt (Kling only honours Elements when a start image is supplied);
   - for loops, the same frame as `end_image`, so the last frame meets the first.
   - Pro mode, silent: **1.75 credits per second** (11s = 19.25, 10s = 17.5; quoted by the tool today).
3. **Finish (sandbox, 0 credits):**
   - trim to the loop point, light grade to match the dark-gym look, export 1080×1920 H.264;
   - **no burned-in captions** (post text goes on in the app);
   - QA frame grabs every 0.5s.
4. **Audio:** added at posting from the platform's licensed library, or our original track (see `04_CAPTIONS_AND_AUDIO.md`). Kling's sound is off: it saves credits and avoids unclear music rights.

---

## Video 1: Arm day ("POV: She trains harder than you.")
- **Length:** 11s, seamless loop. **Outfit:** signature dusty-pink sports bra and leggings. **Camera:** phone at chest height, beside her (as in the reference format).
- **Start/end frame prompt (Nano Banana Pro):**
  > `<<<853d0aaa-…>>>`, the exact same woman as the reference (same face, beauty mark below her right eye, long dark-brown wavy hair, olive skin). Candid smartphone frame from her left side at chest height: she stands at a cable stack holding a chrome straight-bar attachment at mid-thigh, elbows pinned, about to curl. Advanced female bodybuilder: huge biceps and triceps, forearm veins, capped deltoids. Plain dusty-pink sports bra and high-waist leggings, no logos. Dark modern commercial gym, black machines, linear white LED ceiling strips, two blurred people far behind. Realistic skin, correct hands gripping the bar, no text, no tattoos.
- **Kling prompt:**
  > Handheld smartphone video from her side at chest height, very slight natural sway. `<<<853d0aaa-…>>>` performs slow, controlled standing cable curls with a straight bar: elbows stay pinned to her sides, the bar travels from thighs to upper chest and back, biceps contract and stretch naturally, the cable stays taut and attached. On the third rep she glances at the camera mid-rep and gives a quick playful smile, then looks back and finishes the rep, ending in the same position as the start. Hair moves naturally. Realistic gym lighting, no cuts, no text.
- **Shot timing (single continuous take, matching the reference):**

| Time | What happens | Purpose |
|---|---|---|
| 0–2s | Mid-curl, bar rising, close side view of the biceps | Hook: the physique is instant |
| 2–5s | Two full controlled reps | Proof: real movement, real mechanics |
| 5–8s | Glance to camera, quick playful smile, keeps curling | Personality moment (the save and share trigger) |
| 8–11s | Final rep lowers back to the start position | Loops back to 0s |

- **Text added in the app (not burned in):** `POV: She trains harder than you.`
- **Cost:** 2 (frame) + 19.25 (11s pro) = **21.25 credits**.

## Video 2: Shoulder pump ("Built different. Guided by God.")
- **Length:** 10s. **Outfit:** plain charcoal/black sports bra and leggings, no logos. **Camera:** front three-quarter, chest height, tripod.
- **Start frame prompt:**
  > `<<<853d0aaa-…>>>`, the exact same woman as the reference. Waist-up smartphone frame from a front three-quarter angle: she stands holding a pair of hex dumbbells at her sides, about to do lateral raises, focused expression. Huge capped deltoids, thick arms, forearm veins. Plain charcoal-black sports bra and leggings, no logos. Dark modern commercial gym, linear white LED ceiling strips. Realistic skin with sweat, correct hands, no text, no tattoos.
- **Kling prompt:**
  > Tripod smartphone video, front three-quarter angle. `<<<853d0aaa-…>>>` does strict dumbbell lateral raises: arms rise out to the sides to shoulder height with a slight bend in the elbows, pause, and lower slowly; shoulders and delts visibly work; the dumbbells stay in her hands. After four reps she lowers the weights, exhales, looks into the camera and breaks into a warm confident smile. Natural breathing, natural hair movement, no cuts, no text.
- **Timing:** 0–1.5s first raise at the top (hook); 1.5–7s three more reps; 7–10s set down, look, smile.
- **Text in the app:** `Built different. Guided by God.`
- **Cost:** 2 + 17.5 = **19.5 credits**.

## Video 3: Faith over fear ("Faith doesn't make it easy. It makes you stronger.")
- **Length:** 10s video, plus a 1.5s end card added in post. **Outfit:** the **real SWOLVATION "Be strong and courageous" tee**, only if verified (below).
- **Product rule:**
  - **References:** the start frame uses the approved references in `SWOLVATION_AD_CAMPAIGN/03_APPROVED_PRODUCT_REFERENCES/`:
    - tee front with the real chest print, `de7747a0-ab54-4417-8ec2-0810bdd4d626`;
    - tee front and back, `dc3c2fc7-0286-4eea-9e14-e0779b769273`.
  - **Check:** the left-chest emblem (flared cross in a crown of thorns + "SWOLVATION") is compared by crop with `SWOLVATION_PRINT_FILES/source/tee-front_original.webp`.
  - **If it isn't exact:** she wears a **plain black tee**, and the branding is only the end card made from the **real logo file** (as in the reels). No invented merchandise, ever.
- **Start frame prompt:**
  > `<<<853d0aaa-…>>>`, the exact same woman as the reference, sitting on a flat gym bench between sets, forearms on her knees, a small towel in one hand, wearing the exact black SWOLVATION tee from the reference images with its small cream left-chest emblem exactly as in the reference, sleeves stretched by her huge arms. Head slightly bowed, eyes closed, calm. Dark gym, soft overhead light falling on her, background dim. Realistic skin, correct hands, no other text, no other logos.
- **Kling prompt:**
  > Slow handheld push-in. `<<<853d0aaa-…>>>` sits on the bench with her eyes closed for a quiet breath, as if praying, then opens her eyes, lifts her head, and gives a small, steady, confident smile toward the camera. Very subtle movement, natural breathing, the shirt print stays fixed and undistorted, no cuts, no text.
- **Post:** 0–10s the clip; then a hard cut to the black end card with the real thorned-cross mark and "SWOLVATION" (from `SWOLVATION_REELS` pipeline).
- **Text in the app:** `Faith doesn't make it easy. It makes you stronger.`
- **Cost:** 2 + 17.5 = **19.5 credits** (end card 0).

## Budget summary
| Item | Credits |
|---|---|
| 5 reference redos (Nano Banana Pro) | 10 |
| 3 videos (frames + Kling 3.0 pro, silent) | 60.25 |
| **Planned total** | **≈ 70** |
| Retake allowance (1 video + 3 stills) | ≈ 25 |
| **Ceiling I'm asking you to approve** | **≈ 95** |
