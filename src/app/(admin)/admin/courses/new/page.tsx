import type { Metadata } from "next";
import { CourseCreatePage } from "@/features/courses";

export const metadata: Metadata = { title: "Thêm khóa học" };

export default function Page() {
  return <CourseCreatePage />;
}
