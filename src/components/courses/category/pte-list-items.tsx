import React, { useState } from 'react'
import FeaturedArticleCard from '../../shared/article/card/featured-article-card';
import { Course } from '@/types/courses';
import ArticleCard from '../../shared/article/card/article-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryItem } from '@/types/category';
import { buildUrl } from '@/utils/helpers';

interface PtelistItemsProps {
    category?: CategoryItem;
    items: Course[];
    viewMode?: "grid" | "list";
}
const PtelistItems = ({
    category,
    items,
    viewMode = "grid"
}: PtelistItemsProps) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const CoursesPerPage = 4
    // const featuredArticle = data?.find((a) => a.featured)
    // const regularArticles = data?.filter((a) => !a.featured)

    // const filteredArticles = regularArticles?.filter((article) =>
    //   article.title.toLowerCase().includes(searchQuery.toLowerCase()),
    // )

    const totalPages = items ? Math.ceil(items.length / CoursesPerPage) : 0;
    const startIndex = (currentPage - 1) * CoursesPerPage;

    // ham này để map hiển thị
    const paginatedPteuni = items ? items.slice(startIndex, startIndex + CoursesPerPage) : [];
    return (
        <section>
            <div className="mb-8">
                <FeaturedArticleCard
                    href={buildUrl({baseUrl: category?.url, slug: items[0]?.slug ?? ""})}
                    image={items[0].image}
                    title={items[0].title}
                    description={items[0].description}
                />
            </div>

            <div
                className={
                    viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2  gap-6"
                        : "flex flex-col gap-4"
                }
            >
                {paginatedPteuni?.map((item, index) => {
                    return viewMode === "grid" ? (
                        <div key={item.courseId ?? `idx-${index}`}>
                            <ArticleCard
                                href={buildUrl({baseUrl: category?.url, slug: item?.slug ?? ""})}
                                title={item.title}
                                image={item.image}
                                description={item.description}
                                layout="grid"
                            />
                        </div>

                    ) : (
                        <div key={item.courseId ?? `idx-${index}`}>
                            <ArticleCard
                                href={buildUrl({baseUrl: category?.url, slug: item?.slug ?? ""})}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                layout="list"
                            />
                        </div>
                    );
                })}

            </div>


            {/* Pagination */}

            <div className="mt-8 flex items-center justify-center gap-2">
                <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                        <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${currentPage === pageNum
                                ? "bg-hero-gradient text-white"
                                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            {pageNum}
                        </button>
                    )
                })}

                <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </section>
    )
}

export default PtelistItems