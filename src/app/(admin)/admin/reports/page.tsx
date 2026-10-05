import type { Metadata } from "next";
import { ReportsPage } from "@/features/dashboard";

export const metadata: Metadata = { title: "Báo cáo" };

export default function Page() {
  return <ReportsPage />;
}
