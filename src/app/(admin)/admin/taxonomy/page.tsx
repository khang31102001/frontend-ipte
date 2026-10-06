import type { Metadata } from "next";
import { TaxonomyPage } from "@/features/articles";

export const metadata: Metadata = { title: "Danh mục & Tag" };

export default function Page() {
  return <TaxonomyPage />;
}
