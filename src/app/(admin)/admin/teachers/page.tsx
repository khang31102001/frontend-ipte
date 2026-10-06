import type { Metadata } from "next";
import { TeachersListPage } from "@/features/teachers";

export const metadata: Metadata = { title: "Giáo viên" };

export default function Page() {
  return <TeachersListPage />;
}
