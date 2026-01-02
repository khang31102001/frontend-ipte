import { notFound } from "next/navigation";
import { Suspense } from "react";
import Skeleton from "@/shared/loading/Skeleton";
import { CategoryItem } from "@/types/category";
import { categoriesServices } from "@/lib/service/category";
import { BreadcrumbItem } from "@/types/breadcrumbs";
import { Metadata } from "next";
import CategoryLayout from "@/shared/category/category-layout";
import { knowledgesServices } from "@/lib/service/knowlege";
import { checkCategoryBySlugs } from "@/lib/check-category";
import { coursesServices } from "@/lib/service/course";
import KnowledgesList from "@/components/knowledge/knowledges-list";
import CourseDetailPage from "@/components/courses/detail/course-detail-page";
import { aboutService } from "@/lib/service/about";
import { Course } from "@/types/courses";




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



async function KnowledgeListingPage({
  category,
  breadcrumbs,
}: {
  category: CategoryItem;
  breadcrumbs: BreadcrumbItem[];
}) {
  if (!category) notFound();
  const categoryId = category.categoryId;
  const childCategories = category?.children ?? [];

  const [knowledRes, courseFeaturedRes] = await Promise.all([
    coursesServices.getCoursesByCate({ categoryId: categoryId }),
    coursesServices.getCoursesList({
      page: 1,
      pageSize: 12,
      isFeatured: true,
    }),
  ]);

  const knowledges = Array.isArray(knowledRes?.items)
    ? knowledRes.items : [];

  const courseFeatured = Array.isArray(courseFeaturedRes?.items)
    ? courseFeaturedRes.items : [];

  const cateChildResults = await Promise.all(
    childCategories.map(async (item: CategoryItem) => {
      try {
        const data = await coursesServices.getCoursesByCate({
          categoryId: item?.categoryId ?? null,
        });
        const items = Array.isArray(data?.items) ? data.items : [];
        // console.log("courses in page", courses);
        return { ...item, knowledges: items };
      } catch (err) {
        // console.error("Fetch error:", err);
        return { ...item, knowledges: [] };
      }
    })
  );
  // console.log("check categoryResults:", cateChildResults)

  return (
    <CategoryLayout
      title={category?.name}
      description={category?.description}
      breadcrumbs={breadcrumbs}
    >
      <KnowledgesList
        knowledgeData={knowledges}
        featuredCourses={courseFeatured}
        category={category}
        categoryKnowledge={cateChildResults}
      />
    </CategoryLayout>
  );
}


 async function KnowledgeDetailPage({
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
    return <CourseDetailPage course={coursesData} featuredCourses={featuredCourses} breadcrumbs={breadcrumbs} />
}

export default async function Page({ params }: PageProps) {
  const categorySlug = params?.categorySlug;
  const knowledgeMenuTree = await categoriesServices.getCategoryTree({ categoryType: "H_MENU_KNOWLEDGE" });
  const knowledgeRootCategory: CategoryItem = knowledgeMenuTree?.[0] ?? null;
  if (!knowledgeRootCategory) return notFound();

  // console.log("check categoryCourse", categoryCourse)
  if (!categorySlug || categorySlug.length === 0) {
    const breadcrumbs: BreadcrumbItem[] = [
      { name: "Trang chủ", href: "/" },
      { name: knowledgeRootCategory?.name, href: knowledgeRootCategory?.url ?? "" },
    ];

    return (
      <Suspense fallback={<Skeleton title={knowledgeRootCategory?.name} />}>
        <KnowledgeListingPage
          category={knowledgeRootCategory}
          breadcrumbs={breadcrumbs}
        />
      </Suspense>
    );
  }

  const lastSegment = categorySlug.at(-1);
  if (!lastSegment) return notFound();
  const knowledge = await knowledgesServices.getKnowledgeDetail({ slug: lastSegment });
  if (knowledge) {
    const breadcrumbs: BreadcrumbItem[] = [
      { name: "Trang chủ", href: "/" },
      { name: knowledge?.title, href: "" },
    ];
    return (
      <KnowledgeDetailPage coursesData={knowledge} breadcrumbs={breadcrumbs} />
    )
  }

  // kiểm tra lastUrl có phải là category không
  const { found: currentCategory, breadcrumbs: categoryBreadcrumbs } = await checkCategoryBySlugs(knowledgeRootCategory?.children ?? [], categorySlug);
  if (!currentCategory) return notFound();
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Trang chủ", href: "/" },
    ...categoryBreadcrumbs,
  ];

  return (
    <Suspense fallback={<Skeleton title={currentCategory?.name} />}>
      <KnowledgeListingPage
        category={currentCategory}
        breadcrumbs={breadcrumbs}
      />
    </Suspense>
  )
}
