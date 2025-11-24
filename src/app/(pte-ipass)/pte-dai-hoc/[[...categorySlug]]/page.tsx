
import CourseDetailPage from "@/components/courses/detail/course-detail-page"
import PteCategoryPage from "@/components/courses/category/pte-category-page"

import { ArticleGridSection } from "@/components/shared/article"
import CategoryLayout from "@/components/shared/category/category-layout"
import Skeleton from "@/components/shared/loading/Skeleton"
import { checkCategoryBySlugs } from "@/lib/check-category"
import { categoriesServices } from "@/lib/service/category"
import { coursesServices } from "@/lib/service/course"
import { BreadcrumbItem } from "@/types/breadcrumbs"
import { CategoryItem } from "@/types/category"
import { CourseListResponse } from "@/types/courses"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import React, { Suspense } from "react"

type PageProps = {
  params: {
    categorySlug?: string[]
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

/**
 * Hàm fake lấy data cho trang PTE Đại học
 * Bạn thay bằng gọi API thật (category/article theo slug)
 */
async function getPageData(slugs?: string[]) {
  const lastSlug = slugs?.[slugs.length - 1]

  // Trường hợp không có slug: /pte-dai-hoc
  if (!lastSlug) {
    return {
      type: "listing" as const,
      title: "PTE cho Du học Đại học | Lộ trình từ A–Z",
      description:
        "Tổng hợp kiến thức, lộ trình học và kinh nghiệm thi PTE dành cho du học bậc Đại học: yêu cầu điểm, chiến lược ôn tập, bí quyết đạt target nhanh.",
      slugPath: [],
      ogImage: "/images/og/pte-dai-hoc.jpg", // đổi đường dẫn ảnh OG thực tế của bạn
      breadcrumbs: [
        { name: "Trang chủ", href: "/" },
        { name: "PTE Du học Đại học", href: "/pte-dai-hoc" },
      ],
      // Bạn có thể thêm field khác: listCategory, listArticles,...
    }
  }

  // 👉 Ở đây là ví dụ demo: coi slug cuối là bài viết
  // Thực tế bạn có thể:
  // 1. Gọi categoryServices.getBySlug(lastSlug) → nếu là category thì trả về type: "category"
  // 2. Nếu không có category thì thử articleServices.getArticleBySlug(lastSlug) → type: "article"

  // Ví dụ: data bài viết
  return {
    type: "article" as const,
    title: "Kinh nghiệm thi PTE để vào Đại học tại Úc",
    description:
      "Chia sẻ thực tế cách chuẩn bị PTE để đủ điều kiện nhập học Đại học tại Úc: yêu cầu điểm, kế hoạch học theo từng giai đoạn và mẹo thi.",
    slugPath: slugs,
    ogImage: "/images/og/pte-dai-hoc-kinh-nghiem.jpg",
    breadcrumbs: [
      { name: "Trang chủ", href: "/" },
      { name: "PTE Du học Đại học", href: "/pte-dai-hoc" },
      {
        name: "Kinh nghiệm thi PTE để vào Đại học tại Úc",
        href: "/pte-dai-hoc/kinh-nghiem-thi-pte-vao-dai-hoc-tai-uc",
      },
    ],
    // có thể thêm: content, author, datePublished, ...
  }
}

/**
 * Canonical URL cho route /pte-dai-hoc
 */
function buildCanonical(slugs?: string[]) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.iptepass.com" // đổi domain của bạn

  if (!slugs || slugs.length === 0) {
    return `${base}/pte-dai-hoc`
  }

  return `${base}/pte-dai-hoc/${slugs.join("/")}`
}

/**
 * SEO: generateMetadata – chạy trên server trước khi render page
 */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const slugs = params.categorySlug
  const data = await getPageData(slugs)

  if (!data) {
    // nếu slug không tồn tại → để Next xử lý 404
    return {}
  }

  const title = data.title
  const description = data.description
  const canonical = buildCanonical(data.slugPath)
  const imageUrl = data.ogImage

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: data.type === "article" ? "article" : "website",
      siteName: "PTE iPASS",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

/**
 * JSON-LD Breadcrumb
 */
function getBreadcrumbJsonLd(breadcrumbs: { name: string; href: string }[]) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || ""
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${base}${item.href}`,
    })),
  }
}

/**
 * JSON-LD Article – chỉ thêm nếu là bài viết
 */
function getArticleJsonLd(data: any) {
  if (data.type !== "article") return null

  const base = process.env.NEXT_PUBLIC_SITE_URL || ""
  const canonical = buildCanonical(data.slugPath)

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    image: data.ogImage ? [`${base}${data.ogImage}`] : [],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    author: {
      "@type": "Organization",
      name: "PTE iPASS",
    },
    publisher: {
      "@type": "Organization",
      name: "PTE iPASS",
      logo: {
        "@type": "ImageObject",
        url: `${base}/images/logo.png`,
      },
    },
    // Nếu backend của bạn trả về → thêm:
    // datePublished: data.datePublished,
    // dateModified: data.dateModified,
  }
}



async function PteUniPage({
  found,
  breadcrumbs,
}: {
  found: any;
  breadcrumbs: BreadcrumbItem[];
}) {
  const categories = found?.children ?? [];
  const categoryRoot = found ?? null;
  const courses = await coursesServices.getCoursesList({
    categoryId: found.id
  }).then((res)=> res.items);

  const categoryResults = await Promise.all(
    categories.map(async (item: any) => {
      try {
        const data = await coursesServices.getCoursesList({
          categoryId: item.id,
        });
        const courses = Array.isArray(data?.items) ? data.items : [];
        return { ...item, courses: courses };
      } catch (err) {
        return { ...item, courses: [] };
      }
    })
  );


  return (
    <CategoryLayout
      title={found.name}
      description={found.description}
      breadcrumbs={breadcrumbs}
    >
      <PteCategoryPage 
      category={categoryRoot} 
      categoryCourse={categoryResults}  
      data={courses}
      />
    </CategoryLayout>
  );
}
export default async function Page({ params }: PageProps) {

  const {categorySlug} = params ?? [];

  const pteCategory = await categoriesServices.getCategoryTree({ slug: "pte-dai-hoc" });
 

  if(!categorySlug){
    return(
      <>
        {/* JSON-LD SEO */}
      {/* <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {articleJsonLd && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd),
          }}
        />
      )} */}
      <Suspense fallback={<Skeleton title="đang tải...."/>}>
          <PteUniPage 
          found={pteCategory}  
          breadcrumbs={[
            { name: "Trang chủ", href: "/" },
            { name: pteCategory.name, href: pteCategory.url ?? "" }
          ]}/>
      </Suspense>
      </>
    )
  }

  const lastUrl = categorySlug[categorySlug.length -1];
  const course = await coursesServices.getCoursesDetails({slug: lastUrl}); 


  if(course){
    return(
      <CourseDetailPage course={course} breadcrumbs={[]}/>
    )
  }

  const categories = pteCategory.children ?? [];
  const {found, breadcrumbs} = await checkCategoryBySlugs(categories, categorySlug);
  if(found){
   return (
     <Suspense fallback={<Skeleton title="đang tải...."/>}>
          <PteUniPage  
          found={found} 
          breadcrumbs={[{ name: "Trang chủ", href: "/" }, ...breadcrumbs]}
          />
      </Suspense>
   )
  }

  return notFound();
}
