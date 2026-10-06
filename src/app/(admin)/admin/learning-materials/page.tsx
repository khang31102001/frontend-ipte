import type { Metadata } from "next";
import { MaterialsListPage } from "@/features/learning-materials";

export const metadata: Metadata = { title: "Học liệu" };

export default function Page() {
  return <MaterialsListPage />;
}
