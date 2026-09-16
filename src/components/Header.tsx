"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/cn";

const links = [
  { href: "/portfolio", label: "제작 사례" },
  { href: "/tools", label: "무료 도구" },
  { href: "/guides", label: "가이드" },
  { href: "/#pricing", label: "기간·견적" },
  { href: "/contact", label: "문의" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07070a]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] w-[min(1180px,calc(100%-2rem))] items-center justify-between">
        <BrandLogo size="nav" priority />

        <nav className="hidden items-center gap-5 text-sm text-zinc-400 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition hover:text-white",
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? "text-white"
                  : undefined,
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-950"
          >
            프로젝트 의뢰
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg border border-white/15 px-3 py-2 text-sm md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="메뉴"
        >
          메뉴
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#0c0c12] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
