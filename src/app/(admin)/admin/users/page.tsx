import type { Metadata } from "next";
import { UsersPage } from "@/features/users";

export const metadata: Metadata = { title: "Người dùng" };

export default function Page() {
  return <UsersPage />;
}
