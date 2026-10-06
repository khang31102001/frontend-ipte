import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutRoute, aboutMetadata } from "@/features/site";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return slug && slug.length > 1 ? {} : aboutMetadata(slug?.[0]);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (slug && slug.length > 1) notFound();
  return <AboutRoute slug={slug?.[0]} />;
}
