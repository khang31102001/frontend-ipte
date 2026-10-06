import type { Metadata } from "next";
import { TeacherDetailPage } from "@/features/teachers";

export const metadata: Metadata = { title: "Chi tiết giáo viên" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TeacherDetailPage teacherId={id} />;
}
