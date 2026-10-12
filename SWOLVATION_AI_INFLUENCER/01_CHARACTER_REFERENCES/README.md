# 1. Character reference images

**Status: 1 of 6 approved-candidate, 5 rejected, 5 to redo.** Nothing has gone to video.

The images live in your Higgsfield library (this environment can't download from Higgsfield's CDN into the repo). Open the links, or look in Higgsfield → History.

| # | Slot | Status | Job ID | Link |
|---|---|---|---|---|
| 01 | Front portrait | ✅ **Approval candidate**: identity anchor, saved as Element `swolvation-athlete-01` (`853d0aaa-2bc3-4850-a0bf-f6964daf5493`) | `89edf381-382f-4939-b05b-bb00a8817901` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261012_182154_89edf381-382f-4939-b05b-bb00a8817901.png) |
| 02 | Side profile | ❌ Rejected: front-facing selfie, different face | `ecf8df78-11e7-432d-b66b-0821c4a354e7` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261012_183114_ecf8df78-11e7-432d-b66b-0821c4a354e7.png) |
| 03 | Full body standing | ❌ Rejected: chest-up selfie, different face, no legs or physique | `cb80ea6f-309a-4bbb-be21-acb4982172f7` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261012_183027_cb80ea6f-309a-4bbb-be21-acb4982172f7.png) |
| 04 | Upper-body flex | ❌ Rejected: no flex, different face | `06bb2c25-8800-4fd6-8db9-aaeb8905ef90` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261012_183026_06bb2c25-8800-4fd6-8db9-aaeb8905ef90.png) |
| 05 | Natural gym pose (cable) | ❌ Rejected: no cable or pose, different face, invented eye tattoo | `3193a2a6-c46b-4c7d-acf5-fc11ad4e6db0` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261012_183026_3193a2a6-c46b-4c7d-acf5-fc11ad4e6db0.png) |
| 06 | Casual smiling portrait | ❌ Rejected: no hoodie, no smile, different face | `498b6440-2dfc-4a6f-a77a-65fe4f435aed` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea/hf_20261012_183027_498b6440-2dfc-4a6f-a77a-65fe4f435aed.png) |

## Why 02–06 failed (root cause, confirmed from the job records)
- When an image reference is attached, Soul 2.0 switched **`enhance_prompt` on by itself**.
- It then **replaced the written prompt with an auto-caption of the reference image**. Every rejected job's stored prompt begins "A straight-on close-up portrait of a young … woman", which is not what was sent.
- So the pose, framing and outfit instructions never reached the model. The result was five glam selfies with five different faces.
- Image 01 had no reference, kept `enhance_prompt: false`, and followed the prompt.
- **Lesson (now in the workflow):** don't use Soul 2.0 + image reference for pose or angle sheets.

## Redo plan (needs credits; see `00_START_HERE.md`)
- **Model:** Nano Banana Pro, 9:16, 2k, 2 credits each. It follows written pose instructions and honours reference images; that was proven on earlier SWOLVATION stills (e.g. R13).
- **Identity:** pass the Element placeholder `<<<853d0aaa-2bc3-4850-a0bf-f6964daf5493>>>` in each prompt.
- **Volume:** one take per slot (5 × 2 = **10 credits**). Allow one retake only for a slot that fails QA (up to 6 more).
- **QA rule for approval:** same face as 01 (beauty mark below her right eye, brows, nose, lips), same hair, plausible anatomy, correct hands, no invented tattoos or logos.

### Prompts (ready to run)
Every prompt starts with:
> `<<<853d0aaa-2bc3-4850-a0bf-f6964daf5493>>>, the exact same woman as the reference: same face, same small beauty mark on the cheekbone below her right eye, same long thick dark-brown wavy hair, same olive skin and brown eyes,`

…and ends with:
> `realistic unretouched skin with pores and light sweat, natural anatomy, correct hands with five fingers, candid smartphone photo, dark modern commercial gym with black equipment and linear white LED ceiling lights, single person only, no text, no logos, no tattoos.`

| Slot | Middle of the prompt |
|---|---|
| 02 Side profile | `strict 90-degree side profile facing right, head to waist, standing beside a cable machine between sets, calm focused expression, hair falling down her back, huge rounded deltoid, thick triceps and biceps, forearm veins, lean waist, plain dusty-pink sports bra` |
| 03 Full body | `full-body head-to-toe photo with both feet visible, standing relaxed facing the camera, phone on a tripod at waist height, advanced female bodybuilder: very large rounded shoulders and arms, big biceps and triceps, lean abs, tiny waist, powerful quads with separation, strong calves, plain dusty-pink sports bra and matching high-waist leggings, white training shoes, friendly closed-mouth smile` |
| 04 Flex | `waist-up, front double-biceps pose, both arms raised, huge peaked biceps, forearm veins, capped deltoids, laughing playfully at the camera, plain dusty-pink sports bra, fists closed naturally` |
| 05 Natural gym pose | `photographed from her side at chest height, standing at a cable machine holding a chrome straight-bar attachment at her thighs, glancing over her shoulder at the camera with a small confident smile, plain dusty-pink sports bra and leggings, a few out-of-focus people far in the background` |
| 06 Casual portrait | `chest-up, laughing with a big natural open smile showing teeth, sitting on a gym bench after training, oversized plain black zip hoodie open over a black sports bra, no logos, warm light from a reception area` |
