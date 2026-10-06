import type { Metadata } from "next";
import { BranchDetailPage } from "@/features/branches";

export const metadata: Metadata = { title: "Chi tiết cơ sở" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BranchDetailPage branchId={id} />;
}
