# No-people motion ad: plan (ready to run)

## Why
An ad was rejected for relying on "still images… animated slides, or looping content with little to no meaningful movement". The new rules:
- real motion the whole time;
- the product in a real environment;
- **no AI humans** (your call: they look cheesy).

## The rules this ad follows
- **Every shot moves for real:**
  - fabric moving in wind or fan air;
  - chalk dust drifting;
  - a moving camera (push-in, track, pull-back).
- No stills, no fake zooms on photos, no long frozen end hold. The last shot keeps drifting until the cut.
- **Real-world places:** a garage gym, a chain-link fence outside at dusk, a gym floor.
- **Both shirts:** the *Be Strong and Courageous* tee and the *Philippians 4:13* long sleeve.
- **Prints are never AI-drawn at the anchors.** The blank shirt is generated, then the real print files are composited with `tools/compo.py`.
- **Each Kling clip is anchored at both ends:**
  - start = the composited frame;
  - end = a digital crop of the same composited frame (a tighter crop for a push-in, a wider one for a pull-back).
  - So the camera move begins and ends on the exact artwork. Only the moving fabric mid-shot is rendered by the video model, and it gets checked frame by frame.

## Shot list (9:16, about 20s total, Kling 3.0 pro, silent, 5s each)
| # | Shirt | Real-world setting | Movement |
|---|---|---|---|
| 1 HOOK | Tee (back) | Dark garage gym; the tee hangs on a squat-rack J-hook | Box-fan air ripples the hem and sleeves; chalk dust in the work-light beam; handheld push-in toward the back print |
| 2 | Long sleeve (back + sleeves) | Chain-link fence outside an old brick gym at dusk | Wind lifts and sways the sleeves; slow lateral track along the fence |
| 3 | Tee (front chest) | Folded on a worn flat bench beside a loaded barbell, gym floor | Chalk cloud drifts across; low slider move past the plates to the shirt |
| 4 END | Both | Both hanging side by side on a rack by a roll-up door, daylight leaking in | Shirts sway gently; slow pull-back revealing the gym; still drifting at the cut (logo and drop date added as in-app text) |

**Audio:** original synth bed (no licensing). Wind, fan hum, a distant plate clank, and a low dark pulse, at −14 LUFS. A silent version is included too.

## Budget (inside the remaining ≈ 68 of the approved ≈ 210)
| Item | Credits |
|---|---|
| 5 blank-shirt plates (GPT Image 2.5 high, 2k, 9:16) | 13.75 |
| 4 Kling pro clips × 5s | 35 |
| 1 retake allowance | 8.75 |
| **Total** | **≈ 57.5** |

The 4K Topaz pass is optional (≈ 15 for the 20s edit). I'll ask before running it.

## Plate prompts (blank shirts; prints composited after)
1. Vertical 35mm film still, dark garage gym at night: a faded-black heavyweight oversized boxy t-shirt hangs from the J-hook of a worn black squat rack, seen straight on from the BACK, back panel flat and completely plain, no print, no logo. A small industrial box fan on the floor to the side, a single caged work light overhead, chalk dust in the beam, rubber floor, iron plates stacked, no people. Desaturated, fine grain, black and charcoal with warm tungsten. Not glossy, not CGI. No text.
2. Vertical 35mm film still at dusk: a faded-black heavyweight long-sleeve t-shirt hangs on a hanger hooked onto a chain-link fence outside an old brick gym, seen from the BACK, sleeves hanging straight down, back panel and sleeves completely plain, no print, no logo. Cracked asphalt, a rusty dumpster far behind, last warm light low on the horizon, no people. Desaturated film look, fine grain. No text.
3. Vertical 35mm product photo on a gym floor: a faded-black heavyweight oversized t-shirt folded on a worn black vinyl flat bench, plain front chest panel facing up, no print, no logo; a loaded barbell with worn iron plates beside the bench in soft focus, a chalk bowl, chalk dust in a hard side light, no people. Desaturated, fine grain. No text.
4. Vertical 35mm film still: two faded-black heavyweight shirts, a short-sleeve tee and a long-sleeve tee, hang side by side on a black steel rack near a half-open roll-up garage door with daylight leaking under it, both seen from the BACK, completely plain, no print, no logo. Concrete floor, plates and a bench in the dark, no people. Desaturated, fine grain. No text.
5. Alternate for shot 1 (a second variation) if plate 1 fails QA.

## QA gates (the 2-round stop rule still applies)
- Reject any frame with a person, a hand, invented text or logos, a garbled print mid-motion, plastic-looking fabric, or a clean or bright commercial look.
- If a shot still isn't premium after 2 takes, I stop and report instead of spending more.
