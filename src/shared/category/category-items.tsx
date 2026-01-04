"use client"
import React, { useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Course } from '@/types/courses'
import Link from 'next/link'
import CustomSwiper from '@/components/ui/custom-swiper'
import ArticleCard from '../article/card/article-card'


type layout = 'grid' | 'swiper'

interface CategoryKnowledgeProps {
    data?: any[];
    title?: string;
    description?: string;
    url?: string;
    layout_type?: layout;
}
const CategoryKnowledge = ({
    data = [],
    url = "",
    title = "Khóa học nổi bật",
    description = "Luyện chuyên sâu cho học viên muốn đạt điểm cao tuyệt đối.",
    layout_type
}: CategoryKnowledgeProps) => {
    // const [loadMore, setloadMore] = useState<boolean>()
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },  // mobile nhỏ
        640: { slidesPerView: 2, spaceBetween: 10 },  // sm
        870: { slidesPerView: 3, spaceBetween: 10 },  // md
        1280: { slidesPerView: 4, spaceBetween: 10 }, // xl
    };

    return (
        <section className="section sm:section-sm lg:section-lg">
            <div className="container mx-auto px-4">
                <div className='w-full flex items-center justify-between min-h-24 mb-8'>
                    <div className="flex-1 space-y-1 md:space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-primary">{title}</h3>
                        <p className="text-muted-foreground mt-1">{description}.</p>
                    </div>
                    {layout_type === "swiper" &&(
                        <div className="flex items-center justify-center gap-2">
                        <button

                            ref={prevRef}
                            className="swiper-nav-btn"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <button
                            ref={nextRef}
                            className="swiper-nav-btn"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    )}
                </div>
                
                {layout_type === "swiper" ? (
                    <div className='w-full h-auto'>
                    <CustomSwiper
                        breakpoint={
                            breakpoints
                        }
                        slidesPerView={4}
                        loop
                        navigation={{ prevEl: prevRef, nextEl: nextRef }}
                        className="swiper-course"
                    >
                        {data.map((item, index) => (
                            <ArticleCard key={index}
                                title={item.title}
                                href={item.slug ?? ""}
                                image={item.image }
                                description={item.description }
                                layout="col"
                            />
                        ))}
                    </CustomSwiper>
                </div>
                ):(
                     null
                )}

                <div className="w-full max-w-56 mx-auto mt-8">

                    <Link href={url} className="btn-link-custom">
                        Xem thêm
                        <ArrowRight className="btn-link-custom__icon" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CategoryKnowledge       