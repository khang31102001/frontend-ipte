import PteCategoryPage from "@/components/courses/category/pte-category-page"

import Skeleton from "@/shared/loading/Skeleton"
import { checkCategoryBySlugs } from "@/lib/check-category"
import { categoriesServices } from "@/lib/service/category"
import { coursesServices } from "@/lib/service/course"
import { BreadcrumbItem } from "@/types/breadcrumbs"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import React, { Suspense } from "react"
import { CategoryItem } from "@/types/category"
import { Course } from "@/types/courses"
import { aboutService } from "@/lib/service/about"
import CourseDetail from "@/components/courses/detail/course-detail-page"


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



async function StudyWorkMigratePage({
  category,
  breadcrumbs,
}: {
  category: CategoryItem;
  breadcrumbs: BreadcrumbItem[];
}) {
  if (!category) notFound();
  const categoryId = category.categoryId;
  const childCategories = category?.children ?? [];
  const [studyWorkRes, featuredCoursesRes] = await Promise.all([
    coursesServices.getCoursesByCate({ categoryId: categoryId }),
     coursesServices.getCoursesList({
            page: 1,
            pageSize: 12,
            isFeatured: true,
        }),
  ]);

  
  const studyWork = Array.isArray(studyWorkRes?.items)
    ? studyWorkRes.items : [];
  const featuredCourses = Array.isArray(featuredCoursesRes?.items)
    ? featuredCoursesRes.items : [];

  const cateChildResults = await Promise.all(
    childCategories.map(async (item: CategoryItem) => {
      try {
        const data = await coursesServices.getCoursesList({
          categoryId: item?.categoryId ?? null,
        });
        const courses = Array.isArray(data?.items) ? data.items : [];
        return { ...item, courses: courses };
      } catch (err) {
        return { ...item, courses: [] };
      }
    })
  );


  return (
     <PteCategoryPage
        category={category}
        categoryCourse={cateChildResults}
        coures={studyWork}
        featuredCourses={featuredCourses}
      />
  );
}
async function StudyWorkMigrateDetail({
    coursesData,
    breadcrumbs,
}: {
    coursesData: Course;
    breadcrumbs: BreadcrumbItem[];
}) {
    if (!coursesData) notFound();

    const [socialRes, featuredCoursesRes] = await Promise.all([
        aboutService.getSocialList(),
        coursesServices.getCoursesList({
            page: 1,
            pageSize: 12,
            isFeatured: true,
        }),
    ])
    const featuredCourses = featuredCoursesRes?.items ?? []
    const socialData = socialRes?.items ?? [];

    //   console.log("audit check newsRes: ", newsRes);
    return <CourseDetail course={coursesData} featuredCourses={featuredCourses} breadcrumbs={breadcrumbs} />
}

export default async function Page({ params }: PageProps) {

  const categorySlug = params?.categorySlug;
  const studyWorkMenuTree = await categoriesServices.getCategoryTree({ categoryType: "H_MENU_DHDL" });
  const studyWorkRootCategory: CategoryItem = studyWorkMenuTree?.[0] ?? null;
  if (!studyWorkRootCategory) return notFound();

  if (!categorySlug || categorySlug.length === 0) {
    const breadcrumbs: BreadcrumbItem[] = [
      { name: "Trang chủ", href: "/" },
      { name: studyWorkRootCategory?.name, href: studyWorkRootCategory?.url ?? "" },
    ];
    return (
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
        <Suspense fallback={<Skeleton title="đang tải...." />}>
          <StudyWorkMigratePage
            category={studyWorkRootCategory}
            breadcrumbs={breadcrumbs}
          />
        </Suspense>
      </>
    )
  }

  const lastSegment = categorySlug.at(-1);
  if (!lastSegment) return notFound();
  const course = await coursesServices.getCoursesDetails({ slug: lastSegment });
  if (course) {
    const breadcrumbs: BreadcrumbItem[] = [
      { name: "Trang chủ", href: "/" },
      { name: course?.title, href: "" },
    ];
    return (
      <StudyWorkMigrateDetail coursesData={course} breadcrumbs={breadcrumbs} />
    )
  }


  const { found: currentCategory, breadcrumbs: categoryBreadcrumbs } =
    await checkCategoryBySlugs(studyWorkRootCategory?.children ?? [], categorySlug);
  if (!currentCategory) return notFound();
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Trang chủ", href: "/" },
    ...categoryBreadcrumbs,
  ];

  return (
    <Suspense fallback={<Skeleton title="đang tải...." />}>
      <StudyWorkMigratePage
        category={currentCategory}
        breadcrumbs={breadcrumbs}
      />
    </Suspense>
  )

}
