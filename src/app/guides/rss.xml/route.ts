import { guides } from "@/data/guides";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function GET() {
  const items = guides
    .map((guide) => {
      const link = `${siteConfig.url}/guides/${guide.slug}/`;
      const body = guide.sections
        .map((section) => {
          const parts = [section.heading, section.body ?? "", ...(section.blocks ?? []).flatMap((block) => {
            if (block.kind === "p" || block.kind === "note") return [block.text];
            if (block.kind === "ul" || block.kind === "ol") return block.items;
            return block.items.map((item) => item.label);
          })];
          return parts.filter(Boolean).join("\n");
        })
        .join("\n\n");
      return `<item><title>${escapeXml(guide.title)}</title><link>${link}</link><guid>${link}</guid><description><![CDATA[${body}]]></description><author>${siteConfig.email} (${siteConfig.name})</author></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${siteConfig.name} 가이드</title><link>${siteConfig.url}/guides/</link><description>JBM SOFT 가이드</description>${items}</channel></rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
