import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "앱·웹 개발 외주 문의와 견적 상담",
  description:
    "안드로이드 앱·웹 개발 외주 문의. 만들고 싶은 것, 참고 서비스, 배포 대상, 희망 일정, 예산 감을 알려 주시면 범위를 같이 정리합니다.",
  path: "/contact",
});

const prepare = [
  "만들고 싶은 프로그램의 간단한 설명, 또는 비슷한 서비스",
  "꼭 필요한 기능과 없어도 되는 기능",
  "참고하고 싶은 사이트나 화면의 느낌",
  "배포 대상(웹, 안드로이드, iOS, 내부용)",
  "희망 일정과 예산의 대략적인 감",
];

const steps = [
  "상담으로 요구를 듣습니다.",
  "기능과 기간·견적 기준을 제안합니다.",
  "계약과 선금 이후 디자인·개발·점검을 진행합니다.",
  "납품 뒤 유지보수나 확장을 따로 논의합니다.",
];

export default function ContactPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="eyebrow">Contact</div>
      <h1 className="section-title">앱·웹 개발 외주 문의</h1>
      <p className="mb-8 max-w-2xl text-zinc-400 leading-relaxed">
        아이디어만 있어도 충분합니다. 편하신 방식으로 상담을 진행하며, 비대면·대면 모두 가능합니다.
        대면이고 거리가 멀면 출장비가 생길 수 있습니다. 회신까지 걸리는 시간을 숫자로 약속하지는 않습니다.
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

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-extrabold tracking-tight">견적 전에 알려 주시면 좋은 것</h2>
        <ol className="grid gap-3 md:grid-cols-2">
          {prepare.map((item, index) => (
            <li key={item} className="card p-4 text-sm leading-relaxed text-zinc-300">
              <span className="mb-1 block text-xs font-black text-[#7c6cff]">{index + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-extrabold tracking-tight">진행 순서</h2>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="card p-4 text-sm text-zinc-300">
              <span className="mr-2 font-black text-[#35e0c3]">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-zinc-500">
          기간 기준은 <Link href="/pricing" className="text-[#35e0c3] hover:underline">기간·견적</Link>에,
          안드로이드 앱 범위는 <Link href="/services/app-development" className="text-[#35e0c3] hover:underline">앱 개발 외주</Link>에
          적어 두었습니다. 자사 앱 출시 알림도 이 메일로 받습니다.
        </p>
      </section>

      <div className="card mt-6 space-y-2 p-6 text-sm leading-relaxed text-zinc-300">
        <p>메일 제목 예시: [외주문의] 교육용 앱 / 대략 예산 / 희망 일정</p>
        <p>
          {siteConfig.legalName}({siteConfig.brandEn}) · 대표 {siteConfig.representative} · {siteConfig.bizNo}
        </p>
      </div>
    </div>
  );
}
