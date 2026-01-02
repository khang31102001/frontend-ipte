"use client"
import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CategoryItem, KnowledgesCategory } from "@/types/category"
import FeaturedArticleCard from "../../shared/article/card/featured-article-card";
import ArticleCard from "../../shared/article/card/article-card";
import { ArticleSidebar } from "../../shared/article";
import { CateKnowledgesSection } from "./cate-knowledge-section";
import { buildUrl } from '@/lib/helper'
import { Course } from "@/types/courses";
import { ROUTERS } from "@/config/routes/routers";
import { SidebarItem } from "@/shared/article/article-sidebar";



interface KnowledgesListProps {
    categoryKnowledge?: KnowledgesCategory[] | [];
    category?: CategoryItem;
    featuredCourses?: Course[] | null;
    knowledgeData: Course[];
}
export function courseToSidebarItem(
    course: Course,
    basePath = ""
): SidebarItem {
    return {
        id: course.courseId ?? course.slug,
        title: course.title ?? course.courseName ?? "Khóa học",
        image: course.image ?? "/images/course-default.jpg",
        badge: "Miễn phí",
        href: course.slug ? `${basePath}/${course.slug}` : basePath,
    };
}


const KnowledgesList = ({
    categoryKnowledge = [],
    category,
    knowledgeData,
    featuredCourses
}: KnowledgesListProps) => {
    // console.log("cate parent: ", category)
    const [currentPage, setCurrentPage] = useState(1)
    const [viewMode] = useState<"grid" | "list">("grid");
    const knowledgesPerPage = 4;
    const featuredKnowledge = knowledgeData?.find((a) => a.isFeatured) ?? null;
    const courseFeaturedItems = useMemo(() => {
        if (!featuredCourses || featuredCourses.length === 0) return [];
        return featuredCourses.map((item) => courseToSidebarItem(item, category?.url))
    }, [featuredCourses, category?.url]);

    // const [searchQuery, setSearchQuery] = useState("")

    // const featuredArticle = data?.find((a) => a.featured)
    // const regularArticles = data?.filter((a) => !a.featured)

    // const filteredArticles = regularArticles?.filter((article) =>
    //   article.title.toLowerCase().includes(searchQuery.toLowerCase()),
    // )

    const totalPages = knowledgeData ? Math.ceil(knowledgeData.length / knowledgesPerPage) : 0
    const startIndex = (currentPage - 1) * knowledgesPerPage

    // ham này để map hiển thị
    const paginatedKnowledges = knowledgeData ? knowledgeData.slice(startIndex, startIndex + knowledgesPerPage) : [];
    if (!knowledgeData || knowledgeData.length === 0) return null;

    return (
        <section className="section--sm">
            {/* <ListGridControl onChangeView={setViewMode} /> */}
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="mb-8">
                        <FeaturedArticleCard
                            href={buildUrl({
                                baseUrl: category?.url,
                                slug: featuredKnowledge?.slug ?? ""
                            })}
                            image={featuredKnowledge?.image}
                            title={featuredKnowledge?.title}
                            description={featuredKnowledge?.description}
                        />
                    </div>

                    <div
                        className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 sm:grid-cols-2  gap-6"
                                : "flex flex-col gap-4"
                        }
                    >
                        {paginatedKnowledges?.map((item, index) => {
                            const href = ROUTERS.KNOWLEDGE.detail(item?.slug, category?.url);
                            const imgURl = item?.image || "/images/img-course-deault.jpg";

                            return viewMode === "grid" ? (
                                <div key={item.categoryId ?? `idx-${index}`}>
                                    <ArticleCard
                                        href={href}
                                        title={item?.title}
                                        image={imgURl}
                                        description={item?.description}
                                        layout="col"
                                    />
                                </div>

                            ) : (
                                <div key={item.categoryId ?? `idx-${index}`}>
                                    <ArticleCard
                                        href={href}
                                        image={imgURl}
                                        title={item?.title}
                                        description={item?.description}
                                        layout="row"
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
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {courseFeaturedItems && (
                        <ArticleSidebar
                            title="Khóa học tiêu biểu"
                            items={courseFeaturedItems}
                        />
                    )}

                    <ArticleSidebar
                        title="Cộng đồng PTE lớn nhất"
                        items={[
                            {
                                id: "1",
                                title: "Join our PTE community",
                                image: "/community-group.jpg",
                            },
                        ]}
                        variant="large"
                    />

                    <ArticleSidebar
                        title="Cập nhật thông tin PTE"
                        items={[
                            {
                                id: "1",
                                title: "Follow us on social media",
                                image: "/social-media-icons.jpg",
                            },
                        ]}
                        variant="large"
                    />
                </div>
            </div>
            <section>
                {categoryKnowledge && categoryKnowledge.map((item, index) => (
                    <CateKnowledgesSection
                        key={index}
                        knowledgeCategory={item}
                    />
                ))}
            </section>
        </section>
    )
}

export default KnowledgesList
