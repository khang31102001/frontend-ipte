import type { Metadata } from "next";
import { FormCreatePage } from "@/features/forms";

export const metadata: Metadata = { title: "Tạo biểu mẫu" };

export default function Page() {
  return <FormCreatePage />;
}
