"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Grid3x3, List } from "lucide-react"
import { CategoryItem, CourseCategory } from "@/types/category"
import ListGridControl from "../../shared/control/list-grid-control";
import FeaturedArticleCard from "../../shared/article/card/featured-article-card";
import ArticleCard from "../../shared/article/card/article-card";
import { ArticleSidebar } from "../../shared/article";
import { Knowledges } from "@/types/knowledges";
import { Course } from "@/types/courses";
import { PteCategorySection } from "./pte-category-section";
import PtelistItems from "./pte-list-items";






interface PteCategoryPageProps {
    categoryCourse?: CourseCategory[];
    categoryParent?: CategoryItem;
    data: Course[];
}
const PteCategoryPage = ({
    categoryCourse,
    categoryParent,
    data
}: PteCategoryPageProps) => {
  
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
   
   
    return (
        <section className="section--sm">
            <ListGridControl onChangeView={setViewMode} />
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column - Featured + Articles */}
                <div className="lg:col-span-2">
                   <PtelistItems 
                   items={data}
                    base_url={categoryParent?.slug!}
                   />
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

            <div>
                {categoryCourse && categoryCourse.map((item, index) => {
                    return (
                        <PteCategorySection key={index}
                            pteCategory={item}
                        />
                    )
                })}
            </div>

        </section>
    )
}

export default PteCategoryPage
