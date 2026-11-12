import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type BuildMetaInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  /** Home title already contains the brand. Do not append "| JBM SOFT". */
  suffixBrand?: boolean;
  /** Layout fallback should not stamp the home canonical onto 404. */
  includeCanonical?: boolean;
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean.endsWith("/") ? clean : `${clean}/`}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords: _keywords = [],
  image = siteConfig.ogImage,
  noIndex = false,
  suffixBrand = true,
  includeCanonical = true,
}: BuildMetaInput): Metadata {
  void _keywords;
  const fullTitle = !suffixBrand || title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const url = pageUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: fullTitle,
    description,
    ...(includeCanonical ? { alternates: { canonical: url } } : {}),
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    email: siteConfig.email,
    telephone: siteConfig.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressCountry: "KR",
    },
    taxID: siteConfig.bizNo,
    founder: siteConfig.representative,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.email,
        telephone: siteConfig.phoneTel,
        areaServed: "KR",
        availableLanguage: ["Korean"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  };
}

export function softwareAppJsonLd(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    inLanguage: "ko-KR",
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

/** Pre-launch Android app. No price, rating, or store URL. */
export function androidAppJsonLd(input: {
  name: string;
  alternateName: string;
  description: string;
  path: string;
  applicationCategory: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: input.name,
    alternateName: input.alternateName,
    description: input.description,
    url: pageUrl(input.path),
    applicationCategory: input.applicationCategory,
    operatingSystem: "Android",
    inLanguage: "ko",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      alternateName: siteConfig.legalName,
      url: siteConfig.url,
    },
  };
}
