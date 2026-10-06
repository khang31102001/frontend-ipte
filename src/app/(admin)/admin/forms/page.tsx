import type { Metadata } from "next";
import { FormsListPage } from "@/features/forms";

export const metadata: Metadata = { title: "Biểu mẫu" };

export default function Page() {
  return <FormsListPage />;
}
