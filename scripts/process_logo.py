from collections import deque
from pathlib import Path
import base64
import io
from PIL import Image

src = Path("public/logo-yes-src.png")
img = Image.open(src).convert("RGBA")
w, h = img.size
px = img.load()


def lum(r, g, b):
    return 0.299 * r + 0.587 * g + 0.114 * b


def chroma(r, g, b):
    return max(r, g, b) - min(r, g, b)


vis = [[False] * w for _ in range(h)]
q = deque(
    [(x, 0) for x in range(w)]
    + [(x, h - 1) for x in range(w)]
    + [(0, y) for y in range(h)]
    + [(w - 1, y) for y in range(h)]
)
while q:
    x, y = q.popleft()
    if not (0 <= x < w and 0 <= y < h) or vis[y][x]:
        continue
    vis[y][x] = True
    r, g, b, a = px[x, y]
    if a < 10 or (lum(r, g, b) <= 28 and chroma(r, g, b) <= 12):
        if a >= 10:
            px[x, y] = (0, 0, 0, 0)
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            q.append((x + dx, y + dy))

# Whiten grey tagline for contrast on blue hero
for y in range(int(h * 0.62), h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a >= 40 and chroma(r, g, b) < 35 and 18 < lum(r, g, b) < 210:
            px[x, y] = (255, 255, 255, 255)

bbox = img.getbbox()
pad = 10
l, t, r, b = bbox
img = img.crop((max(0, l - pad), max(0, t - pad), min(w, r + pad), min(h, b + pad)))
vw, vh = img.size
img.save("public/logo-yes.png", "PNG", optimize=True)

buf = io.BytesIO()
img.save(buf, "PNG")
b64 = base64.b64encode(buf.getvalue()).decode()
Path("public/logo-yes.svg").write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
    f'width="{vw}" height="{vh}" viewBox="0 0 {vw} {vh}" preserveAspectRatio="xMidYMid meet">'
    f'<image width="{vw}" height="{vh}" xlink:href="data:image/png;base64,{b64}"/></svg>\n'
)
print(f"ok {vw}x{vh}")
