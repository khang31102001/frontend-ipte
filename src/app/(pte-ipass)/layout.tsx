import type { Metadata, Viewport } from "next";
import { Inter, Roboto } from "next/font/google";
import "@/styles/globals.scss";
import { categoriesServices } from "@/lib/service/category";
import ClientRoot from "@/Layout/client-root";
import { CategoryProvider } from "@/context/category-context";
import { getBaseUrl } from "@/utils/helpers";
import Providers from "@/providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"], // chọn weight bạn cần
  display: "swap",
  variable: "--font-sans",
});
const SITE_NAME = "PTE iPASS";
const SITE_URL = getBaseUrl();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "PTE iPASS giúp học viên đạt target PTE cao với lộ trình rõ ràng, giáo viên chất lượng và tài liệu chuẩn.",

  applicationName: SITE_NAME,

  alternates: {
    canonical: "/", 
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      "Luyện PTE hiệu quả, tối ưu chiến lược làm bài để đạt target 65+.",
    images: [
      {
        url: "/og.jpg", // đặt file trong /public/og.jpg
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Open Graph`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "PTE iPASS giúp bạn đạt target PTE 65+ với lộ trình tối ưu.",
    images: ["/og.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // (tuỳ chọn) Nếu bạn có nhiều ngôn ngữ:
  // alternates: { canonical: "/", languages: { "vi-VN": "/", "en-AU": "/en" } },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    const data = await categoriesServices.getCategoryTree({categoryType: "HEADER"});
     const items = data?.[0]?.children ?? [];

    return (
        <html lang="vi" suppressHydrationWarning={true}>
            <body suppressHydrationWarning={true} className={`${roboto.variable} font-sans`}>
              <Providers>
                 <ClientRoot data={items}>
                    {children}
                </ClientRoot>
              </Providers>
            </body>
        </html>
    )
}
