import { notFound } from "next/navigation";
import { coursesServices } from "@/lib/service/course";
import CourseDetailPage from "@/components/courses/detail/course-detail-page";
import { Suspense } from "react";
import Skeleton from "@/components/shared/loading/Skeleton";
import { CategoryItem } from "@/types/category";
import { categoriesServices } from "@/lib/service/category";
import { checkCategoryBySlugs } from "@/lib/check-category";
import { BreadcrumbItem } from "@/types/breadcrumbs";
import { CourseListResponse } from "@/types/courses";
import { Metadata } from "next";
import CategoryLayout from "@/components/shared/category/category-layout";
import CoursesListPage from "@/components/courses/courses-list-page";


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




async function CourseListingPage({
  found,
  breadcrumbs,
}: {
  found: any;
  breadcrumbs: BreadcrumbItem[];
}) {
  const categories = found?.children ?? [];
  const courses: CourseListResponse = await coursesServices.getCoursesByCate({
    categoryId: found.id,
  });


  const categoryResults = await Promise.all(
    categories.map(async (item: any) => {
      try {
        const data = await coursesServices.getCoursesByCate({
          categoryId: item.id,
        });
        const courses = Array.isArray(data?.items) ? data.items : [];
        // console.log("courses in page", courses);
        return { ...item, courses: courses };
      } catch (err) {
        // console.error("Fetch error:", err);
        return { ...item, courses: [] };
      }
    })
  );

  // console.log("categoryResults in contianer", categoryResults);
  return (
    <CategoryLayout
      title={found.name}
      description={found.description}
      breadcrumbs={breadcrumbs}
    >
      <CoursesListPage
        category={found}
        coursesItems={courses.items}
        categoryItems={categoryResults}
      />
    </CategoryLayout>
  );
}



export default async function Page({ params }: PageProps) {
  const { categorySlug } = params ?? [];

  const data = await categoriesServices.getCategoryTree({ slug: "khoa-hoc" });
  const categoryCourse: CategoryItem = data ?? []


  if (!categorySlug) {
    return (
      <Suspense fallback={<Skeleton title={categoryCourse.name} />}>
        <CourseListingPage
          found={categoryCourse}
          breadcrumbs={[
            { name: "Trang chủ", href: "/" },
            { name: categoryCourse.name, href: categoryCourse.url ?? "" }
          ]}
        />
      </Suspense>
    );
  }


  if (categorySlug?.length >= 1) {
    const lastUrl = categorySlug[categorySlug.length - 1];
    //  const categoryPath = categorySlug.slice(0, -1).join("/");
    //  console.log("categoryPath: ", categoryPath)

    // 1. Kiểm tra last có phải là 1 slug khóa học hợp lệ không
    const course = await coursesServices.getCoursesDetails({ slug: lastUrl });
    console.log("course:", course);
    if (course) {
      return (
        <CourseDetailPage course={course} breadcrumbs={[]} />
      )
    }

     // 2. Nếu không phải course thì coi như là danh mục

    const { found, breadcrumbs } = await checkCategoryBySlugs(categoryCourse.children ?? [], categorySlug);
      
    if (found) {
      return (
        <Suspense fallback={<Skeleton title={found.name} />}>
          <CourseListingPage
            found={found}
            breadcrumbs={[ { name: "Trang chủ", href: "/" }, ...breadcrumbs]}
          />
        </Suspense>
      )
    }

  }


  return notFound();
}
