# Production in motion: teaser (13s, 9:16, no people)

*13 Oct 2026. A recreation of the reference "production in motion" reel (embroidery macro, press, sleeve detail, garment reveal) using SWOLVATION's own product and process. Nothing posted.*

## Deliverables (1080×1920, 30 fps, 13.2s)
- **With sound:** [MP4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/21d0fff3-ac3c-43be-9744-6232ff5269cc.mp4). Original synthesized sound design, −13.9 LUFS, nothing to license.
- **Silent:** [MP4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/b2daef30-6110-47bb-b07b-0df06f74fafb.mp4)
- **4K (2160×3840), Topaz upscale of the final edit:**
  - **With sound:** [MP4](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/84b54bff-0e80-4386-ad1b-ae6ca32537fb.mp4). HEVC, 13.2s, the same sound mix as the 1080 version.
  - **Silent:** [MP4](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261013_223328_94d182af-97a6-4fa5-abe4-68d9a1f68123.mp4) (Topaz job `94d182af`)
  - Checked at 5.5s: the "Be strong and courageous" blackletter print is sharp and correct.
  - Most apps convert uploads down to 1080 anyway. Post the 4K where the app accepts it, or keep it as the master copy.

| Time | Shot | Reference beat it replaces |
|---|---|---|
| 0–2.5s | Macro: a direct-to-garment print head glides over black cotton and lays down a line of cream ink | Embroidery needle macro |
| 2.5–4.3s | A heat press slams down on the parchment-covered tee, with a burst of steam | Press machine |
| 4.3–7.0s | A slide and pull-back across the finished back print, "Be strong and courageous" (Joshua 1:9) | Sleeve script detail |
| 7.0–9.2s | A slide down the long-sleeve thorn-vine sleeve print | Script embroidery macro |
| 9.2–13.2s | Both shirts on invisible mannequins in a black void as a light beam sweeps across. The real cross + SWOLVATION lockup fades in at 11.4s. | Garment build-up and model (no people, by your rule) |

**Why it shows printing, not embroidery:** your print files are set up for direct-to-garment printing (see `SWOLVATION_PRINT_FILES/README.md`), so the process shown matches how the shirts are actually made.

## Print fidelity
- The prints were never drawn by AI at the anchors. The plates were generated blank, then the real files were composited with `tools/compo.py`:
  - tee back;
  - long-sleeve back;
  - both sleeve vines.
- Shots 3–5 are Kling clips anchored at both ends on those composites. Their start and end frames are digital crops for the camera move.
- Mid-motion frames were checked. The blackletter headline, the Philippians 4:13 arc, "JOSHUA 1:9" and the vines stay correct and legible.
- **Known minor issue:** shot 2's press changes shape slightly as it slams. It sits inside 0.3s of fast motion and steam, so it isn't noticeable at speed.

## Jobs and settings
- **Plates:** GPT Image 2.5, quality high, 2k, 9:16, 2.75 credits each.

| Plate | Job | Use |
|---|---|---|
| p1 | `9b4e3582` | print head |
| p2 | `e23194f8` | heat press |
| p3 | `06c347f1` | back on platen |
| p4 | `b5b5cd6f` | sleeve |
| p5 | `5bc49de1` | ghost mannequins |

- **Clips:** Kling 3.0 pro, sound off, 9:16, preset declined.

| Shot | Job | Length | Credits | Anchors |
|---|---|---|---|---|
| 1 | `ac355644` | 3s | 5.25 | start = p1 |
| 2 | `84b50152` | 3s | 5.25 | start = p2 |
| 3 | `1e9efe28` | 3s | 5.25 | start/end = composite crops 2.0× and 1.3× |
| 4 | `b6515968` | 3s | 5.25 | start/end = sleeve crops 1.9×, top and bottom |
| 5 | `9ebd8952` | 4s | 7 | start/end = full composite and 1.15× |

- Every shot passed on the first take.
- **Edit:** `~/pm/tools/edit.sh` in the Higgsfield sandbox.
  - Trims: 0.25–2.75, 0.35–2.15, 0.1–2.8, 0.4–2.6, 0.2–end.
  - Light contrast grade.
  - Lockup overlay at y = 1380.
- **Sound:** `sfx.py` synthesizes everything:
  - a 41/55 Hz drone;
  - a 70 bpm half-time pulse;
  - print-head whir panned left to right;
  - a whoosh into each cut;
  - the press slam at 3.53s with a steam hiss;
  - a sub boom on the logo at 11.4s;
  - loudness normalized to −14 LUFS.

## Credits
| Item | Credits |
|---|---|
| 5 plates | 13.75 |
| 5 Kling clips | 28.00 |
| Topaz 4K | 12.00 |
| **Total** | **53.75** (approved ≈ 67) |

Balance: 125.61 → 71.86.

**When you post:** turn on the platform's AI-content label. The scenes are AI-generated; the prints are your real artwork, composited. Suggested caption: "Production in motion. Something different is coming." Add your drop date as in-app text.
