import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "이용약관",
  description: "JBMSOFT 웹사이트 이용약관입니다.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="container-page prose prose-invert max-w-3xl py-14 md:py-20">
      <h1>이용약관</h1>
      <p>
        본 약관은 {siteConfig.name} 웹사이트 및 무료 유틸 이용에 적용됩니다.
      </p>
      <h2>1. 서비스 성격</h2>
      <p>무료 유틸은 편의를 위한 도구이며, 특정 결과의 정확성·완전성을 보증하지 않습니다.</p>
      <h2>2. 외주 계약</h2>
      <p>별도 견적·계약서가 우선합니다. 웹사이트 안내는 참고용입니다.</p>
      <h2>3. 금지 행위</h2>
      <p>서비스 장애를 유발하는 행위, 무단 크롤링 남용, 법령 위반 이용을 금지합니다.</p>
      <h2>4. 계약·결제·유지보수</h2>
      <p>
        외주 프로젝트는 선금(계약금 포함) 결제 후 착수하며, 계약금은 초기 투입비용으로 환불이 불가합니다.
        납품 후 단순 오작동/버그는 14일 이내 무상 수정, 이후 또는 기능 변경은 유상 유지보수로 협의합니다.
      </p>
      <h2>5. 연락처</h2>
      <p>{siteConfig.email} / {siteConfig.phone}</p>
      <p>
        {siteConfig.legalName}({siteConfig.brandEn}) · 대표 {siteConfig.representative} ·
        사업자등록번호 {siteConfig.bizNo} · {siteConfig.address}
      </p>
    </div>
  );
}
