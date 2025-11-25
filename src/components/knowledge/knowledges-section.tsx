"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Grid3x3, List } from "lucide-react"
import { CategoryItem, KnowledgesCategory } from "@/types/category"
import FeaturedArticleCard from "../shared/article/card/featured-article-card";
import ArticleCard from "../shared/article/card/article-card";
import { ArticleSidebar } from "../shared/article";
import { Knowledges } from "@/types/knowledges";
import { CateKnowledgesSection } from "./cate-knowledge-section";
import { buildUrl } from "@/utils/helpers";





interface KnowledgesListPageProps {
    categoryKnowledge?: KnowledgesCategory[];
    category?: CategoryItem;
    data: Knowledges[];
}
const KnowledgesSection = ({
    categoryKnowledge,
    category,
    data
}: KnowledgesListPageProps) => {
    console.log("cate parent: ", category)
    const [currentPage, setCurrentPage] = useState(1)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [searchQuery, setSearchQuery] = useState("")
    const knowledgesPerPage = 4
    // const featuredArticle = data?.find((a) => a.featured)
    // const regularArticles = data?.filter((a) => !a.featured)

    // const filteredArticles = regularArticles?.filter((article) =>
    //   article.title.toLowerCase().includes(searchQuery.toLowerCase()),
    // )

    const totalPages = data ? Math.ceil(data.length / knowledgesPerPage) : 0
    const startIndex = (currentPage - 1) * knowledgesPerPage

    // ham này để map hiển thị
    const paginatedKnowledges = data ? data.slice(startIndex, startIndex + knowledgesPerPage) : [];
   

    if (!data || data.length === 0) return null;

    return (
        <section className="section--sm">
            {/* <ListGridControl onChangeView={setViewMode} /> */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column - Featured + Articles */}
                <div className="lg:col-span-2">
                    {/* Featured Article */}

                    <div className="mb-8">
                        <FeaturedArticleCard
                            href={buildUrl({
                                baseUrl: category?.url,
                                slug: data[0].slug ?? ""
                            })}
                            image={data[0].image}
                            title={data[0].title}
                            description={data[0].description}
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
                            const base_url = buildUrl({
                                baseUrl: category?.url,
                                slug: item?.slug ?? "" 
                            });
                            return viewMode === "grid" ? (
                                <div key={item.id ?? `idx-${index}`}>
                                    <ArticleCard
                                        href={base_url}
                                        title={item.title}
                                        image={item.image}
                                        description={item.description}
                                        layout="grid"
                                    />
                                </div>

                            ) : (
                                <div key={item.id ?? `idx-${index}`}>
                                    <ArticleCard
                                        href={base_url}
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
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    <ArticleSidebar
                        title="Khóa học tiêu biểu"
                        items={[
                            {
                                id: 1,
                                title: "Luyện thi PTE core chuyên biệt",
                                image: "/pte-exam-course.jpg",
                                badge: "Miễn phí",
                            },
                            {
                                id: "2",
                                title: "Luyện thi PTE core chuyên biệt",
                                image: "/english-course.jpg",
                                badge: "Miễn phí",
                            },
                            {
                                id: "3",
                                title: "Luyện thi PTE core chuyên biệt",
                                image: "/study-abroad.jpg",
                                badge: "Miễn phí",
                            },
                        ]}
                    />

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

export default KnowledgesSection
