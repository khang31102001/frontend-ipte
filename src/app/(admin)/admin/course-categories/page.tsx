import type { Metadata } from "next";
import { CourseCategoriesPage } from "@/features/courses";

export const metadata: Metadata = { title: "Danh mục khóa học" };

export default function Page() {
  return <CourseCategoriesPage />;
}
