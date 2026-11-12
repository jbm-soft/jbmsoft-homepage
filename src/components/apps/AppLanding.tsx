import Image from "next/image";
import Link from "next/link";
import { ConceptVisual } from "@/components/apps/ConceptVisual";
import { JsonLd } from "@/components/JsonLd";
import { firstPartyApps, prelaunchMailto, type FirstPartyApp } from "@/data/apps";
import { getGuide } from "@/data/guides";
import { siteConfig } from "@/data/site";
import { androidAppJsonLd, breadcrumbJsonLd, faqJsonLd, organizationJsonLd } from "@/lib/seo";

export function AppLanding({ app }: { app: FirstPartyApp }) {
  const mailto = prelaunchMailto(app.notifySubject);
  const guides = app.guideSlugs.map((slug) => getGuide(slug)).filter((guide) => guide !== undefined);
  const others = firstPartyApps.filter((item) => item.slug !== app.slug);
  const accent = app.accent === "mint" ? "text-[#35e0c3]" : "text-[#7c6cff]";

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          androidAppJsonLd({
            name: app.name,
            description: app.description,
            path: `/apps/${app.slug}`,
            applicationCategory: app.applicationCategory,
          }),
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "앱", path: "/apps" },
            { name: app.name, path: `/apps/${app.slug}` },
          ]),
          faqJsonLd(app.faqs),
        ]}
      />

      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="absolute inset-0 -z-10">
          <Image src={app.heroImage} alt="" fill priority className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/35 via-[#07070a]/78 to-[#07070a]" />
        </div>
        <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
          <div>
            <nav aria-label="breadcrumb" className="mb-6 text-sm text-zinc-400">
              <Link href="/" className="hover:text-white">홈</Link>
              <span aria-hidden className="px-1.5">/</span>
              <Link href="/apps" className="hover:text-white">앱</Link>
              <span aria-hidden className="px-1.5">/</span>
              <span className="text-zinc-200">{app.name}</span>
            </nav>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold">
                Android
              </span>
              <span className="rounded-full border border-[#35e0c3]/30 bg-[#35e0c3]/10 px-3 py-1 text-[11px] font-extrabold text-[#35e0c3]">
                출시 예정
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold">
                JBM SOFT 개발
              </span>
            </div>
            <p className={`mb-3 text-sm font-extrabold ${accent}`}>{app.name}</p>
            <h1 className="mb-4 max-w-[12ch] text-[clamp(2.2rem,6vw,4rem)] font-black leading-[1.05] tracking-[-0.05em]">
              {app.headline}
              <br />
              <span className="gradient-text">{app.headlineAccent}</span>
            </h1>
            <p className="mb-6 max-w-[52ch] text-base leading-relaxed text-zinc-300 md:text-lg">{app.lead}</p>
            <div className="rounded-[1.25rem] border border-white/10 bg-[#101016]/80 p-4 backdrop-blur-sm md:p-5">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-zinc-500">
                출시 후 앱에서
              </div>
              <p className="mt-1 text-lg font-extrabold tracking-tight">{app.futureAction}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                지금은 출시 전입니다. 스토어 다운로드 대신 알림과 문의만 받습니다.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={mailto} className="btn-primary">
                  출시 알림 받기
                </a>
                <Link href="/contact" className="btn-ghost">
                  문의 페이지
                </Link>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                <a className="underline decoration-white/20 underline-offset-4 hover:text-white" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                <span aria-hidden> · </span>
                <a className="hover:text-white" href={siteConfig.url}>
                  {siteConfig.url.replace("https://", "")}
                </a>
              </p>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              {app.heroPoints.map((point) => (
                <div key={point.label} className="card px-3 py-3">
                  <dt className="text-[11px] font-bold text-zinc-500">{point.label}</dt>
                  <dd className="mt-1 text-sm font-bold tracking-tight">{point.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ConceptVisual variant={app.slug} />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="eyebrow">How it works</div>
          <h2 className="section-title">이렇게 씁니다</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {app.steps.map((step, index) => (
              <article key={step.title} className="card p-5">
                <div className={`mb-2 text-sm font-black ${accent}`}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-lg font-extrabold tracking-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="eyebrow">Features</div>
          <h2 className="section-title">준비 중인 범위</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((feature) => (
              <article key={feature.title} className="card p-5">
                <h3 className="mb-2 font-extrabold tracking-tight">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {app.later ? (
        <section className="py-16 md:py-20">
          <div className="container-page">
            <div className="eyebrow">Later</div>
            <h2 className="section-title">이후 단계</h2>
            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-zinc-400">
              아래는 이번 출시 범위에 넣지 않습니다. 준비 중이라는 안내이며, 지금 받을 수 있는 기능이 아닙니다.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {app.later.map((item) => (
                <article key={item.title} className="rounded-[1.25rem] border border-dashed border-white/15 bg-transparent p-5">
                  <h3 className="mb-2 font-extrabold tracking-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {app.market ? (
        <section className="py-16 md:py-20">
          <div className="container-page">
            <div className="eyebrow">Context</div>
            <h2 className="section-title">동행 점검의 공개 비용</h2>
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-zinc-400">{app.market.intro}</p>
            <div className="grid gap-3 lg:grid-cols-3">
              {app.market.items.map((item) => (
                <article key={item.name} className="card p-5">
                  <h3 className="font-extrabold">{item.name}</h3>
                  <p className={`mt-1 text-sm font-bold ${accent}`}>{item.price}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.note}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-sm font-semibold text-[#35e0c3] hover:underline"
                  >
                    안내 페이지
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-xs leading-relaxed text-zinc-500">{app.market.footnote}</p>
          </div>
        </section>
      ) : null}

      {app.alternatives ? (
        <section className="py-16 md:py-20">
          <div className="container-page">
            <div className="eyebrow">Elsewhere</div>
            <h2 className="section-title">다른 환경의 도구</h2>
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-zinc-400">{app.alternatives.intro}</p>
            <div className="grid gap-3 md:grid-cols-2">
              {app.alternatives.items.map((item) => (
                <article key={item.name} className="card p-5">
                  <h3 className="font-extrabold">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.body}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-sm font-semibold text-[#35e0c3] hover:underline"
                  >
                    사이트 보기
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="eyebrow">Please note</div>
          <h2 className="section-title">알아두실 점</h2>
          <ul className="space-y-3">
            {app.disclaimers.map((item) => (
              <li key={item} className="rounded-[1.25rem] border border-[#f5c16c]/30 bg-[#f5c16c]/[0.06] p-4 text-sm leading-relaxed text-zinc-200">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-8">
        <div className="container-page">
          <div className="card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">JBM SOFT가 직접 개발합니다</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                {app.name}은 고객 의뢰로 납품한 외주 사례가 아닙니다. {siteConfig.legalName}({siteConfig.brandEn})가
                기획하고 만드는 안드로이드 앱입니다. 외주 제작 사례는 별도의 포트폴리오에서 볼 수 있습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={siteConfig.url} className="btn-primary">
                jbmsoft.co.kr
              </a>
              <Link href="/portfolio" className="btn-ghost">
                외주 사례와 구분
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="eyebrow">FAQ</div>
          <h2 className="section-title">자주 묻는 질문</h2>
          <div className="mt-6 space-y-3">
            {app.faqs.map((faq) => (
              <details key={faq.question} className="card p-5">
                <summary className="cursor-pointer font-bold">{faq.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {guides.length ? (
        <section className="py-8">
          <div className="container-page">
            <div className="eyebrow">Guides</div>
            <h2 className="section-title">앱 없이도 읽을 가이드</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {guides.map((guide) => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`} className="card p-5 transition hover:-translate-y-1 hover:border-[#7c6cff]/45">
                  <h3 className="font-extrabold tracking-tight">{guide.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{guide.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {others.length ? (
        <section className="py-10">
          <div className="container-page">
            <h2 className="mb-4 text-xl font-extrabold tracking-tight">다른 자사 앱</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {others.map((other) => (
                <Link key={other.slug} href={`/apps/${other.slug}`} className="card p-5 transition hover:border-[#7c6cff]/45">
                  <div className="text-[11px] font-extrabold text-[#35e0c3]">출시 예정</div>
                  <h3 className="mt-1 font-extrabold">{other.name}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{other.cardSummary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-20 pt-6">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10">
            <Image src={app.heroImage} alt="" fill className="object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07070a]/95 via-[#07070a]/80 to-[#07070a]/45" />
            <div className="relative z-10 p-8 md:p-12">
              <div className="eyebrow">Pre-launch</div>
              <h2 className="mb-2 text-[clamp(1.6rem,4vw,2.5rem)] font-black tracking-tight">
                {app.futureAction}
              </h2>
              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base">
                {app.name}은 출시 예정입니다. 알림을 남기시면 스토어에 올릴 때 메일로 안내합니다.
                외주 개발 상담은 같은 문의 창구에서 받습니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={mailto} className="btn-primary">
                  출시 알림 받기
                </a>
                <Link href="/contact" className="btn-ghost">
                  문의하기
                </Link>
                <Link href="/apps" className="btn-ghost">
                  앱 전체
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
