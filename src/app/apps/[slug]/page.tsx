import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLanding } from "@/components/apps/AppLanding";
import { firstPartyApps, getApp } from "@/data/apps";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return firstPartyApps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};
  return buildMetadata({
    title: app.seoTitle,
    description: app.description,
    path: `/apps/${app.slug}`,
    keywords: app.keywords,
    image: app.ogImage,
  });
}

export default async function AppPage({ params }: Props) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  return <AppLanding app={app} />;
}
