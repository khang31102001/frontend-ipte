import type { Metadata } from "next";
import { LearningPathCreatePage } from "@/features/learning-paths";

export const metadata: Metadata = { title: "Tạo lộ trình học" };

export default function Page() {
  return <LearningPathCreatePage />;
}
