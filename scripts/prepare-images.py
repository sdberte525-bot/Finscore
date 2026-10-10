"""Builds the web images for the product pages and the homepage hero.

Run with `npm run images` (needs Python 3 with Pillow and numpy) after adding
or replacing a source file. Source files are never modified.

Sources
  assets/source/photos/      high-resolution product photos (transparent PNG/WebP)
  assets/source/renders/     front-and-back studio renders, one per product
  assets/source/reference/   the multi-angle sheet; kept for reference only, because
                             its artwork differs from the photos (see README)

Outputs
  public/images/products/<slug>/<view>.webp   web images, transparent background
  public/images/ink/<slug>.png                grayscale ink map of the back print
                                              (white = ink) for the hero shader
  public/images/ink/<slug>-dark.jpg           the print in cream on washed black
  src/data/productImages.json                 pixel sizes of every web image

Garment colours and artwork are never altered: images are only cut out,
cropped, resized and (for renders) lightly sharpened after resizing.
"""

import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "source"
OUT = ROOT / "public" / "images"
MANIFEST = ROOT / "src" / "data" / "productImages.json"

WASHED_BLACK = (26, 25, 23)
HERO_INK = (230, 223, 209)
MAX_EDGE = 1800

# For each product:
#   render       studio render with the front and back side by side
#   tolerance    background flood-fill tolerance; higher values leak into the fabric
#   photos       high-res photo views copied through as-is (trimmed)
#   crops        detail crops cut from a photo, boxes are left/top/right/bottom
#   render_crops detail crops cut from the render, when no photo exists
#   ink          where the back print lives, for the hero ink map
PRODUCTS = {
    "through-christ": {
        "render": "through-christ.webp",
        "tolerance": 8,
        "photos": {"back": "through-christ-back.webp"},
        "crops": {
            "back-detail": ("through-christ-back.webp", (300, 360, 830, 1022)),
            "sleeve-detail": ("through-christ-back.webp", (20, 300, 240, 1290)),
        },
        "render_crops": {},
        "ink": ("photo", "through-christ-back.webp", (225, 80, 905, 1270), "light"),
    },
    "strong-courageous": {
        "render": "strong-courageous.webp",
        "tolerance": 8,
        "photos": {"back": "strong-courageous-back.webp", "front-detail": "strong-courageous-front-detail.webp"},
        "crops": {
            "back-detail": ("strong-courageous-back.webp", (225, 280, 905, 860)),
        },
        "render_crops": {},
        "ink": ("photo", "strong-courageous-back.webp", (210, 215, 915, 1310), "light"),
    },
    "though-i-fall": {
        "render": "though-i-fall.webp",
        "tolerance": 8,
        "photos": {"front-detail": "though-i-fall-front-detail.webp"},
        "crops": {},
        "render_crops": {"back-print": (548, 320, 922, 890)},
        "ink": ("render", "though-i-fall.webp", (560, 322, 906, 884), "dark"),
    },
}

MARK = (255, 0, 255)


def background_mask(im: Image.Image, tolerance: int) -> np.ndarray:
    """True where the studio background is: flood-filled in from every edge."""
    work = im.filter(ImageFilter.GaussianBlur(1.2)).copy()
    w, h = work.size
    seeds = [(x, y) for x in range(0, w, 16) for y in (0, h - 1)]
    seeds += [(x, y) for y in range(0, h, 16) for x in (0, w - 1)]
    for s in seeds:
        px = work.getpixel(s)
        lum, sat = sum(px) / 3, max(px) - min(px)
        # Only start from studio grey; a garment can touch the edge of the frame.
        if px != MARK and 150 < lum < 235 and sat < 20:
            ImageDraw.floodfill(work, s, MARK, thresh=tolerance)
    a = np.asarray(work)
    return (a[..., 0] == 255) & (a[..., 1] == 0) & (a[..., 2] == 255)


def cut_out_pair(im: Image.Image, tolerance: int) -> Image.Image:
    """Removes the studio background around the front-and-back pair."""
    fg = ~background_mask(im, tolerance)
    # Opening breaks the thin bridges that tie background specks to the garments.
    m = Image.fromarray((fg * 255).astype(np.uint8)).copy().filter(ImageFilter.MinFilter(5))
    # Keep only what's connected to the two garments, which drops background specks.
    for seed in [(int(m.width * 0.25), int(m.height * 0.45)), (int(m.width * 0.75), int(m.height * 0.45))]:
        if m.getpixel(seed) == 255:
            ImageDraw.floodfill(m, seed, 128)
    keep = np.asarray(m) == 128
    # Drop a floor shadow fused to the hem: the first narrow row in the bottom fifth.
    widths = keep.sum(axis=1)
    rows = np.nonzero(widths)[0]
    top, bottom = rows.min(), rows.max()
    body = np.median(widths[top + int((bottom - top) * 0.45) : top + int((bottom - top) * 0.7)])
    for y in range(top + int((bottom - top) * 0.8), bottom + 1):
        if widths[y] < body * 0.5:
            keep[y:] = False
            break
    restored = Image.fromarray((keep * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))
    # Never extend past the original foreground when restoring the edge.
    alpha = Image.fromarray((np.asarray(restored) > 0) & fg).convert("L").point(lambda v: 255 if v else 0)
    # A white shirt's own shading matches the backdrop grey, so only clean around dark garments.
    if not is_light_garment(im):
        alpha = clear_backdrop(im, alpha)
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.8))
    out = im.convert("RGBA")
    out.putalpha(alpha)
    return out


def is_light_garment(im: Image.Image) -> bool:
    """True when the garment itself is light (a white shirt), judged at the centre of each half."""
    a = np.asarray(im.convert("L"))
    h, w = a.shape
    centres = [a[int(h * 0.5), int(w * 0.25)], a[int(h * 0.5), int(w * 0.75)]]
    return float(max(centres)) > 200  # the back sample can land on the print


def clear_backdrop(im: Image.Image, alpha: Image.Image) -> Image.Image:
    """Clears leftover studio-grey patches that touch the transparent surround."""
    a = np.asarray(im).astype(np.int16)
    lum, sat = a.mean(axis=2), a.max(axis=2) - a.min(axis=2)
    greyish = (lum > 140) & (lum < 232) & (sat < 18)
    transparent = np.asarray(alpha) < 128
    region = Image.fromarray(((transparent | greyish) * 255).astype(np.uint8)).copy()
    w, h = region.size
    for seed in [(x, y) for x in range(0, w, 8) for y in (0, h - 1)] + [(x, y) for y in range(0, h, 8) for x in (0, w - 1)]:
        if region.getpixel(seed) == 255:
            ImageDraw.floodfill(region, seed, 128)
    outside = np.asarray(region) == 128
    return Image.fromarray(np.where(outside, 0, np.asarray(alpha)).astype(np.uint8))


def trim(im: Image.Image, pad: float = 0.04) -> Image.Image:
    """Crops to the visible garment and adds a little even transparent padding."""
    box = im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    im = im.crop(box)
    p = round(max(im.size) * pad)
    canvas = Image.new("RGBA", (im.width + 2 * p, im.height + 2 * p), (0, 0, 0, 0))
    canvas.alpha_composite(im, (p, p))
    return canvas


def fit(im: Image.Image, max_edge: int = MAX_EDGE) -> Image.Image:
    scale = max_edge / max(im.size)
    return im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS) if scale < 1 else im


def upscale(im: Image.Image, factor: float) -> Image.Image:
    big = im.resize((round(im.width * factor), round(im.height * factor)), Image.LANCZOS)
    return big.filter(ImageFilter.UnsharpMask(radius=1.4, percent=50, threshold=2))


manifest: dict[str, dict[str, list[int]]] = {}


def save(im: Image.Image, slug: str, view: str) -> None:
    path = OUT / "products" / slug / f"{view}.webp"
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "WEBP", quality=92, method=6)
    manifest.setdefault(slug, {})[view] = [im.width, im.height]
    print("wrote", path.relative_to(ROOT), im.size)


def ink_map(im: Image.Image, box, kind: str) -> Image.Image:
    """Isolates the back print as white ink on black."""
    crop = im.crop(box)
    if crop.mode == "RGBA":
        base = Image.new("RGBA", crop.size, (12, 12, 12, 255) if kind == "light" else (248, 248, 248, 255))
        base.alpha_composite(crop)
        crop = base
    crop = crop.convert("RGB")
    if kind == "dark":
        crop = crop.copy()
        fabric = (248, 248, 248)
        for corner in [(0, 0), (crop.width - 1, 0), (0, crop.height - 1), (crop.width - 1, crop.height - 1)]:
            if 170 < sum(crop.getpixel(corner)) / 3 < 225:
                ImageDraw.floodfill(crop, corner, fabric, thresh=26)
    gray = ImageOps.grayscale(crop)
    if kind == "dark":
        gray = ImageOps.invert(gray)
    gray = ImageOps.autocontrast(gray, cutoff=(2, 0.5))
    floor, gain = (62, 1.4) if kind == "light" else (70, 1.12)
    gray = gray.point(lambda v: 0 if v < floor else min(255, int((v - floor) * gain)))
    if max(gray.size) < 900:
        gray = upscale(gray, 2.0)
    return feather(fit(gray, 1200))


def feather(gray: Image.Image, edge: float = 0.06) -> Image.Image:
    """Fades the outer edge to black so a crop never shows a hard border."""
    w, h = gray.size
    pad = round(min(w, h) * edge)
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rectangle([pad, pad, w - pad, h - pad], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(pad * 0.6))
    return Image.composite(gray, Image.new("L", (w, h), 0), mask)


def main() -> None:
    for slug, spec in PRODUCTS.items():
        old = OUT / "products" / slug
        if old.exists():
            for f in old.iterdir():
                f.unlink()

        render = Image.open(SRC / "renders" / spec["render"]).convert("RGB")
        pair = trim(cut_out_pair(render, spec["tolerance"]))
        save(upscale(pair, 1.5), slug, "front-back")

        for view, file in spec["photos"].items():
            save(fit(trim(Image.open(SRC / "photos" / file).convert("RGBA"))), slug, view)

        for view, (file, box) in spec["crops"].items():
            photo = Image.open(SRC / "photos" / file).convert("RGBA")
            save(trim(photo.crop(box), pad=0), slug, view)

        for view, box in spec["render_crops"].items():
            save(upscale(render.crop(box), 1.6).convert("RGBA"), slug, view)

        source, file, box, kind = spec["ink"]
        src = Image.open(SRC / ("photos" if source == "photo" else "renders") / file)
        src = src.convert("RGBA") if src.mode == "RGBA" else src.convert("RGB")
        ink = ink_map(src, box, kind)
        (OUT / "ink").mkdir(parents=True, exist_ok=True)
        ink.save(OUT / "ink" / f"{slug}.png", "PNG", optimize=True)
        ImageOps.colorize(ink, black=WASHED_BLACK, white=HERO_INK).save(
            OUT / "ink" / f"{slug}-dark.jpg", "JPEG", quality=88, optimize=True, progressive=True
        )
        print("wrote ink map for", slug, ink.size)

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print("wrote", MANIFEST.relative_to(ROOT))


if __name__ == "__main__":
    main()
