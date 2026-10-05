import type { Metadata } from "next";
import { CourseDetailPage } from "@/features/courses";

export const metadata: Metadata = { title: "Chi tiết khóa học" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CourseDetailPage courseId={id} />;
}
