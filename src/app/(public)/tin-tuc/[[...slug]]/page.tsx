import type { Metadata } from "next";
import { ArticlesRoute, articlesMetadata } from "@/features/site";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  return articlesMetadata("news", slug, sp);
}

export default async function Page({ params, searchParams }: PageProps) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  return <ArticlesRoute section="news" slug={slug} searchParams={sp} />;
}
