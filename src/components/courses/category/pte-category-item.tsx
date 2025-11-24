"use client"
import React, { useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import CustomSwiper from '@/components/ui/custom-swiper'
import ArticleListSection from '../../shared/article/list/article-list-section'
import ArticleCard from '../../shared/article/card/article-card'
import { CategoryItem } from '@/types/category'
import { Course } from '@/types/courses'
import { buildUrl } from '@/utils/helpers'


type layout = 'grid' | 'swiper'

interface PteCategoryItemProps {
    data?: Course[];
    category: CategoryItem;
    layout_type?: string
}
const PteCategoryItem = ({
    data = [],
    category,
    layout_type
}: PteCategoryItemProps) => {
    // const [loadMore, setloadMore] = useState<boolean>()
    console.log()
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },  // mobile nhỏ
        640: { slidesPerView: 2, spaceBetween: 10 },  // sm
        870: { slidesPerView: 3, spaceBetween: 10 },  // md
        1280: { slidesPerView: 4, spaceBetween: 10 }, // xl
    };

    return (
        <section className="section--sm">
            <div className="container mx-auto px-4">
                <div className='w-full flex items-center justify-between min-h-24 mb-8'>
                    <div className="flex-1 space-y-1 md:space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-primary">{category.name}</h3>
                        <p className="text-muted-foreground mt-1">{category.description}.</p>
                    </div>
                    {layout_type === "swiper" && (
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
                            {data.map((item, index) => {
                                const base_url = buildUrl({ baseUrl: category.url, slug: item.slug ?? "" });
                              
                                return (
                                    <ArticleCard key={index}
                                        href={base_url}
                                        title={item.title}
                                        image={item.image}
                                        description={item.description}
                                        layout="grid"
                                    />
                                )
                            })}
                        </CustomSwiper>
                    </div>
                ) : (
                    <ArticleListSection category={category} data={data} />
                )}

                <div className="w-full max-w-56 mx-auto mt-8">

                    <Link href={category.url || ""} className="btn-link-custom">
                        Xem thêm
                        <ArrowRight className="btn-link-custom__icon" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default PteCategoryItem      