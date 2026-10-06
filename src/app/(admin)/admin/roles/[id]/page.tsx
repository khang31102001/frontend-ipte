import type { Metadata } from "next";
import { RoleDetailPage } from "@/features/roles";

export const metadata: Metadata = { title: "Chi tiết vai trò" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RoleDetailPage roleId={id} />;
}
