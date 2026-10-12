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
