import type { Metadata, Viewport } from "next";
import { Inter, Roboto } from "next/font/google";
import "@/styles/globals.scss";
import { categoriesServices } from "@/lib/service/category";
import ClientRoot from "@/Layout/client-root";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const data = await categoriesServices.getCategoryTree({ categoryType: "HEADER" });
  const items = data?.[0]?.children ?? [];

  return <ClientRoot data={items}>{children}</ClientRoot>
}
