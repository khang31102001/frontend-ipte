import type { Metadata } from "next";
import { TeacherCreatePage } from "@/features/teachers";

export const metadata: Metadata = { title: "Thêm giáo viên" };

export default function Page() {
  return <TeacherCreatePage />;
}
