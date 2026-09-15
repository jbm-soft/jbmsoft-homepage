import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "개인정보처리방침",
  description: "JBMSOFT 웹사이트 개인정보처리방침입니다.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="container-page prose prose-invert max-w-3xl py-14 md:py-20">
      <h1>개인정보처리방침</h1>
      <p>
        {siteConfig.name}({siteConfig.url})는 무료 유틸 및 문의 응대 과정에서 필요한 최소한의
        정보만 처리합니다.
      </p>
      <h2>1. 수집 항목</h2>
      <p>문의 시 제공하신 이메일, 전화번호, 프로젝트 내용. 대부분의 유틸은 브라우저에서만 동작하며 입력값을 서버에 저장하지 않습니다.</p>
      <h2>2. 이용 목적</h2>
      <p>견적 상담, 프로젝트 커뮤니케이션, 서비스 개선, 법령상 의무 이행.</p>
      <h2>3. 보관 기간</h2>
      <p>상담 종료 또는 관련 법령에서 정한 기간까지 보관 후 파기합니다.</p>
      <h2>4. 문의</h2>
      <p>개인정보 관련 문의: {siteConfig.email} / {siteConfig.phone}</p>
    </div>
  );
}
