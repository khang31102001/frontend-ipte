import type { Metadata } from "next";
import { SettingsPage } from "@/features/settings";

export const metadata: Metadata = { title: "Cài đặt hệ thống" };

export default function Page() {
  return <SettingsPage />;
}
