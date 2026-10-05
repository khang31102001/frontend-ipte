import type { Metadata } from "next";
import { LearningPathsListPage } from "@/features/learning-paths";

export const metadata: Metadata = { title: "Lộ trình học" };

export default function Page() {
  return <LearningPathsListPage />;
}
