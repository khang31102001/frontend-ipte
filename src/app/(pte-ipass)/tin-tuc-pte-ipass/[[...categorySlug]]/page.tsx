// app/new/page.tsx

import NewsCategoryItem from "@/components/news/news-category-item";
import NewsDetail from "@/components/news/news-details";
import NewsList from "@/components/news/news-list";
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

async function CategorySection({
  newsCategory
}: { newsCategory: NewsCategory | null }) {

  if (!newsCategory) return null;
  // console.log("category in section", id, name, url);
  const news = Array.isArray(newsCategory.news) ? newsCategory.news : [];
  // console.log(`courses in section: `, courses);
  //  Trả về UI render sẵn (SSR)
  if (!news || news.length === 0) return null;
  return (

    <NewsCategoryItem
      title={newsCategory.name}
      desription={newsCategory.description}
      newList={news}
      category_url={newsCategory.url}
      layout_type="swiper"
    />
  );
}


async function NewsListing({
  found,
  breadcrumbs,
}: {
  found?: any;
  breadcrumbs: BreadcrumbItem[];
}) {
  const categories = found?.children ?? [];
  const dataNew = await newServices.getNewsList({}).then((res) => res.items ?? []);
 

  // const categoryResults = await Promise.all(
  //   categories.map(async (item: any) => {
  //     try {
  //       const data = await coursesServices.getCoursesByCate({
  //         categoryId: item.id,
  //       });
  //       const courses = Array.isArray(data?.items) ? data.items : [];
  //       // console.log("courses in page", courses);
  //       return { ...item, courses: courses };
  //     } catch (err) {
  //       // console.error("Fetch error:", err);
  //       return { ...item, courses: [] };
  //     }
  //   })
  // );

  // console.log("categoryResults in contianer", categoryResults);
  return (
    <CategoryLayout
      title="new"
      description="test"
      breadcrumbs={[]}
    >
      <>
        <TrendingNews data={dataNew}/>
        <NewsList data={dataNew} />

        {/* render list category nếu cần */}
      </>
    </CategoryLayout>
  );
}

async function NewsDetailsPage({
  Slug,
  breadcrumbs,
}: {
  Slug: string;
  breadcrumbs: BreadcrumbItem[];
}) {
  const data = await newServices.getNewsList({slug: Slug});
  if(!data) return null;
  return <NewsDetail news={data ?? null} />
}


interface PageProps{
    params: {categorySlug: string[]}
}

export default async function NewsPage({params}:PageProps) {
    const { categorySlug } = params ?? []; 

  const category:CategoryItem = await categoriesServices.getCategoryTree({ url: "/tin-tuc-pte-ipass" });
 

  console.log("categorySlug: ", categorySlug);
  if(!categorySlug || categorySlug.length === 0 ){
    return(
       <>
      {/* JSON-LD cho SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* CONTENT TRANG TIN TỨC */}
      <Suspense fallback={<Skeleton title="đang tải......" />}>
        <NewsListing
          breadcrumbs={[]}
        />
      </Suspense>
    </>
    )
  }

  const lastUrl = categorySlug[categorySlug.length - 1];
    console.log("lastUrl", lastUrl)
  
  if(lastUrl) {
    return (
      <Suspense fallback={<Skeleton title="đang tải......"></Skeleton>}>
        <NewsDetailsPage Slug={lastUrl} breadcrumbs={[]} />
      </Suspense>
    )
  }


  const categories = category.children ?? []
  const {found, breadcrumbs} =  await checkCategoryBySlugs(categories, categorySlug);
  if(found){
    return(
      <Suspense fallback={<Skeleton title="đang tải......"></Skeleton>}>
        <NewsListing
          found={found}
          breadcrumbs={breadcrumbs}
        />
      </Suspense>
    )
  }
  console.log("new cate: ", category)
  return notFound();
}
