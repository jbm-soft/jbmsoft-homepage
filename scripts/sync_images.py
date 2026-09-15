from PIL import Image
from pathlib import Path
import shutil

src = Path(r"C:\Users\jaewon\.cursor\projects\c-Users-jaewon-jbmsoft-homepage\assets")
pub = Path(r"C:\Users\jaewon\jbmsoft-homepage\public\images")
port = pub / "portfolio"
port.mkdir(parents=True, exist_ok=True)

files = [
    ("hero-indigo.png", pub / "hero-indigo.png"),
    ("hero-indigo.png", pub / "og-default.png"),
    ("11-sec-dash.png", port / "11-sec-dash.png"),
    ("05-app-hand.png", port / "05-app-hand.png"),
    ("18-lms-dash.png", port / "18-lms-dash.png"),
    ("12-extract-main.png", port / "12-extract-main.png"),
    ("19-pos-order.png", port / "19-pos-order.png"),
]

def scrub_bottom(im: Image.Image) -> Image.Image:
    im = im.convert("RGB")
    w, h = im.size
    y0 = int(h * 0.88)
    strip = im.crop((0, y0, w, h))
    bw, bh = strip.size
    small = strip.resize((max(1, bw // 14), max(1, bh // 14)), Image.BILINEAR).resize((bw, bh), Image.NEAREST)
    im.paste(small, (0, y0))
    return im

for name, dest in files:
    p = src / name
    if not p.exists():
        print("missing", name)
        continue
    im = scrub_bottom(Image.open(p))
    im.save(dest, optimize=True)
    print("saved", dest)
