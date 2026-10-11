# Approved product references

Everything that shows a garment in these ads was checked against the files below.

## Source of truth (the real artwork)
In this repository, `SWOLVATION_PRINT_FILES/source/` holds the original artwork you supplied:

| File | What it is |
| --- | --- |
| `tee-back_original.webp` | Tee back: arched blackletter "Be strong and courageous.", thorned gothic cross between two skulls, thorn vine wrapping the cross, "JOSHUA 1:9", thorn ornament |
| `tee-front_original.webp` | Tee front (left chest): bold cross with flared, pointed ends ringed by a crown of thorns, "SWOLVATION" in serif capitals |
| `longsleeve-back_original.webp` | Long-sleeve back: arched blackletter "I can do all things through Christ who strengthens me.", screaming skull under a thorned cross with flame-like thorns, "PHILIPPIANS 4:13" |
| `longsleeve-front_original.webp` | Long-sleeve front (left chest): slim thorn-wrapped cross, "SWOLVATION" |
| `longsleeve-sleeve_original.webp` | Thorn-vine sleeve print (mirrored on the other sleeve) |

The print-ready versions (`SWOLVATION_PRINT_FILES/*.png`, cream `#F9ECD1`, 300 DPI) were used for:
- the logo on every end card
- the composite on the tee-front still (n8fix)

## Reference media in Higgsfield (inputs to every garment generation)

| ID | What |
| --- | --- |
| `fe70e5bd-1e91-41c7-97b9-68eeb059b829` | Tee back, product photo |
| `dc3c2fc7-0286-4eea-9e14-e0779b769273` | Tee front and back |
| `b2fcf71a-0e4f-4ca3-b0c6-58b9ca417be6` | Tee chest print detail |
| `26c1ba30-ebe8-4e35-9f6d-95db4421920b` | Long-sleeve back, product photo |
| `20f3af41-ca5b-40b3-a88d-616efd504fee` | Long-sleeve front and back |
| `7bf76921…`, `3b400603…`, `960a1f93…`, `05a012c2…` | Verified studio generations (tee back/front, long-sleeve back/front) |
| `6ae5aff4…`, `d0500478…` | Verified flat lays (tee, long sleeve) |
| `de7747a0-ab54-4417-8ec2-0810bdd4d626` | n8fix: tee front with the real chest print composited |
| `f90e3913-8f5d-449c-bcb8-00eeb001a074` | n15clean: long sleeve on off-white, ghost artefact removed |

## Checks applied to every frame
1. **Lettering:** every word of the scripture and wordmark is legible and correctly spelled. Checked at full resolution by cropping.
2. **Graphics:**
   - same cross shape
   - same number and placement of skulls
   - thorn vine present
   - ornaments present
3. **Placement:**
   - back print centred under the collar
   - chest print on the wearer's left
   - sleeve vines on both sleeves of the long sleeve only
4. **Colour:** cream ink on black. No recolouring.
5. **No invented additions:** no extra text, logos or symbols.
6. **No people:** no skin, hands, silhouettes or mannequins visible.

## Known deviations (accepted, documented)
- **Garment colour:**
  - The reference photos and every generated image show a washed, vintage black.
  - The PODpartner blank may arrive a deeper, flatter black.
  - Compare with a real order before scaling spend.
- **Tee chest emblem in the studio-front frames** (`stf`, used in the launch pack and v10):
  - It renders the thorn ring as two side sprigs rather than a full ring. It is close, but not exact.
  - The new front shots (n8fix, g13) use the real print file instead.
  - v10 is used only for its turn, where the chest print is small.
- **Fit and size:** generated garments show an oversized drape. Actual fit follows the PODpartner size chart on the site.
