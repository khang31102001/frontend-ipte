import type { Metadata } from "next";
import { SiteConfigPage } from "@/features/site-config";

export const metadata: Metadata = { title: "Cấu hình website" };

export default function Page() {
  return <SiteConfigPage />;
}
