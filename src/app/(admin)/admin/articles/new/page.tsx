import type { Metadata } from "next";
import { ArticleCreatePage } from "@/features/articles";

export const metadata: Metadata = { title: "Viết bài mới" };

export default function Page() {
  return <ArticleCreatePage />;
}
