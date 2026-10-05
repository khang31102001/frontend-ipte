import type { Metadata } from "next";
import { StudentsListPage } from "@/features/students";

export const metadata: Metadata = { title: "Học viên" };

export default function Page() {
  return <StudentsListPage />;
}
