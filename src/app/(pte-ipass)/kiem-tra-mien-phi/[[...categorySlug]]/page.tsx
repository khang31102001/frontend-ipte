import { notFound } from "next/navigation";
import { Suspense } from "react";
import Skeleton from "@/components/shared/loading/Skeleton";
import { CategoryItem, KnowledgesCategory } from "@/types/category";
import { categoriesServices } from "@/lib/service/category";
import { BreadcrumbItem } from "@/types/breadcrumbs";
import { Metadata } from "next";
import CategoryLayout from "@/components/shared/category/category-layout";
import { knowledgesServices } from "@/lib/service/knowlege";
import KnowlegeDetail from "@/components/knowledge/details/knowledge-details";
import { checkCategoryBySlugs } from "@/lib/check-category";
import KnowledgesListPage from "@/components/knowledge/list/knowledges-section";
import KnowledgesSection from "@/components/knowledge/list/knowledges-section";




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



async function KnowledgeListPage({
  found,
  breadcrumbs,
}: {
  found: CategoryItem;
  breadcrumbs: BreadcrumbItem[];
}) {
  const categories = found?.children ?? [];
  // console.log("KnowledgeListing:", found)
  // console.log("categories:", categories)
  const knowledgesItem =  await knowledgesServices.getKnowledgeList({
    categoryType: found.category_type!
  }).then((res)=> res.items ?? []);
  // console.log("knowledgesItem", knowledgesItem)

  const categoryResults = await Promise.all(
    categories.map(async (item: any) => {
      try {
        const data = await knowledgesServices.getKnowledgeList({
          categoryType: item.category_type,
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

  
  return (
    <CategoryLayout
      title={found.name}
      description={found.description}
      breadcrumbs={breadcrumbs}
    >
      <KnowledgesSection 
      data={knowledgesItem}
      categoryParent={found} 
      categoryKnowledge={categoryResults} />
    </CategoryLayout>
  );
}



export default async function Page({ params }: PageProps) {
  const { categorySlug } = params ?? [];
  const data = await categoriesServices.getCategoryTree({ slug: "kiem-tra-mien-phi" });
  const categoryCourse: CategoryItem = data ?? [];

  if (!categorySlug) {
    return (
      <Suspense fallback={<Skeleton title={categoryCourse.name} />}>
        <KnowledgeListPage
          found={categoryCourse}
          breadcrumbs={[
            { name: "Trang chủ", href: "/" },
            { name: categoryCourse.name, href: categoryCourse.url ?? "" }
          ]}
        />
      </Suspense>
    );
  }

  const lastUrl = categorySlug[categorySlug.length - 1];
  // console.log("lastUrl:", lastUrl);

  const knowledge = await knowledgesServices.getKnowledgeDetail({ slug: lastUrl });

  console.log("knowledge", knowledge)

  if (knowledge) {
    return (
      <KnowlegeDetail knowledge={knowledge} breadcrumbs={[]} />
    )
  }

  // kiểm tra lastUrl có phải là category không
  const { found, breadcrumbs } = await checkCategoryBySlugs(categoryCourse.children ?? [], categorySlug);

  // console.log("found category:", found);
  if (found) {
    return (
      <Suspense fallback={<Skeleton title={found.name} />}>
        <KnowledgeListPage
          found={found}
          breadcrumbs={breadcrumbs}
        />
      </Suspense>
    )
  }

  return notFound();
}
