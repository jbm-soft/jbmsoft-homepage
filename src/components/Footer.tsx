import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { siteConfig } from "@/data/site";
import { tools } from "@/data/tools";

export function Footer() {
  const featuredTools = tools.filter((t) => t.featured).slice(0, 6);

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#050508]">
      <div className="mx-auto grid w-[min(1180px,calc(100%-2rem))] gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-4">
            <BrandLogo size="lg" />
          </div>
          <p className="text-sm leading-relaxed text-zinc-400">
            {siteConfig.years}년 실전 경험의 소프트웨어 전문 개발팀. 웹·앱·내부 프로그램을
            설계부터 납품까지 책임집니다.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-bold text-zinc-200">바로가기</div>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="/portfolio" className="hover:text-white">제작 사례</Link></li>
            <li><Link href="/tools" className="hover:text-white">무료 도구</Link></li>
            <li><Link href="/guides" className="hover:text-white">가이드</Link></li>
            <li><Link href="/contact" className="hover:text-white">문의</Link></li>
            <li><Link href="/privacy" className="hover:text-white">개인정보처리방침</Link></li>
            <li><Link href="/terms" className="hover:text-white">이용약관</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-bold text-zinc-200">바로 쓰는 도구</div>
          <ul className="space-y-2 text-sm text-zinc-400">
            {featuredTools.map((tool) => (
              <li key={tool.slug}>
                <Link href={`/tools/${tool.slug}`} className="hover:text-white">
                  {tool.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-bold text-zinc-200">사업자 정보</div>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>{siteConfig.legalName}({siteConfig.brandEn})</li>
            <li>대표 {siteConfig.representative}</li>
            <li>사업자등록번호 {siteConfig.bizNo}</li>
            <li>{siteConfig.address}</li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phoneTel}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {siteConfig.legalName}({siteConfig.brandEn}). All rights reserved.
      </div>
    </footer>
  );
}
