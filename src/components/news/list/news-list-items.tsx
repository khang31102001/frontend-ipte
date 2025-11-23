"use client"
import { News } from "@/types/news"
import NewscardCol from "../card/news-card-col"
import CirclePagination from "@/components/shared/control/pagination";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface NewsListProps {
    title?: string;
    description?: string;
    data?: News[]
}
const NewsListItems = ({
    title,
    description,
    data = []
}: NewsListProps) => {
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 4;
    const totalPages = data ? Math.ceil(data.length / newsPerPage) : 0
    const startIndex = (currentPage - 1) * newsPerPage

    // ham này để map hiển thị
    const paginatedNews = data ? data.slice(startIndex, startIndex + newsPerPage) : [];
    if (!data || data.length === 0) return null;

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="space-y-12">
                    {title && (
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-primary">{title}</h3>
                                <p className="text-muted-foreground mt-1">{description}</p>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {paginatedNews.map((item, index) => (
                            <NewscardCol
                                key={index}
                                href={`${pathname}/${item.slug}/`}
                                image={item.image ?? ""}
                                title={item.title ?? ""}
                                description={item.description ?? ""}
                                date={item.created_at}
                                authorname={item.authorname ?? ""}
                            />
                        ))}
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
export default NewsListItems