import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "앱·웹 제작 기간과 견적 기준",
  description:
    "JBM SOFT 앱·웹 제작의 기간 기준과 결제·유지보수 안내. 금액은 범위에 따라 협의하며, 이 페이지에 고정 가격을 적지 않습니다.",
  path: "/pricing",
});

const bands = [
  {
    name: "단순 웹 / 소개용",
    period: "1~2주",
    includes: ["소개·랜딩 중심", "문의·예약 폼", "모바일 화면"],
  },
  {
    name: "기능형 앱·웹",
    period: "3~6주",
    includes: ["핵심 기능", "관리자 또는 회원", "중간 점검"],
  },
  {
    name: "중대형 프로그램",
    period: "2~3개월",
    includes: ["업무 시스템이 여럿 연결된 범위", "자동화·연동", "유지보수 논의"],
  },
];

export default function PricingPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="eyebrow">Estimate</div>
      <h1 className="section-title">앱·웹 제작 기간과 견적 기준</h1>
      <p className="mb-8 max-w-2xl text-zinc-400 leading-relaxed">
        정확한 금액은 범위에 따라 달라져, 이 페이지에는 고정 가격을 적지 않습니다. 아래 기간은 홈에서 안내해 온 기준이고,
        상담 뒤에 제안을 드립니다.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {bands.map((band) => (
          <article key={band.name} className="card p-6">
            <h2 className="font-extrabold">{band.name}</h2>
            <p className="mt-2 text-sm font-bold text-[#35e0c3]">{band.period}</p>
            <p className="mt-1 text-2xl font-black tracking-tight">금액은 협의</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {band.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <article className="card p-6">
          <h2 className="text-lg font-extrabold">견적에 보통 포함되는 것</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
            <li>합의한 화면과 기능의 설계·제작</li>
            <li>중간 점검과 납품 전 테스트</li>
            <li>납품 후 14일 안의 단순 오작동·버그 수정</li>
          </ul>
        </article>
        <article className="card p-6">
          <h2 className="text-lg font-extrabold">범위 밖으로 두는 것</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
            <li>서버, 스토어 등록비, 외부 서비스 이용료</li>
            <li>합의 뒤에 늘어난 기능</li>
            <li>14일이 지난 수정, 또는 기능 변경. 한 번의 수정은 보통 전체 개발비의 5~10%로 잡아 왔고, 항목이 많으면 정기 유지보수로 협의합니다.</li>
          </ul>
        </article>
      </section>

      <section className="card mt-6 p-6 text-sm leading-relaxed text-zinc-300">
        <h2 className="mb-2 text-lg font-extrabold text-white">결제</h2>
        <p>기본은 선금 30%, 중도금 40%, 잔금 30%입니다. 규모에 따라 비율은 조정할 수 있고, 계약서와 세금계산서를 지원합니다.</p>
        <p className="mt-2">모든 프로젝트는 선금 이후 착수합니다. 계약금은 초기 투입 비용이라 환불하지 않는다고 안내해 왔습니다.</p>
        <p className="mt-2">작업이 중간에 멈추면 진행률에 따라 정산하고, 소스와 디자인은 대가를 받은 뒤 사용합니다.</p>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/contact" className="btn-primary">
          견적 문의
        </Link>
        <Link href="/services/app-development" className="btn-ghost">
          앱 개발 외주
        </Link>
      </div>
    </div>
  );
}
