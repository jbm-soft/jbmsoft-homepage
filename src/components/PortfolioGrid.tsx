"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { portfolioCategories, portfolioItems } from "@/data/portfolio";

export function PortfolioGrid() {
  const [active, setActive] = useState<(typeof portfolioCategories)[number]>("전체");
  const list = useMemo(
    () =>
      active === "전체"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === active),
    [active],
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {portfolioCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full border px-3.5 py-2 text-xs font-bold transition ${
              active === cat
                ? "border-[#7c6cff]/60 bg-[#7c6cff]/20 text-white"
                : "border-white/10 bg-white/[0.03] text-zinc-400"
            }`}
          >
            {cat}
            {cat === "전체" ? ` (${portfolioItems.length})` : ""}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item) => (
          <Link
            key={item.slug}
            href={`/portfolio/${item.slug}`}
            className="card overflow-hidden transition hover:-translate-y-1 hover:border-[#7c6cff]/45"
          >
            <div className="relative aspect-[4/3] bg-[#0c0c12]">
              <Image src={item.image} alt={`${item.title} 포트폴리오 이미지`} fill className="object-cover" />
              <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] font-bold backdrop-blur">
                {item.category}
              </span>
              {item.real ? (
                <span className="absolute right-3 top-3 rounded-full border border-[#35e0c3]/35 bg-[#35e0c3]/15 px-2.5 py-1 text-[10px] font-bold text-[#35e0c3]">
                  실납품
                </span>
              ) : null}
            </div>
            <div className="p-4">
              <h2 className="mb-1 text-base font-bold tracking-tight">
                {String(item.id).padStart(2, "0")}. {item.title}
              </h2>
              <p className="mb-3 text-sm text-zinc-400">{item.lead}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
