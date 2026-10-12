# 7. Realism QA review

## Checklist (applied to every still and every video frame grab)
| Area | Pass condition |
|---|---|
| **Identity** | Same face as ref 01: beauty mark below her right eye, brows, nose, lips, jaw. Same hair colour, length and wave. Same eye colour. |
| **Skin** | Pores and texture visible; no plastic or airbrushed look; sweat plausible; no invented tattoos, moles or scars. |
| **Anatomy** | Muscle shapes plausible for an advanced female bodybuilder. Joints bend the right way; no extra or missing limbs; neck and shoulders connect naturally. |
| **Hands** | Five fingers each; the grip wraps the bar or dumbbell; no fused fingers; nothing passes through objects. |
| **Motion (video)** | No face or body morphing between frames; hair and cloth move with the body; no sudden jumps; the loop point is invisible. |
| **Exercise mechanics** | The cable stays attached and taut; weights don't float or vanish; range of motion and tempo are realistic; elbows stay pinned on curls; lateral raises reach shoulder height. |
| **Environment** | Dark commercial gym, linear LED strips; background people small, blurred and not identifiable; no garbled signage. |
| **Brand and legal** | No logos except verified SWOLVATION artwork. Print matches the source file by crop. No resemblance to the reference creator or anyone real. |

## Log: 12 Oct 2026

| Item | Model / job | Result | Defects | Action |
|---|---|---|---|---|
| Ref 01 front portrait | Soul 2.0, text only · `89edf381` · 0.12 cr | ✅ **Pass, approval candidate** | Minor: the sports bra reads mauve-rose rather than bright pink (now locked as "dusty pink"). Arms are mostly out of frame, so physique still needs the full-body and flex refs. Cleavage-forward framing; later refs will frame more neutrally. | Saved as Element `swolvation-athlete-01` |
| Ref 02 side profile | Soul 2.0 + ref · `ecf8df78` · 0.12 | ❌ Fail | Front-facing, not a profile; different face; heavy glam makeup; partial garbled text on the bra hem | Redo with Nano Banana Pro + Element |
| Ref 03 full body | Soul 2.0 + ref · `cb80ea6f` · 0.12 | ❌ Fail | Chest-up, no legs; different face; no bodybuilder physique; an arm tattoo appeared | Redo |
| Ref 04 flex | Soul 2.0 + ref · `06bb2c25` · 0.12 | ❌ Fail | No flex pose; different face; glam framing | Redo |
| Ref 05 gym pose | Soul 2.0 + ref · `3193a2a6` · 0.12 | ❌ Fail | No cable or bar; different face; an eye-area tattoo appeared | Redo |
| Ref 06 casual | Soul 2.0 + ref · `498b6440` · 0.12 | ❌ Fail | No hoodie, no smile; different face | Redo |

**Root cause of all five failures:**
- Soul 2.0 turned on `enhance_prompt` when given an image reference.
- It replaced the instructions with an auto-caption of the reference, and the job records confirm it.
- Not a prompt-quality problem; the tool path was wrong.
- **Fix:** Element + Nano Banana Pro (`06_HIGGSFIELD_WORKFLOW.md`).

**Videos:** none generated yet, so there are no video defects to report. This log gets a row per take once they're made.

## Spend so far on this project
| Item | Credits |
|---|---|
| 6 Soul 2.0 images (1 pass, 5 fail) | 0.72 |
| Element creation, cost quotes, option lookups | 0 |
| **Total** | **0.72** (balance 0.83 → 0.11) |

---

## Log: round 2 (12 Oct 2026): locked identity and 3 videos

**Stills** (Nano Banana Pro + Element; 2 credits each):

| Item | Job | Result | Notes |
|---|---|---|---|
| Anchor v1 ×2 | `7d64466b`, `a0a1adda` | ❌ | Face consistent; physique only "fit"; hair shoulder-length |
| Anchor v2 ×2 | `e2be914f`, **`b39ec647`** | ✅ `b39ec647` locked | Full-res check: real pores, natural teeth, beauty mark, true muscle. `e2be914f` was good but had less mass |
| Side profile | `dfa237c9` | ✅ | |
| Full body | `78b3048a` ❌ → `b50a8e7a` ✅ | | First take: a tripod and phone blocked her torso |
| Flex | `99f17ad9` ❌ → `930ea2a0` ✅ | | First take: arms down, no double biceps |
| Cable pose | `cbf62998` ❌, `94707ca2` ❌, `8f97b0de` ❌ → `4e65e594` ✅ | | One-handed, then high pulley (pushdown mechanics) twice; fixed by a text-only prompt with explicit low-pulley mechanics |
| Casual portrait | `2c396c56` | ✅ | Carries the 2nd reference's warmth (traits only) |
| V2 start frame | `b8c63ff7` | ✅ | |
| V3 start frame (tee) | `0adc5782` | ✅ | Chest print crop-checked against `tee-front_original.webp`: flared cross, thorn branches, "SWOLVATION" serif caps ✓ |

**Videos** (Kling 3.0 pro, silent):

| Video | Job | Credits | Result | Checks |
|---|---|---|---|---|
| V1 Arm day | `55d8e192-3c36-4ada-bc4d-ca33168244cf` | 19.25 | ✅ | 3 full reps; both hands stay on the bar; the carabiner and cable stay attached and taut through every rep; elbows pinned; face consistent; glances and smiles; start and end frame were the same image, so the measured seam difference is 1.35/255 (seamless loop) |
| V2 Shoulder pump | `18184528-49f0-44f2-ae1b-fc7ecdde849e` | 17.5 | ✅ (minor) | 4 strict raises to shoulder height; dumbbells keep their size and grip; natural effort (eyes close mid-rep); ends on a big smile. *Minor:* hands leave the frame at the top of each raise |
| V3 Faith over fear | `7633c8b4-2ed6-43b3-acd5-f244451dde4c` | 17.5 | ✅ | Eyes closed, head bowed, then eyes open and a calm smile; face consistent; print legible and stable at 0.5s, 3s, 6s and 9.5s; end card from the real logo file (text kept inside x 183–899 px, clear of the TikTok button rail) |

**Finishing:**
- 1080×1920, 30 fps, CRF 17, light matched grade.
- Original audio: V1 −14.3 LUFS / −1.7 dBTP; V2 −14.3 / −2.0; V3 −14.0 / −3.6.
- No burned-in captions.

**Spend round 2: 86.25 credits** (32 stills + 54.25 video). Balance 413.86.
