import type { Metadata } from "next";
import { AuditLogsPage } from "@/features/audit-logs";

export const metadata: Metadata = { title: "Nhật ký hoạt động" };

export default function Page() {
  return <AuditLogsPage />;
}
