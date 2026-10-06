import type { Metadata } from "next";
import { FormDetailPage } from "@/features/forms";

export const metadata: Metadata = { title: "Chi tiết biểu mẫu" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FormDetailPage formId={id} />;
}
