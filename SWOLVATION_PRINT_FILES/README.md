# Swolvation print files

Print-ready artwork for Printful, DTG on black garments. Every file is:

- A transparent PNG at 300 DPI.
- One ink colour: cream `#F9ECD1`, the same on both shirts.
- Solid ink with no semi-transparent haze. DTG can't print partial transparency on black, so it would come out as a grey cloud.
- Free of black outlines and grey shading. Those areas are now transparent, so the black shirt shows through as part of the distressing.
- Trimmed to the ink, so you can place it exactly.

## Tee: AS Colour 5082 Heavy Faded Tee, Faded Black

| File | Placement | Size on the shirt |
| --- | --- | --- |
| `TEE_FRONT_cross-wordmark_chest.png` | Front, centred chest | **4 in wide**, top about 3.5 in below the collar seam |
| `TEE_BACK_be-strong-and-courageous_12in.png` | Back, centred | **12 in wide** (16 in tall), top about 3 in below the collar seam |

## Long sleeve: Comfort Colors 6014, Black

| File | Placement | Size on the shirt |
| --- | --- | --- |
| `LONGSLEEVE_FRONT_cross-wordmark_chest.png` | Front, centred chest | **3.5 in wide**, top about 3.5 in below the collar seam |
| `LONGSLEEVE_BACK_philippians-4-13_12in.png` | Back, centred | **16 in tall** (about 9.6 in wide) or the largest the print area allows, top about 3 in below the collar |
| `LONGSLEEVE_SLEEVE_LEFT_thorn-vine.png` | Left sleeve | Fill the sleeve area lengthwise |
| `LONGSLEEVE_SLEEVE_RIGHT_thorn-vine_mirrored.png` | Right sleeve | Same, mirrored so the vines match on both arms |

The front prints are rendered far larger than the chest size (about 10 in), so they stay sharp at any size.

## In Printful

1. Choose **DTG**, not DTF, for every placement. It gives the soft, sunk-in vintage feel.
2. Upload each file to its placement. Use the size above, then **Center horizontally**.
3. When Printful asks about the background, keep the transparent background.
4. Order one of each as a sample before launch.

`source/` holds the original artwork as supplied. `tools/prepare_print_file.py` rebuilds a print file from an original:

```
python3 tools/prepare_print_file.py source/tee-back_original.webp out.png 3600
```
