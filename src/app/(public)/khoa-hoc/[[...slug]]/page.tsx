import type { Metadata } from "next";
import { CoursesRoute, coursesMetadata } from "@/features/site";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  return coursesMetadata(slug, sp);
}

export default async function CoursesPage({ params, searchParams }: PageProps) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  return <CoursesRoute slug={slug} searchParams={sp} />;
}
