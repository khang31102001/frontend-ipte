"use client"
import { useMemo, useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import ListGridControl from "@/components/shared/control/list-grid-control"
import CourseCardRow from "@/components/courses/card/course-card"
import Link from "next/link"
import { Course } from "@/types/courses"
import ArticleCard from "../card/article-card"
import { CategoryItem } from "@/types/category"
import { buildUrl } from "@/utils/helpers"


const ITEMS_PER_LOAD = 4;
type ViewMode = "grid" | "list";
interface ArticleListSectionProps {
    category?: CategoryItem;
    data?: any[];
    viewMode?: ViewMode
}

const ArticleListSection = ({
    data = [],
    category ,
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
        <section className="w-full h-a section--sm">
            <div
                className={
                    viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                    : "flex flex-col gap-4"
                }
            >
                {currentArticle?.map((item, index) => {
                     const base_url = buildUrl({ 
                        baseUrl: category?.url, 
                        slug: item?.slug
                    });
                    return viewMode === "grid" ? (
                        <div key={item.id ?? item.slug ?? `idx-${index}`}>
                            <ArticleCard
                                href={base_url}
                                title={item.title}
                                image={item.image}
                                description={item.description}
                                layout="grid"
                            />
                        </div>

                    ) : (
                        <div key={item.course_id ?? item.slug ?? `idx-${index}`}>
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
        </section>
    )
}

export default ArticleListSection
