import type { Metadata } from "next";
import { BranchCreatePage } from "@/features/branches";

export const metadata: Metadata = { title: "Thêm cơ sở" };

export default function Page() {
  return <BranchCreatePage />;
}
