"use client"
import React, { useRef, useState } from 'react'
import CustomSwiper from '../ui/custom-swiper'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { News } from '@/types/news'
import NewsCard from '../home/card/home-news-card'
import NewscardCol from './card/news-card-col'



interface NewsSwiperProps {
    data?: News[];
    title?: string;
    description?: string;
    href?: string;
}
const NewsSwiper = ({
    data = [],
    href = "",
    title = "",
    description = ""
}: NewsSwiperProps) => {
    // const [loadMore, setloadMore] = useState<boolean>()
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },  // mobile nhỏ
        640: { slidesPerView: 2, spaceBetween: 10 },  // sm
        870: { slidesPerView: 3, spaceBetween: 10 },  // md
        1280: { slidesPerView: 4, spaceBetween: 10 }, // xl
    };

    if (!data || data.length === 0) return null;
    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
                <div className='w-full flex items-center justify-between min-h-20 mb-8'>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-primary">{title}</h3>
                        <p className="text-muted-foreground mt-1">{description}.</p>
                    </div>
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
                </div>
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
                            <NewscardCol
                                key={index}
                                href={item.slug ?? ""}
                                image={item.image ?? ""}
                                title={item.title ?? ""}
                                description={item.description ?? ""}
                                date={item.createdAt}
                                authorname={item.authorName ?? ""}

                            />
                        ))}
                    </CustomSwiper>
                </div>
                <div className="w-full max-w-56 mx-auto mt-8">

                    <Link href={href} className="btn-link-custom">
                        Xem thêm
                        <ArrowRight className="btn-link-custom__icon" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NewsSwiper       