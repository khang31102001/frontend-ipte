import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminProviders } from "./providers";

export const metadata: Metadata = {
  title: { default: "Quản trị", template: "%s | Quản trị PTE iPASS" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminProviders>{children}</AdminProviders>;
}
