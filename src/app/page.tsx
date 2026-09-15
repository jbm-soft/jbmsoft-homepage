import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { JsonLd } from "@/components/JsonLd";
import { portfolioItems } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { tools } from "@/data/tools";
import { faqJsonLd } from "@/lib/seo";

const cases = [
  {
    title: "교육용 퀴즈·학습 앱",
    desc: "문해력·단어 암기·성취도 리포트까지",
    image: "/images/portfolio/case-edu-app.png",
  },
  {
    title: "행사·부스 체험 게임",
    desc: "박람회·축제용 스탬프·미션·즉석 미니게임",
    image: "/images/portfolio/case-event-game.png",
  },
  {
    title: "가격·공고 크롤링",
    desc: "경쟁가·입찰·채용 공고를 시트에 자동 적재",
    image: "/images/portfolio/case-crawling.png",
  },
  {
    title: "예약·중개 웹",
    desc: "매장 예약, 문의·매칭, 관리자 권한",
    image: "/images/portfolio/case-booking.png",
  },
  {
    title: "업무·정산 자동화",
    desc: "엑셀 병합, 반복 보고서, 알림 자동화",
    image: "/images/portfolio/case-automation.png",
  },
  {
    title: "홍보용 캐주얼 게임",
    desc: "이벤트 룰렛·탭 게임·쿠폰 연동",
    image: "/images/portfolio/case-mobile-game.png",
  },
  {
    title: "재고·바코드 시스템",
    desc: "입고·출고·실사를 빠르게",
    image: "/images/portfolio/case-inventory.png",
  },
  {
    title: "설문·관리자 대시보드",
    desc: "수집부터 통계 차트까지 한 흐름",
    image: "/images/portfolio/case-admin.png",
  },
];

const strengths = [
  "8년 이상 외주 실전 경험 — 다양한 업종과 목적의 프로젝트 수행",
  "초기 아이디어만 있어도 설계부터 완성까지 전 과정을 함께합니다",
  "불필요한 기능은 제외하고, 실용성 높은 핵심 기능 중심으로 개발",
  "합리적인 비용으로 사업화 가능한 형태까지 구체화합니다",
];

const fits = [
  "교육·퀴즈 앱, 행사 부스 게임, 크롤링까지 외주로 맡기고 싶다",
  "복잡한 요구 없이, 단순하고 빠르게 실용적인 프로그램을 원한다",
  "비용을 아껴 MVP·시제품부터 시작하고 싶다",
  "이전 업체 견적이 너무 높아 고민 중이다",
];

const process = [
  "초기 상담 및 요구사항 파악",
  "기능 정리 및 견적·일정 제안",
  "계약 체결 및 선금 결제",
  "디자인 및 프로토타입 확인",
  "기능 개발 및 중간 점검",
  "테스트 및 최종 수정",
  "완료·납품 및 잔금 결제",
  "유지보수 또는 추가 확장 논의",
];

const faqs = [
  {
    question: "제작 기간은 얼마나 걸리나요?",
    answer:
      "단순 웹/소개용 앱은 보통 1~2주, 기능형 앱·웹 시스템은 3~6주, 중대형 프로그램은 2~3개월 정도입니다. 여유 일정으로 진행하거나, 리소스를 집중 투입해 단축할 수도 있습니다(단축 시 추가 비용이 발생할 수 있습니다).",
  },
  {
    question: "유지보수는 어떻게 진행되나요?",
    answer:
      "제작 완료 후에도 유지보수를 지원합니다. 한 번의 수정 요청은 보통 전체 개발비의 5~10% 수준으로 책정하며, 항목이 많거나 장기 관리가 필요하면 정기 유지보수 계약도 가능합니다. 납품 후 단순 오작동/버그는 14일 이내 무상 수정, 이후 또는 기능 변경은 유상으로 협의합니다.",
  },
  {
    question: "개발은 어떤 순서로 진행되나요?",
    answer:
      "상담 → 기능 정리·견적 → 계약·선금 → 디자인/프로토타입 → 개발·중간점검 → 테스트 → 납품·잔금 → 유지보수/확장 순으로 진행합니다.",
  },
  {
    question: "계약 및 결제는 어떻게 이루어지나요?",
    answer:
      "기본적으로 선금 30% → 중도금 40% → 잔금 30%의 3단계 분할 결제입니다. 규모와 기간에 따라 비율은 조정 가능하며, 계약서·세금계산서 발행을 지원합니다. 모든 프로젝트는 계약금을 포함한 선금 결제 후 착수되며, 계약금은 초기 투입비용으로 환불이 불가합니다.",
  },
  {
    question: "제작 전 무엇을 준비하면 되나요?",
    answer:
      "만들고 싶은 프로그램의 간단한 설명(또는 유사 서비스), 원하는 기능·페이지 흐름, 참고 사이트/디자인 느낌, 배포 대상(웹·안드로이드·iOS·내부용)이 있으면 충분합니다. 정확한 기획서가 없어도 아이디어만으로 구조부터 함께 잡습니다.",
  },
  {
    question: "상담은 비대면도 가능한가요?",
    answer:
      "네. 편하신 방식으로 상담합니다. 비대면·대면 모두 가능하며, 대면 시 거리가 멀면 출장비가 발생할 수 있습니다.",
  },
];

const plans = [
  {
    name: "단순 웹 / 소개용",
    price: "협의",
    period: "1~2주",
    features: ["소개·랜딩 중심", "문의/예약 폼", "모바일 최적화"],
    hot: false,
  },
  {
    name: "기능형 앱·웹",
    price: "협의",
    period: "3~6주",
    features: ["핵심 기능 구현", "관리자/회원", "중간 점검·데모"],
    hot: true,
  },
  {
    name: "중대형 프로그램",
    price: "협의",
    period: "2~3개월",
    features: ["복합 업무 시스템", "자동화·연동", "유지보수 연계"],
    hot: false,
  },
];

export default function HomePage() {
  const featuredPortfolio = [
    ...portfolioItems.filter((p) => p.real),
    ...portfolioItems.filter((p) => !p.real),
  ].slice(0, 6);
  const featuredTools = tools.filter((t) => t.featured).slice(0, 9);

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      <section className="relative overflow-hidden pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-indigo.png"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/40 via-[#07070a]/75 to-[#07070a]" />
        </div>
        <div className="container-page grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="mb-6">
              <BrandLogo size="hero" href={null} priority className="animate-[fadeUp_.7s_ease]" />
            </div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-bold">
              <span className="h-2 w-2 rounded-full bg-[#35e0c3] shadow-[0_0_12px_#35e0c3]" />
              {siteConfig.years}년 실전 외주 · 사업자 등록
            </div>
            <h1 className="mb-4 max-w-[15ch] text-[clamp(2.3rem,6.2vw,4.3rem)] font-black leading-[1.05] tracking-[-0.05em]">
              아이디어만 있어도,
              <br />
              <span className="gradient-text">완성까지 함께합니다.</span>
            </h1>
            <p className="mb-7 max-w-[48ch] text-base leading-relaxed text-zinc-300 md:text-lg">
              안녕하세요. {siteConfig.name}는 {siteConfig.years}년간 수많은 프로젝트를
              책임감 있게 수행한 소프트웨어 전문 개발팀입니다. 웹사이트, 앱, 내부 프로그램 등
              디지털 솔루션을 직접 설계·제작·관리합니다.
            </p>
            <div className="mb-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                무료 상담 요청
              </Link>
              <Link href="/portfolio" className="btn-ghost">
                제작 사례 보기
              </Link>
            </div>
            <div className="grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                [`${siteConfig.years}년+`, "외주 경험"],
                ["교육·자동화", "다수 납품"],
                ["MVP부터", "사업화까지"],
                ["비대면/대면", "상담 가능"],
              ].map(([v, l]) => (
                <div key={l} className="card px-3 py-3">
                  <div className="text-lg font-extrabold tracking-tight">{v}</div>
                  <div className="text-xs text-zinc-400">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[22px] border border-white/12 bg-gradient-to-br from-[#12121a] via-[#0c0c14] to-[#07070a] shadow-[0_30px_80px_rgba(0,0,0,.45)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(124,108,255,.28),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(53,224,195,.12),transparent_40%)]" />
            <BrandLogo size="hero" href={null} priority className="relative z-10" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="eyebrow">About</div>
          <h2 className="section-title">우리가 만드는 것</h2>
          <p className="mb-8 max-w-3xl text-zinc-400 leading-relaxed">
            교육용 프로그램, 행사·부스 체험 게임, 가격·공고 크롤링, 예약·중개 웹, 업무 자동화,
            재고·바코드, 설문·관리자 대시보드까지 — 외주로 맡기기 좋은 실무형 제작을 합니다.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cases.map((item) => (
              <article key={item.title} className="card overflow-hidden">
                <div className="relative aspect-[16/10] bg-[#0c0c12]">
                  <Image src={item.image} alt="" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-bold">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-zinc-500">
            그 외에도 포인트 다운로드, 소규모 쇼핑몰, 커뮤니티, AI 챗봇, OMR 채점 등
            요청에 맞춰 범위를 잡아 제작합니다.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <div className="eyebrow">Strength</div>
            <h2 className="section-title">JBM SOFT의 강점</h2>
            <ul className="space-y-3">
              {strengths.map((s) => (
                <li key={s} className="card p-4 text-sm leading-relaxed text-zinc-300">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow">Fit</div>
            <h2 className="section-title">이런 분들께 적합합니다</h2>
            <ul className="space-y-3">
              {fits.map((s) => (
                <li key={s} className="card p-4 text-sm leading-relaxed text-zinc-300">
                  “{s}”
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-zinc-400">
              기획이 부족해도 괜찮습니다. 아이디어만 주시면 완성까지 도와드립니다.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="eyebrow">Process</div>
          <h2 className="section-title">진행 순서</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <div key={step} className="card p-4">
                <div className="mb-2 text-sm font-black text-[#7c6cff]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-sm font-semibold text-zinc-200">{step}</div>
              </div>
            ))}
          </div>
          <div className="card mt-6 p-5 text-sm leading-relaxed text-zinc-400">
            갑작스러운 프로젝트 중단 시에는 진행률에 따라 정산하며, 소스코드·디자인은 대가 지급 후
            사용이 가능합니다.
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="container-page">
          <div className="eyebrow">Estimate</div>
          <h2 className="section-title">기간 가이드</h2>
          <p className="mb-8 max-w-2xl text-zinc-400">
            정확한 견적은 범위에 따라 달라집니다. 상담 후 합리적인 제안을 드립니다.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`card p-6 ${plan.hot ? "border-[#7c6cff]/50 bg-gradient-to-b from-[#7c6cff]/20 to-[#101016]" : ""}`}
              >
                {plan.hot ? (
                  <div className="mb-3 inline-flex rounded-full bg-gradient-to-r from-[#7c6cff] to-[#ff4d9a] px-2.5 py-1 text-[11px] font-extrabold">
                    많이 선택
                  </div>
                ) : null}
                <h3 className="mb-1 font-bold">{plan.name}</h3>
                <div className="mb-1 text-sm text-[#35e0c3]">{plan.period}</div>
                <div className="mb-4 text-2xl font-black tracking-tight">{plan.price}</div>
                <ul className="mb-5 space-y-2 text-sm text-zinc-300">
                  {plan.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <Link href="/contact" className={plan.hot ? "btn-primary w-full" : "btn-ghost w-full"}>
                  견적 상담
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-zinc-500">
            결제: 선금 30% → 중도금 40% → 잔금 30% (규모에 따라 조정 가능) · 계약서/세금계산서 지원
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">Work</div>
              <h2 className="section-title">제작 사례</h2>
            </div>
            <Link href="/portfolio" className="btn-ghost">
              전체 보기
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPortfolio.map((item) => (
              <Link
                key={item.slug}
                href={`/portfolio/${item.slug}`}
                className="card overflow-hidden transition hover:-translate-y-1 hover:border-[#7c6cff]/45"
              >
                <div className="relative aspect-[4/3] bg-[#0c0c12]">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] font-bold backdrop-blur">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-bold tracking-tight">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.lead}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">Tools</div>
              <h2 className="section-title">바로 쓰는 무료 도구</h2>
              <p className="max-w-xl text-zinc-400">
                타이머, QR, 글자수 계산 등 일상·업무에 바로 쓸 수 있는 웹 도구입니다.
              </p>
            </div>
            <Link href="/tools" className="btn-ghost">
              도구 전체 보기
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="card p-5 transition hover:-translate-y-1 hover:border-[#7c6cff]/50"
              >
                <h3 className="mb-2 text-lg font-bold tracking-tight">{tool.name}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page max-w-3xl">
          <div className="eyebrow">Business</div>
          <h2 className="section-title">사업자 정보</h2>
          <div className="card space-y-3 p-6 text-sm text-zinc-300">
            <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
              <span className="text-zinc-500">상호명</span>
              <span className="font-semibold text-right">
                {siteConfig.legalName}({siteConfig.brandEn})
              </span>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
              <span className="text-zinc-500">대표자</span>
              <span className="font-semibold">{siteConfig.representative}</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
              <span className="text-zinc-500">사업자등록번호</span>
              <span className="font-semibold">{siteConfig.bizNo}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">사업장 주소</span>
              <span className="max-w-[18rem] text-right font-semibold">{siteConfig.address}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="eyebrow">FAQ</div>
          <h2 className="section-title">자주 묻는 질문</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="card p-5">
                <summary className="cursor-pointer list-none font-bold">{faq.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10">
            <Image src="/images/hero-indigo.png" alt="" fill className="object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07070a]/95 to-[#07070a]/45" />
            <div className="relative z-10 p-8 md:p-12">
              <div className="eyebrow">Contact</div>
              <h2 className="mb-3 text-[clamp(1.6rem,4vw,2.5rem)] font-black tracking-tight">
                부담 없이 문의해 주세요.
              </h2>
              <p className="mb-6 max-w-2xl text-zinc-300 leading-relaxed">
                최적의 견적, 실용적인 결과물, 빠른 소통을 약속드립니다. 비대면·대면 상담 모두 가능합니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${siteConfig.email}`} className="btn-primary">
                  {siteConfig.email}
                </a>
                <a href={`tel:${siteConfig.phoneTel}`} className="btn-ghost">
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
