import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="container-page py-12 md:py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "무료 유틸", path: "/tools" },
        ])}
      />

      <div className="relative mb-10 overflow-hidden rounded-3xl border border-white/12 bg-[#0c1018]">
        <Image
          src="/images/tools-hub-banner.jpg"
          alt="JBMSOFT 무료 웹 도구 허브"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a0f]/95 via-[#080a0f]/80 to-transparent" />
        <div className="relative z-10 p-7 md:p-10">
          <div className="eyebrow">Tools Hub</div>
          <h1 className="section-title">바로 쓰는 무료 웹 도구 {tools.length}개</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            타이머, HWP 뷰어, 실수령액 계산기, QR 생성기, 이미지·파일 변환까지 설치와 로그인 없이
            브라우저에서 즉시 실행됩니다. 입력 데이터는 서버로 전송되지 않습니다.
          </p>
        </div>
      </div>

      <ToolsGrid />
    </div>
  );
}
