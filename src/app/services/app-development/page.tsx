import type { Metadata } from "next";
import Link from "next/link";
import { firstPartyApps } from "@/data/apps";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "안드로이드 앱 개발 외주 – 기획부터 Play 출시·ASO까지",
  description:
    "안드로이드 앱 개발 외주. 교육·예약·업무 앱을 기획부터 만들고, 스토어 등록정보와 검색어 정리까지 범위를 잡아 진행합니다. 순위는 약속하지 않습니다.",
  path: "/services/app-development",
});

const makes = [
  "교육용 퀴즈·학습 앱",
  "예약·멤버십·멤버 관리",
  "현장 기록, 사진, PDF처럼 휴대폰에서 끝나는 도구",
  "관리자 화면이 있는 소규모 업무 앱",
];

const quoteFactors = [
  "화면 수와 회원·관리자 여부",
  "로그인, 결제, 푸시, 외부 서비스 연동",
  "스토어 등록과 등록정보 정리까지 포함할지",
  "디자인 시안을 새로 잡는지, 있는 자료를 쓰는지",
  "납품 뒤 유지보수를 같이 둘지",
];

const steps = [
  "상담으로 사용자와 꼭 필요한 기능을 나눕니다.",
  "기간과 견적 기준을 제안합니다. 금액은 범위 확정 전이라 이 페이지에 숫자로 적지 않습니다.",
  "계약·선금 뒤 화면을 확인하고 개발합니다.",
  "테스트 후 납품합니다. 스토어 출시가 범위에 있으면 등록정보와 검색어 정리까지 포함합니다.",
];

const faqs = [
  {
    q: "아이폰도 같이 만들 수 있나요?",
    a: "범위에 넣으면 논의합니다. 이 페이지의 기본 안내는 안드로이드입니다. 두 플랫폼은 기간과 견적이 달라집니다.",
  },
  {
    q: "스토어 검색 순위를 보장하나요?",
    a: "보장하지 않습니다. 등록정보와 검색어를 정리하는 작업은 할 수 있고, 노출 순위는 스토어와 사용자의 선택에 따릅니다.",
  },
  {
    q: "기획서가 없어도 되나요?",
    a: "있어도 되고 없어도 됩니다. 비슷한 서비스와 꼭 필요한 기능만 있어도 범위를 같이 잡습니다.",
  },
];

export default function AppDevelopmentPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="eyebrow">Service</div>
      <h1 className="section-title">안드로이드 앱 개발 외주</h1>
      <p className="mb-8 max-w-2xl text-base leading-relaxed text-zinc-300">
        기획이 얕아도, 안드로이드 앱을 쓰는 사람 기준으로 범위를 줄여 만듭니다. 스토어에 올리는 것까지
        맡기면 등록정보와 검색에 쓰는 문장도 같이 정리합니다. 검색 순위를 약속하는 작업은 하지 않습니다.
      </p>
      <div className="mb-10 flex flex-wrap gap-3">
        <Link href="/contact" className="btn-primary">
          외주 문의
        </Link>
        <Link href="/pricing" className="btn-ghost">
          기간·견적 기준
        </Link>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-black tracking-tight">이런 앱을 만듭니다</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {makes.map((item) => (
            <li key={item} className="card p-4 text-sm text-zinc-300">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-black tracking-tight">기간 기준</h2>
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
          홈과 같은 기준입니다. 단순 소개형 웹은 보통 1~2주, 기능형 앱·웹은 3~6주, 중대형은 2~3개월입니다.
          여유 있게 가거나 일정을 당기는 선택은 상담에서 정하고, 당기면 비용이 늘 수 있습니다.
        </p>
        <Link href="/pricing" className="text-sm font-semibold text-[#35e0c3] hover:underline">
          기간과 결제 기준 자세히 보기
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-black tracking-tight">견적이 갈리는 기준</h2>
        <ul className="space-y-2">
          {quoteFactors.map((item) => (
            <li key={item} className="card px-4 py-3 text-sm text-zinc-300">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-black tracking-tight">진행 순서</h2>
        <ol className="grid gap-3 md:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step} className="card p-4 text-sm leading-relaxed text-zinc-300">
              <span className="mb-1 block font-black text-[#7c6cff]">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="mb-2 text-2xl font-black tracking-tight">Play 출시와 검색어 정리</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
          범위에 스토어 출시가 있으면 제목, 짧은 설명, 자세한 설명, 스크린샷에 들어갈 문장을 앱이 실제로 하는 일에 맞춰 정리합니다.
          다른 회사의 이름이나 순위를 암시하는 문구는 넣지 않습니다. 노출 순위 자체는 보장하지 않습니다.
        </p>
      </section>

      <section className="mb-12 rounded-[1.5rem] border border-[#7ec8ff]/30 bg-[#7ec8ff]/5 p-6">
        <div className="text-xs font-extrabold text-[#7ec8ff]">JBM SOFT 앱 · 외주 사례 아님</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight">JBM SOFT가 직접 만드는 앱</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
          아래는 고객 의뢰로 납품한 사례가 아닙니다. 우리가 기획해 출시를 준비하는 안드로이드 앱입니다.
          아직 스토어에 없습니다.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {firstPartyApps.map((app) => (
            <li key={app.slug}>
              <Link href={`/apps/${app.slug}`} className="card block p-4 hover:border-[#7ec8ff]/50">
                <div className="text-[11px] font-bold text-zinc-500">출시 예정</div>
                <div className="mt-1 font-extrabold">{app.name}</div>
                <p className="mt-1 text-sm text-zinc-400">{app.cardSummary}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/apps" className="mt-4 inline-flex text-sm font-semibold text-[#7ec8ff] hover:underline">
          앱 소개 전체
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-black tracking-tight">관련 제작 사례</h2>
        <p className="mb-4 text-sm text-zinc-400">고객 의뢰로 진행한 앱·웹 작업입니다.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/portfolio/mobile-app-mvp" className="card px-4 py-3 text-sm font-bold">
            모바일 앱 MVP 개발 사례
          </Link>
          <Link href="/portfolio" className="card px-4 py-3 text-sm font-bold">
            제작 사례 전체
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-black tracking-tight">자주 묻는 질문</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="card p-5">
              <summary className="cursor-pointer font-bold">{faq.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Link href="/contact" className="btn-primary">
        앱 개발 외주 문의
      </Link>
    </div>
  );
}
