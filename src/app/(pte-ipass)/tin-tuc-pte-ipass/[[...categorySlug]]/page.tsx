// app/new/page.tsx

import NewsCategoryItem from '@/components/news/category/news-category-item'
import NewsDetail from '@/components/news/detail/news-details'
import NewListPage from '@/components/news/news-list'
import TrendingNews from '@/components/news/featured-news-section'
import CategoryLayout from '@/shared/category/category-layout'
import Skeleton from '@/shared/loading/Skeleton'
import { checkCategoryBySlugs, isChildren } from '@/lib/check-category'
import { categoriesServices } from '@/lib/service/category'
import { BreadcrumbItem } from '@/types/breadcrumbs'
import { CategoryItem, NewsCategory } from '@/types/category'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { newsServices } from '@/lib/service/new'
import { News, NewsListRes } from '@/types/news'
import NotFound from '@/shared/not-found'
import { HeroBanner } from '@/shared/banner/hero-banner'
import { aboutService } from '@/lib/service/about'
import { coursesServices } from '@/lib/service/course'

export const metadata: Metadata = {
    title: 'Tin tức & Cập nhật PTE iPASS', // sẽ thành "Tin tức & Cập nhật PTE iPASS | PTE iPASS"
    description:
        'Cập nhật tin tức mới nhất về PTE, lịch khai giảng khóa học, ưu đãi học phí và câu chuyện thành công của học viên PTE iPASS.',
    keywords: [
        'PTE iPASS',
        'tin tức PTE',
        'khóa học PTE',
        'lịch khai giảng PTE',
        'ưu đãi PTE',
        'PTE Darwin',
    ],
    alternates: {
        canonical: '/new', // → https://iptepass.com/new
    },
    openGraph: {
        title: 'Tin tức & Cập nhật PTE iPASS',
        description:
            'Xem những tin tức mới nhất về khóa học PTE, lịch khai giảng và ưu đãi tại PTE iPASS.',
        url: '/new',
        type: 'website',
        siteName: 'PTE iPASS',
        images: [
            {
                url: '/images/og/pte-news-og.jpg', // 🔁 Đổi thành ảnh thật
                width: 1200,
                height: 630,
                alt: 'Tin tức PTE iPASS',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tin tức & Cập nhật PTE iPASS',
        description:
            'Cập nhật mới nhất về khóa học PTE, lịch khai giảng và ưu đãi dành cho học viên.',
        images: ['/images/og/pte-news-og.jpg'],
    },
}

// app/new/page.tsx (tiếp)
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tin tức & Cập nhật PTE iPASS',
    description:
        'Tổng hợp tin tức, thông báo lịch khai giảng, ưu đãi học phí và câu chuyện học viên PTE iPASS.',
    url: 'https://iptepass.com/new', // 🔁 Đổi cho đúng domain
    publisher: {
        '@type': 'Organization',
        name: 'PTE iPASS',
        url: 'https://iptepass.com',
        logo: {
            '@type': 'ImageObject',
            url: 'https://iptepass.com/images/logo.png', // logo full URL
        },
    },
}

async function NewsListingPage({
    newsCate,
    breadcrumbs,
}: {
    newsCate: CategoryItem
    breadcrumbs: BreadcrumbItem[]
}) {
    if (!newsCate) notFound()
    const categoryId = newsCate.categoryId
    const childCategories = newsCate?.children ?? []
    const [newsRes, featuredRes, knowledgesCateRes] = await Promise.all([
        newsServices.getNewsList({ categoryId: categoryId }),
        newsServices.getNewsList({ page: 1, pageSize: 12, isFeatured: true }),
        categoriesServices.getCategoryTree({
            categoryType: 'H_MENU_KNOWLEDGE',
        }),
    ])

    const cateChildNews = await Promise.all(
        childCategories.map(async (childCategory) => {
            try {
                const data = await newsServices.getNewssByCate({
                    categoryId: childCategory.categoryId!,
                })
                const newsItems = Array.isArray(data?.items) ? data.items : []

                return { ...childCategory, news: newsItems } as NewsCategory
            } catch {
                return { ...childCategory, newsItems: [] } as NewsCategory
            }
        }),
    )

    const featuredData = Array.isArray(featuredRes?.items)
        ? featuredRes.items
        : [];
    const newsData = Array.isArray(newsRes?.items)
        ? newsRes.items
        : []
    const knowledgeRoot: CategoryItem | null = knowledgesCateRes?.[0] ?? null

    //   console.log("audit check newsRes: ", newsRes);
    return (
        <>
            <HeroBanner
                alt="Trang chủ pte ipass"
                src="/images/banner/banner-tin-tuc-pte-ipas.jpg"
                priority={true}
            />
            <CategoryLayout
                title={newsCate?.name || ''}
                description={newsCate?.description}
                breadcrumbs={breadcrumbs}
            >
                <NewListPage
                    newsData={newsData}
                    newsFeatured={featuredData}
                    newsCategory={cateChildNews}
                    knowledgesCategory={knowledgeRoot}
                />
            </CategoryLayout>
        </>
    )
}
async function NewsDetailPage({
    newsData,
    breadcrumbs,
}: {
    newsData: News;
    breadcrumbs: BreadcrumbItem[];
}) {
    if (!newsData) NotFound()

    const [socialRes, featuredCoursesRes] = await Promise.all([
        aboutService.getSocialList(),
        coursesServices.getCoursesList({
            page: 1,
            pageSize: 12,
            isFeatured: true,
        }),
    ])
    const featuredCourses = featuredCoursesRes?.items ?? []
    const socialData = socialRes?.items ?? [];

    //   console.log("audit check newsRes: ", newsRes);
    return <NewsDetail news={newsData} featuredCourses={featuredCourses} />
}

interface PageProps {
    params: { categorySlug: string[] }
}

export default async function Page({ params }: PageProps) {
    const categorySlug = params?.categorySlug
    const newsCateTree = await categoriesServices.getCategoryTree({
        categoryType: 'H_MENU_NEWS',
    })
    const newsRootCategory: CategoryItem = newsCateTree?.[0] ?? null
    if (!newsRootCategory) return notFound()

    if (!categorySlug || categorySlug.length === 0) {
        const breadcrumbs: BreadcrumbItem[] = [
            { name: 'Trang chủ', href: '/' },
            { name: newsRootCategory?.name, href: newsRootCategory?.url ?? '' },
        ]

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Suspense
                    fallback={<Skeleton title={newsRootCategory?.name} />}
                >
                    <NewsListingPage
                        breadcrumbs={breadcrumbs}
                        newsCate={newsRootCategory}
                    />
                </Suspense>
            </>
        )
    }

    const lastSegment = categorySlug.at(-1)
    if (!lastSegment) return NotFound()

    const newsData = await newsServices.getNewsDetail({ slug: lastSegment })
    if (newsData) {
        const breadcrumbs: BreadcrumbItem[] = [
            { name: 'Trang chủ', href: '/' },
            { name: newsData?.title, href: '' },
        ]
        return <NewsDetailPage newsData={newsData} breadcrumbs={breadcrumbs} />

        // return <NewsDetail news={newsData} breadcrumbs={breadcrumbs} />
    }

    // 2. Nếu không phải course thì coi như là danh mục

    const { found: currentCategory, breadcrumbs: categoryBreadcrumbs } =
        await checkCategoryBySlugs(
            newsRootCategory?.children ?? [],
            categorySlug,
        )

    if (!currentCategory) return NotFound()
    const breadcrumbs: BreadcrumbItem[] = [
        { name: 'Trang chủ', href: '/' },
        ...categoryBreadcrumbs,
    ]

    return (
        <Suspense fallback={<Skeleton title={currentCategory.name} />}>
            <NewsListingPage
                newsCate={currentCategory}
                breadcrumbs={breadcrumbs}
            />
        </Suspense>
    )
}
