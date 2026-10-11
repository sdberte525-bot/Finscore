"""Rebuild artwork as print-ready, single-colour cream PNGs for DTG on black garments.

For each source: composite on black (what the shirt shows), measure ink brightness,
pick the ink/no-ink split with Otsu's method, supersample to smooth edges, and write
one cream colour with a clean alpha (fully opaque ink, fully transparent elsewhere,
1-2 px anti-aliased edge only). Black outlines, grey shading and translucent haze in
the source become transparent so the garment shows through, as the distressing intends.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

INK = (249, 236, 209)  # median cream of the supplied artwork (#F9ECD1)


def otsu(values):
    hist, _ = np.histogram(values, bins=256, range=(0, 256))
    total = values.size
    sum_all = np.dot(np.arange(256), hist)
    best, thresh, w0, sum0 = 0, 0, 0, 0
    for t in range(256):
        w0 += hist[t]
        if w0 == 0:
            continue
        w1 = total - w0
        if w1 == 0:
            break
        sum0 += t * hist[t]
        m0, m1 = sum0 / w0, (sum_all - sum0) / w1
        between = w0 * w1 * (m0 - m1) ** 2
        if between > best:
            best, thresh = between, t
    return thresh


def prepare(src, out, target_w, mirror=False):
    im = Image.open(src).convert("RGBA")
    a = np.asarray(im).astype(np.float32)
    alpha = a[..., 3] / 255.0
    # Brightness of the pixel as it would appear over a black shirt.
    lum = (0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]) * alpha
    vis = lum[alpha > 0.02]
    t = otsu(vis.astype(np.uint8))
    # Supersample: enlarge the brightness map, smooth slightly, threshold at 2x the target, then downsample.
    scale = target_w / im.width
    big_w, big_h = round(im.width * scale * 2), round(im.height * scale * 2)
    L = Image.fromarray(np.clip(lum, 0, 255).astype(np.uint8), "L").resize((big_w, big_h), Image.LANCZOS)
    L = L.filter(ImageFilter.GaussianBlur(radius=scale * 0.6))
    mask = (np.asarray(L) > t).astype(np.uint8) * 255
    M = Image.fromarray(mask, "L").resize((big_w // 2, big_h // 2), Image.LANCZOS)
    m = np.asarray(M)
    m = np.where(m < 24, 0, np.where(m > 232, 255, m)).astype(np.uint8)  # no faint haze, only edge AA
    rgba = np.zeros((m.shape[0], m.shape[1], 4), np.uint8)
    rgba[..., 0], rgba[..., 1], rgba[..., 2] = INK
    rgba[..., 3] = m
    res = Image.fromarray(rgba, "RGBA")
    # Trim to the ink with a small margin so placement in Printful is exact.
    bbox = res.getbbox()
    pad = round(0.02 * res.width)
    res = res.crop((max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(res.width, bbox[2] + pad), min(res.height, bbox[3] + pad)))
    if mirror:
        res = res.transpose(Image.FLIP_LEFT_RIGHT)
    res.save(out, dpi=(300, 300), optimize=True)
    semi = ((m > 0) & (m < 255)).sum() / max(1, (m > 0).sum())
    print(f"{out}: {res.width}x{res.height}px = {res.width/300:.2f}x{res.height/300:.2f} in @300dpi | threshold {t} | edge-only partial alpha {semi*100:.1f}%")


if __name__ == "__main__":
    prepare(sys.argv[1], sys.argv[2], int(sys.argv[3]), mirror=len(sys.argv) > 4 and sys.argv[4] == "mirror")
