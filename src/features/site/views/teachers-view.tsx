import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { orFallback, publicApi } from "@/features/public-api/server";
import CommunityPTE from "../components/community/community-pte-ipass";
import TeacherDetails from "../components/teacher/details/teacher-detail";
import TeacherList from "../components/teacher/teacher-list";
import { ROUTES, teacherHref } from "../config/routes";
import { breadcrumbJsonLd, buildMetadata, teacherJsonLd } from "../lib/seo";
import { HeroBanner } from "../shared/banner/hero-banner";
import Breadcrumb from "../shared/breadcrumb";
import PageContent from "../shared/page/page-content";
import PageShell from "../shared/page/page-shell";
import PTECallToAction from "../shared/pte-call-to-action";

const PAGE_SIZE = 9;
type SearchParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

const getTeacher = cache((slug: string) => publicApi.teacher(slug));

export async function teachersMetadata(slug: string | undefined): Promise<Metadata> {
  if (!slug) {
    return buildMetadata({
      title: "Đội ngũ giáo viên PTE iPASS",
      description: "Đội ngũ giáo viên PTE iPASS nhiều năm kinh nghiệm, hiểu rõ cấu trúc đề thi và chiến lược giúp học viên đạt 50+, 65+ và 79+.",
      path: ROUTES.teachers,
    });
  }
  const teacher = await getTeacher(slug);
  if (!teacher) return {};
  return buildMetadata({ title: `${teacher.fullName} – Giáo viên PTE`, description: teacher.headline ?? teacher.bio?.slice(0, 160), path: teacherHref(teacher), image: teacher.avatarUrl, type: "article" });
}

export async function TeachersRoute({ slug, searchParams }: { slug?: string; searchParams: SearchParams }) {
  if (slug) {
    const teacher = await getTeacher(slug);
    if (!teacher) notFound();
    const crumbs = [
      { name: "Trang chủ", href: ROUTES.home },
      { name: "Đội ngũ giáo viên", href: ROUTES.teachers },
      { name: teacher.fullName, href: teacherHref(teacher) },
    ];
    return (
      <PageShell jsonLd={[teacherJsonLd(teacher), breadcrumbJsonLd(crumbs)]}>
        <PageContent className="container max-auto px-4 pt-8 md:pt-8">
          <Breadcrumb items={crumbs} />
        </PageContent>
        <TeacherDetails teacher={teacher} />
        <PTECallToAction />
      </PageShell>
    );
  }

  const page = Math.max(1, Math.min(999, Number(first(searchParams.page)) || 1));
  const [result, config] = await Promise.all([orFallback(publicApi.teachers({ page, pageSize: PAGE_SIZE }), null), orFallback(publicApi.siteConfig(), null)]);

  return (
    <PageShell jsonLd={breadcrumbJsonLd([{ name: "Trang chủ", href: ROUTES.home }, { name: "Đội ngũ giáo viên", href: ROUTES.teachers }])}>
      <HeroBanner src="/images/banner-team-teacher.jpg" alt="Đội ngũ giáo viên PTE iPASS" priority />
      <PageContent className="container max-auto px-4 pt-8 md:pt-8">
        <h1 className="sr-only">Đội ngũ giáo viên PTE iPASS</h1>
      </PageContent>
      <TeacherList teachers={result?.items ?? []} page={page} totalPages={result?.meta.totalPages ?? 1} basePath={ROUTES.teachers} />
      {config && <CommunityPTE social={config.social} />}
      <PTECallToAction />
    </PageShell>
  );
}
