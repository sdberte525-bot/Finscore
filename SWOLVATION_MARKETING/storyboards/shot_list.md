# Shot list, prompts and QA

**Models:**
- Stills: Nano Banana Pro (2K) on Higgsfield.
- Video: Kling 3.0 Pro, image-to-video, 5s or 10s, 24 fps.
- Native sound marked 🔊.

Every shot was generated from a keyframe still. Every still with a shirt in it was generated with the real product photo as a reference (`assets/source/reference/higgsfield/`). Each was inspected at full resolution before use, and lettering was checked word by word.

**Reference media IDs:**
- tee back `fe70e5bd`
- tee front+back `dc3c2fc7`
- tee chest `b2fcf71a`
- long-sleeve back `26c1ba30`
- long-sleeve front+back `20f3af41`

**Shared negative block** (appended to every prompt): *No people, no hands, no mannequin (where relevant), no added text, no extra logos, no missing or misspelled lettering, no morphing or warping of the print, no flicker, no CGI look.*

## Keyframes (stills)

| ID | Job | Ratio | Subject | QA |
| --- | --- | --- | --- | --- |
| k20 | f8f20d9f | 9:16 | Macro of chalk-packed barbell knurling, hard top light | ✅ |
| k21 | 750c4eb9 | 9:16 | Wide underground gym, tee on the rack J-hook | ✅ print checked at crop |
| k22 | 57d6c71b | 9:16 | Tee on the rack J-hook, hard top light, chalk dust | ✅ |
| k23 | cafbb423 | 9:16 | Long sleeve on a wooden peg, '90s locker room, sun shafts | ✅ |
| k24 | 11085b5c | 9:16 | Loaded bar a split second before landing, chalk burst | ✅ (background shape is a gym machine) |
| k25 | 85834e53 | 9:16 | Chalk bowl, dust in a window beam | ✅ |
| k26 | 62aeeaf0 | 9:16 | Hex dumbbell row, rim light | ✅ |
| k27 | 6064bb01 | 9:16 | Empty sunlit '90s gym | ✅ |
| k28 / k29 | 05a012c2 / 960a1f93 | 9:16 | Long sleeve on a ghost mannequin, front / back, dark studio | ✅ |
| k30 | 1248bce1 | 16:9 | Wide underground gym with the tee (matches k21) | ✅ (faint speck over the "c" of "courageous", reads as print distress) |
| k31 | d0cedd96 | 16:9 | Tee on the rack (matches k22) | ✅ |
| k32 | 42190c36 | 16:9 | Bar-drop moment (matches k24) | ✅ |
| k33 | 97e98abb | 16:9 | Long sleeve in the vintage locker room (matches k23) | ✅ |
| studio tee | 3b400603 / 7bf76921 | 9:16 | Tee on a ghost mannequin, front / back, dark studio | ✅ |
| photo | 7ed455a1 | 4:5 | Tee on a gym hook at dawn | ✅ (retake: the first try, 81fdabbe, dropped the lettering and was rejected) |
| photo | 6ae5aff4 | 4:5 | Tee flat lay, plate, belt, chalk | ✅ |
| photo | 0518490b | 4:5 | Long sleeve on a gym hook at dawn | ✅ |
| photo | d0500478 | 4:5 | Long-sleeve flat lay | ✅ |
| photo | 083bdff9 | 4:5 | Tee gym-hook retake A | Rejected: the shirt reads brown |

### Keyframe prompt pattern (example k22, verbatim)

> Premium campaign photograph, no people. The exact vintage black oversized t-shirt from the reference images hangs on a black hanger from the steel J-hook of a scratched black power rack inside a dark underground gym, back facing the camera and filling the middle of the frame. CRITICAL: the complete cream back print is copied exactly from the reference at the same size and position: the arched gothic blackletter words "Be strong and courageous." across the shoulders, the distressed thorned gothic cross between two skulls, and "JOSHUA 1:9" in small serif capitals with a small thorn ornament below. A single hard light from directly above rakes down the fabric revealing washed cotton texture and the cracked vintage print; fine chalk dust drifts through the light. The background falls to near black with the faint outline of iron plates on a storage tree. 50mm lens at f/2.8, crisp focus on the print, deep shadows, warm-neutral grade, rich blacks, cream highlights, fine film grain. + negative block

What made the prints come out right:
1. Spell out every word of the print in quotes.
2. Say "same size and position".
3. Pass the real photo plus a previously verified generation as references.

## Video shots

| ID | Job | Ratio | From | Move | Sound | Credits | QA |
| --- | --- | --- | --- | --- | --- | --- | --- |
| t30 | 22776027 | 9:16 | k20 | Slow macro push, chalk falling | 🔊 | 12.5 | ✅ |
| t31 | 1f96f4ec | 9:16 | k22 | Slider push-in on the tee | — | 8.75 | ✅ print stable at full resolution |
| v40 | ac6c8e69 | 9:16 | k21 | Floor-level push, lamp sway | 🔊 | 12.5 | ✅ |
| v41 | d43be9d4 | 9:16 | k23 | Gentle push, dust in sunbeams | 🔊 | 12.5 | ✅ |
| v42 | 8de5ca34 | 9:16 | studio back | Light beam sweeps across the print | — | 8.75 | ✅ |
| v43 | 77278374 | 9:16 | photo 0518 | Dolly push on the long sleeve | — | 8.75 | ✅ |
| v44 | b64dcaed | 9:16 | k24 | Bar slams down, bounces, settles | 🔊 | 12.5 | ✅ (impact at 0.38s) |
| v45 | 5b33d275 | 9:16 | k25 | Chalk dust drifting, slow push | 🔊 | 12.5 | ✅ |
| v46 | 30bd4319 | 9:16 | k26 | Lateral dolly along the rack | — | 8.75 | ✅ |
| v47 | be41b610 | 9:16 | k27 | Very slow pan, dust in sunbeams | 🔊 | 12.5 | ✅ (very little motion; reads as a held frame) |
| v48 | c36ea663 | 9:16 | k28 → k29 | 180° turn, long sleeve, front to back (10s) | — | 17.5 | ✅ rotation physically consistent |
| v10 | e5f4d60e | 9:16 | studio front → back | 180° turn, tee, front to back (10s) | — | 17.5 | ✅ |
| v11 | fb61794b | 9:16 | studio back → front | 180° turn back (10s) | — | 17.5 | ⚠️ turns the opposite way, so v10+v11 is a "turn and return", not a 360 |
| v49 | 7fbba973 | 16:9 | k31 | Slider push-in on the tee | — | 8.75 | ✅ |
| v50 | 32db49ec | 16:9 | k30 | Floor-level push | 🔊 | 12.5 | ✅ |
| v51 | 2155ee6f | 16:9 | k33 | Lateral dolly toward the long sleeve | 🔊 | 12.5 | ✅ |
| v52 | 13cb4449 | 16:9 | k32 | Bar slam | 🔊 | 12.5 | ✅ (impact at 0.35s, second bounce) |

### Video prompt pattern (example t31, verbatim)

> Product reveal shot, no people. Slow, smooth, steady dolly push-in toward the t-shirt hanging on the power rack J-hook. Fine chalk dust drifts gently through the overhead light. The shirt hangs still with only the faintest natural sway of the hem. The cream back print stays perfectly sharp, stable and identical to the first frame throughout: the arched text "Be strong and courageous.", the cross and two skulls, "JOSHUA 1:9". Camera on a slider, no shake, no zoom pulses. Photoreal, cinematic, deep shadows, warm-neutral grade, fine film grain. + negative block

Motion rules that worked:
- One slow, physically plausible move per shot (push, slide or pan).
- Ask for "locked" or "motion-control" camera language.
- Keep fabric motion minimal so the print can't drift.
- Name the sounds you want when native audio is on.

The full prompt text for every job is stored with the job in Higgsfield (open any job ID in the Higgsfield library).
