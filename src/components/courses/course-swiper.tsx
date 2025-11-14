"use client"
import React, { useRef, useState } from 'react'
import CustomSwiper from '../ui/custom-swiper'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Course } from '@/types/courses'
import CoursesCardColum from './card/course-card-colum'
import Link from 'next/link'


interface CourseSwiperProps {
    data?: Course[];
    title?: string;
    description?: string;
    url?: string;
}
const CourseSwiper = ({
    data = [],
    title = "Khóa học nổi bật",
    description = "Luyện chuyên sâu cho học viên muốn đạt điểm cao tuyệt đối."
}: CourseSwiperProps) => {
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

                        loop
                        navigation={{ prevEl: prevRef, nextEl: nextRef }}
                        className="swiper-course"
                    >
                        {data.map((item, index) => (
                            <CoursesCardColum
                                key={index}
                                title={item.title ?? ""}
                                slug={item.slug ?? ""}
                                image={item.image ?? ""}
                                description={item.description ?? ""}
                                duration={item.duration ?? ""}
                                level={item.level ?? ""}
                            />
                        ))}
                    </CustomSwiper>
                </div>
                <div className="w-full max-w-56 mx-auto mt-8">

                    <Link href="/khoa-hoc" className="btn-link-custom">
                        Xem thêm
                        <ArrowRight className="btn-link-custom__icon" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CourseSwiper       