import type { Metadata } from "next";
import { getSiteUrl } from "@/core/config/env";
import type { PublicArticle, PublicCourse, PublicSiteConfig, PublicTeacher } from "@/features/public-api";
import { articleHref, courseHref, teacherHref } from "../config/routes";

export const SITE_NAME = "PTE iPASS";
export const DEFAULT_OG_IMAGE = "/images/banner_home.png";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

interface MetaInput {
  title: string;
  description?: string;
  /** Đường dẫn canonical (không gồm query). */
  path: string;
  image?: string | null;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string | null;
}

/** Bỏ hậu tố thương hiệu có sẵn trong dữ liệu CMS để template layout không nhân đôi. */
const stripBrand = (t: string) => t.replace(/\s*[|–-]\s*PTE iPASS\s*$/i, "").trim();

/** Metadata chuẩn cho mọi trang công khai: title, description, canonical, Open Graph, Twitter, robots. */
export function buildMetadata({ title: rawTitle, description, path, image, type = "website", noindex = false, publishedTime }: MetaInput): Metadata {
  const title = stripBrand(rawTitle);
  const url = absoluteUrl(path);
  const img = absoluteUrl(image || DEFAULT_OG_IMAGE);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export interface Crumb {
  name: string;
  href: string;
}

export const breadcrumbJsonLd = (items: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.href) })),
});

export const organizationJsonLd = (config: PublicSiteConfig) => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: config.general.siteName,
  url: getSiteUrl(),
  logo: absoluteUrl(config.general.logoUrl || "/images/logo/logo-final.jpg"),
  telephone: config.contact.hotlineVN,
  email: config.contact.email,
  address: config.contact.address,
  sameAs: Object.values(config.social).filter(Boolean),
});

export const courseJsonLd = (course: PublicCourse) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: course.name,
  description: course.summary,
  url: absoluteUrl(courseHref(course)),
  provider: { "@type": "Organization", name: SITE_NAME, url: getSiteUrl() },
  ...(course.tuition > 0 ? { offers: { "@type": "Offer", price: course.tuition, priceCurrency: "VND" } } : {}),
});

export const articleJsonLd = (article: PublicArticle) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.excerpt,
  image: article.coverUrl ? absoluteUrl(article.coverUrl) : undefined,
  datePublished: article.publishedAt ?? undefined,
  author: { "@type": "Organization", name: article.authorName ?? SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
  mainEntityOfPage: absoluteUrl(articleHref(article)),
});

export const teacherJsonLd = (teacher: PublicTeacher) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: teacher.fullName,
  jobTitle: teacher.headline,
  description: teacher.bio,
  url: absoluteUrl(teacherHref(teacher)),
  worksFor: { "@type": "Organization", name: SITE_NAME },
});
