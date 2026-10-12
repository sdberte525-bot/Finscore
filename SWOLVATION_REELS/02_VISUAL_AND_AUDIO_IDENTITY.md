# 2. The SWOLVATION reel system ("Iron Noir")

The goal: someone recognizes a SWOLVATION reel in the first second, without reading the username.

## Frame
- **Format:** 1080×1920, 9:16, 30 fps, H.264 High at CRF 17, AAC 256 kbps 48 kHz, faststart. Works for Instagram Reels, TikTok and YouTube Shorts.
- **Grade "Iron Noir"** (`tools/reel.py`):
  - full black and white;
  - shadows crushed to true black;
  - paper whites pulled down to about 55% (engravings) or 90% (photos), so the image never out-shines the type;
  - two stacked vignettes, so the edges always fall to black.
- **Apparel grade:** `productwarm` keeps 32% saturation, so the cream print stays cream and the black stays black. Product color is never invented.
- **Texture:** monochrome film grain (luma only), plus a slow, irregular light flicker (±1.2%), like an old projector.
- **Motion:** one slow, eased push or drift per shot (4–12% over the shot). No shakes, zoom-punches or spins.
- **Transitions:** 0.6–1.0s crossfades between images. Every reel ends with one **hard cut to black** for the end card.
- **Weather layer:** procedural rain streaks (screen-blended on brightness only) and lightning flashes on storm reels.

## Type

| Role | Typeface | Style |
|---|---|---|
| **Original SWOLVATION writing** | **Cinzel** SemiBold, ALL CAPS, +0.05em tracking | Roman inscription capitals: stone, church, permanence. 60–112px. |
| **Scripture** (always KJV) | **Cormorant Garamond** Italic SemiBold | Book-like italic, in curly quotes. 70–96px. Never set in Cinzel, so scripture is never confused with our words. |
| **Scripture reference** | Cinzel, 34px, +0.3em, warm silver #D6D1C7 | Sits under a **64×2px deep-red rule (#7A1F1F)**, the only color in the system |
| **End card** | Thorned-cross mark (from the logo) + "SWOLVATION" in Cinzel, +0.55em | One subline: STRENGTH THROUGH FAITH (or product name · LINK IN BIO on apparel reels) |

All three fonts are under the SIL Open Font License, which allows commercial use. The files are in `project/fonts/`.

**Placement:**
- Text sits in a central block between **y 600 and 1300**: inside the TikTok/Reels safe area (clear of the top tabs, the right-hand buttons and the bottom caption bar) and inside the 3:4 grid crop.
- A soft radial **text bed** (black at about 60% in the center, fading to 0) fades in behind the words, so type is legible on any image.

**Motion:**
- Each line fades in over 0.45–0.8s while rising 14–20px.
- The key line is bigger and lands on the impact.
- Everything fades out together 0.5s before the cut.
- Lines never fly in, bounce or type on.

## Structure (every reel)
1. **0.0–0.15s:** first line visible. The hook never waits.
2. **The wound:** one or two short lines.
3. **The turn:** the bigger line, landing on a sub-bass impact or a chord change.
4. **The hold:** 3–5s for reading and replays.
5. **Hard cut to black, then the end card** (1.6–2.0s) with the signature bell.

## Audio identity (all original; `tools/score.py`)
- **Recurring palette:**
  - a low drone a fifth or octave under;
  - a slow minor pad;
  - single piano notes falling stepwise;
  - an "ah/oo" choir that enters on the turn;
  - a sub-bass "boom" on the key line;
  - an FM **signature bell** on every end card.
- **Chord change on the turn:** usually minor → its relative major, or a major-third lift (Picardy third), so the hope is *heard*.
- **Weather:** rain, wind and thunder are also synthesized.
- **Narration (5 reels):** the voice you chose, generated through Higgsfield's ElevenLabs engine. Each phrase was placed by hand in the timeline with longer pauses. Music ducks about 8–9 dB under the voice.
- **Mix:** −14 LUFS integrated, true peak ≤ −1.5 dBTP, 48 kHz stereo. That's the loudness Instagram, TikTok and YouTube normalize to.

## Do / don't
- ✅ One idea per reel. Under 25 words on screen for quote reels.
- ✅ Scripture verified against the KJV text and always referenced.
- ✅ Black stays dominant: if a frame looks "grey", re-grade it.
- ❌ No popular songs, no trending audio from other accounts on the business profile, no reused competitor wording.
- ❌ No faces, no AI "Jesus", no stock smiling models, no neon or influencer graphics.
- ❌ No emoji in on-screen text. Captions can use one or two.

## Reusing the template (about 20 minutes per new quote reel)
1. Copy `project/defs/r01.py` and change the three `q('…')` lines and their times.
2. Pick 1–2 images from `project/src/plates` (24 public-domain engravings) or the gym library.
3. Change the chord names in `score` for a new mood, and move the `boom` to the new punchline time.
4. Run `python3 defs/rNN.py`. Cards, score, mix and video all render.
