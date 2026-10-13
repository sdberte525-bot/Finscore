# No-people motion ad: delivered

*13 Oct 2026. Higgsfield project "Swolvation Launch" (folder `2321187f-8eaf-456c-bc26-f337f8ddec03`). Built to `NO_PEOPLE_MOTION_AD_PLAN.md`. Nothing posted.*

## Deliverables (9:16, 1080×1920, 24 fps, 20.0 s)
- **With audio:** [swolvation_no_people_motion_ad_20s_audio.mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/a6971399-64bc-4c73-9a9b-85ea34f41d97.mp4) (media `a6971399-64bc-4c73-9a9b-85ea34f41d97`)
- **Silent:** [swolvation_no_people_motion_ad_20s_silent.mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/fc490369-5ccc-4627-8a54-d4e54dd170f5.mp4) (media `fc490369-5ccc-4627-8a54-d4e54dd170f5`)
- Audio: original synth bed made with `tools/bed.py` (wind, fan hum, distant plate clank at each cut, a low 41 Hz pulse). No samples, so nothing to license. Measured **−14.3 LUFS integrated**, true peak −1.3 dBTP, LRA 1.7 LU.
- The space for your logo and drop date is left empty. Add them as in-app text, as planned.

| Time | Shot | Shirt | Movement |
|---|---|---|---|
| 0–5 s | 1 HOOK | Tee, back | Box-fan air ripples hem and sleeves, chalk dust in the work-light beam, handheld push-in toward the print |
| 5–10 s | 2 | Long sleeve, back + sleeves | Wind lifts the right sleeve (around 6.5–7.5 s); slow lateral track right along the fence |
| 10–15 s | 3 | Tee, front chest | Chalk cloud drifts across (10.5–12 s); low slider push past the plates to the shirt |
| 15–20 s | 4 END | Both | Both shirts sway; slow pull-back revealing the gym, plus a continuous digital drift (zoom 1.06→1.00) so it is still moving at the cut |

**Motion check:** mean absolute frame difference per 0.5 s across the whole cut is never below 0.70, and the last 0.5 s reads 1.55. There is no frozen hold anywhere.

## How the print stayed exact
- Every plate was generated with a **blank** shirt. The real files from `SWOLVATION_PRINT_FILES/` were composited with `tools/compo.py` in the Higgsfield sandbox, fetched from raw.githubusercontent.com on this branch.
- Each Kling clip is anchored at both ends on that composite:
  - **start** = the composited frame (or, for the pull-back, a tight crop of it);
  - **end** = a digital crop of the same composite that matches the camera move. `tools/frames.py` builds both.
- Mid-motion, the print is Kling's rendering between two exact anchors. Full-resolution frames at 1.5, 2.0, 2.5, 3.0 and 3.5 s were checked:
  - "Be strong and courageous" and the Joshua 1:9 tag, the Philippians 4:13 arc text, the thorn-vine sleeves, and the cross + SWOLVATION chest mark all stay legible and correct.
  - No person, hand or body part appears in any frame.

### Composite placements (plate px, 1520×2688; quad = TL, TR, BR, BL)
| Frame | Art | Quad | Flags |
|---|---|---|---|
| c1 | TEE_BACK_be-strong-and-courageous_12in | 534,890 · 864,890 · 864,1330 · 534,1330 | `--disp 3 --fold 20` |
| c2 | LONGSLEEVE_BACK_philippians-4-13_12in | 366,917 · 778,917 · 778,1605 · 366,1605 | `--disp 3 --fold 20` |
| c2 | LONGSLEEVE_SLEEVE_LEFT_thorn-vine | 215,1000 · 310,1000 · 290,1392 · 195,1392 | `--disp 2` |
| c2 | LONGSLEEVE_SLEEVE_RIGHT_thorn-vine_mirrored | 874,1000 · 969,1000 · 977,1392 · 882,1392 | `--disp 2` |
| c3 | TEE_FRONT_cross-wordmark_chest | 497,1411 · 685,1397 · 697,1560 · 509,1574 | `--disp 2 --fold 14` |
| c4 | TEE_BACK_be-strong-and-courageous_12in | 404,813 · 674,813 · 674,1173 · 404,1173 | `--disp 2.5` |
| c4 | LONGSLEEVE_BACK_philippians-4-13_12in | 927,839 · 1155,839 · 1155,1219 · 927,1219 | `--disp 2.5` |

## Plates (GPT Image 2.5, quality high, 2k, 9:16, 2.75 credits each)
All passed QA: no people, plain shirts, real-world settings, film look. Prompts are verbatim from the plan.

| # | Job | Result |
|---|---|---|
| 1 Garage gym, tee on J-hook | `a8b104d9-0abd-4a45-ac1f-6b2061548289` | [png](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261013_180759_a8b104d9-0abd-4a45-ac1f-6b2061548289.png) |
| 2 Fence at dusk, long sleeve | `ad5f2215-4f2a-43a2-83e2-bb0a8e7ef5d8` | [png](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261013_180759_ad5f2215-4f2a-43a2-83e2-bb0a8e7ef5d8.png). **Failed one gate:** a faded painted cross emblem on the brick wall counts as an invented logo. |
| 2e Plate 2, sign removed (used) | `b302b8cc-f810-4e06-b80f-bc1aa244c48c` | [png](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261013_181658_b302b8cc-f810-4e06-b80f-bc1aa244c48c.png). This used the plan's 5th-plate allowance (plate 1 had passed). It is an edit with plate 2 as `image_references`, and the result is otherwise identical. |
| 3 Bench + barbell, folded tee | `a1409844-ff31-41cb-a964-350aea04dd52` | [png](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261013_180759_a1409844-ff31-41cb-a964-350aea04dd52.png) |
| 4 Rack by roll-up door, both | `e639cdd8-4233-466d-becd-52919b4c3611` | [png](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261013_180801_e639cdd8-4233-466d-becd-52919b4c3611.png) |

**Plate 2e edit prompt:**
> Edit this exact photograph. Remove the faded painted circular sign/emblem on the brick wall at the upper middle of the building, replacing it with plain weathered red brick that matches the rest of the wall. Change nothing else: keep the identical framing, the same plain black long-sleeve shirt on the hanger on the chain-link fence, the fence, the windows, the dusk sky, the sun, the dumpster, the cracked asphalt, the colours and film grain exactly as they are. No text, no logo, no people.

(A local clone-patch was tried first. It duplicated the fence rail and a strip of sky, so it was rejected.)

## Kling clips (Kling 3.0, mode pro, 5 s, 9:16, sound off, declined_preset_id `24bae836-2c4a-48e0-89b6-49fcc0b21612`, 8.75 credits each)
Every shot passed on take 1, so the 2-round stop rule never triggered and the retake allowance was not used.

### Shot 1 HOOK: `e6bae7cc-a0a0-4063-8f4e-fdca2e94bb7d`
- [mp4](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261013_182128_e6bae7cc-a0a0-4063-8f4e-fdca2e94bb7d.mp4)
- start = c1 full ([`36577e22`](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/36577e22-5146-465b-a30e-fd2725448a03.jpg)); end = c1 crop 1.22× on the print ([`8744030d`](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/8744030d-6694-4b70-abf7-7e61c4de5f85.jpg))
> Dark garage gym at night, no people anywhere. A black t-shirt hangs on the squat rack hook. Air from the box fan on the floor continuously ripples the hem and sleeves of the shirt, the fabric moving gently the whole time. Fine chalk dust drifts and swirls through the beam of the caged work light. The camera makes a slow, steady handheld push-in toward the printed back of the shirt, one continuous move, never stopping. The printed graphic stays fixed on the fabric and moves only with the cloth. Realistic, grainy, desaturated 35mm film look. No people, no hands, no text changes, no cuts.

### Shot 2: `78e7d2a7-cabc-4b13-ace5-9f073afb81ee`
- [mp4](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261013_182516_78e7d2a7-cabc-4b13-ace5-9f073afb81ee.mp4)
- start = c2 full ([`252598da`](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/252598da-b922-42c4-bd1c-15b70d2f5276.jpg)); end = c2 crop 1.15× shifted right ([`fe4b89b6`](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/fe4b89b6-87db-45e7-b903-53ecb56700c3.jpg))
> Dusk outside an old brick gym, no people anywhere. A black long-sleeve shirt hangs on a hanger on a chain-link fence. Wind continuously lifts and sways the long sleeves and the hem, the fabric moving the whole time; dry leaves and grit skitter across the cracked asphalt. The camera makes a slow lateral tracking move to the right along the fence while gently easing closer, one continuous move, never stopping. The printed graphics on the back and sleeves stay fixed on the fabric and move only with the cloth. Realistic, grainy, desaturated 35mm film look, last warm light on the horizon. No people, no hands, no new text, no cuts.

### Shot 3: `b5ac2b97-dd5d-424c-8bba-4ceb05645a13`
- [mp4](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261013_182128_b5ac2b97-dd5d-424c-8bba-4ceb05645a13.mp4)
- start = c3 full ([`4066f37b`](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/4066f37b-2d4e-433c-ae39-e945faf194bd.jpg)); end = c3 crop 1.25× on the shirt ([`07915622`](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/07915622-5e28-4502-9828-55c9802e965f.jpg))
> Gym floor, no people anywhere. A folded black t-shirt lies on a worn flat bench beside a loaded barbell. A soft cloud of white chalk dust drifts slowly across the frame through the hard side light the whole time, settling and swirling. The camera glides low and smoothly on a slider, moving past the iron plates and pushing in toward the folded shirt, one continuous move, never stopping. The small chest print stays fixed on the fabric. Realistic, grainy, desaturated 35mm film look. No people, no hands, no new text, no cuts.

### Shot 4 END: `a2bdef66-d328-451c-9c28-f9a2ab9e54ea`
- [mp4](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261013_182128_a2bdef66-d328-451c-9c28-f9a2ab9e54ea.mp4)
- start = c4 crop 1.22× on the shirts ([`59aeb053`](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/59aeb053-db8d-46e0-a432-6d331c2cdaa2.jpg)); end = c4 full ([`cb244771`](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/cb244771-83bf-4aa9-9061-06db6ed44045.jpg)). Both ends are the exact composite.
> Garage gym, no people anywhere. Two black shirts, a tee and a long sleeve, hang side by side on a steel rack near a half-open roll-up door with daylight leaking in. A breeze from the door makes both shirts sway gently and continuously on their hangers, the fabric moving the whole time; dust floats in the daylight. The camera slowly pulls back, revealing more of the gym, one continuous move that keeps drifting. The printed graphics stay fixed on the fabric. Realistic, grainy, desaturated 35mm film look. No people, no hands, no new text, no cuts.

## Edit
`tools/edit.sh`:
- Each clip is trimmed to 120 frames (5.0 s), with hard cuts between them.
- Shot 4 is upscaled 2× and zoompanned 1.06→1.00 so the drift continues to the last frame.
- x264 CRF 17.
- Two-pass `loudnorm` to −14 LUFS, AAC 256k.

## Credits
| Item | Credits |
|---|---|
| 4 blank-shirt plates | 11.00 |
| Plate 2 sign-removal edit (the plan's 5th-plate line) | 2.75 |
| 4 Kling pro clips × 5 s | 35.00 |
| **Planned spend** | **48.75** |
| 4 duplicate plates from the parent session (see below) | 11.00 |
| **Charged** | **59.75** |

**Balance:** 185.36 before → 125.61 after.

**Over the 57.5 cap by 2.25.** That overage was caused by the parent session, not Higgsfield.
- The four extra GPT Image 2.5 jobs at 18:15:52–53 UTC (`d8e4532e…`, `589d5f41…`, `9468f5be…`, `81d0e3dc…`) were submitted by the parent session.
- When Higgsfield reconnected there, it started producing the same plan without first checking whether this session had already started.
- They were billed correctly, so there's nothing to claim from Higgsfield support.
- They aren't used in the ad, but they are usable alternate plates in the project folder.

**When you post:** turn on each platform's AI-content label. The scenes are AI-generated; the prints are your real artwork, composited.
