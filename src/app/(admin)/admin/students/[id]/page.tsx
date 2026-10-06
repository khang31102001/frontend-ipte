import type { Metadata } from "next";
import { StudentDetailPage } from "@/features/students";

export const metadata: Metadata = { title: "Chi tiết học viên" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StudentDetailPage studentId={id} />;
}
