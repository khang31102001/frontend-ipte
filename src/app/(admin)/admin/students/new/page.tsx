import type { Metadata } from "next";
import { StudentCreatePage } from "@/features/students";

export const metadata: Metadata = { title: "Thêm học viên" };

export default function Page() {
  return <StudentCreatePage />;
}
