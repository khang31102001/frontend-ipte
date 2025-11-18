"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { PTETips } from "@/types/PTETips"
import { News } from "@/types/news"
import NewscardCol from "./card/news-card-col"

interface NewsListProps {
    title?: string;
    description?: string;

    data?: News[]
}
const NewsList = ({
    title,
    description,
    data = []
}: NewsListProps) => {
    // const [currentIndex, setCurrentIndex] = useState(0)

    // const handlePrevious = () => {
    //   setCurrentIndex((prev) => (prev > 0 ? prev - 1 : articles.length - 1))
    // }

    // const handleNext = () => {
    //   setCurrentIndex((prev) => (prev < articles.length - 1 ? prev + 1 : 0))
    // }
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
                        {data.map((item, index) => (
                            <NewscardCol
                                key={index}
                                href={item.slug ?? ""}
                                image={item.image ?? ""}
                                title={item.title ?? ""}
                                description={item.description ?? ""}
                                date={item.created_at}
                                authorname={item.authorname ?? ""}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default NewsList