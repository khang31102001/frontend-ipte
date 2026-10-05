import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { orFallback, publicApi } from "@/features/public-api/server";
import type { PublicCourse, PublicCourseCategory } from "@/features/public-api";
import ArticleCover from "../shared/article/detail/article-cover";
import ArticleHeader from "../shared/article/detail/article-header";
import ArticleContent from "../shared/article/detail/article-content";
import ArticleSidebar from "../shared/article/article-sidebar";
import { HeroBanner } from "../shared/banner/hero-banner";
import Breadcrumb from "../shared/breadcrumb";
import LinkPagination from "../shared/control/link-pagination";
import PageContent from "../shared/page/page-content";
import PageShell from "../shared/page/page-shell";
import { Section } from "../shared/page/section";
import { FloatingCTA } from "../shared/subscription/floating-cta";
import ConsultationForm from "../components/form/consultation-form";
import CourseCard from "../components/courses/card/course-card";
import CourseSidebar from "../components/courses/detail/course-sidebar";
import { FaqAccordion } from "../components/courses/faq-accordion";
import ProblemsAndSolutionList from "../components/courses/list/problem-solution-list";
import { ROUTES, courseCategoryHref, courseHref, teacherHref } from "../config/routes";
import { courseCardProps, courseLevelLabel, courseModeLabel } from "../lib/course-view";
import { findSection, splitItem } from "../lib/sections";
import { breadcrumbJsonLd, buildMetadata, courseJsonLd } from "../lib/seo";
import { PTE_LEVEL_LABELS } from "@/shared/domain/pte";
import PTECallToAction from "../shared/pte-call-to-action";

const PAGE_SIZE = 12;
const FAQ_PAGE_SLUG = "cau-hoi-thuong-gap-ve-khoa-hoc";

type SearchParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

type Resolved =
  | { kind: "list"; category: PublicCourseCategory | null; categories: PublicCourseCategory[] }
  | { kind: "course"; course: PublicCourse };

/** `/khoa-hoc` → danh sách; `/khoa-hoc/<slug>` → danh mục hoặc khóa học; nhiều đoạn (URL cũ) → chuyển về khóa học. */
export const resolveCoursesRoute = cache(async (slug: string[] = []): Promise<Resolved | null> => {
  const categories = await orFallback(publicApi.courseCategories(), []);
  if (slug.length === 0) return { kind: "list", category: null, categories };

  const last = slug[slug.length - 1] as string;
  const category = categories.find((c) => c.slug === last);
  if (category && slug.length === 1) return { kind: "list", category, categories };

  const course = await publicApi.course(last);
  if (!course) return null;
  if (slug.length > 1) permanentRedirect(courseHref(course));
  return { kind: "course", course };
});

export async function coursesMetadata(slug: string[] | undefined, searchParams: SearchParams): Promise<Metadata> {
  const resolved = await resolveCoursesRoute(slug);
  if (!resolved) return {};
  const hasFilter = Boolean(first(searchParams.q)?.trim()) || Number(first(searchParams.page) ?? 1) > 1;
  if (resolved.kind === "course") {
    const c = resolved.course;
    return buildMetadata({
      title: c.metaTitle ?? c.name,
      description: c.metaDescription ?? c.summary,
      path: courseHref(c),
      image: c.thumbnailUrl,
      type: "article",
    });
  }
  const cat = resolved.category;
  return buildMetadata({
    title: cat ? `${cat.name} – Khóa học PTE` : "Khóa học PTE",
    description: cat?.description ?? "Tổng hợp khóa học PTE theo lộ trình, mục tiêu điểm và kỹ năng. Học thử – tư vấn lộ trình – tài liệu.",
    path: cat ? courseCategoryHref(cat.slug) : ROUTES.courses,
    noindex: hasFilter,
  });
}

async function CoursesListing({ category, categories, searchParams }: { category: PublicCourseCategory | null; categories: PublicCourseCategory[]; searchParams: SearchParams }) {
  const q = first(searchParams.q)?.trim() || undefined;
  const page = Math.max(1, Math.min(999, Number(first(searchParams.page)) || 1));
  const basePath = category ? courseCategoryHref(category.slug) : ROUTES.courses;

  const [result, banners, faqPage] = await Promise.all([
    orFallback(publicApi.courses({ q, page, pageSize: PAGE_SIZE, categorySlug: q ? undefined : category?.slug }), null),
    orFallback(publicApi.banners("courses"), []),
    orFallback(publicApi.page(FAQ_PAGE_SLUG), null),
  ]);
  const courses = result?.items ?? [];
  const faqs = (findSection(faqPage, "faq")?.items ?? []).map((raw) => {
    const [question = "", answer = ""] = splitItem(raw);
    return { question, answer };
  });

  const crumbs = [
    { name: "Trang chủ", href: ROUTES.home },
    { name: "Khóa học", href: ROUTES.courses },
    ...(category ? [{ name: category.name, href: basePath }] : []),
  ];
  const banner = banners[0];

  return (
    <PageShell jsonLd={breadcrumbJsonLd(crumbs)}>
      {banner && <HeroBanner src={banner.imageUrl} alt={banner.altText ?? banner.title} priority />}

      <PageContent className="container max-auto px-4 pt-8 md:pt-8">
        <Breadcrumb items={crumbs} />
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-brandBlue-900">{category ? category.name : "Khóa học PTE"}</h1>
        {category?.description && <p className="mt-2 text-base text-primary">{category.description}</p>}
        {q && (
          <p className="mt-2 text-gray-600">
            {result?.meta.total ?? 0} kết quả cho từ khóa <span className="text-blue-600">&quot;{q}&quot;</span>
          </p>
        )}

        <nav aria-label="Danh mục khóa học" className="mt-6 flex flex-wrap gap-2">
          <Link href={ROUTES.courses} className={`rounded-full border px-4 py-1.5 text-sm ${!category ? "bg-hero-gradient text-white border-transparent" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
            Tất cả
          </Link>
          {categories.map((c) => (
            <Link key={c.id} href={courseCategoryHref(c.slug)} className={`rounded-full border px-4 py-1.5 text-sm ${category?.id === c.id ? "bg-hero-gradient text-white border-transparent" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
              {c.name}
              <span className="ml-1 text-xs opacity-70">({c.courseCount})</span>
            </Link>
          ))}
        </nav>
      </PageContent>

      <Section className="w-full">
        <PageContent>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} {...courseCardProps(course)} card_layout="col" />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Không có khóa học nào {q ? "phù hợp với từ khóa này" : "trong danh mục này"}.</p>
          )}
          <LinkPagination className="mt-8" page={page} totalPages={result?.meta.totalPages ?? 1} basePath={basePath} query={{ q }} />
        </PageContent>
      </Section>

      <ProblemsAndSolutionList backgroundImage="/images/bg-pte-pob-solution.jpg" />
      <FaqAccordion faqs={faqs} />
      <ConsultationForm />
    </PageShell>
  );
}

async function CourseDetail({ course }: { course: PublicCourse }) {
  const [featured, config] = await Promise.all([
    orFallback(publicApi.courses({ isFeatured: true, pageSize: 6 }), null),
    orFallback(publicApi.siteConfig(), null),
  ]);
  const crumbs = [
    { name: "Trang chủ", href: ROUTES.home },
    { name: "Khóa học", href: ROUTES.courses },
    ...(course.categoryName ? [{ name: course.categoryName, href: courseCategoryHref(course.categorySlug) }] : []),
    { name: course.name, href: courseHref(course) },
  ];
  const sidebarItems = (featured?.items ?? [])
    .filter((c) => c.id !== course.id)
    .map((c) => ({ id: c.id, title: c.name, image: c.thumbnailUrl ?? "/images/img-courses-deault.jpg", badge: courseLevelLabel(c), href: courseHref(c) }));
  const hotline = config?.contact.hotlineVN || undefined;

  return (
    <PageShell jsonLd={[courseJsonLd(course), breadcrumbJsonLd(crumbs)]}>
      <Section as="article" className="w-full min-h-screen">
        <PageContent className="container max-auto px-4 pt-8 md:pt-8">
          <Breadcrumb items={crumbs} />
        </PageContent>
        <PageContent className="!py-1">
          <ArticleHeader title={course.name} summary={course.summary} />
          <ArticleCover image={course.thumbnailUrl ?? "/images/img-courses-deault.jpg"} caption={null} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ArticleContent content={course.description} />

              {course.outcomes.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-3">Bạn sẽ đạt được</h2>
                  <ul className="space-y-2">
                    {course.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2">
                        <Check className="w-5 h-5 mt-0.5 text-green-600 shrink-0" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {course.audience.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-3">Khóa học phù hợp với</h2>
                  <ul className="list-disc pl-6 space-y-1">
                    {course.audience.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </section>
              )}

              {course.teachers.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-3">Giáo viên phụ trách</h2>
                  <div className="flex flex-wrap gap-3">
                    {course.teachers.map((t) => (
                      <Link key={t.id} href={teacherHref(t)} className="rounded-full border px-4 py-2 hover:bg-gray-50">
                        {t.name}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <CourseSidebar
                  title="Thông tin khóa học PTE"
                  level={course.entryLevel === "none" ? undefined : PTE_LEVEL_LABELS[course.entryLevel]}
                  mode={courseModeLabel(course.mode)}
                  durationWeeks={course.durationWeeks}
                  sessionsCount={course.sessionsCount}
                  tuition={course.tuition}
                  hotline={hotline}
                />
                <ArticleSidebar title="Khóa học nổi bật" items={sidebarItems} />
              </div>
            </div>
          </div>
        </PageContent>
        <FloatingCTA hotline={hotline} />
      </Section>
      <PTECallToAction />
    </PageShell>
  );
}

export async function CoursesRoute({ slug, searchParams }: { slug?: string[]; searchParams: SearchParams }) {
  const resolved = await resolveCoursesRoute(slug);
  if (!resolved) notFound();
  return resolved.kind === "course" ? (
    <CourseDetail course={resolved.course} />
  ) : (
    <CoursesListing category={resolved.category} categories={resolved.categories} searchParams={searchParams} />
  );
}

