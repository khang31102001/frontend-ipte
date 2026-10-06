import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import { SiteLayout } from "@/features/site";
import "@/styles/site/site.scss";

const roboto = Roboto({ subsets: ["latin", "vietnamese"], weight: ["300", "400", "500", "700"], variable: "--font-roboto", display: "swap" });

/** Dữ liệu lấy từ API lúc request (có Data Cache theo tag) — build không cần backend đang chạy. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "PTE iPASS – Luyện thi PTE hiệu quả", template: "%s | PTE iPASS" },
  description: "Trung tâm luyện thi PTE với lộ trình cá nhân hóa, giáo viên PTE 85+ và mock test hàng tuần.",
};

export default function PublicLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className={`site ${roboto.variable}`}>
      <SiteLayout>{children}</SiteLayout>
    </div>
  );
}
