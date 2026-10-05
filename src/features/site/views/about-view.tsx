import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { orFallback, publicApi } from "@/features/public-api/server";
import AboutSection from "../components/about/about-section";
import CardGridSection from "../components/about/card-grid-section";
import { FacilityGallery } from "../components/about/facility-gallery";
import MapSection from "../components/about/map-section";
import MissionSection from "../components/about/mission-section";
import CommunityPTE from "../components/community/community-pte-ipass";
import ConsultationForm from "../components/form/consultation-form";
import { CONTACT_FORM_SLUG } from "../config/forms";
import { ROUTES } from "../config/routes";
import { parseTitledItems, splitItem } from "../lib/sections";
import { breadcrumbJsonLd, buildMetadata } from "../lib/seo";
import { sanitizeHtml, toHtml } from "../lib/sanitize";
import ArticleHeader from "../shared/article/detail/article-header";
import ArticleContent from "../shared/article/detail/article-content";
import { HeroBanner } from "../shared/banner/hero-banner";
import Breadcrumb from "../shared/breadcrumb";
import PageContent from "../shared/page/page-content";
import PageShell from "../shared/page/page-shell";
import PTECallToAction from "../shared/pte-call-to-action";

const ABOUT_SLUG = "gioi-thieu-pte-ipass";
const getPage = cache((slug: string) => publicApi.page(slug));

export async function aboutMetadata(slug?: string): Promise<Metadata> {
  const page = await getPage(slug ?? ABOUT_SLUG);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? page.summary,
    path: slug ? `${ROUTES.about}/${slug}` : ROUTES.about,
    noindex: page.noindex,
  });
}

/** `/ve-pte-ipass` = trang giới thiệu; `/ve-pte-ipass/<slug>` = trang tĩnh CMS bất kỳ. */
export async function AboutRoute({ slug }: { slug?: string }) {
  const page = await getPage(slug ?? ABOUT_SLUG);
  if (!page) notFound();

  if (slug) {
    const crumbs = [
      { name: "Trang chủ", href: ROUTES.home },
      { name: "Về PTE iPASS", href: ROUTES.about },
      { name: page.title, href: `${ROUTES.about}/${slug}` },
    ];
    return (
      <PageShell jsonLd={breadcrumbJsonLd(crumbs)}>
        <PageContent className="container max-auto px-4 pt-8 md:pt-8">
          <Breadcrumb items={crumbs} />
          <ArticleHeader title={page.title} summary={page.summary ?? null} />
          <ArticleContent content={page.content} />
        </PageContent>
        <PTECallToAction />
      </PageShell>
    );
  }

  const [config, branches] = await Promise.all([orFallback(publicApi.siteConfig(), null), orFallback(publicApi.branches(), [])]);
  const text = (heading: RegExp) => page.sections.find((s) => s.type === "text" && heading.test(s.heading));
  const mission = text(/sứ mệnh/i);
  const vision = text(/tầm nhìn/i);
  const features = page.sections.filter((s) => s.type === "features");
  const audience = features.find((s) => /đối tượng/i.test(s.heading));
  const ecosystem = features.find((s) => /hệ sinh thái/i.test(s.heading));
  const gallery = page.sections.find((s) => s.type === "gallery");
  const toCards = (items: string[]) => parseTitledItems(items).map(({ title, description }) => ({ title, description }));

  return (
    <PageShell jsonLd={breadcrumbJsonLd([{ name: "Trang chủ", href: ROUTES.home }, { name: "Về PTE iPASS", href: ROUTES.about }])}>
      <HeroBanner src="/images/hero-banner-about-us.png" alt="Về PTE iPASS" priority />
      <AboutSection title={page.title} description={page.summary} hideMore />
      {page.content && (
        <PageContent>
          <div className="prose prose-lg max-w-content mx-auto" dangerouslySetInnerHTML={{ __html: sanitizeHtml(toHtml(page.content)) }} />
        </PageContent>
      )}
      <MissionSection title={mission?.heading} mission={mission?.body} vision={vision?.body} />
      {audience && <CardGridSection heading={audience.heading} description={audience.body} items={toCards(audience.items)} />}
      {ecosystem && <CardGridSection layout="grid" heading={ecosystem.heading} description={ecosystem.body} items={toCards(ecosystem.items)} />}
      {gallery && (
        <FacilityGallery
          heading={gallery.heading}
          description={gallery.body}
          images={gallery.items.map((raw) => {
            const [src = "", alt = "Cơ sở vật chất"] = splitItem(raw);
            return { src, alt };
          })}
        />
      )}
      <MapSection branches={branches} />
      {config && <CommunityPTE social={config.social} />}
      <ConsultationForm formSlug={CONTACT_FORM_SLUG} />
    </PageShell>
  );
}

export const contactMetadata = async (): Promise<Metadata> =>
  buildMetadata({
    title: "Liên hệ & tư vấn PTE",
    description: "Liên hệ PTE iPASS để được tư vấn lộ trình, đặt lịch học thử và nhận test đầu vào miễn phí. Hotline, email, bản đồ các chi nhánh.",
    path: ROUTES.contact,
  });

export async function ContactView() {
  const [config, branches] = await Promise.all([orFallback(publicApi.siteConfig(), null), orFallback(publicApi.branches(), [])]);
  return (
    <PageShell jsonLd={breadcrumbJsonLd([{ name: "Trang chủ", href: ROUTES.home }, { name: "Liên hệ", href: ROUTES.contact }])}>
      <HeroBanner src="/images/about-banner.png" alt="Liên hệ PTE iPASS" priority />
      <h1 className="sr-only">Liên hệ PTE iPASS</h1>
      {config && <CommunityPTE social={config.social} heading="Kết nối với PTE iPASS" description="Chọn kênh bạn quen dùng nhất — tư vấn viên phản hồi trong giờ làm việc." />}
      <MapSection branches={branches} />
      <ConsultationForm formSlug={CONTACT_FORM_SLUG} heading="Gửi yêu cầu tư vấn" />
    </PageShell>
  );
}
