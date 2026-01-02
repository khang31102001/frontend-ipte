import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.scss";
import Providers from "@/providers";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-sans",
});

//  dùng env ổn định (khuyên set NEXT_PUBLIC_SITE_URL)
const SITE_NAME = "PTE iPASS";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.iptepass.com";

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
    "PTE iPASS helps learners achieve high PTE scores with a clear roadmap, experienced teachers, and proven strategies.",

  applicationName: SITE_NAME,

  //  robots có thể để global
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
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      "Study smarter for PTE with structured plans, expert feedback, and targeted practice.",
    url: "/", // relative OK vì có metadataBase
    images: [
      {
        url: "/og.jpg",
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
      "Reach your PTE target with proven strategies and a clear learning roadmap.",
    images: ["/og.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
