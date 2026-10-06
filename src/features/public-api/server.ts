import "server-only";
import { serverGet, serverGetOrNull } from "@/core/api/server";
import type { ApiMeta } from "@/core/api";
import type {
  PublicArticle,
  PublicArticleCategory,
  PublicArticleDetail,
  PublicArticleQuery,
  PublicBanner,
  PublicBannerPlacement,
  PublicBranch,
  PublicCourse,
  PublicCourseCategory,
  PublicCourseQuery,
  PublicForm,
  PublicListQuery,
  PublicPage,
  PublicSiteConfig,
  PublicSitemapEntry,
  PublicTeacher,
  PublicTestimonial,
} from "./types";

export interface PublicPageResult<T> {
  items: T[];
  meta: ApiMeta;
}

const EMPTY_META: ApiMeta = { page: 1, pageSize: 20, total: 0, totalPages: 1 };

async function list<T>(path: string, params: object, tags: string[]): Promise<PublicPageResult<T>> {
  const { data, meta } = await serverGet<T[]>(path, { params: params as never, tags });
  return { items: data, meta: meta ?? { ...EMPTY_META, total: data.length } };
}

/** Tag cache: webhook `/api/revalidate` dùng cùng tên để làm mới nội dung theo nhóm. */
export const PUBLIC_TAGS = {
  config: "site-config",
  courses: "courses",
  articles: "articles",
  teachers: "teachers",
  testimonials: "testimonials",
  banners: "banners",
  branches: "branches",
  pages: "pages",
  forms: "forms",
} as const;

export const publicApi = {
  siteConfig: async () => (await serverGet<PublicSiteConfig>("/public/site-config", { tags: [PUBLIC_TAGS.config] })).data,

  courseCategories: async () =>
    (await serverGet<PublicCourseCategory[]>("/public/course-categories", { tags: [PUBLIC_TAGS.courses] })).data,
  courses: (query: PublicCourseQuery = {}) => list<PublicCourse>("/public/courses", query, [PUBLIC_TAGS.courses]),
  course: (slug: string) => serverGetOrNull<PublicCourse>(`/public/courses/${encodeURIComponent(slug)}`, { tags: [PUBLIC_TAGS.courses] }),

  articleCategories: async () =>
    (await serverGet<PublicArticleCategory[]>("/public/article-categories", { tags: [PUBLIC_TAGS.articles] })).data,
  articles: (query: PublicArticleQuery = {}) => list<PublicArticle>("/public/articles", query, [PUBLIC_TAGS.articles]),
  article: (slug: string) =>
    serverGetOrNull<PublicArticleDetail>(`/public/articles/${encodeURIComponent(slug)}`, { tags: [PUBLIC_TAGS.articles] }),

  teachers: (query: PublicListQuery = {}) => list<PublicTeacher>("/public/teachers", query, [PUBLIC_TAGS.teachers]),
  teacher: (slug: string) => serverGetOrNull<PublicTeacher>(`/public/teachers/${encodeURIComponent(slug)}`, { tags: [PUBLIC_TAGS.teachers] }),

  testimonials: (query: PublicListQuery & { isFeatured?: boolean } = {}) =>
    list<PublicTestimonial>("/public/testimonials", query, [PUBLIC_TAGS.testimonials]),
  banners: async (placement?: PublicBannerPlacement) =>
    (await serverGet<PublicBanner[]>("/public/banners", { params: { placement }, tags: [PUBLIC_TAGS.banners] })).data,
  branches: async () => (await serverGet<PublicBranch[]>("/public/branches", { tags: [PUBLIC_TAGS.branches] })).data,
  page: (slug: string) => serverGetOrNull<PublicPage>(`/public/pages/${encodeURIComponent(slug)}`, { tags: [PUBLIC_TAGS.pages] }),
  form: (slug: string) => serverGetOrNull<PublicForm>(`/public/forms/${encodeURIComponent(slug)}`, { tags: [PUBLIC_TAGS.forms] }),
  sitemap: async () => (await serverGet<PublicSitemapEntry[]>("/public/sitemap", { tags: [PUBLIC_TAGS.courses, PUBLIC_TAGS.articles] })).data,
};

/** Gọi API công khai nhưng không làm vỡ trang khi lỗi: trả giá trị dự phòng. */
export const orFallback = <T>(promise: Promise<T>, fallback: T): Promise<T> => promise.catch(() => fallback);
