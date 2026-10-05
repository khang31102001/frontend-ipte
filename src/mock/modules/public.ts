import type { Article, ArticleCategory, Tag } from "@/features/articles/types";
import type { Banner } from "@/features/banners/types";
import type { Branch } from "@/features/branches/types";
import type { CmsPage } from "@/features/cms-pages/types";
import type { Course, CourseCategory } from "@/features/courses/types";
import type {
  PublicArticle,
  PublicArticleCategory,
  PublicArticleDetail,
  PublicBanner,
  PublicBranch,
  PublicCourse,
  PublicCourseCategory,
  PublicPage,
  PublicSitemapEntry,
  PublicTeacher,
  PublicTeacherRef,
  PublicTestimonial,
} from "@/features/public-api/types";
import type { Teacher } from "@/features/teachers/types";
import type { Testimonial } from "@/features/testimonials/types";
import { COLLECTIONS } from "../collections";
import { collection } from "../engine/db";
import { queryList } from "../engine/list";
import { notFound, ok } from "../engine/responses";
import { addRoutes } from "../engine/router";
import type { MockRoute } from "../engine/types";
import { stripVietnamese } from "../seed/random";

const C = COLLECTIONS;

const slugOf = (s: string) =>
  stripVietnamese(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const publicRoute = (pattern: string, handler: MockRoute["handler"]): MockRoute => ({
  method: "GET",
  pattern,
  permission: "public",
  anonymous: true,
  handler,
});

// ── Truy cập dữ liệu đã xuất bản ──────────────────────────────────────────
const publishedCourses = () => collection<Course>(C.courses).filter((c) => c.status === "published");
const publishedArticles = () => collection<Article>(C.articles).filter((a) => a.status === "published");
const activeTeachers = () => collection<Teacher>(C.teachers).filter((t) => t.status === "active");

const teacherRef = (t: Teacher): PublicTeacherRef => ({
  id: t.id,
  slug: slugOf(t.fullName),
  name: t.fullName,
  avatarUrl: t.avatarUrl ?? null,
});

function presentCourse(c: Course): PublicCourse {
  const category = collection<CourseCategory>(C.courseCategories).find((x) => x.id === c.categoryId);
  const teachers = c.teacherIds
    .map((id) => collection<Teacher>(C.teachers).find((t) => t.id === id))
    .filter((t): t is Teacher => Boolean(t))
    .map(teacherRef);
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    categoryId: c.categoryId,
    categoryName: category?.name,
    categorySlug: category?.slug ?? "",
    type: c.type,
    targetScore: c.targetScore,
    entryLevel: c.entryLevel,
    mode: c.mode,
    durationWeeks: c.durationWeeks,
    sessionsCount: c.sessionsCount,
    tuition: c.tuition,
    summary: c.summary,
    description: c.description,
    outcomes: c.outcomes,
    audience: c.audience,
    isFeatured: c.isFeatured,
    thumbnailUrl: c.thumbnailUrl,
    metaTitle: c.metaTitle,
    metaDescription: c.metaDescription,
    teachers,
  };
}

function presentArticle(a: Article): PublicArticle {
  const category = collection<ArticleCategory>(C.articleCategories).find((x) => x.id === a.categoryId);
  const tags = collection<Tag>(C.tags);
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    content: a.content,
    coverUrl: a.coverUrl,
    categoryId: a.categoryId,
    categoryName: category?.name,
    categorySlug: category?.slug ?? "",
    tagNames: a.tagIds.map((id) => tags.find((t) => t.id === id)?.name).filter((n): n is string => Boolean(n)),
    authorName: collection<{ id: string; fullName: string }>(C.users).find((u) => u.id === a.authorId)?.fullName,
    isFeatured: a.isFeatured,
    publishedAt: a.publishedAt,
    metaTitle: a.metaTitle,
    metaDescription: a.metaDescription,
    readingMinutes: a.readingMinutes,
  };
}

const presentTeacher = (t: Teacher): PublicTeacher => ({
  id: t.id,
  slug: slugOf(t.fullName),
  fullName: t.fullName,
  headline: t.headline,
  bio: t.bio,
  avatarUrl: t.avatarUrl ?? null,
  pteScore: t.pteScore,
  yearsExperience: t.yearsExperience,
  specialties: t.specialties,
  qualifications: t.qualifications,
});

const byPublishedDesc = (a: Article, b: Article) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");

export function registerPublicModule(): void {
  addRoutes(
    // ── Khóa học ────────────────────────────────────────────────────────
    publicRoute("/public/course-categories", () => {
      const courses = publishedCourses();
      const rows: PublicCourseCategory[] = collection<CourseCategory>(C.courseCategories)
        .filter((c) => c.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          sortOrder: c.sortOrder,
          courseCount: courses.filter((x) => x.categoryId === c.id).length,
        }));
      return ok(rows);
    }),
    publicRoute("/public/courses", (req) => {
      const categories = collection<CourseCategory>(C.courseCategories);
      const items = publishedCourses().map(presentCourse);
      return queryList(items, req, {
        searchFields: ["name", "summary", "categoryName"],
        filters: {
          categorySlug: (c, v) => c.categorySlug === v,
          isFeatured: (c, v) => String(c.isFeatured) === v,
          categoryId: (c, v) => c.categoryId === v || categories.find((x) => x.id === c.categoryId)?.slug === v,
        },
        sortable: ["name", "tuition", "durationWeeks", "targetScore"],
        defaultSort: { sortBy: "targetScore", sortOrder: "asc" },
      });
    }),
    publicRoute("/public/courses/:slug", (req) => {
      const course = publishedCourses().find((c) => c.slug === req.params.slug);
      return course ? ok(presentCourse(course)) : notFound("Khóa học không tồn tại");
    }),

    // ── Bài viết ────────────────────────────────────────────────────────
    publicRoute("/public/article-categories", () => {
      const articles = publishedArticles();
      const rows: PublicArticleCategory[] = collection<ArticleCategory>(C.articleCategories)
        .filter((c) => c.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          sortOrder: c.sortOrder,
          articleCount: articles.filter((a) => a.categoryId === c.id).length,
        }));
      return ok(rows);
    }),
    publicRoute("/public/articles", (req) => {
      const items = [...publishedArticles()].sort(byPublishedDesc).map(presentArticle);
      return queryList(items, req, {
        searchFields: ["title", "excerpt", "categoryName"],
        filters: {
          categorySlugs: (a, v) => v.split(",").includes(a.categorySlug),
          isFeatured: (a, v) => String(a.isFeatured) === v,
          excludeSlug: (a, v) => a.slug !== v,
        },
        defaultSort: { sortBy: "publishedAt", sortOrder: "desc" },
        sortable: ["publishedAt", "title"],
      });
    }),
    publicRoute("/public/articles/:slug", (req) => {
      const article = publishedArticles().find((a) => a.slug === req.params.slug);
      if (!article) return notFound("Bài viết không tồn tại");
      const related = publishedArticles()
        .filter((a) => a.id !== article.id && a.categoryId === article.categoryId)
        .sort(byPublishedDesc)
        .slice(0, 6)
        .map(presentArticle);
      const detail: PublicArticleDetail = { ...presentArticle(article), related };
      return ok(detail);
    }),

    // ── Giáo viên, cảm nhận, banner, chi nhánh, trang tĩnh ──────────────
    publicRoute("/public/teachers", (req) =>
      queryList(activeTeachers().map(presentTeacher), req, {
        searchFields: ["fullName", "headline"],
        defaultSort: { sortBy: "pteScore", sortOrder: "desc" },
        sortable: ["fullName", "pteScore", "yearsExperience"],
      }),
    ),
    publicRoute("/public/teachers/:slug", (req) => {
      const teacher = activeTeachers().find((t) => slugOf(t.fullName) === req.params.slug);
      return teacher ? ok(presentTeacher(teacher)) : notFound("Giáo viên không tồn tại");
    }),
    publicRoute("/public/testimonials", (req) => {
      const courses = collection<Course>(C.courses);
      const items: PublicTestimonial[] = collection<Testimonial>(C.testimonials)
        .filter((t) => t.status === "published")
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((t) => ({
          id: t.id,
          studentName: t.studentName,
          headline: t.headline,
          quote: t.quote,
          avatarUrl: t.avatarUrl,
          scoreBefore: t.scoreBefore,
          scoreAfter: t.scoreAfter,
          rating: t.rating,
          courseName: courses.find((c) => c.id === t.courseId)?.name,
          videoUrl: t.videoUrl,
          isFeatured: t.isFeatured,
        }));
      return queryList(items, req, {
        filters: { isFeatured: (t, v) => String(t.isFeatured) === v },
      });
    }),
    publicRoute("/public/banners", (req) => {
      const placement = req.query.get("placement");
      const today = new Date().toISOString().slice(0, 10);
      const rows: PublicBanner[] = collection<Banner>(C.banners)
        .filter((b) => b.status === "active")
        .filter((b) => !placement || b.placement === placement)
        .filter((b) => (!b.startAt || b.startAt <= today) && (!b.endAt || b.endAt >= today))
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((b) => ({
          id: b.id,
          title: b.title,
          placement: b.placement,
          imageUrl: b.imageUrl,
          mobileImageUrl: b.mobileImageUrl,
          linkUrl: b.linkUrl,
          altText: b.altText,
        }));
      return ok(rows);
    }),
    publicRoute("/public/branches", () => {
      const rows: PublicBranch[] = collection<Branch>(C.branches)
        .filter((b) => b.status === "active")
        .map((b) => ({
          id: b.id,
          name: b.name,
          country: b.country,
          city: b.city,
          address: b.address,
          phone: b.phone,
          email: b.email,
          openingHours: b.openingHours,
          mapUrl: b.mapUrl,
        }));
      return ok(rows);
    }),
    publicRoute("/public/pages/:slug", (req) => {
      const page = collection<CmsPage>(C.pages).find((p) => p.slug === req.params.slug && p.status === "published");
      if (!page) return notFound("Trang không tồn tại");
      const body: PublicPage = {
        id: page.id,
        title: page.title,
        slug: page.slug,
        template: page.template,
        summary: page.summary,
        content: page.content,
        sections: page.sections,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        canonicalUrl: page.canonicalUrl,
        noindex: page.noindex,
        publishedAt: page.publishedAt,
      };
      return ok(body);
    }),

    // ── Sitemap (backend trả danh sách đường dẫn, FE sinh sitemap.xml) ─────
    publicRoute("/public/sitemap", () => {
      const categories = collection<ArticleCategory>(C.articleCategories);
      const entries: PublicSitemapEntry[] = [
        ...publishedCourses().map((c) => ({ type: "course" as const, slug: c.slug, lastModified: c.updatedAt })),
        ...publishedArticles().map((a) => ({
          type: "article" as const,
          slug: a.slug,
          categorySlug: categories.find((c) => c.id === a.categoryId)?.slug,
          lastModified: a.updatedAt,
        })),
        ...activeTeachers().map((t) => ({ type: "teacher" as const, slug: slugOf(t.fullName), lastModified: t.updatedAt })),
      ];
      return ok(entries);
    }),
  );
}
