import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  href?: string | null;
  className?: string;
  size?: "nav" | "sm" | "md" | "lg" | "hero";
  priority?: boolean;
  /** dark site default white; use black on light backgrounds */
  variant?: "white" | "black";
};

const sizes = {
  sm: { box: "h-9 w-9", img: 36 },
  nav: { box: "h-14 w-14", img: 56 },
  md: { box: "h-16 w-16", img: 64 },
  lg: { box: "h-20 w-20", img: 80 },
  hero: { box: "h-40 w-40 md:h-52 md:w-52", img: 208 },
} as const;

export function BrandLogo({
  href = "/",
  className,
  size = "nav",
  priority,
  variant = "white",
}: BrandLogoProps) {
  const s = sizes[size];
  const src = variant === "black" ? "/images/logo-black.png" : "/images/logo.png";

  const mark = (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        s.box,
        className,
      )}
    >
      <Image
        src={src}
        alt="JBM SOFT"
        width={s.img}
        height={s.img}
        priority={priority}
        className="h-full w-full object-contain"
      />
    </span>
  );

  if (href === null) return mark;

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 transition hover:opacity-90"
      aria-label="JBM SOFT 홈"
    >
      {mark}
    </Link>
  );
}
