import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { JsonLd } from "@/components/JsonLd";
import { portfolioItems } from "@/data/portfolio";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "포트폴리오 32종 – 웹·앱·자동화·보안·게임",
  description:
    "JBMSOFT 외주 개발 포트폴리오 32종. 홈페이지, 쇼핑몰, 앱, 크롤링, PC보안, 방치형 게임, AI 캐릭터, 스탬프랠리 등 실납품·확장 사례.",
  path: "/portfolio",
  keywords: ["외주 포트폴리오", "웹 제작 사례", "앱 개발 사례", "자동화 프로그램"],
});

export default function PortfolioPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "포트폴리오", path: "/portfolio" },
        ])}
      />
      <div className="eyebrow">Portfolio</div>
      <h1 className="section-title">작업·확장 사례 {portfolioItems.length}종</h1>
      <p className="mb-8 max-w-2xl text-zinc-400">
        실납품(보안·추출기·게임·AI·랠리)과 업종별 확장 사례를 모았습니다. UI 글자·식별 정보는 모자이크 처리되어 있습니다.
      </p>
      <PortfolioGrid />
    </div>
  );
}
