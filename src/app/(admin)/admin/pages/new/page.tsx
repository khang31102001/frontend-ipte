import type { Metadata } from "next";
import { PageCreatePage } from "@/features/cms-pages";

export const metadata: Metadata = { title: "Thêm trang" };

export default function Page() {
  return <PageCreatePage />;
}
