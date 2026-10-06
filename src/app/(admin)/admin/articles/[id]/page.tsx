import type { Metadata } from "next";
import { ArticleDetailPage } from "@/features/articles";

export const metadata: Metadata = { title: "Chi tiết bài viết" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ArticleDetailPage articleId={id} />;
}
