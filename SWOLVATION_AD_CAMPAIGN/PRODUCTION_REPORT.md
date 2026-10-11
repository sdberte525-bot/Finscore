# SWOLVATION paid social campaign: production report

*11 Oct 2026*

**Download everything:** [SWOLVATION_AD_CAMPAIGN_media.zip](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/24942aea-f813-4e6d-9a31-0ca88cfb7a3e.zip) (90 MB: 7 videos, 8 stills, 11 approved keyframes).

The individual links are in `06_FINAL_VIDEO_ADS/README.md` and `07_SOCIAL_IMAGE_ADS/README.md`.

**Edit pipeline** (scripts, edit decision lists, sound specs, to re-cut or update the ads): [SWOLVATION_ad_pipeline_tools.zip](https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/a208026f-b4ae-4d26-9bcb-c8a49ae45bf8.zip)

## Actually created (rendered, exported and inspected)

| Asset | Count | Status |
| --- | --- | --- |
| Final 9:16 video ads (1080×1920 MP4) | 7: A 15s, A 6s, B 12.6s, B 6.6s, C-tee 11s, C-long sleeve 11s, D 8.6s | ✅ Passed review. Average scores 7.4–8.1/10 |
| 4:5 still ads (1080×1350 JPEG) | 8 | ✅ Passed review |
| New generated keyframes | 13 (11 approved, 1 approved after a composite fix, 1 rejected) | See `05_GENERATED_SHOTS` |
| New generated video shots | 14 (9 approved in full, 3 approved after trimming, 2 approved but unused) | See `05_GENERATED_SHOTS` |
| Original sound design | 7 mixes, −14 LUFS | ✅ No licensed music, so no copyright risk |
| Documents | Research, creative direction, references, storyboards, shot log, copy, test plan, QA | ✅ In this folder |

## Process
1. **Audit:**
   - the real artwork files
   - the launch pack (11 earlier ads, 30 photos)
   - every earlier generated clip
   - the Higgsfield balance (158.72 credits) and the models available through this integration: Nano Banana Pro stills, Kling 3.0 image-to-video.
   - Higgsfield's standalone music generation isn't available here, so all sound was synthesised from scratch.
2. **Research:** the three competitors' storefronts and public summaries (`01_BRAND_RESEARCH`).
3. **Keyframes:** generated only from real product photos and verified frames. Every print was checked word by word against the artwork files.
4. **Video:** image-to-video with one slow move per shot and the garment held still. Every clip was checked at its first, middle and last frame at full resolution.
5. **Fixes without extra credits:**
   - trimmed a clip where a wrist appeared
   - trimmed a clip where lettering drifted
   - composited the real chest print over a wrong emblem
   - repainted out a ghost garment
   - dropped a clip with an ambiguous background shape
6. **Edit:**
   - in-house pipeline (ffmpeg, Playwright typesetting in the site's own fonts, synthesised sound)
   - consistent grade and grain
   - text inside platform safe zones
   - loudness-normalised
7. **Review:** scored every video (`10_QUALITY_REVIEW`), fixed what failed, re-rendered.

## Credits

| | |
| --- | --- |
| Start | 158.72 |
| Spent | 148.50 (13 stills × 2 + 14 videos × 8.75) |
| Left | **10.22**, a reserve for one retake |

## What needs improvement
1. **Check garment colour against a real PODpartner shirt before scaling spend.** The imagery shows washed vintage black, and the blank may be deeper black. This is the main accuracy risk.
2. **The studio turns (v10, v48)** are the least photographic shots, and v10's chest emblem is close to the artwork but not exact. Replace them with a real photographed turn when samples arrive.
3. **Hooks:** A and D open more slowly than the conversion ads (A is dark by design). Lead paid tests with C and B6. Use A for organic and retargeting.
4. **Sound** is clean and original but synthesised. A real Foley pass (fabric, iron, room) would add realism.

## Blocked / not done
- **No ads published, no billing connected, no spend authorised**, per the brief. `09_PAID_AD_TEST_PLAN` is ready for your approval.
- **Meta Ad Library / TikTok Creative Center review of competitor ads:** these weren't reachable from this environment. The research uses storefronts and third-party summaries. Check the Ad Library yourself before launch.
- **breathedivinity.org timed out.** The brand's breathedivinity.com storefront was used instead.
- **Media files aren't stored in git.** This environment's network can't host them, so they live in the Higgsfield media library at the links above. Download the zip and keep a copy.
- **Real-product photography** would need physical samples and can't be generated.

## Brief compliance
- **No people** in any final. Two clips that drifted toward human shapes were cut.
- **Real artwork only.** Nothing redesigned, recoloured or moved.
- **No claims** about fabric, print method, durability or comfort. No scarcity. "Drop 001" is accurate because this is the first release.
- **No banned phrases.** No VFX clichés. No copyrighted music.
