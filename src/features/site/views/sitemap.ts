import type { MetadataRoute } from "next";
import { orFallback, publicApi } from "@/features/public-api/server";
import { ARTICLE_SECTIONS, ROUTES, articleHref, courseCategoryHref, courseHref, sectionCategoryPath, teacherHref } from "../config/routes";
import { absoluteUrl } from "../lib/seo";

/** Sitemap công khai: trang tĩnh + danh mục + khóa học + bài viết + giáo viên (từ API). */
export async function buildSitemap(): Promise<MetadataRoute.Sitemap> {
  const [entries, courseCategories] = await Promise.all([orFallback(publicApi.sitemap(), []), orFallback(publicApi.courseCategories(), [])]);

  const fixed = [ROUTES.home, ROUTES.about, ROUTES.courses, ROUTES.teachers, ROUTES.reviews, ROUTES.contact, ...Object.values(ARTICLE_SECTIONS).map((s) => s.base)];
  const categoryPaths = courseCategories.map((c) => courseCategoryHref(c.slug));
  const sectionCategoryPaths = Object.values(ARTICLE_SECTIONS).flatMap((s) => (s.categorySlugs.length > 1 ? s.categorySlugs.map((c) => sectionCategoryPath(s, c)) : []));

  const dynamic = entries.map((e) => ({
    path: e.type === "course" ? courseHref(e) : e.type === "teacher" ? teacherHref(e) : articleHref({ slug: e.slug, categorySlug: e.categorySlug ?? "" }),
    lastModified: e.lastModified,
  }));

  return [...fixed, ...categoryPaths, ...sectionCategoryPaths].map((path) => ({ path, lastModified: undefined as string | undefined })).concat(dynamic).map(({ path, lastModified }) => ({
    url: absoluteUrl(path),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    changeFrequency: path === ROUTES.home ? ("daily" as const) : ("weekly" as const),
    priority: path === ROUTES.home ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
