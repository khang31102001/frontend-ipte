"use client";
import { News, NewsListRes } from "@/types/news";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Newscard from "./card/news-card";
import { CategoryItem } from "@/types/category";
import CirclePagination from "@/shared/control/pagination";
import { joinPath } from "@/lib/helper";
import { formatDate } from "@/utils/date";
// import CirclePagination from "@/components/shared/control/pagination";

interface NewsListProps {
    category?: CategoryItem | null;
    newData?: News[];
    basePath?: string;
}
const NewsListSection = ({
    category = null,
    newData,
    basePath = "/tin-tuc-pte-ipass",
}: NewsListProps) => {
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 13;
    const totalPages = newData ? Math.ceil(newData?.length / newsPerPage) : 0
    const startIndex = (currentPage - 1) * newsPerPage

    // ham này để map hiển thị
    const paginatedNews = newData ? newData.slice(startIndex, startIndex + newsPerPage) : [];


    if (!newData || newData?.length === 0) return null;

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="space-y-12">
                    {category && (
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-primary">{category.name}</h3>
                                <p className="text-muted-foreground mt-1">{category.description}</p>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {paginatedNews.map((item, index) => {
                            const baseHref = joinPath(basePath, item?.slug) ?? "#";
                            const imgItemUrl = item?.image || "/images/img-news-default.jpg"
                            const createdAt = formatDate(item.createdAt ?? item.updatedAt ?? "");
                            return (
                                <Newscard
                                    key={index}
                                    href={baseHref}
                                    image={imgItemUrl}
                                    title={item.title ?? ""}
                                    description={item.description ?? ""}
                                    date={createdAt}
                                    authorName={item.author ?? "Giảng viên đội PTE"}
                                    layout="col"
                                />
                            )
                        })}
                    </div>
                    <CirclePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </section>
    )
}
export default NewsListSection