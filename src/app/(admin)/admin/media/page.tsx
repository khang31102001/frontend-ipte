import type { Metadata } from "next";
import { MediaPage } from "@/features/media";

export const metadata: Metadata = { title: "Thư viện media" };

export default function Page() {
  return <MediaPage />;
}
