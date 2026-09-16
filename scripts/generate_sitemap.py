from pathlib import Path
import re
from datetime import datetime, timezone

def slugs_from(path: str, need: str) -> list[str]:
    text = Path(path).read_text(encoding="utf-8")
    out: list[str] = []
    for part in text.split("{"):
        if "slug:" in part and need in part:
            m = re.search(r'slug:\s*"([^"]+)"', part)
            if m and m.group(1) not in out:
                out.append(m.group(1))
    return out

tools = slugs_from("src/data/tools.ts", "name:")
portfolio = slugs_from("src/data/portfolio.ts", "title:")
guides = [
    "salary-take-home",
    "online-timer",
    "web-crawling-outsource",
    "event-booth-game",
    "qr-code-generator",
]

now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00")
base = "https://jbmsoft.co.kr"
urls: list[tuple[str, float, str]] = [
    ("/", 1.0, "weekly"),
    ("/portfolio/", 0.9, "weekly"),
    ("/tools/", 0.9, "weekly"),
    ("/guides/", 0.9, "weekly"),
    ("/contact/", 0.7, "monthly"),
    ("/privacy/", 0.3, "yearly"),
    ("/terms/", 0.3, "yearly"),
]
for s in tools:
    urls.append((f"/tools/{s}/", 0.85, "weekly"))
for s in portfolio:
    urls.append((f"/portfolio/{s}/", 0.7, "monthly"))
for s in guides:
    urls.append((f"/guides/{s}/", 0.9, "weekly"))

lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
]
for path, pri, freq in urls:
    lines.extend(
        [
            "<url>",
            f"<loc>{base}{path}</loc>",
            f"<lastmod>{now}</lastmod>",
            f"<changefreq>{freq}</changefreq>",
            f"<priority>{pri}</priority>",
            "</url>",
        ]
    )
lines.append("</urlset>")
Path("public/sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")
Path("public/robots.txt").write_text(
    "User-Agent: *\nAllow: /\n\nSitemap: https://jbmsoft.co.kr/sitemap.xml\n",
    encoding="utf-8",
)
print(f"wrote sitemap with {len(urls)} urls (tools={len(tools)}, portfolio={len(portfolio)})")
