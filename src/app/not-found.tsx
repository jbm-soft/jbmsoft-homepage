import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다 | JBM SOFT",
  description: "요청한 주소의 페이지가 없습니다.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container-page py-20">
      <div className="eyebrow">404</div>
      <h1 className="section-title">페이지를 찾을 수 없습니다</h1>
      <p className="mb-6 max-w-xl text-zinc-400">
        주소가 바뀌었거나 아직 없는 페이지입니다. 홈, 앱 소개, 제작 사례에서 다시 찾아 보세요.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          홈으로
        </Link>
        <Link href="/apps" className="btn-ghost">
          앱 소개
        </Link>
        <Link href="/contact" className="btn-ghost">
          문의
        </Link>
      </div>
    </div>
  );
}
