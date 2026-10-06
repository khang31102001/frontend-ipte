import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { QueryProvider } from "@/core/query";
import "@/styles/globals.css";

const outfit = Outfit({ subsets: ["latin", "latin-ext"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  title: { default: "PTE iPASS", template: "%s | PTE iPASS" },
  description: "Hệ thống quản trị đào tạo PTE iPASS",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi" className={outfit.variable} suppressHydrationWarning>
      <body>
        <QueryProvider>
          {children}
          <Toaster richColors closeButton position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
