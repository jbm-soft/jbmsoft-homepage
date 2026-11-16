"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toolCategories, tools, type ToolCategory } from "@/data/tools";

const CATEGORY_META: Record<
  ToolCategory,
  { label: string; icon: string; badgeClass: string }
> = {
  calculator: {
    label: "계산기",
    icon: "🧮",
    badgeClass: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  },
  converter: {
    label: "변환",
    icon: "🔄",
    badgeClass: "border-sky-400/25 bg-sky-400/10 text-sky-300",
  },
  developer: {
    label: "개발자",
    icon: "💻",
    badgeClass: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
  },
  file: {
    label: "문서·파일",
    icon: "📄",
    badgeClass: "border-amber-400/25 bg-amber-400/10 text-amber-300",
  },
  fun: {
    label: "재미",
    icon: "🎲",
    badgeClass: "border-rose-400/25 bg-rose-400/10 text-rose-300",
  },
  image: {
    label: "이미지",
    icon: "🖼️",
    badgeClass: "border-teal-400/25 bg-teal-400/10 text-teal-300",
  },
  korean: {
    label: "생활·한글",
    icon: "🇰🇷",
    badgeClass: "border-indigo-400/25 bg-indigo-400/10 text-indigo-300",
  },
  productivity: {
    label: "생산성",
    icon: "⏱️",
    badgeClass: "border-lime-400/25 bg-lime-400/10 text-lime-300",
  },
  text: {
    label: "텍스트",
    icon: "✍️",
    badgeClass: "border-orange-400/25 bg-orange-400/10 text-orange-300",
  },
  utility: {
    label: "유틸",
    icon: "🛠️",
    badgeClass: "border-slate-400/25 bg-slate-400/10 text-slate-300",
  },
};

export function ToolsGrid({ initialQuery = "" }: { initialQuery?: string }) {
  const [active, setActive] = useState<ToolCategory | "all">("all");
  const [q, setQ] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: tools.length };
    for (const t of tools) {
      map[t.category] = (map[t.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const featuredTools = useMemo(() => tools.filter((t) => t.featured).slice(0, 4), []);

  const list = useMemo(() => {
    const byCat = active === "all" ? tools : tools.filter((t) => t.category === active);
    const query = q.trim().toLowerCase();
    if (!query) return byCat;
    return byCat.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.shortName.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.keywords.some((k) => k.toLowerCase().includes(query)),
    );
  }, [active, q]);

  return (
    <div className="space-y-8">
      {/* 인기 추천 도구 스포트라이트 */}
      {!q && active === "all" && featuredTools.length > 0 ? (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-extrabold tracking-wide text-emerald-300">
              🔥 지금 많이 쓰는 인기 도구
            </h2>
            <span className="text-xs text-slate-500">클릭 즉시 브라우저 실행</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool) => {
              const meta = CATEGORY_META[tool.category];
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/[0.08] via-[#111622] to-sky-500/[0.06] p-4 transition-all hover:-translate-y-1 hover:border-emerald-400/50"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-lg">{meta.icon}</span>
                    <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      인기
                    </span>
                  </div>
                  <div className="font-bold text-white transition group-hover:text-emerald-300">
                    {tool.shortName}
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-slate-400">{tool.description}</p>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* 검색바 + 단축키 */}
      <div className="space-y-4">
        <div className="relative">
          <label className="sr-only" htmlFor="tool-search">
            유틸 검색
          </label>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            ref={inputRef}
            id="tool-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="찾고 싶은 도구 검색 (예: HWP, 실수령액, 타이머, QR, JSON...)"
            className="w-full rounded-2xl border border-white/12 bg-[#10141e] py-3.5 pl-11 pr-24 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
            {q ? (
              <button
                type="button"
                onClick={() => setQ("")}
                className="rounded-lg bg-white/10 px-2 py-1 text-xs font-semibold text-slate-300 hover:bg-white/20"
              >
                지우기
              </button>
            ) : (
              <kbd className="hidden rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] font-bold text-slate-400 sm:inline-block">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap items-center gap-2">
          {toolCategories.map((cat) => {
            const isAll = cat.id === "all";
            const meta = isAll ? null : CATEGORY_META[cat.id as ToolCategory];
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-200 shadow-sm shadow-emerald-500/10"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200"
                }`}
              >
                {meta ? <span>{meta.icon}</span> : <span>✨</span>}
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    isActive ? "bg-emerald-400/25 text-emerald-100" : "bg-white/[0.06] text-slate-500"
                  }`}
                >
                  {counts[cat.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 결과 카운트 */}
      <div className="flex items-center justify-between border-b border-white/8 pb-3 text-xs text-slate-400">
        <span>
          총 <strong className="text-white">{list.length}</strong>개의 도구
          {active !== "all" ? ` · ${CATEGORY_META[active].label}` : ""}
        </span>
        <span>100% 무료 · 서버 저장 없음</span>
      </div>

      {/* 도구 카드 그리드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((tool, idx) => {
          const meta = CATEGORY_META[tool.category];
          return (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: Math.min(idx * 0.015, 0.25) }}
            >
              <Link
                href={`/tools/${tool.slug}`}
                className="card card-interactive group flex h-full flex-col justify-between p-5"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${meta.badgeClass}`}
                    >
                      <span>{meta.icon}</span>
                      <span>{meta.label}</span>
                    </span>
                    {tool.featured ? (
                      <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-extrabold text-amber-300">
                        추천
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mb-1.5 text-base font-extrabold tracking-tight text-white transition group-hover:text-emerald-300">
                    {tool.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-400">{tool.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/6 pt-3">
                  <div className="flex flex-wrap gap-1">
                    {tool.keywords.slice(0, 2).map((kw) => (
                      <span
                        key={kw}
                        className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-emerald-300">
                    열기 →
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {list.length === 0 ? (
        <div className="card py-14 text-center">
          <p className="text-sm font-semibold text-slate-300">검색 결과가 없습니다.</p>
          <p className="mt-1 text-xs text-slate-500">다른 키워드로 검색하거나 전체 카테고리를 선택해 보세요.</p>
          <button
            type="button"
            onClick={() => {
              setQ("");
              setActive("all");
            }}
            className="btn-ghost mt-4"
          >
            전체 도구 보기
          </button>
        </div>
      ) : null}
    </div>
  );
}
