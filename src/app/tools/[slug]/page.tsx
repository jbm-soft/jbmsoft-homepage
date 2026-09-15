import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ToolApp } from "@/components/ToolApp";
import { getRelatedTools, getTool, tools } from "@/data/tools";
import {
  breadcrumbJsonLd,
  buildMetadata,
  softwareAppJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return buildMetadata({
    title: tool.name,
    description: tool.longDescription,
    path: `/tools/${tool.slug}`,
    keywords: tool.keywords,
  });
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  const related = getRelatedTools(slug);

  return (
    <div className="container-page py-14 md:py-20">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "무료 유틸", path: "/tools" },
            { name: tool.name, path: `/tools/${tool.slug}` },
          ]),
          softwareAppJsonLd({
            name: tool.name,
            description: tool.longDescription,
            path: `/tools/${tool.slug}`,
          }),
        ]}
      />

      <Link href="/tools" className="mb-6 inline-block text-sm text-zinc-400 hover:text-white">
        ← 유틸 모음
      </Link>
      <div className="eyebrow">{tool.category}</div>
      <h1 className="section-title">{tool.name}</h1>
      <p className="mb-8 max-w-2xl text-zinc-300">{tool.longDescription}</p>

      <ToolApp slug={tool.slug} />

      <article className="prose prose-invert mt-10 max-w-none">
        <div className="card p-6">
          <h2 className="mb-3 text-xl font-bold">{tool.shortName} 사용 방법</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-300">
            <li>위 도구에서 필요한 값을 입력하거나 버튼을 누릅니다.</li>
            <li>결과는 브라우저에서만 계산되며 서버로 전송되지 않습니다.</li>
            <li>자주 쓰는 도구는 북마크해 두면 검색 없이도 빠르게 다시 올 수 있습니다.</li>
          </ol>
          <h2 className="mb-3 mt-6 text-xl font-bold">이런 검색에 맞춰 준비했습니다</h2>
          <p className="text-sm text-zinc-400">
            {tool.keywords.join(" · ")}
          </p>
        </div>
      </article>

      {related.length ? (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-bold">함께 보면 좋은 유틸</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/tools/${item.slug}`} className="card p-4 hover:border-[#7c6cff]/45">
                <div className="font-bold">{item.shortName}</div>
                <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <div className="font-bold">이런 도구를 서비스에 붙이고 싶다면?</div>
          <p className="text-sm text-zinc-400">맞춤 웹·앱·자동화 외주도 가능합니다.</p>
        </div>
        <Link href="/contact" className="btn-primary">외주 문의</Link>
      </div>
    </div>
  );
}
