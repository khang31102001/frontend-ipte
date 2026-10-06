import type { Metadata } from "next";
import { ArticlesListPage } from "@/features/articles";

export const metadata: Metadata = { title: "Bài viết" };

export default function Page() {
  return <ArticlesListPage />;
}
