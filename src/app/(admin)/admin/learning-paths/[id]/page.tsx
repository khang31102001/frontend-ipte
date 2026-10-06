import type { Metadata } from "next";
import { LearningPathDetailPage } from "@/features/learning-paths";

export const metadata: Metadata = { title: "Chi tiết lộ trình học" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LearningPathDetailPage pathId={id} />;
}
