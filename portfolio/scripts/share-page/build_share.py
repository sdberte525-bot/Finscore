"""Turn the prerendered Next.js page into one self-contained HTML file for an Artifact.

Usage: python3 -I build_share.py <portfolio dir> <out dir>
"""
import base64
import io
import re
import shutil
import sys
from pathlib import Path

from PIL import Image

root = Path(sys.argv[1])
out = Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)

html = (root / ".next/server/app/index.html").read_text()
css_href = re.search(r'<link rel="stylesheet" href="(/_next/static/chunks/[^"]+\.css)"', html).group(1)
css = (root / ".next" / css_href.removeprefix("/_next/")).read_text()

# Fonts come from Google Fonts in the artifact; drop self-hosted faces (url()), keep local() fallbacks.
css = re.sub(r"@font-face\{[^}]*url\([^}]*\}", "", css)

# Body markup without Next's runtime.
body = html[html.index("<body>") + len("<body>") : html.index("</body>")]
body = re.sub(r"<script[\s\S]*?</script>", "", body)
body = re.sub(r'<div hidden="">\s*<!--\$--><!--/\$-->\s*</div>', "", body)
body = body.replace("<!--$--><!--/$-->", "").replace("<!-- -->", "")

# Headshot as an embedded image (2x the largest displayed width).
im = Image.open(root / "src/assets/headshot.jpg").convert("RGB")
im = im.resize((848, round(848 * im.height / im.width)), Image.LANCZOS)
buf = io.BytesIO()
im.save(buf, "JPEG", quality=82, optimize=True, progressive=True)
data_uri = "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def swap_img(m: re.Match) -> str:
    tag = m.group(0)
    tag = re.sub(r'\s(srcSet|sizes|fetchPriority|decoding|data-nimg)="[^"]*"', "", tag)
    tag = re.sub(r'\ssrc="[^"]*"', f' src="{data_uri}" decoding="async"', tag)
    return tag


body, n_img = re.subn(r"<img\b[^>]*>", swap_img, body)
assert n_img == 1, n_img

# Plain download links are inert for viewers; the résumé goes through the downloads capability.
def resume_button(m: re.Match) -> str:
    attrs, inner = m.group(1), m.group(2)
    attrs = re.sub(r'\s(href|download)="[^"]*"', "", attrs)
    return f'<button type="button" data-resume=""{attrs}>{inner}</button>'


body, n_resume = re.subn(
    r'<a((?:\s[^>]*)?\shref="/salvatore-berte-resume\.pdf"[^>]*)>([\s\S]*?)</a>', resume_button, body
)
assert n_resume == 3, n_resume
# The contact row that holds the résumé button hides with it when saving is unavailable.
body = body.replace(
    '<div class="py-5"><dt class="text-xs text-steel-light">Résumé</dt>',
    '<div class="py-5" data-resume-row="" hidden=""><dt class="text-xs text-steel-light">Résumé</dt>',
)
assert 'data-resume-row=""' in body
# Résumé buttons start hidden until saving is confirmed available.
body = body.replace('<button type="button" data-resume=""', '<button type="button" data-resume="" hidden=""')

# The desktop nav item that holds the résumé button hides with it.
body = body.replace('<li class="border-l border-rule pl-8">', '<li class="border-l border-rule pl-8" data-resume-row="" hidden="">', 1)
assert body.count('data-resume-row=""') == 2

# Hooks for the header script.
body = body.replace("<header class=", '<header id="site-header" class=', 1)
assert 'id="site-header"' in body

extra_css = (Path(__file__).parent / "share.css").read_text()
script = (Path(__file__).parent / "share.js").read_text()

page = f"""<title>Salvatore Berte</title>
<meta name="description" content="Finance and applied economics: fixed income, investment research and financial markets.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400..500&display=swap">
<style>
{css}
{extra_css}
</style>
{body.strip()}
<script>
{script}
</script>
"""

(out / "index.html").write_text(page)
shutil.copy(root / "public/salvatore-berte-resume.pdf", out / "salvatore-berte-resume.pdf")
print(f"index.html {len(page)/1024:.0f} KB, image {len(buf.getvalue())/1024:.0f} KB")
