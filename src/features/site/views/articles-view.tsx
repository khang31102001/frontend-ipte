import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";
import { orFallback, publicApi } from "@/features/public-api/server";
import type { PublicArticle, PublicArticleCategory, PublicArticleDetail } from "@/features/public-api";
import ConsultationForm from "../components/form/consultation-form";
import Newscard from "../components/news/card/news-card";
import FeaturedNewsSection from "../components/news/featured-news-section";
import { ARTICLE_SECTIONS, ROUTES, articleHref, courseHref, sectionCategoryPath, sectionOfCategory, type ArticleSection, type ArticleSectionKey } from "../config/routes";
import { breadcrumbJsonLd, articleJsonLd, buildMetadata } from "../lib/seo";
import { courseLevelLabel } from "../lib/course-view";
import { sanitizeHtml, toHtml, withToc, processEmbeds } from "../lib/sanitize";
import { formatDate } from "../utils/date";
import ArticleSidebar from "../shared/article/article-sidebar";
import ArticleCover from "../shared/article/detail/article-cover";
import ArticleFooter from "../shared/article/detail/article-footer";
import ArticleHeader from "../shared/article/detail/article-header";
import TableOfContents from "../shared/article/detail/table-of-content";
import { HeroBanner } from "../shared/banner/hero-banner";
import Breadcrumb from "../shared/breadcrumb";
import LinkPagination from "../shared/control/link-pagination";
import PageContent from "../shared/page/page-content";
import PageShell from "../shared/page/page-shell";
import { Section } from "../shared/page/section";
import { FloatingCTA } from "../shared/subscription/floating-cta";

const PAGE_SIZE = 12;
type SearchParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

type Resolved =
  | { kind: "list"; section: ArticleSection; category: PublicArticleCategory | null; categories: PublicArticleCategory[] }
  | { kind: "article"; section: ArticleSection; article: PublicArticleDetail };

export const resolveArticlesRoute = cache(async (key: ArticleSectionKey, slug: string[] = []): Promise<Resolved | null> => {
  const section = ARTICLE_SECTIONS[key];
  const all = await orFallback(publicApi.articleCategories(), []);
  const categories = all.filter((c) => section.categorySlugs.includes(c.slug));
  if (slug.length === 0) return { kind: "list", section, category: null, categories };

  const last = slug[slug.length - 1] as string;
  const category = categories.find((c) => c.slug === last);
  if (category && slug.length === 1) return { kind: "list", section, category, categories };

  const article = await publicApi.article(last);
  if (!article) return null;
  const owner = sectionOfCategory(article.categorySlug);
  // Bài thuộc chuyên mục khác → chuyển đúng URL (SEO: một nội dung một địa chỉ).
  if (!owner || owner.key !== key || slug.length > 1) permanentRedirect(articleHref(article));
  return { kind: "article", section, article };
});

export async function articlesMetadata(key: ArticleSectionKey, slug: string[] | undefined, searchParams: SearchParams): Promise<Metadata> {
  const resolved = await resolveArticlesRoute(key, slug);
  if (!resolved) return {};
  if (resolved.kind === "article") {
    const a = resolved.article;
    return buildMetadata({ title: a.metaTitle ?? a.title, description: a.metaDescription ?? a.excerpt, path: articleHref(a), image: a.coverUrl, type: "article", publishedTime: a.publishedAt });
  }
  const { section, category } = resolved;
  const page = Number(first(searchParams.page) ?? 1);
  return buildMetadata({
    title: category ? `${category.name} – ${section.title}` : section.title,
    description: category?.description ?? section.description,
    path: category ? sectionCategoryPath(section, category.slug) : section.base,
    noindex: page > 1,
  });
}

async function ArticlesListing({ section, category, categories, searchParams }: { section: ArticleSection; category: PublicArticleCategory | null; categories: PublicArticleCategory[]; searchParams: SearchParams }) {
  const page = Math.max(1, Math.min(999, Number(first(searchParams.page)) || 1));
  const slugs = category ? category.slug : section.categorySlugs.join(",");
  const basePath = category ? sectionCategoryPath(section, category.slug) : section.base;

  const [result, trending, banners] = await Promise.all([
    orFallback(publicApi.articles({ categorySlugs: slugs, page, pageSize: PAGE_SIZE }), null),
    page === 1 ? orFallback(publicApi.articles({ categorySlugs: slugs, isFeatured: true, pageSize: 5 }), null) : Promise.resolve(null),
    orFallback(publicApi.banners("news"), []),
  ]);
  const crumbs = [
    { name: "Trang chủ", href: ROUTES.home },
    { name: section.title, href: section.base },
    ...(category ? [{ name: category.name, href: basePath }] : []),
  ];
  const banner = banners[0];
  const items = result?.items ?? [];

  return (
    <PageShell jsonLd={breadcrumbJsonLd(crumbs)}>
      {banner && <HeroBanner src={banner.imageUrl} alt={banner.altText ?? banner.title} priority />}

      <PageContent className="container max-auto px-4 pt-8 md:pt-8">
        <Breadcrumb items={crumbs} />
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-brandBlue-900">{category?.name ?? section.title}</h1>
        <p className="mt-2 text-base text-primary">{category?.description ?? section.description}</p>
        {categories.length > 1 && (
          <nav aria-label="Danh mục" className="mt-6 flex flex-wrap gap-2">
            <Link href={section.base} className={`rounded-full border px-4 py-1.5 text-sm ${!category ? "bg-hero-gradient text-white border-transparent" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
              Tất cả
            </Link>
            {categories.map((c) => (
              <Link key={c.id} href={sectionCategoryPath(section, c.slug)} className={`rounded-full border px-4 py-1.5 text-sm ${category?.id === c.id ? "bg-hero-gradient text-white border-transparent" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
                {c.name}
              </Link>
            ))}
          </nav>
        )}
      </PageContent>

      {trending && trending.items.length > 0 && <FeaturedNewsSection data={trending.items} />}

      <Section className="w-full">
        <PageContent>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {items.map((a) => (
                <Newscard key={a.id} href={articleHref(a)} image={a.coverUrl || "/images/img-news-default.jpg"} title={a.title} description={a.excerpt} category={a.categoryName} date={a.publishedAt ? formatDate(a.publishedAt) : undefined} layout="col" />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Chưa có bài viết nào trong mục này.</p>
          )}
          <div className="flex justify-center">
            <LinkPagination className="border rounded-full" page={page} totalPages={result?.meta.totalPages ?? 1} basePath={basePath} />
          </div>
        </PageContent>
      </Section>

      <ConsultationForm />
    </PageShell>
  );
}

function RelatedList({ items }: { items: PublicArticle[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Bài viết liên quan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.slice(0, 3).map((a) => (
          <Newscard key={a.id} href={articleHref(a)} image={a.coverUrl || "/images/img-news-default.jpg"} title={a.title} description={a.excerpt} date={a.publishedAt ? formatDate(a.publishedAt) : undefined} layout="col" />
        ))}
      </div>
    </section>
  );
}

async function ArticleDetail({ section, article }: { section: ArticleSection; article: PublicArticleDetail }) {
  const [featured, config] = await Promise.all([
    orFallback(publicApi.courses({ isFeatured: true, pageSize: 6 }), null),
    orFallback(publicApi.siteConfig(), null),
  ]);
  const crumbs = [
    { name: "Trang chủ", href: ROUTES.home },
    { name: section.title, href: section.base },
    { name: article.title, href: articleHref(article) },
  ];
  const { html, toc } = withToc(processEmbeds(sanitizeHtml(toHtml(article.content))));
  const sidebarCourses = (featured?.items ?? []).map((c) => ({ id: c.id, title: c.name, image: c.thumbnailUrl ?? "/images/img-courses-deault.jpg", badge: courseLevelLabel(c), href: courseHref(c) }));
  const hotline = config?.contact.hotlineVN || undefined;

  return (
    <PageShell jsonLd={[articleJsonLd(article), breadcrumbJsonLd(crumbs)]}>
      <Section as="article" className="w-full">
        <PageContent className="container max-auto px-4 pt-8 md:pt-8">
          <Breadcrumb items={crumbs} />
        </PageContent>
        <PageContent className="!py-1">
          <ArticleHeader title={article.title} summary={article.excerpt} authorName={article.authorName} publishedAt={article.publishedAt} />
          <ArticleCover image={article.coverUrl || "/images/img-news-default.jpg"} caption={null} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="prose prose-lg max-w-content" dangerouslySetInnerHTML={{ __html: html }} />
              <ArticleFooter tags={article.tagNames ?? []} />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {toc.length > 1 && (
                  <div className="hidden lg:block bg-card rounded-lg p-4 border">
                    <TableOfContents items={toc} />
                  </div>
                )}
                <ArticleSidebar title="Khóa học nổi bật" items={sidebarCourses} />
              </div>
            </div>
          </div>
          <RelatedList items={article.related} />
        </PageContent>
        <FloatingCTA hotline={hotline} />
      </Section>
      <ConsultationForm />
    </PageShell>
  );
}

export async function ArticlesRoute({ section, slug, searchParams }: { section: ArticleSectionKey; slug?: string[]; searchParams: SearchParams }) {
  const resolved = await resolveArticlesRoute(section, slug);
  if (!resolved) notFound();
  return resolved.kind === "article" ? (
    <ArticleDetail section={resolved.section} article={resolved.article} />
  ) : (
    <ArticlesListing section={resolved.section} category={resolved.category} categories={resolved.categories} searchParams={searchParams} />
  );
}
