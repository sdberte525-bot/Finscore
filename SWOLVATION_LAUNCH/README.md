# SWOLVATION Launch: 4 assets

*13 Oct 2026. Higgsfield project "Swolvation Launch" (`2321187f-8eaf-456c-bc26-f337f8ddec03`). Nothing posted.*

**Total spend: 142.0 credits** (approved ceiling ≈ 210). Balance 327.36 → 185.36.

## The decision that shaped everything: the print is never AI-drawn
Before any asset was made, a print-fidelity test (9.5 credits) gave both candidate image models the real product photos and asked them to reproduce the tee:
- **GPT Image 2.5** and **Nano Banana Pro** both **redrew** it.
  - The back headline became a gothic serif, not your blackletter.
  - The chest cross got thinner.
  - "SWOLVATION" changed weight.
- Your brief says reject that, so the models only ever generate a **blank** tee.
- Your real print files (`SWOLVATION_PRINT_FILES/TEE_FRONT_cross-wordmark_chest.png`, `TEE_BACK_be-strong-and-courageous_12in.png`) are then composited onto the fabric by `tools/compo.py`, at 0 credits.
  - The artwork pixels are only scaled, perspective-warped, displaced by the fabric folds, and lit by the scene's own light (ink = cotton brightness × the cream/black reflectance ratio).
  - The cotton weave and film grain show through.
  - Placement follows the print spec: chest 4 in wide, 3.5 in below the collar; back 12 in wide, 3 in below the collar.
- **Stills:** the print is your exact file. The 4K stills were made by upscaling the blank plate first, then compositing the 3600 px print file at native 4K, so the upscaler never touched the art.
- **Clips:** Kling animates between composited first and last frames, and the clip ends on the exact composite.
  - Mid-motion (while he turns, or the shirt orbits), the print is the video model's rendering of those anchored frames.
  - It was checked frame by frame and stays legible and correct.
  - The final hold is pixel-exact.

## Deacon (cast, then approved)
- No "Deacon" existed, so 4 options were cast (GPT Image 2.5, 11 credits).
- You replied "Ok" without picking, so I chose **option 2** (`315eb7ea-530f-44e4-a200-520edf278ca0`): close-cropped dark hair, heavy stubble, olive skin, a scar through one eyebrow, a steady stare.
  - It's the most distinctive face, so it's the easiest to hold consistent.
  - It reads serious, not menacing.
- He's used as an image reference in every shot.
- Rejected options: `861c7cbd` (generic), `4b7b64bb` (reads menacing), `8adc8184` (strong, but less distinctive).

## Deliverables

### 1. HERO still (4:5, 3291×4096)
- [JPG](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/303c3e4b-8a5c-45dd-9e95-f8e0a8a05647.jpg) · [PNG master](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/7bdf502f-8710-4472-9a9b-ffba4a0da6b8.png)
- **Pick: variation 4 of 4** (`ff7e273e`).
  - He claps chalk off his hands in a cloud of dust, under one bare bulb, with a racked barbell behind him.
  - The chest print is fully unobstructed.
  - Most on-brand of the four (chalk, iron, top light).
- **Others:**
  - `6321a2a4` (square stance, plates at the floor): strong, but static.
  - `a542c8f4`: his arm cuts across the torso and the bar geometry is awkward.
  - `7ea890f3`: full body, so the print is too small.
- **Model/settings:** GPT Image 2.5, quality high, 2k, 4:5, image reference = Deacon → bytedance upscale 4k → composite (front print, `--disp 5.5 --fold 26`).
- **Prompt:**
  > The exact same man as in the reference image (same face, scarred eyebrow, close-cropped dark hair, heavy stubble, olive skin, same build). 35mm film photograph, waist-up, he stands square to the camera beside a loaded barbell in a rack, slowly rubbing chalk between his palms at waist height, a small cloud of chalk dust rising into the light, hands low so the chest stays fully visible. Head slightly lowered, eyes up to the lens, serious and focused, mouth closed, no smile. He wears the same completely plain faded-black heavyweight oversized boxy t-shirt with dropped shoulders; chest flat, frontal and unobstructed, no print, no logo. One hard tungsten bulb directly overhead, deep shadows, background black: concrete wall, iron plates. Shallow depth of field, 35mm grain, desaturated, black and charcoal palette with a little warm tungsten. Real skin texture and sweat, not glossy. Correct hands with five fingers. No text, no watermark.
- **Credits: 13** (4 plates × 2.75 + upscale 2).

### 2. DETAIL still (4:5, 3291×4096)
- [JPG](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/ccb95ae0-41e2-4c37-bf76-7b6308957e75.jpg) · [PNG master](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/736a0111-24b7-48f0-9cb3-7887d1e35812.png)
- **Pick: the angled plate** (`db1c1847`).
  - Raking tungsten light across the folded tee, chalk powder, a rusted iron plate and a wooden cross on a cord.
  - It reads as a real product photo.
- **Others:**
  - `99387dc0` (top-down): clean, but flatter.
  - The 2 AI-print test images: rejected because the print was redrawn.
- **Model/settings:** GPT Image 2.5, high, 2k, 4:5 → bytedance upscale 4k → composite with perspective warp.
- **Prompt:**
  > Real 35mm close product photograph: a faded-black heavyweight oversized cotton t-shirt folded on a cracked, chalk-dusted concrete gym floor, shot from above at a 30-degree angle, the plain front chest panel flat and filling the centre of the frame, completely plain with no print, no logo, no tag visible; ribbed collar at the top edge of the frame. Beside it: a scatter of white chalk powder, a worn iron weight plate partly out of frame with rust and chipped black paint and no lettering, and a simple dark wooden cross on a cord resting near the corner. Hard low side light from the left like a single bare bulb, warm tungsten, long shadows across the cotton texture, black falloff. Desaturated, fine film grain. Not glossy, not CGI. No text anywhere, no watermark.
- **Credits: 7.5** (2 plates × 2.75 + upscale 2).

### 3. THE REVEAL (9:16, 7.9s, silent)
- [4K (2160×3840, Topaz)](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261013_013250_35b61a28-dd1c-45a0-880f-ad754e194b94.mp4) · [1080×1920 master](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/bcb46895-2ed7-44be-8166-78fe6bf47b9b.mp4)
- **Timeline:**
  1. 0–2s: he works chalk into his palms in near-darkness.
  2. 2–4s: lowers his hands and turns slowly away.
  3. 4–6s: settles with his back to camera, head bowed, as the overhead light falls on the back print.
  4. 6–7.9s: hold on the exact composite.
- A slow digital dolly push-in (1.0→1.32×, one continuous ease) runs through the whole clip toward the print.
- A 0.6s crossfade hides the AI-to-exact handoff; the measured seam is 0.06/255, invisible.
- **Pick: take C of 3** (`b3db0787`): the print is clean and legible in every frame from 3.8s, it's the slowest and smoothest motion, and the head bow is a respectful faith beat.
  - Take A (`96f6b385`): good, but the print smears edge-on at 3.8s.
  - Take B (`8e619a27`): small artifacts in "and courageous" mid-turn.
- **Model/settings:** Kling 3.0 pro, 6s, 9:16, sound off, start = `reveal_start` (front print composited, dim), end = `reveal_end` (back print composited, lit), preset declined → digital push-in/crossfade/hold in post → Topaz 2160p.
- **Frames:**
  - Start plate `b2e085dc` (GPT Image 2.5, 9:16, Deacon reference).
  - End plate `98dfddcb`, generated with the start plate as a reference so the room matches. The alternate `34a5a3a4` (head up) was not used.
- **Kling prompt (take C):**
  > Camera completely still. Near darkness. The man works the chalk into his palms for two seconds, breathing slowly, dust falling. Then, in one slow continuous motion, he turns his body around to face away from the camera toward the barbell rack, and stands still with his back to us, shoulders broad, head bowed as if in a quiet prayer, the overhead light falling across his upper back. Very slow, calm, controlled, no cuts, no fast motion. Realistic anatomy and hands, fabric moves naturally, the shirt print stays printed on the fabric.
- **QA note:**
  - The 1080 master was checked frame by frame.
  - The 4K Topaz file was generated, but I couldn't open it to inspect: the Higgsfield connection dropped first.
  - The same Topaz pass on The Drop kept the print exact. Watch the 4K Reveal once before posting.
- **Credits: 50.5** (4 plates 11 + 3 Kling takes 31.5 + Topaz 8).

### 4. THE DROP (9:16, 8.0s, silent)
- **Versions:**
  - [Clean 4K (Topaz)](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261013_013300_0b9937f0-af9c-4938-a904-5892deeeb7ea.mp4) · [clean 1080](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/04d95525-1370-4ecc-bb25-cdbf8ea57507.mp4)
  - [Branded 4K](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/4e395a05-3da4-4215-9d35-a52e534fa843.mp4) · [branded 1080](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/7ceffd23-1bc8-416e-95f4-2816e999d4d9.mp4). In these, your real cross + SWOLVATION lockup fades in under the shirt during the hold.
- **Timeline:**
  1. 0–6s: the tee hangs alone from a chain in a black void with dust in a cone of light. The camera makes a slow ~20° orbit and returns to center while the light dips and swells back (measured luminance 14 → 11 → 14).
  2. 6–8s: a centered hold on the exact composite.
- The space below the shirt is left empty for your logo and drop date. I did **not** add a date because you haven't given me one.
- **Pick: take 1 of 3** (`112b89db`):
  - The only take with both a real orbit and a real light sweep.
  - The print stays coherent throughout.
- **Others:**
  - `01d3c313`: spins nearly edge-on, which reads as AI.
  - `fa009110`: almost no motion and no light change.
- **Model/settings:** Kling 3.0 pro, 6s, 9:16, sound off, start = end = `drop_A` (back print composited onto plate `d6f4f223`), preset declined → crossfade + hold in post → Topaz 2160p.
- **Kling prompt (take 1):**
  > A black t-shirt hangs alone on a hanger from a chain in total darkness. The camera makes a very slow, small arc around the shirt, drifting a little to the left and back to centre, ending exactly centred and still. A soft beam of warm light slowly sweeps across the shirt from left to right, briefly brightening the printed back graphic, then settles. Fine dust drifts through the light. The shirt barely sways on the hanger. Slow, smooth, silent, one continuous take, no cuts. The printed graphic stays fixed on the fabric. Dark, grainy, desaturated film look.
- **Credits: 50.5** (4:5 plates 5.5 + 9:16 plates 5.5 + 3 Kling takes 31.5 + Topaz 8).

### Bonus (0 extra credits): back-print stills (4:5, 2K)
- [Hanging, gym](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/bd00c274-c8bf-4619-bd68-434b9c0149e3.jpg) · [Hanging, void](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/5513b0a4-4981-41b6-aae0-2a8c65227181.jpg)
- These are the 4:5 Drop plates with the real back print composited. Good as carousel slide 2 after the Hero.

## Credits
| Item | Credits |
|---|---|
| Print-fidelity test (2 GPT Image 2.5 high + 2 Nano Banana Pro) | 9.5 |
| Deacon casting (4 options) | 11 |
| Hero | 13 |
| Detail | 7.5 |
| The Reveal | 50.5 |
| The Drop | 50.5 |
| **Total** | **142.0** |

No asset needed a second round, so the 2-round stop rule was never triggered.

## Captions (verses checked against the KJV / WEB text)
1. **Hero:** "Chalk up. Head down. Get under it. *Be strong and courageous.* (Joshua 1:9)"
2. **Detail:** "Heavyweight cotton. One verse. Nothing extra. *Iron sharpens iron.* (Proverbs 27:17)"
3. **The Reveal:** "Turn your back on fear. *The LORD thy God is with thee whithersoever thou goest.* (Joshua 1:9, KJV)"
4. **The Drop:** "Stand firm. Be strong. The Be Strong and Courageous tee drops [DATE]. (1 Corinthians 16:13)"

**When you post, turn on each platform's AI-content label:**
- TikTok "AI-generated content"
- Instagram/Facebook "AI info"
- YouTube "altered or synthetic content"

Deacon is an AI character, and the scenes are AI-generated. The print is your real artwork, composited. On TikTok, also switch on "Your brand" (these are product posts).

## Files here
- `tools/compo.py`: the print compositor (real artwork onto a generated blank garment).
- **Push-in finisher:** `pushin.py` in the Higgsfield sandbox (`~/launch/tools/`). It does a continuous eased digital push-in across clip + still hold, plus a crossfade into the exact still. It's the round-3 tool from `SWOLVATION_AI_INFLUENCER/06_HIGGSFIELD_WORKFLOW.md` with those two upgrades.

## Lessons (add to the workflow)
- **No image model reproduces this artwork exactly.** Generate blank garments and composite the real print file. This beats every prompt trick tried in rounds 1–3.
- **Upscale the plate, not the composite.** Then composite at native resolution, so the AI upscaler never sees the art.
- **Light the ink physically.** Ink = cotton brightness × reflectance ratio (about 8 for cream on faded black). Normalising to the brightest ink makes prints glow in shadow.
- **Kling start/end anchoring with composited frames keeps the print legible through a full 180° turn.** End the clip on the exact still with a 0.6s crossfade and one continuous zoom curve, so there's no stop at the cut.
