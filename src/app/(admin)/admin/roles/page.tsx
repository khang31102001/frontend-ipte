import type { Metadata } from "next";
import { RolesListPage } from "@/features/roles";

export const metadata: Metadata = { title: "Vai trò & quyền" };

export default function Page() {
  return <RolesListPage />;
}
