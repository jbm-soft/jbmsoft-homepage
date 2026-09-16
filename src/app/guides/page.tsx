import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "가이드 – 실수령액·타이머·QR·크롤링·행사 게임",
  description:
    "검색으로 바로 찾는 실무 가이드. 연봉 실수령액, 온라인 타이머, QR 생성, 웹 크롤링 외주, 행사 부스 게임 제작.",
  path: "/guides",
  keywords: ["연봉 실수령액 계산기", "온라인 타이머", "QR 코드 생성기", "웹 크롤링 외주", "행사 부스 게임"],
});

export default function GuidesPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="eyebrow">Guides</div>
      <h1 className="section-title">검색으로 찾는 실무 가이드</h1>
      <p className="mb-8 max-w-2xl text-zinc-400">
        바로 쓰는 무료 도구와, 외주로 맡기기 좋은 제작 사례를 주제별로 정리했습니다.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="card p-5 transition hover:-translate-y-1 hover:border-[#7c6cff]/50"
          >
            <h2 className="mb-2 text-lg font-bold tracking-tight">{guide.title}</h2>
            <p className="text-sm leading-relaxed text-zinc-400">{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
