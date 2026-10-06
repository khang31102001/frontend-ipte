/**
 * Contract API công khai cho website (không cần đăng nhập): `GET /public/*`.
 * Chỉ trả nội dung đã xuất bản và loại bỏ trường nội bộ (mã, trạng thái duyệt, email nhận thông báo…).
 */
import type { Article, ArticleCategory } from "@/features/articles/types";
import type { Banner } from "@/features/banners/types";
import type { Branch } from "@/features/branches/types";
import type { CmsPage } from "@/features/cms-pages/types";
import type { Course, CourseCategory } from "@/features/courses/types";
import type { FormDefinition } from "@/features/forms/types";
import type { SiteConfig } from "@/features/site-config/types";
import type { Teacher } from "@/features/teachers/types";
import type { Testimonial } from "@/features/testimonials/types";

export interface PublicTeacherRef {
  id: string;
  slug: string;
  name: string;
  avatarUrl: string | null;
}

export type PublicCourseCategory = Pick<
  CourseCategory,
  "id" | "name" | "slug" | "description" | "sortOrder" | "courseCount"
>;

export type PublicCourse = Pick<
  Course,
  | "id"
  | "name"
  | "slug"
  | "categoryId"
  | "categoryName"
  | "type"
  | "targetScore"
  | "entryLevel"
  | "mode"
  | "durationWeeks"
  | "sessionsCount"
  | "tuition"
  | "summary"
  | "description"
  | "outcomes"
  | "audience"
  | "isFeatured"
  | "thumbnailUrl"
  | "metaTitle"
  | "metaDescription"
> & {
  categorySlug: string;
  teachers: PublicTeacherRef[];
};

export type PublicArticleCategory = Pick<ArticleCategory, "id" | "name" | "slug" | "description" | "sortOrder" | "articleCount">;

export type PublicArticle = Pick<
  Article,
  "id" | "title" | "slug" | "excerpt" | "content" | "coverUrl" | "categoryId" | "categoryName" | "tagNames" | "authorName" | "isFeatured" | "publishedAt" | "metaTitle" | "metaDescription" | "readingMinutes"
> & {
  categorySlug: string;
};

export interface PublicArticleDetail extends PublicArticle {
  related: PublicArticle[];
}

export type PublicTeacher = Pick<Teacher, "id" | "fullName" | "headline" | "bio" | "pteScore" | "yearsExperience" | "specialties" | "qualifications"> & {
  slug: string;
  avatarUrl: string | null;
};

export type PublicTestimonial = Pick<
  Testimonial,
  "id" | "studentName" | "headline" | "quote" | "avatarUrl" | "scoreBefore" | "scoreAfter" | "rating" | "courseName" | "videoUrl" | "isFeatured"
>;

export type PublicBanner = Pick<Banner, "id" | "title" | "placement" | "imageUrl" | "mobileImageUrl" | "linkUrl" | "altText">;

export type PublicBranch = Pick<Branch, "id" | "name" | "country" | "city" | "address" | "phone" | "email" | "openingHours" | "mapUrl">;

export type PublicPage = Pick<CmsPage, "id" | "title" | "slug" | "template" | "summary" | "content" | "sections" | "metaTitle" | "metaDescription" | "canonicalUrl" | "noindex" | "publishedAt">;

export type PublicSiteConfig = Omit<SiteConfig, "updatedByName">;

export type PublicForm = Omit<FormDefinition, "notifyEmails" | "submissionCount" | "createdAt" | "updatedAt">;

export interface PublicSitemapEntry {
  type: "course" | "article" | "teacher";
  slug: string;
  /** Slug danh mục (bài viết) để FE xác định chuyên mục/URL. */
  categorySlug?: string;
  lastModified?: string;
}

// ── Truy vấn ──────────────────────────────────────────────────────────────
export interface PublicListQuery {
  q?: string;
  page?: number;
  pageSize?: number;
}

export interface PublicCourseQuery extends PublicListQuery {
  categorySlug?: string;
  isFeatured?: boolean;
}

export interface PublicArticleQuery extends PublicListQuery {
  /** Nhiều slug, ngăn cách bằng dấu phẩy. */
  categorySlugs?: string;
  isFeatured?: boolean;
}

export type PublicBannerPlacement = Banner["placement"];
