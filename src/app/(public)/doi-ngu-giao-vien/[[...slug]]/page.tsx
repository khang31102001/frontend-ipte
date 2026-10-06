import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeachersRoute, teachersMetadata } from "@/features/site";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug && slug.length > 1) return {};
  return teachersMetadata(slug?.[0]);
}

export default async function Page({ params, searchParams }: PageProps) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  if (slug && slug.length > 1) notFound();
  return <TeachersRoute slug={slug?.[0]} searchParams={sp} />;
}
