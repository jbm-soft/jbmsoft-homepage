import type { Metadata } from "next";
import { ToolsGrid } from "@/components/ToolsGrid";
import { JsonLd } from "@/components/JsonLd";
import { tools } from "@/data/tools";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "무료 웹 도구 100+ – 타이머·HWP·확장자·실수령액·QR",
  description:
    "설치 없이 바로 쓰는 JBM SOFT 무료 웹 도구 100개 이상. HWP 뷰어, 파일 확장자 변경, 이미지 변환, 실수령액·부가세 계산, QR·타이머.",
  path: "/tools",
  keywords: [
    "온라인 타이머",
    "HWP 뷰어",
    "파일 확장자 변경",
    "실수령액 계산기",
    "QR 코드 생성기",
    "이미지 변환",
    "무료 웹 도구",
  ],
});

export default function ToolsPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "무료 유틸", path: "/tools" },
        ])}
      />
      <div className="eyebrow">Tools</div>
      <h1 className="section-title">바로 쓰는 무료 도구 {tools.length}개</h1>
      <p className="mb-8 max-w-2xl text-zinc-400">
        타이머, QR, 글자수 계산 등 일상과 업무에 바로 쓸 수 있는 웹 도구입니다.
        입력값은 브라우저에서만 처리됩니다.
      </p>
      <ToolsGrid />
    </div>
  );
}
