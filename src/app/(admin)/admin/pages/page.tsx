import type { Metadata } from "next";
import { PagesListPage } from "@/features/cms-pages";

export const metadata: Metadata = { title: "Trang website" };

export default function Page() {
  return <PagesListPage />;
}
