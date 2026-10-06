import type { PublicArticle, PublicCourse, PublicTeacher } from "@/features/public-api";

/** Đường dẫn cố định của website công khai (một nơi duy nhất). */
export const ROUTES = {
  home: "/",
  about: "/ve-pte-ipass",
  courses: "/khoa-hoc",
  teachers: "/doi-ngu-giao-vien",
  reviews: "/hoc-vien-review",
  contact: "/lien-he",
  policy: "/chinh-sach",
} as const;

export type ArticleSectionKey = "news" | "knowledge" | "studyAbroad" | "university";

export interface ArticleSection {
  key: ArticleSectionKey;
  base: string;
  title: string;
  description: string;
  /** Slug danh mục bài viết thuộc chuyên mục (khớp dữ liệu CMS). */
  categorySlugs: string[];
}

/**
 * Chuyên mục bài viết của website. Mỗi chuyên mục gom một hoặc nhiều danh mục bài viết (CMS).
 * Thêm chuyên mục mới ⇒ thêm một mục ở đây + một route `app/(public)/<base>/[[...slug]]`.
 */
export const ARTICLE_SECTIONS: Record<ArticleSectionKey, ArticleSection> = {
  news: {
    key: "news",
    base: "/tin-tuc",
    title: "Tin tức & Cập nhật",
    description: "Tin tức mới nhất về khóa học PTE, lịch khai giảng, ưu đãi học phí và câu chuyện học viên PTE iPASS.",
    categorySlugs: ["tin-tuc-su-kien", "cau-chuyen-hoc-vien"],
  },
  knowledge: {
    key: "knowledge",
    base: "/kien-thuc",
    title: "Kiến thức PTE",
    description: "Kiến thức, mẹo làm bài và kinh nghiệm thi PTE từ giáo viên điểm cao.",
    categorySlugs: ["kien-thuc-pte", "kinh-nghiem-thi"],
  },
  studyAbroad: {
    key: "studyAbroad",
    base: "/du-hoc-di-lam-dinh-cu",
    title: "Du học, đi làm & định cư",
    description: "Yêu cầu điểm PTE cho du học, visa làm việc và định cư Úc.",
    categorySlugs: ["du-hoc-dinh-cu"],
  },
  university: {
    key: "university",
    base: "/pte-dai-hoc",
    title: "PTE cho đại học",
    description: "Điểm PTE đầu vào và lộ trình luyện thi cho sinh viên các trường đại học.",
    categorySlugs: ["pte-cho-dai-hoc"],
  },
};

export const sectionByKey = (key: ArticleSectionKey) => ARTICLE_SECTIONS[key];

export function sectionOfCategory(categorySlug: string): ArticleSection | undefined {
  return Object.values(ARTICLE_SECTIONS).find((s) => s.categorySlugs.includes(categorySlug));
}

export const sectionCategoryPath = (section: ArticleSection, categorySlug: string) => `${section.base}/${categorySlug}`;

/** URL bài viết: `/<chuyên mục>/<slug>`; bài ngoài mọi chuyên mục rơi về tin tức. */
export function articleHref(article: Pick<PublicArticle, "slug" | "categorySlug">): string {
  const section = sectionOfCategory(article.categorySlug) ?? ARTICLE_SECTIONS.news;
  return `${section.base}/${article.slug}`;
}

export const courseHref = (course: Pick<PublicCourse, "slug">) => `${ROUTES.courses}/${course.slug}`;
export const courseCategoryHref = (slug: string) => `${ROUTES.courses}/${slug}`;
export const teacherHref = (teacher: Pick<PublicTeacher, "slug">) => `${ROUTES.teachers}/${teacher.slug}`;
export const policyHref = (key: string) => `${ROUTES.policy}/${key}`;
