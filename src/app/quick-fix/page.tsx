import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "엑셀·CSV 반복업무 자동화 49,000원",
  description:
    "엑셀 파일 정리, CSV 병합, 중복 제거, 반복 보고서 작업을 JBM SOFT가 소규모 고정 범위로 자동화합니다. 작업 전 범위와 납기를 확인합니다.",
  path: "/quick-fix",
  keywords: [
    "엑셀 자동화 외주",
    "CSV 병합",
    "엑셀 중복 제거",
    "반복 업무 자동화",
    "파이썬 자동화 외주",
  ],
});

const included = [
  "엑셀·CSV 파일 정리 및 병합",
  "중복 행 제거와 열·형식 변환",
  "반복 작업을 줄이는 간단한 스크립트",
  "샘플 파일 기준 결과 확인 및 수정 1회",
];

const excluded = [
  "로그인·결제·외부 서비스 연동",
  "대용량 데이터 처리 또는 상시 서버 운영",
  "범위가 불명확한 신규 프로그램 전체 개발",
];

export default function QuickFixPage() {
  const subject = encodeURIComponent("[작업 문의] 엑셀·CSV 반복업무 자동화");
  const body = encodeURIComponent(
    `안녕하세요, JBM SOFT.

자동화가 필요한 작업을 문의드립니다.

1. 현재 반복하는 작업:
2. 입력 파일 형식(엑셀/CSV 등):
3. 원하는 결과:
4. 샘플 파일 제공 가능 여부:

파일과 범위를 확인한 뒤 진행 가능 여부와 납기를 안내 부탁드립니다.`,
  );

  return (
    <div className="container-page py-14 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#35e0c3]/25 bg-[#35e0c3]/10 px-3 py-1.5 text-xs font-bold text-[#35e0c3]">
          JBM SOFT · 소규모 고정 범위 작업
        </div>
        <h1 className="mb-5 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
          매번 손으로 하던 엑셀 작업,
          <span className="gradient-text"> 작게 자동화하세요.</span>
        </h1>
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
          파일 병합, 중복 제거, 형식 통일처럼 반복되는 단순 업무를 먼저 확인하고
          작은 범위부터 자동화합니다. 파일과 원하는 결과를 확인한 뒤 착수 여부를 안내합니다.
        </p>

        <div className="card mb-8 grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <div className="mb-2 text-sm font-semibold text-zinc-400">기본 작업 패키지</div>
            <div className="mb-3 text-4xl font-black tracking-tight">49,000원</div>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              파일 1종 또는 단일 반복 작업 1건 기준입니다. 작업 범위가 기본 패키지를
              넘으면 시작 전에 추가 비용과 납기를 안내하며, 동의 없이 추가 작업을 진행하지 않습니다.
            </p>
          </div>
          <a
            href={`mailto:${siteConfig.email}?subject=${subject}&body=${body}`}
            className="btn-primary whitespace-nowrap"
          >
            작업 가능 여부 문의
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="card p-6">
            <h2 className="mb-4 text-lg font-bold">기본 패키지에 포함</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-zinc-300">
              {included.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="font-bold text-[#35e0c3]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="card p-6">
            <h2 className="mb-4 text-lg font-bold">별도 협의가 필요한 작업</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-zinc-300">
              {excluded.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-zinc-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="card mt-4 p-6">
          <h2 className="mb-4 text-lg font-bold">진행 방법</h2>
          <ol className="grid gap-4 text-sm leading-relaxed text-zinc-300 sm:grid-cols-2">
            <li><span className="mr-2 font-black text-[#7c6cff]">01</span>현재 파일과 원하는 결과를 이메일로 전달</li>
            <li><span className="mr-2 font-black text-[#7c6cff]">02</span>작업 범위·납기·비용 확인</li>
            <li><span className="mr-2 font-black text-[#7c6cff]">03</span>합의 후 결제 및 작업 진행</li>
            <li><span className="mr-2 font-black text-[#7c6cff]">04</span>결과 확인 후 파일 또는 스크립트 전달</li>
          </ol>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${siteConfig.email}?subject=${subject}&body=${body}`}
            className="btn-primary"
          >
            {siteConfig.email}로 문의하기
          </a>
          <Link href="/contact" className="btn-ghost">다른 개발 문의</Link>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-zinc-500">
          안내된 금액은 기본 범위의 기준 가격이며, 파일·요구사항 확인 후 최종 확정됩니다.
          민감한 개인정보나 실제 고객 데이터를 보내기 전에는 샘플 또는 비식별 파일을 이용해 주세요.
        </p>
      </div>
    </div>
  );
}
