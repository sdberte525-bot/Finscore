#!/usr/bin/env python3
"""Composite the REAL print file onto a generated blank garment.

The artwork pixels are never redrawn: they are only scaled, perspective-warped,
displaced by the fabric folds, lit by the plate's own light and given the
fabric texture and film grain.

usage: compo.py PLATE ART OUT --quad x0,y0,x1,y1,x2,y2,x3,y3   (TL,TR,BR,BL of the art box)
       [--level 0.9] [--disp 2] [--fold 18] [--tex 0.35] [--opacity 0.94] [--soft 0.7] [--grain 5]
       [--mask OUT_MASK]
"""
import argparse
import numpy as np
from PIL import Image

INK = np.array([0xF9, 0xEC, 0xD1], np.float32) / 255.0


def coeffs(src, dst):
    # perspective coefficients mapping dst -> src (what PIL expects)
    m = []
    for (x, y), (u, v) in zip(dst, src):
        m.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        m.append([0, 0, 0, x, y, 1, -v * x, -v * y])
    a = np.array(m, np.float64)
    b = np.array(src, np.float64).reshape(8)
    return np.linalg.solve(a, b).tolist()


def _box1(a, k, axis):
    if k < 1:
        return a
    pad = [(0, 0)] * a.ndim
    pad[axis] = (k + 1, k)
    c = np.cumsum(np.pad(a, pad, mode="edge"), axis=axis, dtype=np.float64)
    n = a.shape[axis]
    hi = np.take(c, np.arange(2 * k + 1, 2 * k + 1 + n), axis=axis)
    lo = np.take(c, np.arange(0, n), axis=axis)
    return ((hi - lo) / (2 * k + 1)).astype(np.float32)


def blurf(a, r):
    """Gaussian blur approximated by three box passes (float precision)."""
    if r <= 0:
        return a
    k = max(1, int(round((np.sqrt(4 * r * r + 1) - 1) / 2)))
    for _ in range(3):
        a = _box1(_box1(a, k, 0), k, 1)
    return a


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("plate"); ap.add_argument("art"); ap.add_argument("out")
    ap.add_argument("--quad", required=True)
    ap.add_argument("--level", type=float, default=0.9)
    ap.add_argument("--disp", type=float, default=2.0)
    ap.add_argument("--fold", type=float, default=18.0, help="blur radius that isolates folds from weave")
    ap.add_argument("--tex", type=float, default=0.35)
    ap.add_argument("--opacity", type=float, default=0.94)
    ap.add_argument("--soft", type=float, default=0.7)
    ap.add_argument("--grain", type=float, default=5.0)
    ap.add_argument("--mask")
    a = ap.parse_args()

    plate = Image.open(a.plate).convert("RGB")
    W, H = plate.size
    P = np.asarray(plate, np.float32) / 255.0
    L = P @ np.array([0.299, 0.587, 0.114], np.float32)

    q = [float(v) for v in a.quad.split(",")]
    dst = [(q[0], q[1]), (q[2], q[3]), (q[4], q[5]), (q[6], q[7])]
    art = Image.open(a.art).convert("RGBA")
    aw, ah = art.size
    src = [(0, 0), (aw, 0), (aw, ah), (0, ah)]
    warped = art.transform((W, H), Image.PERSPECTIVE, coeffs(src, dst), Image.BICUBIC)
    A = np.asarray(warped.split()[3], np.float32) / 255.0

    # fabric folds: displace the ink along the luminance gradient of the plate
    Lb = blurf(L, a.fold)
    gy, gx = np.gradient(Lb)
    norm = np.percentile(np.hypot(gx, gy)[A > 0.1], 95) if (A > 0.1).any() else 1.0
    dx = gx / max(norm, 1e-6) * a.disp
    dy = gy / max(norm, 1e-6) * a.disp
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    sx = np.clip(xx - dx, 0, W - 1).astype(np.int32)
    sy = np.clip(yy - dy, 0, H - 1).astype(np.int32)
    A = A[sy, sx]
    if a.soft > 0:
        A = blurf(A, a.soft)

    # light: the ink receives the same light as the cotton under it
    illum = blurf(L, 3)
    region = A > 0.2
    ref = np.percentile(illum[region], 97) if region.any() else illum.max()
    shade = np.clip(illum / max(ref, 1e-6), 0, 1.15) * a.level
    # light colour (tungsten tint) from the plate around the print
    Pb = np.stack([blurf(P[..., c], 25) for c in range(3)], -1)
    tint = Pb / np.maximum(Pb.mean(-1, keepdims=True), 1e-4)
    tint = 1 + (tint - 1) * 0.6
    # cotton texture shows through DTG ink
    hp = L - blurf(L, 2.5)
    tex = 1 + a.tex * hp / max(np.std(hp[region]) if region.any() else 1, 1e-6) * 0.08
    ink = INK[None, None, :] * shade[..., None] * tint * tex[..., None]
    ink = np.clip(ink, 0, 1)

    alpha = (A * a.opacity)[..., None]
    out = P * (1 - alpha) + ink * alpha
    rng = np.random.default_rng(7)
    g = rng.normal(0, a.grain / 255.0, (H, W, 1)).astype(np.float32)
    out = out + g * alpha
    Image.fromarray(np.clip(out * 255 + 0.5, 0, 255).astype(np.uint8)).save(a.out, quality=96)
    if a.mask:
        Image.fromarray((A * 255).astype(np.uint8)).save(a.mask)


if __name__ == "__main__":
    main()
