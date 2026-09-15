import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getPortfolio, portfolioItems } from "@/data/portfolio";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolio(slug);
  if (!item) return {};
  return buildMetadata({
    title: `${item.title} 포트폴리오`,
    description: item.lead,
    path: `/portfolio/${item.slug}`,
    keywords: item.tags,
    image: item.image,
  });
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolio(slug);
  if (!item) notFound();

  return (
    <div className="container-page py-14 md:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "포트폴리오", path: "/portfolio" },
          { name: item.title, path: `/portfolio/${item.slug}` },
        ])}
      />
      <Link href="/portfolio" className="mb-6 inline-block text-sm text-zinc-400 hover:text-white">
        ← 포트폴리오 목록
      </Link>
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold">{item.category}</span>
        {item.real ? (
          <span className="rounded-full border border-[#35e0c3]/35 bg-[#35e0c3]/15 px-3 py-1 text-xs font-bold text-[#35e0c3]">
            실납품 기반
          </span>
        ) : null}
      </div>
      <h1 className="section-title">
        {String(item.id).padStart(2, "0")}. {item.title}
      </h1>
      <p className="mb-8 max-w-2xl text-zinc-300">{item.lead}</p>

      <div className="mb-8 overflow-hidden rounded-[22px] border border-white/10">
        <Image
          src={item.image}
          alt={`${item.title} 대표 이미지`}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
          priority
        />
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#7c6cff]">포함 범위</h2>
          <ul className="space-y-2 text-sm text-zinc-300">
            {item.scope.map((s) => (
              <li key={s}>→ {s}</li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#7c6cff]">이런 의뢰</h2>
          <ul className="space-y-2 text-sm text-zinc-300">
            {item.fit.map((s) => (
              <li key={s}>→ {s}</li>
            ))}
          </ul>
        </div>
      </div>

      {item.images.length > 1 ? (
        <div className="mb-10">
          <h2 className="mb-4 text-lg font-bold">관련 컷</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {item.images.map((src) => (
              <div key={src} className="overflow-hidden rounded-xl border border-white/10">
                <Image src={src} alt="" width={640} height={480} className="h-40 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <div className="font-bold">비슷한 작업 의뢰하기</div>
          <p className="text-sm text-zinc-400">범위·일정·예산 감 잡고 바로 제안드립니다.</p>
        </div>
        <Link href="/contact" className="btn-primary">
          문의하기
        </Link>
      </div>
    </div>
  );
}
