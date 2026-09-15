"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toolCategories, tools, type ToolCategory } from "@/data/tools";

export function ToolsGrid({ initialQuery = "" }: { initialQuery?: string }) {
  const [active, setActive] = useState<ToolCategory | "all">("all");
  const [q, setQ] = useState(initialQuery);

  const list = useMemo(() => {
    const byCat = active === "all" ? tools : tools.filter((t) => t.category === active);
    const query = q.trim().toLowerCase();
    if (!query) return byCat;
    return byCat.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.keywords.some((k) => k.toLowerCase().includes(query)),
    );
  }, [active, q]);

  return (
    <div>
      <div className="mb-5">
        <label className="sr-only" htmlFor="tool-search">
          유틸 검색
        </label>
        <input
          id="tool-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="예: 타이머, QR, 글자수, JSON..."
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none ring-[#7c6cff] placeholder:text-zinc-500 focus:ring-2"
        />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {toolCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActive(cat.id)}
            className={`rounded-full border px-3.5 py-2 text-xs font-bold transition ${
              active === cat.id
                ? "border-[#7c6cff]/60 bg-[#7c6cff]/20 text-white"
                : "border-white/10 bg-white/[0.03] text-zinc-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="card p-5 transition hover:-translate-y-1 hover:border-[#7c6cff]/5"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#7c6cff]">{tool.category}</span>
              {tool.featured ? (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-zinc-300">
                  인기
                </span>
              ) : null}
            </div>
            <h2 className="mb-2 text-lg font-bold tracking-tight">{tool.name}</h2>
            <p className="text-sm leading-relaxed text-zinc-400">{tool.description}</p>
          </Link>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="mt-8 text-center text-sm text-zinc-500">검색 결과가 없습니다.</p>
      ) : null}
    </div>
  );
}
