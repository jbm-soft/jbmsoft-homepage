"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = [
  {
    id: "studio",
    tag: "01 · PRODUCT STUDIO",
    title: "아이디어에서 실제 서비스 출시까지",
    desc: "8년 실전 외주 경험과 AI 파이프라인을 결합해 웹사이트, 모바일 앱, 내부 자동화 시스템을 빠르게 설계·구축합니다.",
    image: "/images/studio-hero-v2.jpg",
    ctaLabel: "제작 사례 보기",
    ctaHref: "/portfolio",
    metric: "MVP 1~3주 완성",
  },
  {
    id: "tools",
    tag: "02 · FREE WEB TOOLS 106+",
    title: "설치·광고 없는 106개 무료 웹 도구",
    desc: "HWP 온라인 뷰어, 연봉 실수령액 계산기, QR 생성기, 파일 일괄 변환까지 브라우저에서 1초 만에 실행됩니다.",
    image: "/images/tools-hub-banner.jpg",
    ctaLabel: "무료 도구 바로 쓰기",
    ctaHref: "/tools",
    metric: "100% 브라우저 로컬",
  },
  {
    id: "automation",
    tag: "03 · AUTOMATION & CRAWLING",
    title: "반복 업무를 0으로 줄이는 자동화",
    desc: "경쟁가·복지·공고 크롤링, 엑셀 정산 병합, 알림 봇, PC 보안 유틸리티까지 실무에 바로 투입되는 도구를 만듭니다.",
    image: "/images/portfolio/case-automation.png",
    ctaLabel: "자동화 상담하기",
    ctaHref: "/contact",
    metric: "실무 리드타임 80% 단축",
  },
  {
    id: "game",
    tag: "04 · INTERACTIVE & GAMES",
    title: "유저가 머무는 체험형 앱·미니게임",
    desc: "행사·부스 스탬프 랠리, Unity 캐주얼 게임, B2C 사운드·웰니스 앱까지 몰입감 있는 인터랙션을 구현합니다.",
    image: "/images/portfolio/case-event-game.png",
    ctaLabel: "포트폴리오 확인",
    ctaHref: "/portfolio",
    metric: "Unity · Flutter · Web",
  },
];

export function HeroSlideBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [paused]);

  const current = SLIDES[index];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/12 bg-[#0c1018] shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-[#080a0f]/55 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <span className="rounded-full border border-emerald-400/35 bg-black/55 px-3 py-1 text-[11px] font-extrabold tracking-wider text-emerald-300 backdrop-blur-md">
            {current.tag}
          </span>
          <span className="rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] font-bold text-slate-200 backdrop-blur-md">
            {current.metric}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
            >
              <h3 className="text-xl font-black tracking-tight text-white md:text-2xl">
                {current.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-300 md:text-sm">
                {current.desc}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <Link
                  href={current.ctaHref}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white/12 px-3.5 py-2 text-xs font-bold text-white backdrop-blur transition hover:bg-emerald-400 hover:text-slate-950"
                >
                  {current.ctaLabel} →
                </Link>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="이전 슬라이드"
                    onClick={() => setIndex((index - 1 + SLIDES.length) % SLIDES.length)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-xs text-white transition hover:border-emerald-400/60"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="다음 슬라이드"
                    onClick={() => setIndex((index + 1) % SLIDES.length)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-xs text-white transition hover:border-emerald-400/60"
                  >
                    →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-4 border-t border-white/10 bg-[#0a0d14]">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`relative px-2 py-2.5 text-center text-[11px] font-bold transition ${
              i === index ? "text-emerald-300" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <span className="block truncate">{s.tag.split("·")[1]?.trim()}</span>
            {i === index ? (
              <motion.div
                layoutId="slide-indicator"
                className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 to-sky-400"
              />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ToolsMarquee({
  items,
}: {
  items: { slug: string; shortName: string }[];
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-[#0b0e15] py-3.5">
      <div className="animate-marquee gap-3">
        {doubled.map((item, idx) => (
          <Link
            key={`${item.slug}-${idx}`}
            href={`/tools/${item.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{item.shortName}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
