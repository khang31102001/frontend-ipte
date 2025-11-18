"use client"
import { useMemo, useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import ListGridControl from "@/components/shared/Control/list-grid-control"
import CoursesCardColum from "@/components/courses/card/course-card-colum"
import CourseCardRow from "@/components/courses/card/course-card-row"
import Link from "next/link"
import { Course } from "@/types/courses"
import ArticleCard from "../card/article-card"



type ViewMode = "grid" | "list";
interface ArticleListSectionProps {
    data?: any[];
    viewMode?: ViewMode
}
const ITEMS_PER_LOAD = 4;
const ArticleListSection = ({
    data = [],
    viewMode = "grid",
}: ArticleListSectionProps) => {


    // số lượng item đang hiển thị
    const [currentItem, setCurrentItem] = useState(ITEMS_PER_LOAD);
    // slice từ 0 -> visibleCount
    const currentArticle = useMemo(() => {
        return data.slice(0, currentItem);
    }, [data, currentItem]);





    if (!data || data.length === 0) return null;
    return (
        <section className="w-full py-6">
            <div
                className={
                    viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                    : "flex flex-col gap-4"
                }
            >
                {currentArticle?.map((item, index) => {
                    return viewMode === "grid" ? (
                        <div key={item.id ?? item.slug ?? `idx-${index}`}>
                            <ArticleCard
                                href={item.slug!}
                                title={item.title}
                                image={item.image}
                                description={item.description}
                                layout="grid"
                            />
                        </div>

                    ) : (
                        <div key={item.course_id ?? item.slug ?? `idx-${index}`}>
                            <ArticleCard
                                href={item.slug!}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                layout="list"
                            />
                        </div>
                    );
                })}

            </div>
        </section>
    )
}

export default ArticleListSection
