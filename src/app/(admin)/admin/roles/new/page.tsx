import type { Metadata } from "next";
import { RoleCreatePage } from "@/features/roles";

export const metadata: Metadata = { title: "Thêm vai trò" };

export default function Page() {
  return <RoleCreatePage />;
}
