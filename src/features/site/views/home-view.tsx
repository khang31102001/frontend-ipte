import type { Metadata } from "next";
import { orFallback, publicApi } from "@/features/public-api/server";
import AboutSection from "../components/about/about-section";
import CommunityPTE from "../components/community/community-pte-ipass";
import ConsultationForm from "../components/form/consultation-form";
import FeaturedCoursesSection from "../components/home/featured-courses-section";
import NewsListSection from "../components/home/news-list-section";
import StudyPathPTE from "../components/home/study-path-PTE";
import TeamTeacherPTE from "../components/home/team-teacher";
import TrainingProgramsSection from "../components/home/training-program-section";
import { ARTICLE_SECTIONS, ROUTES } from "../config/routes";
import { findSection, parseTitledItems } from "../lib/sections";
import { buildMetadata, organizationJsonLd } from "../lib/seo";
import HomeBanner from "../shared/banner/home-banner";
import PageShell from "../shared/page/page-shell";

const HOME_SLUG = "trang-chu";
const ABOUT_SLUG = "gioi-thieu-pte-ipass";

export async function homeMetadata(): Promise<Metadata> {
  const page = await orFallback(publicApi.page(HOME_SLUG), null);
  return buildMetadata({
    title: page?.metaTitle ?? "PTE iPASS – Trung tâm luyện thi PTE hàng đầu Úc & Việt Nam",
    description: page?.metaDescription ?? "PTE iPASS cung cấp khóa học PTE 1:1, nhóm nhỏ, lộ trình rõ ràng, giáo viên điểm cao, cam kết đầu ra 50 – 65 – 79+.",
    path: ROUTES.home,
  });
}

export default async function HomeView() {
  const [page, about, config, courses, teachers, articles] = await Promise.all([
    orFallback(publicApi.page(HOME_SLUG), null),
    orFallback(publicApi.page(ABOUT_SLUG), null),
    orFallback(publicApi.siteConfig(), null),
    orFallback(publicApi.courses({ isFeatured: true, pageSize: 12 }), null),
    orFallback(publicApi.teachers({ pageSize: 12 }), null),
    orFallback(publicApi.articles({ categorySlugs: ARTICLE_SECTIONS.news.categorySlugs.join(","), pageSize: 8 }), null),
  ]);

  const hero = findSection(page, "hero");
  const stats = findSection(page, "stats");
  const steps = findSection(page, "steps");
  const programs = findSection(page, "programs");
  const coursesSection = findSection(page, "courses");
  const teachersSection = findSection(page, "teachers");
  const articlesSection = findSection(page, "articles");
  const communitySection = findSection(page, "community");
  const leadSection = findSection(page, "lead_form");

  return (
    <PageShell jsonLd={config ? organizationJsonLd(config) : undefined}>
      {hero && (
        <HomeBanner
          title={hero.heading}
          description={hero.body ?? ""}
          content={hero.items.map((text) => ({ text }))}
          options={(stats?.items ?? []).map((label) => ({ label }))}
        />
      )}

      <AboutSection title={about?.title} description={about?.summary} />

      {steps && <StudyPathPTE heading={steps.heading} description={steps.body} steps={parseTitledItems(steps.items)} />}
      {programs && <TrainingProgramsSection heading={programs.heading} description={programs.body} programs={parseTitledItems(programs.items)} />}
      <FeaturedCoursesSection heading={coursesSection?.heading} description={coursesSection?.body} courses={courses?.items ?? []} />
      <TeamTeacherPTE heading={teachersSection?.heading} description={teachersSection?.body} teachers={teachers?.items ?? []} />
      <NewsListSection heading={articlesSection?.heading} description={articlesSection?.body} articles={articles?.items ?? []} />
      {config && <CommunityPTE social={config.social} heading={communitySection?.heading} description={communitySection?.body} />}
      <ConsultationForm heading={leadSection?.heading} description={leadSection?.body} />
    </PageShell>
  );
}
