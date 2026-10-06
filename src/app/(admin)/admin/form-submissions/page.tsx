import type { Metadata } from "next";
import { SubmissionsPage } from "@/features/forms";

export const metadata: Metadata = { title: "Dữ liệu biểu mẫu" };

export default function Page() {
  return <SubmissionsPage />;
}
