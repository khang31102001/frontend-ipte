// app/new/page.tsx

import NewsCategoryItem from "@/components/news/news-category-item";
import NewsDetail from "@/components/news/detail/news-details";
import NewsList from "@/components/news/list/news-list-items";
import NewListPage from "@/components/news/news-list-page";
import TrendingNews from "@/components/news/trend-new";
import CategoryLayout from "@/components/shared/category/category-layout";

import Skeleton from "@/components/shared/loading/Skeleton";
import { checkCategoryBySlugs, isChildren } from "@/lib/check-category";
import { categoriesServices } from "@/lib/service/category";
import { newServices } from "@/lib/service/new";
import { BreadcrumbItem } from "@/types/breadcrumbs";
import { CategoryItem, NewsCategory } from "@/types/category";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tin tức & Cập nhật PTE iPASS", // sẽ thành "Tin tức & Cập nhật PTE iPASS | PTE iPASS"
  description:
    "Cập nhật tin tức mới nhất về PTE, lịch khai giảng khóa học, ưu đãi học phí và câu chuyện thành công của học viên PTE iPASS.",
  keywords: [
    "PTE iPASS",
    "tin tức PTE",
    "khóa học PTE",
    "lịch khai giảng PTE",
    "ưu đãi PTE",
    "PTE Darwin",
  ],
  alternates: {
    canonical: "/new", // → https://iptepass.com/new
  },
  openGraph: {
    title: "Tin tức & Cập nhật PTE iPASS",
    description:
      "Xem những tin tức mới nhất về khóa học PTE, lịch khai giảng và ưu đãi tại PTE iPASS.",
    url: "/new",
    type: "website",
    siteName: "PTE iPASS",
    images: [
      {
        url: "/images/og/pte-news-og.jpg", // 🔁 Đổi thành ảnh thật
        width: 1200,
        height: 630,
        alt: "Tin tức PTE iPASS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tin tức & Cập nhật PTE iPASS",
    description:
      "Cập nhật mới nhất về khóa học PTE, lịch khai giảng và ưu đãi dành cho học viên.",
    images: ["/images/og/pte-news-og.jpg"],
  },
};

// app/new/page.tsx (tiếp)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Tin tức & Cập nhật PTE iPASS",
  description:
    "Tổng hợp tin tức, thông báo lịch khai giảng, ưu đãi học phí và câu chuyện học viên PTE iPASS.",
  url: "https://iptepass.com/new", // 🔁 Đổi cho đúng domain
  publisher: {
    "@type": "Organization",
    name: "PTE iPASS",
    url: "https://iptepass.com",
    logo: {
      "@type": "ImageObject",
      url: "https://iptepass.com/images/logo.png", // logo full URL
    },
  },
};


async function NewsListing({
  newsCate,
  knowledgesCate,
  breadcrumbs,
}: {
  newsCate?: CategoryItem;
  knowledgesCate?: CategoryItem;
  breadcrumbs: BreadcrumbItem[];
}) {

  const dataNew = await newServices.getNewsList({
    categoryType: newsCate?.categoryType ?? ""
  }).then((res) => res.items ?? []);

console.log("dataNew", dataNew)
  return (
    <CategoryLayout
      title={newsCate?.name || ""}
      description={newsCate?.description}
      breadcrumbs={breadcrumbs}
    >
      <NewListPage
        newsList={dataNew}
        newsFeatured={dataNew}
        knowledgesCategory={knowledgesCate}
      />
    </CategoryLayout>
  );
}



interface PageProps {
  params: { categorySlug: string[] }
}

export default async function NewsPage({ params }: PageProps) {
  const { categorySlug } = params ?? [];
  const cateSlugs = ["tin-tuc-pte-ipass", "kiem-tra-mien-phi"];

  const cateNewsAndKnowledges = await Promise.all(
    cateSlugs.map(async (item: string) => {
      try {
        const data = await categoriesServices.getCategoryTree({
          slug: item,
        });
        // console.log("data", data)
        const items = data ? data : null;
        return items;
      } catch (err) {
        return null;
      }
    })
  );




  if (!categorySlug) {
    return (
      <>
        {/* JSON-LD cho SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* CONTENT TRANG TIN TỨC */}
        <Suspense fallback={<Skeleton title="đang tải......" />}>
          <NewsListing
            knowledgesCate={cateNewsAndKnowledges[1]}
            breadcrumbs={[
              { name: "Trang chủ", href: cateNewsAndKnowledges[0].url }
            ]}
          />
        </Suspense>
      </>
    )
  }
  if (categorySlug.length >= 1) {

    const lastUrl = categorySlug[categorySlug.length - 1];
    // console.log("lastUrl", lastUrl)

    const news = await newServices.getNewsList({ slug: lastUrl }).then((res) => res.items ?? null);
    // console.log("news", news)
    if (news) {
      return <NewsDetail news={news} />
    }

    const cateNews = cateNewsAndKnowledges[0].children ?? []
    const { found, breadcrumbs } = await checkCategoryBySlugs(cateNews, categorySlug);
    if (found) {
      return (
        <Suspense fallback={<Skeleton title="đang tải......"></Skeleton>}>
          <NewsListing
            newsCate={found}
            knowledgesCate={cateNewsAndKnowledges[1]}
            breadcrumbs={breadcrumbs}
          />
        </Suspense>
      )
    }

  }

  return notFound();
}
