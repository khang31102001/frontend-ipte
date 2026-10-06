import type { Metadata } from "next";
import { PageDetailPage } from "@/features/cms-pages";

export const metadata: Metadata = { title: "Chi tiết trang" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PageDetailPage pageId={id} />;
}
