# SWOLVATION brand visual direction

## What we're selling

Two real garments, both black with cream distressed screen prints:

| Garment | Front | Back | Sleeves |
| --- | --- | --- | --- |
| **Be Strong & Courageous** (oversized tee) | Small thorned cross over "SWOLVATION" (serif caps), left chest | Arched blackletter "Be strong and courageous.", thorned gothic cross between two skulls, "JOSHUA 1:9", thorn ornament | Plain |
| **Through Christ Who Strengthens Me** (long sleeve) | Small thorned cross over "SWOLVATION", left chest | Arched blackletter "I can do all things through Christ who strengthens me." around a skull on a thorned cross, "PHILIPPIANS 4:13" | Cream thorned vines down both sleeves |

The back print is the hero of both pieces, so the ads lead with the back.

The source of truth is `assets/source/reference/higgsfield/` (flattened copies of `assets/source/photos/`). Anything generated is checked against these files. If a generated image differs in lettering, graphic or placement, it is rejected.

## The idea in one line

**The gym is the church. The iron is the test. The shirt is what you wear to it.**

SWOLVATION = swole + salvation. The pun gets attention, but the brand is serious: strength built through adversity, with faith underneath it. The scripture is printed on the garments. The ads don't preach. They let the shirt say it.

## Creative rules

1. **No people.** This is a deliberate choice: AI people look fake. The world does the talking instead: iron, chalk, light, worn rubber and empty gyms that show signs of work. The viewer imagines themselves in the empty room, and the shirt is the only "character."
2. **The product is never invented.** Every frame where the shirt is the subject comes from a reference-guided image that passed a lettering check. Brand text in the edits is typeset, never generated.
3. **Restraint.** Few words, held long. Sound and silence do the work.
4. **Evidence of work, not performance of work.** Chalk in the knurling, a bar still settling, dust in a light beam. No VFX explosions, fire or lightning.

## Look

- **Light:** one hard source (caged lamp, high window, sunbeam) with deep falloff. Texture over gloss.
- **Palette:** iron black `#111111`, charcoal `#222222`, bone `#F5F3EF`, vintage cream `#E8E0D1` (matches the print), and oxblood `#7A2A22` as a rare accent. This matches the website.
- **Grade:**
  - Underground: cool-neutral shadows with warm highlights.
  - Vintage Era: golden, slight halation, lifted blacks.
  - New Generation: clean neutral, deep blacks.
- **Texture:** fine 35mm grain on everything, so AI clips and stills sit together.

## Typography (edits and graphics)

- **Big Shoulders 800, uppercase**: headlines and the SWOLVATION wordmark (same as the website).
- **Archivo**: small supporting lines (product name, scripture reference, "THE FIRST DROP").
- Cream (`#E8E0D1`) on black. One line on screen at a time, centred, inside platform safe zones.
- No futuristic fonts, outlines, glows or kinetic-typography gimmicks.

## Voice

Short. Declarative. Earned confidence, never hype.

- Yes: "Built through adversity." · "No crowd. No cameras. Just the work." · "Iron sharpens iron."
- No: "🔥 INSANE NEW DROP 🔥", fake scarcity, "best gym shirt ever", invented reviews.

## Lines

| Use | Line | Notes |
| --- | --- | --- |
| Brand line (keep) | **BUILT THROUGH ADVERSITY.** | Already the site's tagline; carries the faith-and-iron meaning without preaching |
| Campaign alt | **IRON SHARPENS IRON.** | Proverbs 27:17. Fits the community angle and the scripture on the shirts |
| Campaign alt | **STRENGTH HAS A PURPOSE.** | Used on the site's story section |
| Brief's starting line | MORE THAN A WORKOUT. A WAY OF LIFE. | Fine but generic. Use as a caption, not a headline |
| Closing CTA (pre-launch) | **THE FIRST DROP** / **COMING SOON** / **MEET SWOLVATION** | Only switch to "AVAILABLE NOW" once checkout is live |

## Claims we don't make

No discounts, reviews, testimonials, limited-quantity or sell-out claims, celebrity ties, or fabric or fit specs. Fabric, fit and care are still `null` in `src/data/products.ts`.
