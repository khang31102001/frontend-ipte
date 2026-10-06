import type { Metadata } from "next";
import { BranchesListPage } from "@/features/branches";

export const metadata: Metadata = { title: "Cơ sở & phòng học" };

export default function Page() {
  return <BranchesListPage />;
}
