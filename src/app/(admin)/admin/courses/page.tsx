import type { Metadata } from "next";
import { CoursesListPage } from "@/features/courses";

export const metadata: Metadata = { title: "Khóa học" };

export default function Page() {
  return <CoursesListPage />;
}
