"use client"
import React, { useMemo, useRef } from 'react'
import CustomSwiper from '../ui/custom-swiper'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { News } from '@/types/news'
import { CategoryItem } from '@/types/category'
import Newscard from './card/news-card'
import { formatDate } from '@/utils/date'
import { ROUTERS } from '../config/routes/routers'
import NewsCard from './card/news-card'




interface NewsSwiperProps {
    category: CategoryItem;
    newItem?: News[];
    basePath?: string;
}
const DEFAULT_BASE = "/tin-tuc-pte-ipass";
const NewsSwiper = ({
    category,
    newItem = [],
    basePath = DEFAULT_BASE,

}: NewsSwiperProps) => {
    // const [loadMore, setloadMore] = useState<boolean>()
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const breakpoints = useMemo(
        () => ({
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            870: { slidesPerView: 3, spaceBetween: 10 },
            1280: { slidesPerView: 4, spaceBetween: 10 },
        }),
        []
    );

    const cateHref = category?.url ? ROUTERS.NEWS.category(category?.url) : ""

    if (!newItem || newItem.length === 0) return null;
    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
                <div className='w-full flex items-center justify-between min-h-20 mb-8'>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-primary">{category?.name}</h3>
                        <p className="text-muted-foreground mt-1">{category.description}.</p>
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
                        {newItem.map((item, index) => {
                            const baseHref = ROUTERS.NEWS.detail(item.slug, category?.url)
                            const imgSrc = item?.image || "/images/img-news-default.jpg"
                            const createdAt = formatDate(item.createdAt ?? item.updatedAt ?? "");
                            return (
                                <NewsCard
                                    key={index}
                                    href={baseHref}
                                    image={imgSrc}
                                    title={item?.title}
                                    description={item.description ?? ""}
                                    date={createdAt}
                                    authorName={item?.author ?? "Giảng viên đội PTE"}
                                    layout='col'

                                />
                            )
                        })}
                    </CustomSwiper>
                </div>
                {cateHref && (
                    <div className="w-full max-w-56 mx-auto mt-8">
                        <Link href={cateHref} className="btn-link-custom">
                            Xem thêm
                            <ArrowRight className="btn-link-custom__icon" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NewsSwiper       