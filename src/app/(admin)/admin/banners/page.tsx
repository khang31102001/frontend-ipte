import type { Metadata } from "next";
import { BannersPage } from "@/features/banners";

export const metadata: Metadata = { title: "Banner" };

export default function Page() {
  return <BannersPage />;
}
