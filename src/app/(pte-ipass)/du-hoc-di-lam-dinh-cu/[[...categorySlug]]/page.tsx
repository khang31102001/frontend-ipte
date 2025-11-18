import CourseDetailPage from "@/components/courses/detail/course-detail-page"
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

// ----------- Helpers giả (bạn thay bằng API thật) -------------
async function getPageData(slugs?: string[]) {
  // slugs = ["uc", "di-lam"] kiểu vậy
  const lastSlug = slugs?.[slugs.length - 1]

  if (!lastSlug) {
    // Trang tổng /pte-du-hoc-di-lam-dinh
    return {
      type: "listing" as const,
      title: "PTE – Du học & Định cư | Hướng dẫn từ A-Z",
      description:
        "Tổng hợp kiến thức PTE cho du học, đi làm, định cư Úc – lộ trình học, kinh nghiệm thi, chia sẻ thực tế.",
      slugPath: [],
      ogImage: "/images/og/pte-du-hoc-di-lam-dinh.jpg",
      breadcrumbs: [
        { name: "Trang chủ", href: "/" },
        { name: "PTE Du học – Đi làm – Định cư", href: "/pte-du-hoc-di-lam-dinh" },
      ],
    }
  }

  // Ví dụ: gọi API CMS để lấy category/article theo slug cuối
  // const data = await categoryServices.getBySlug(lastSlug)
  // if (!data) { return null }

  // Demo: giả sử đây là page bài viết
  return {
    type: "article" as const,
    title: "Kinh nghiệm thi PTE để định cư Úc 2025",
    description:
      "Chia sẻ thực tế cách đạt điểm PTE đủ điều kiện định cư Úc: chiến lược học, phân bổ thời gian, mẹo làm từng dạng.",
    slugPath: slugs,
    ogImage: "/images/og/pte-dinh-cu-2025.jpg",
    breadcrumbs: [
      { name: "Trang chủ", href: "/" },
      { name: "PTE Du học – Đi làm – Định cư", href: "/pte-du-hoc-di-lam-dinh" },
      { name: "Kinh nghiệm thi PTE định cư Úc 2025", href: "/pte-du-hoc-di-lam-dinh/kinh-nghiem-thi-pte-dinh-cu-2025" },
    ],
    // thêm data khác của bài viết nếu cần
  }
}

// Build canonical URL từ slug
function buildCanonical(slugs?: string[]) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.iptepass.com" // đổi domain của bạn
  if (!slugs || slugs.length === 0) {
    return `${base}/pte-du-hoc-di-lam-dinh`
  }
  return `${base}/pte-du-hoc-di-lam-dinh/${slugs.join("/")}`
}

// ----------- SEO: generateMetadata ------------------

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const slugs = params.categorySlug
  const data = await getPageData(slugs)

  if (!data) {
    // Nếu slug không tồn tại => 404
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

// ----------- JSON-LD helpers ------------------

function getBreadcrumbJsonLd(breadcrumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}${item.href}`,
    })),
  }
}

function getArticleJsonLd(data: any) {
  if (data.type !== "article") return null

  const canonical = buildCanonical(data.slugPath)

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    image: data.ogImage
      ? [`${process.env.NEXT_PUBLIC_SITE_URL || ""}${data.ogImage}`]
      : [],
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/images/logo.png`,
      },
    },
    // Bạn có thể thêm datePublished, dateModified nếu có
  }
}

// ----------- PAGE COMPONENT ------------------
async function CategorySection({
  pteDuHocDinhCuCategory
}: { pteDuHocDinhCuCategory: any | null }) {

  if (!pteDuHocDinhCuCategory) return null;
  // console.log("category in section", id, name, url);
  const pteDuHocDinhCu = Array.isArray(pteDuHocDinhCuCategory.pteDuHocDinhCu) ? pteDuHocDinhCuCategory.pteDuHocDinhCu : [];
  // console.log(`courses in section: `, courses);
  //  Trả về UI render sẵn (SSR)
  if (!pteDuHocDinhCu || pteDuHocDinhCu.length === 0) return null;
  return (

   <>
   
   </>
  );
}


async function PteDuHocDinhCuListing({
  found,
  breadcrumbs,
}: {
  found: any;
  breadcrumbs: BreadcrumbItem[];
}) {
  const categories = found?.children ?? [];
  const categoryRoot = found ?? null;
  const courses:CourseListResponse = await coursesServices.getCoursesList({categoryId: found.id});
  const courseList =  Array.isArray(courses.items) ? courses.items : [];
  // console.log("PteDuHocDinhCu", courses);
 

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
      title="PTE DU HỌC, ĐI LÀM, ĐỊNH CƯ"
      description="test"
      breadcrumbs={[]}
    >
      <>
     
        {courseList &&(
          <ArticleGridSection category={categoryRoot} data={courseList}/>
        )}

        

        {/* render list category nếu cần */}
      </>
    </CategoryLayout>
  );
}

// async function PteDuHocDinhCuDetailsPage({
//   data,
//   breadcrumbs,
// }: {
//   data: any[];
//   breadcrumbs: BreadcrumbItem[];
// }) {

//   if(!data) return null;
//   return <NewsDetail news={data ?? null} />
// }



export default async function PteDuHocDinhCuPage({ params }: PageProps) {
   const slugs = params.categorySlug ?? [];

  const category:CategoryItem = await categoriesServices.getCategoryTree({ url: "/du-hoc-di-lam-dinh-cu" });
  // console.log("category",category);

  if(!slugs || slugs.length === 0){
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
          <PteDuHocDinhCuListing found={category} breadcrumbs={[]}/>
      </Suspense>
      </>
    )
  }

  const lastUrl = slugs[slugs.length -1];
  const course = await coursesServices.getCoursesDetails({slug: lastUrl}); 
  // console.log(" course pte du hoc: ", course);

  if(course){
    return(
      <CourseDetailPage course={course} breadcrumbs={[]}/>
    )
  }

  const categories = category.children ?? [];
  const {found, breadcrumbs} = await checkCategoryBySlugs(categories, slugs);
  if(found){
   return (<h1>helllo</h1>)
  }

  return notFound();
}
