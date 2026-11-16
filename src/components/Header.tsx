"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/cn";

const links = [
  { href: "/portfolio", label: "제작 사례" },
  { href: "/tools", label: "무료 도구 106+" },
  { href: "/guides", label: "가이드" },
  { href: "/#pricing", label: "기간·견적" },
  { href: "/contact", label: "문의" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080a0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] w-[min(1200px,calc(100%-2rem))] items-center justify-between">
        <BrandLogo size="nav" priority />

        <nav className="hidden items-center gap-2 text-sm text-slate-400 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 font-medium transition-all",
                  active
                    ? "bg-emerald-400/12 text-emerald-300 ring-1 ring-emerald-400/30"
                    : "hover:bg-white/[0.05] hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-extrabold !text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-110"
          >
            프로젝트 의뢰
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-xl border border-white/15 bg-white/[0.03] px-3.5 py-2 text-sm font-semibold text-slate-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="메뉴"
        >
          {open ? "닫기" : "메뉴"}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#0c0f17] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1.5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/[0.06]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-1 rounded-xl bg-gradient-to-r from-emerald-400 to-sky-400 px-3.5 py-2.5 text-center text-sm font-extrabold text-slate-950"
              onClick={() => setOpen(false)}
            >
              프로젝트 의뢰
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
