# Higgsfield production prompts

## Integration facts (checked in this session, 11 Oct 2026)
- **Balance:** 10.22 credits, Pro plan.
- **Stills:** `nano_banana_pro` at 2K, 2 credits each. Roles: `image_references`.
- **Video:** `kling3_0` with `mode: pro`, `sound: off`, `duration: 5`, 8.75 credits each. Roles: `start_image`.
- **Not available here:** standalone music or SFX generation. Sound is made in our own pipeline.
- **"IN THE DARK" preset:** Higgsfield often suggests it. Decline it, and generate the literal prompt with `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`.

## Verified references (always attach the real product photo plus one verified frame)
| Garment | Real reference | Verified generations |
| --- | --- | --- |
| Tee back | `fe70e5bd-1e91-41c7-97b9-68eeb059b829` | `ffc80151…` (n1 overhead), `7bf76921…` (studio back), `6ae5aff4…` (flat lay) |
| Tee front | `dc3c2fc7-0286-4eea-9e14-e0779b769273`, `b2fcf71a-0e4f-4ca3-b0c6-58b9ca417be6` | `de7747a0-ab54-4417-8ec2-0810bdd4d626` (n8fix, real chest print composited) |
| Long-sleeve back | `26c1ba30-ebe8-4e35-9f6d-95db4421920b` | `80f39842…` (n2 overhead), `960a1f93…` (studio back), `d0500478…` (flat lay) |

## What worked (keep doing this)
1. **Spell out every word of the print in quotes,** and say "same size and position."
2. **One slow, physically plausible camera move per clip.** Keep the garment still.
3. **Check every frame at full resolution:**
   - the first, middle and last frame;
   - every word of scripture;
   - no skin, hands or silhouettes.

   Trim anything that drifts. Past examples: a wrist appeared at 4.0s, and lettering drifted after 1.5s.
4. **9:16 stills with lots of empty space** produced ghost duplicate garments twice. Say "exactly ONE garment… the top and bottom quarters are empty," or compose tighter.
5. **When AI motion would touch lettering, use a still plus a camera move instead.** It costs 0 credits and carries 0 risk.

**Shared negative block (append to every prompt):** No people, no hands, no mannequin, no human shadows, no added text, no extra logos, no missing or misspelled lettering, no warping of the print, no duplicate garments, no CGI look.

## V9: THE WORK SPEAKS (awaiting approval, about 30.25 credits; or the 2-credit fallback)

**K1 still (2 credits)**, `nano_banana_pro`, 9:16, 2k. References: `fe70e5bd…` and `ffc80151…`.
> Premium campaign photograph, no people. An empty underground gym at night. On a worn wooden lifting platform, a steel barbell loaded with heavy black iron plates rests on the floor, and the exact black oversized t-shirt from the reference images is draped over the bar between the plates, back facing the camera. CRITICAL: the complete cream back print is copied exactly from the reference at the same size and position: the arched gothic blackletter words "Be strong and courageous." across the shoulders, the distressed thorned gothic cross between two skulls, and "JOSHUA 1:9" in small serif capitals with a small thorn ornament below. A single caged industrial lamp hangs above, throwing one hard pool of light onto the shirt and bar; the rest of the gym falls to near black; faint chalk dust in the air. 35mm lens, low angle, deep shadows, rich blacks, cream highlights, fine film grain. [negative block]

**K2 still (2 credits):** chalk macro. Reference: `f8f20d9f…` (the earlier knurling keyframe).
> Extreme macro photograph, no people. Chalk-packed steel barbell knurling in the foreground, and at the edge of frame the folded hem of a black cotton t-shirt resting on the bar, out of focus. Fine white chalk dust drifts down through one hard raking light. Background pure black. 100mm macro, shallow depth of field, high micro-contrast, film grain. No text, no logos. [negative block]

**Clip 1 (8.75 credits):** lamp flicker. `start_image` = K1.
> Locked-off wide shot, no people. The camera does not move. The caged lamp above the platform flickers twice and then stays on, its pool of light revealing the shirt draped over the loaded barbell. Nothing else moves except faint dust in the light. The shirt and its cream back print stay perfectly still and identical to the first frame. Photoreal, fine film grain. [negative block]

**Clip 2 (8.75 credits):** push-in. `start_image` = K1.
> Slow, smooth dolly push-in on a slider toward the shirt draped over the barbell, ending closer on the back print. The shirt is completely still. The print stays perfectly sharp and identical to the first frame: "Be strong and courageous.", the cross between two skulls, "JOSHUA 1:9". No shake, no zoom pulses. [negative block]

**Clip 3 (8.75 credits):** macro glide. `start_image` = K2.
> Macro slider glide along the chalked knurling; chalk dust slowly settles. The shirt hem stays still and out of focus. No shake. [negative block]

**2-credit fallback:**
- Generate K1 only.
- In our edit pipeline, use a still camera push.
- Simulate the lamp flicker with a brightness keyframe.
- Overlay real chalk-dust movement from the existing approved clip t30.

## Re-shooting the existing library (for reference)
The full prompt for every generated shot is stored with its job ID in your Higgsfield library:
- launch shots: `SWOLVATION_MARKETING/storyboards/shot_list.md`
- this campaign's shots: `SWOLVATION_AD_CAMPAIGN/05_GENERATED_SHOTS/shot_log.md`
