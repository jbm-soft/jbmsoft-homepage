import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "문의·견적 상담",
  description:
    "JBM SOFT 외주 개발 문의. 웹·앱·교육용 프로그램·자동화. 비대면·대면 상담 가능.",
  path: "/contact",
  keywords: ["외주 문의", "개발 견적", "앱 제작 상담", "웹 제작 상담"],
});

export default function ContactPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="eyebrow">Contact</div>
      <h1 className="section-title">편하게 문의해 주세요</h1>
      <p className="mb-8 max-w-2xl text-zinc-400 leading-relaxed">
        아이디어만 있어도 충분합니다. 편하신 방식으로 상담을 진행하며, 비대면·대면 모두 가능합니다.
        (대면 시 거리가 멀면 출장비가 발생할 수 있습니다.)
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <a href={`mailto:${siteConfig.email}`} className="card p-6 transition hover:border-[#7c6cff]/45">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#7c6cff]">Email</div>
          <div className="text-xl font-bold">{siteConfig.email}</div>
        </a>
        <a href={`tel:${siteConfig.phoneTel}`} className="card p-6 transition hover:border-[#7c6cff]/45">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#7c6cff]">Phone</div>
          <div className="text-xl font-bold">{siteConfig.phone}</div>
        </a>
      </div>
      <div className="card mt-6 space-y-2 p-6 text-sm leading-relaxed text-zinc-300">
        <p>메일 제목 예시: `[외주문의] 교육용 앱 / 대략 예산 / 희망 일정`</p>
        <p>준비되면 좋은 것: 만들고 싶은 내용, 참고 서비스, 배포 대상(웹/앱/내부용)</p>
        <p>
          {siteConfig.legalName}({siteConfig.brandEn}) · 대표 {siteConfig.representative} ·{" "}
          {siteConfig.bizNo}
        </p>
      </div>
    </div>
  );
}
