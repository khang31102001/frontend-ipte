import { notFound } from "next/navigation";
import { coursesServices } from "@/lib/service/course";
import { Suspense } from "react";
import Skeleton from "@/shared/loading/Skeleton";
import { CategoryItem } from "@/types/category";
import { categoriesServices } from "@/lib/service/category";
import { checkCategoryBySlugs } from "@/lib/check-category";
import { BreadcrumbItem } from "@/types/breadcrumbs";
import { Course, CourseListResponse } from "@/types/courses";
import { Metadata } from "next";
import CoursesList from "@/components/courses/courses-list";
import CourseDetail from "@/components/courses/detail/course-detail-page";
import { aboutService } from "@/lib/service/about";



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
  category,
  breadcrumbs,
}: {
  category: CategoryItem;
  breadcrumbs: BreadcrumbItem[];
}) {
  if (!category) notFound();
  const categoryId = category.categoryId;
  const childCategories = category?.children ?? [];
  const coursesResponse: CourseListResponse =
    await coursesServices.getCoursesByCate({ categoryId: categoryId });

  const courses = Array.isArray(coursesResponse?.items)
    ? coursesResponse.items : [];


  const cateChildCourse = await Promise.all(
    childCategories.map(async (childCategory) => {
      try {
        const data = await coursesServices.getCoursesByCate({
          categoryId: childCategory.categoryId,
        });
        const courses = Array.isArray(data?.items) ? data.items : [];
        // console.log("courses in page", courses);
        return { ...childCategory, courses: courses };
      } catch (err) {
        // console.error("Fetch error:", err);
        return { ...childCategory, courses: [] };
      }
    })
  );
// check category pte-nen-tang 
  return (
    <CoursesList
        category={category}
        coursesItems={courses}
        categoryItems={cateChildCourse}
        breadcrumbs={breadcrumbs}
      />
  );
}

 async function CoursesDetailPage({
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
  const courseMenuTree = await categoriesServices.getCategoryTree({ categoryType: "H_MENU_COURSE" });
  const courseRootCategory: CategoryItem = courseMenuTree?.[0] ?? null;
  if (!courseRootCategory) return notFound();


  if (!categorySlug || categorySlug.length === 0) {
    const breadcrumbs: BreadcrumbItem[] = [
      { name: "Trang chủ", href: "/" },
      { name: courseRootCategory.name, href: courseRootCategory.url ?? "/khoa-hoc" },
    ];

    return (
      <Suspense fallback={<Skeleton title={courseRootCategory?.name} />}>
        <CourseListingPage
          breadcrumbs={breadcrumbs}
          category={courseRootCategory}
        />
      </Suspense>
    );
  }

  const lastSegment = categorySlug.at(-1);
  if (!lastSegment) return notFound();
  const course:Course = await coursesServices.getCoursesDetails({ slug: lastSegment });
  // console.log("course:", course);
  if (course) {

     const breadcrumbs: BreadcrumbItem[] = [
        { name: "Trang chủ", href: "/" },
        { name: course?.title, href: "" },
      ];
    return (
      <CoursesDetailPage coursesData={course} breadcrumbs={breadcrumbs} />
    )
  }

  // 2. Nếu không phải course thì coi như là danh mục

  const { found: currentCategory, breadcrumbs: categoryBreadcrumbs } = 
  await checkCategoryBySlugs(courseRootCategory?.children ?? [], categorySlug);

  if (!currentCategory) return notFound();
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Trang chủ", href: "/" },
    ...categoryBreadcrumbs,
  ];

  return (
    <Suspense fallback={<Skeleton title={currentCategory.name} />}>
      <CourseListingPage
        category={currentCategory}
        breadcrumbs={breadcrumbs}
      />
    </Suspense>
  );
}
