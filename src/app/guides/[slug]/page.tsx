import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getApp } from "@/data/apps";
import { getGuide, guides, type GuideBlock } from "@/data/guides";
import { getPortfolio } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { getTool } from "@/data/tools";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
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
    image: guide.image,
  });
}

function GuideBlocks({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        const key = `${block.kind}-${index}`;
        if (block.kind === "p") {
          return (
            <p key={key} className="text-sm leading-relaxed text-zinc-400 md:text-base">
              {block.text}
            </p>
          );
        }
        if (block.kind === "ul" || block.kind === "ol") {
          const List = block.kind === "ol" ? "ol" : "ul";
          return (
            <List
              key={key}
              className={`space-y-2 pl-5 text-sm leading-relaxed text-zinc-300 md:text-base ${
                block.kind === "ol" ? "list-decimal" : "list-disc"
              }`}
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          );
        }
        if (block.kind === "note") {
          return (
            <p key={key} className="rounded-2xl border border-[#f5c16c]/30 bg-[#f5c16c]/[0.06] p-4 text-sm leading-relaxed text-zinc-200">
              {block.text}
            </p>
          );
        }
        return (
          <ul key={key} className="space-y-3">
            {block.items.map((item) => {
              const external = item.href.startsWith("http");
              const className = "font-semibold text-[#35e0c3] underline decoration-white/15 underline-offset-4 hover:decoration-[#35e0c3]";
              return (
                <li key={item.href} className="text-sm leading-relaxed">
                  {external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={className}>
                      {item.label}
                    </Link>
                  )}
                  {item.note ? <p className="mt-1 text-zinc-400">{item.note}</p> : null}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const tools = guide.toolSlugs.map((item) => getTool(item)).filter((item) => item !== undefined);
  const cases = guide.portfolioSlugs.map((item) => getPortfolio(item)).filter((item) => item !== undefined);
  const apps = (guide.appSlugs ?? []).map((item) => getApp(item)).filter((item) => item !== undefined);
  const related = (guide.relatedSlugs ?? []).map((item) => getGuide(item)).filter((item) => item !== undefined);
  const primaryTool = tools[0];
  const ctaHref = guide.ctaHref ?? (primaryTool ? `/tools/${primaryTool.slug}` : "/contact");
  const jsonLd = [
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
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      keywords: guide.keywords.join(", "),
      inLanguage: "ko-KR",
    },
    ...(guide.faqs?.length ? [faqJsonLd(guide.faqs)] : []),
  ];

  return (
    <div className="container-page py-14 md:py-20">
      <JsonLd data={jsonLd} />
      <nav aria-label="breadcrumb" className="mb-6 text-sm text-zinc-400">
        <Link href="/" className="hover:text-white">홈</Link>
        <span aria-hidden className="px-1.5">/</span>
        <Link href="/guides" className="hover:text-white">가이드</Link>
      </nav>
      <div className="eyebrow">Guide</div>
      <h1 className="section-title max-w-4xl">{guide.title}</h1>
      <p className="mb-6 max-w-3xl text-zinc-400">{guide.description}</p>

      <div className="mb-10">
        <Link href={ctaHref} className="btn-primary inline-flex">
          {guide.cta}
        </Link>
        {guide.ctaNote ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">{guide.ctaNote}</p>
        ) : null}
      </div>

      <div className="mb-12 space-y-6">
        {guide.sections.map((section) => (
          <section key={section.heading} className="card p-5 md:p-6">
            <h2 className="mb-3 text-xl font-bold tracking-tight">{section.heading}</h2>
            {section.body ? (
              <p className="text-sm leading-relaxed text-zinc-400 md:text-base">{section.body}</p>
            ) : null}
            {section.blocks ? <GuideBlocks blocks={section.blocks} /> : null}
          </section>
        ))}
      </div>

      {guide.faqs?.length ? (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">자주 묻는 질문</h2>
          <div className="space-y-3">
            {guide.faqs.map((faq) => (
              <details key={faq.question} className="card p-5">
                <summary className="cursor-pointer font-bold">{faq.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {apps.length ? (
        <section className="mb-12">
          <h2 className="mb-2 text-xl font-bold">JBM SOFT가 준비 중인 앱</h2>
          <p className="mb-4 text-sm text-zinc-500">
            외주 제작 사례와는 별개입니다. 아직 스토어에 없으며 출시 예정입니다.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {apps.map((app) => (
              <Link key={app.slug} href={`/apps/${app.slug}`} className="card p-4 hover:border-[#7c6cff]/45">
                <div className="text-[11px] font-extrabold text-[#35e0c3]">출시 예정 · {siteConfig.name}</div>
                <div className="mt-1 font-bold">{app.name}</div>
                <p className="mt-1 text-sm text-zinc-400">{app.cardSummary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">이어서 읽기</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link key={item.slug} href={`/guides/${item.slug}`} className="card p-4 hover:border-[#7c6cff]/45">
                <div className="font-bold">{item.title}</div>
                <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {tools.length ? (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">관련 무료 도구</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-4 hover:border-[#7c6cff]/45">
                <div className="font-bold">{tool.name}</div>
                <p className="mt-1 text-sm text-zinc-400">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {cases.length ? (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">관련 제작 사례</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {cases.map((item) => (
              <Link key={item.slug} href={`/portfolio/${item.slug}`} className="card p-4 hover:border-[#7c6cff]/45">
                <div className="font-bold">{item.title}</div>
                <p className="mt-1 text-sm text-zinc-400">{item.lead}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="card p-6 md:p-8">
        <h2 className="mb-2 text-xl font-bold">
          {apps.length ? "출시 알림과 개발 문의" : "제작이 필요하신가요?"}
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-zinc-400">
          {apps.length
            ? `${siteConfig.name}가 직접 만드는 앱은 출시 전입니다. 알림은 문의로 남겨 주세요. 별도의 외주 개발도 같은 창구에서 상담합니다.`
            : "아이디어만 있어도 범위·일정·견적을 함께 정리합니다. 비대면 상담 가능합니다."}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary inline-flex">
            문의하기
          </Link>
          <a href={siteConfig.url} className="btn-ghost inline-flex">
            JBM SOFT
          </a>
        </div>
      </section>
    </div>
  );
}
