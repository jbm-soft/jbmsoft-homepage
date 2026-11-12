import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { firstPartyApps } from "@/data/apps";
import { getGuide } from "@/data/guides";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "JBM SOFT가 직접 만드는 앱 – 대화모아·차보는날·가족차용노트",
  description:
    "JBM SOFT가 직접 개발하는 안드로이드 앱. 대화모아, 차보는날, 가족차용노트. 출시 예정이며 외주 제작 사례와는 별도입니다.",
  path: "/apps",
  suffixBrand: false,
  image: "/images/apps/hub-og.png",
});

export default function AppsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "앱", path: "/apps" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "JBM SOFT가 직접 만드는 앱",
            itemListElement: firstPartyApps.map((app, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: app.name,
              url: `${siteConfig.url}/apps/${app.slug}/`,
              description: app.description,
            })),
          },
        ]}
      />
      <section className="relative overflow-hidden pb-12 pt-12 md:pt-16">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/apps/hub-hero.png" alt="" fill priority className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/40 via-[#07070a]/80 to-[#07070a]" />
        </div>
        <div className="container-page">
          <nav aria-label="breadcrumb" className="mb-6 text-sm text-zinc-400">
            <Link href="/" className="hover:text-white">홈</Link>
            <span aria-hidden className="px-1.5">/</span>
            <span className="text-zinc-200">앱</span>
          </nav>
          <div className="eyebrow">First-party</div>
          <h1 className="section-title max-w-[14ch]">
            JBM SOFT가
            <br />
            <span className="gradient-text">직접 만드는 앱</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-300">
            아래 앱들은 고객 의뢰를 받아 납품한 외주 작품이 아닙니다. {siteConfig.name}가 기획하고
            개발하는 안드로이드 앱이며, 아직 Google Play에 없습니다. 지금은 출시 알림과 문의만 받습니다.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-page grid gap-4 lg:grid-cols-2">
          {firstPartyApps.map((app) => (
            <article key={app.slug} className="card overflow-hidden">
              <div className="relative aspect-[16/8] bg-[#0c0c12]">
                <Image src={app.ogImage} alt="" fill className="object-cover" />
              </div>
              <div className="p-5 md:p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold">Android</span>
                  <span className="rounded-full bg-[#35e0c3]/15 px-2.5 py-1 text-[11px] font-extrabold text-[#35e0c3]">
                    출시 예정
                  </span>
                </div>
                <h2 className="text-2xl font-black tracking-tight">{app.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{app.cardSummary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {app.cardPoints.map((point) => (
                    <li key={point} className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={`/apps/${app.slug}`} className="btn-primary">
                    안내 보기
                  </Link>
                  <Link href={`/guides/${app.guideSlugs[0]}`} className="btn-ghost">
                    사용 가이드
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="container-page grid gap-4 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-lg font-extrabold">외주 포트폴리오와 다릅니다</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              교육 앱, 행사 게임, 크롤링처럼 고객 요청으로 만든 작업은 제작 사례에 있습니다.
              이 페이지의 앱은 그 목록에 넣지 않습니다.
            </p>
            <Link href="/portfolio" className="mt-4 inline-flex text-sm font-semibold text-[#35e0c3] hover:underline">
              외주 제작 사례 보기
            </Link>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-extrabold">회사</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {siteConfig.legalName}({siteConfig.brandEn}) · 대표 {siteConfig.representative}.
              출시 알림과 개발 문의는 같은 메일로 받습니다.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={siteConfig.url} className="text-sm font-semibold text-[#35e0c3] hover:underline">
                {siteConfig.url.replace("https://", "")}
              </a>
              <Link href="/contact" className="text-sm font-semibold text-white hover:underline">
                문의
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <h2 className="mb-4 text-xl font-extrabold tracking-tight">관련 가이드</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {firstPartyApps.flatMap((app) =>
              app.guideSlugs.map((slug) => {
                const guide = getGuide(slug);
                if (!guide) return null;
                return (
                  <Link key={slug} href={`/guides/${slug}`} className="card p-4 transition hover:border-[#7c6cff]/45">
                    <div className="text-[11px] font-bold text-zinc-500">{app.name}</div>
                    <div className="mt-1 font-bold">{guide.title}</div>
                  </Link>
                );
              }),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
