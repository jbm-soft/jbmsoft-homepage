import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { JsonLd } from "@/components/JsonLd";
import { portfolioItems } from "@/data/portfolio";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "앱·웹 개발 외주 제작 사례",
  description:
    "JBM SOFT 앱·웹 개발 외주 제작 사례. 홈페이지, 쇼핑몰, 앱, 크롤링, 보안, 게임, AI, 행사 체험 등 실납품과 확장 사례입니다.",
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
      <h1 className="section-title">제작 사례</h1>
      <p className="mb-8 max-w-2xl text-zinc-400">
        앱·웹 개발 외주로 진행한 작업 {portfolioItems.length}건입니다. 실납품과 업종별 확장 사례가 함께 있으며,
        UI 글자·식별 정보는 모자이크 처리되어 있습니다. 자사 앱은 이 목록이 아니라 앱 소개에 있습니다.
      </p>
      <PortfolioGrid />
    </div>
  );
}
