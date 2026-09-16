import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getGuide, guides } from "@/data/guides";
import { getPortfolio } from "@/data/portfolio";
import { getTool } from "@/data/tools";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const tools = guide.toolSlugs.map((s) => getTool(s)).filter(Boolean);
  const cases = guide.portfolioSlugs.map((s) => getPortfolio(s)).filter(Boolean);
  const primaryTool = tools[0];

  return (
    <div className="container-page py-14 md:py-20">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "가이드", path: "/guides" },
            { name: guide.title, path: `/guides/${guide.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.title,
            description: guide.description,
            author: { "@type": "Organization", name: "JBM SOFT" },
            keywords: guide.keywords.join(", "),
          },
        ]}
      />
      <Link href="/guides" className="mb-6 inline-block text-sm text-zinc-400 hover:text-white">
        ← 가이드 목록
      </Link>
      <div className="eyebrow">Guide</div>
      <h1 className="section-title max-w-4xl">{guide.title}</h1>
      <p className="mb-8 max-w-3xl text-zinc-400">{guide.description}</p>

      {primaryTool ? (
        <Link href={`/tools/${primaryTool.slug}`} className="btn-primary mb-10 inline-flex">
          {guide.cta}
        </Link>
      ) : (
        <Link href="/contact" className="btn-primary mb-10 inline-flex">
          {guide.cta}
        </Link>
      )}

      <div className="mb-12 space-y-6">
        {guide.sections.map((section) => (
          <section key={section.heading} className="card p-5 md:p-6">
            <h2 className="mb-2 text-xl font-bold tracking-tight">{section.heading}</h2>
            <p className="text-sm leading-relaxed text-zinc-400 md:text-base">{section.body}</p>
          </section>
        ))}
      </div>

      {tools.length ? (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">관련 무료 도구</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) =>
              tool ? (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-4 hover:border-[#7c6cff]/45">
                  <div className="font-bold">{tool.name}</div>
                  <p className="mt-1 text-sm text-zinc-400">{tool.description}</p>
                </Link>
              ) : null,
            )}
          </div>
        </section>
      ) : null}

      {cases.length ? (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">관련 제작 사례</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {cases.map((item) =>
              item ? (
                <Link key={item.slug} href={`/portfolio/${item.slug}`} className="card p-4 hover:border-[#7c6cff]/45">
                  <div className="font-bold">{item.title}</div>
                  <p className="mt-1 text-sm text-zinc-400">{item.lead}</p>
                </Link>
              ) : null,
            )}
          </div>
        </section>
      ) : null}

      <section className="card p-6 md:p-8">
        <h2 className="mb-2 text-xl font-bold">제작이 필요하신가요?</h2>
        <p className="mb-4 text-sm text-zinc-400">
          아이디어만 있어도 범위·일정·견적을 함께 정리합니다. 비대면 상담 가능합니다.
        </p>
        <Link href="/contact" className="btn-primary inline-flex">
          무료 상담 요청
        </Link>
      </section>
    </div>
  );
}
