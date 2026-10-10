"""Builds web images from the source renders in assets/source.

Run with `npm run images` after adding or replacing a source file. Each product
entry below lists the crops cut from its render (boxes are in source pixels,
left/top/right/bottom on the 980x1225 render). When real photography arrives,
drop the files into public/images/products/<slug>/ and point
src/data/products.ts at them instead; this script is only for the renders.

Outputs
  public/images/products/<slug>/<name>.jpg   warm-graded product imagery
  public/images/ink/<slug>.png               grayscale ink map of the back print
                                             (white = ink) used by the hero shader
  public/images/ink/<slug>-dark.jpg          the print in cream on washed black (hero poster)
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "source"
OUT = ROOT / "public" / "images"

# Studio grey is cool; nudge it toward the site's plaster tone so photos sit in the palette.
WARM = (1.05, 1.02, 0.955)
WASHED_BLACK = (26, 25, 23)
HERO_INK = (230, 223, 209)

PRODUCTS = {
    "strengthened-long-sleeve": {
        "ink": "light",  # cream print on black fabric
        "print": (552, 292, 904, 880),
        "crops": {
            "back-print": (540, 290, 930, 880),
            "chest": (262, 352, 452, 542),
            "sleeve": (890, 380, 980, 940),
        },
    },
    "courageous-oversized-tee": {
        "ink": "light",
        "print": (546, 326, 900, 904),
        "crops": {
            "back-print": (532, 320, 932, 900),
            "chest": (282, 380, 452, 550),
            "scripture": (540, 330, 924, 470),
        },
    },
    "rise-again-long-sleeve": {
        "ink": "dark",  # charcoal print on white fabric
        "print": (560, 322, 906, 884),
        "crops": {
            "back-print": (548, 320, 922, 890),
            "chest": (268, 370, 438, 560),
            "sleeve": (412, 430, 512, 880),
        },
    },
}


def warm(im: Image.Image) -> Image.Image:
    r, g, b = im.split()
    r = r.point(lambda v: min(255, int(v * WARM[0])))
    g = g.point(lambda v: min(255, int(v * WARM[1])))
    b = b.point(lambda v: min(255, int(v * WARM[2])))
    return Image.merge("RGB", (r, g, b))


def upscale(im: Image.Image, factor: float) -> Image.Image:
    size = (round(im.width * factor), round(im.height * factor))
    big = im.resize(size, Image.LANCZOS)
    return big.filter(ImageFilter.UnsharpMask(radius=1.6, percent=60, threshold=2))


def save_jpg(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "JPEG", quality=88, optimize=True, progressive=True)
    print("wrote", path.relative_to(ROOT), im.size)


def ink_map(im: Image.Image, box, kind: str) -> Image.Image:
    """Isolates the print as white ink on black, with the studio background removed."""
    crop = im.crop(box).convert("RGB")
    # Studio background is a flat mid grey; flood it from each corner to fabric colour.
    fabric = (12, 12, 12) if kind == "light" else (248, 248, 248)
    for corner in [(0, 0), (crop.width - 1, 0), (0, crop.height - 1), (crop.width - 1, crop.height - 1)]:
        px = crop.getpixel(corner)
        if 170 < sum(px) / 3 < 225:
            ImageDraw.floodfill(crop, corner, fabric, thresh=26)
    gray = ImageOps.grayscale(crop)
    if kind == "dark":
        gray = ImageOps.invert(gray)
    gray = ImageOps.autocontrast(gray, cutoff=(2, 0.5))
    # Crush the fabric texture so only ink survives, keep the print's distressing.
    floor, gain = (62, 1.4) if kind == "light" else (70, 1.12)
    gray = gray.point(lambda v: 0 if v < floor else min(255, int((v - floor) * gain)))
    return feather(upscale(gray, 2.0))


def feather(gray: Image.Image, edge: float = 0.06) -> Image.Image:
    """Fades the outer edge to black so a crop never shows a hard border."""
    w, h = gray.size
    pad = round(min(w, h) * edge)
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rectangle([pad, pad, w - pad, h - pad], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(pad * 0.6))
    return Image.composite(gray, Image.new("L", (w, h), 0), mask)


def duotone(gray: Image.Image, dark, light) -> Image.Image:
    return ImageOps.colorize(gray, black=dark, white=light)


def main() -> None:
    for slug, spec in PRODUCTS.items():
        src = Image.open(SRC / f"{slug}.webp").convert("RGB")
        graded = warm(src)
        save_jpg(upscale(graded, 1.5), OUT / "products" / slug / "composite.jpg")
        for name, box in spec["crops"].items():
            crop = graded.crop(box)
            factor = 2.0 if crop.width < 260 or crop.height < 260 else 1.6
            save_jpg(upscale(crop, factor), OUT / "products" / slug / f"{name}.jpg")

        ink = ink_map(src, spec["print"], spec["ink"])
        path = OUT / "ink" / f"{slug}.png"
        path.parent.mkdir(parents=True, exist_ok=True)
        ink.save(path, "PNG", optimize=True)
        print("wrote", path.relative_to(ROOT), ink.size)
        # Matches the hero shader's colours; shown before WebGL starts.
        save_jpg(duotone(ink, WASHED_BLACK, HERO_INK), OUT / "ink" / f"{slug}-dark.jpg")


if __name__ == "__main__":
    main()
