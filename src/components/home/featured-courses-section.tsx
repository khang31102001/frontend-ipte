"use client"
import { ChevronLeft, ChevronRight, Key } from 'lucide-react'
import React, { useRef } from 'react'
import CustomSwiper from '../ui/custom-swiper'
import { Course } from '@/types/courses'
import CourseCard from '../courses/card/course-card'
interface FeaturedCoursesSectionProps {
    featuredCourses?: Course[] | [];
}
const FeaturedCoursesSection = ({
    featuredCourses = [],
}: FeaturedCoursesSectionProps) => {

    // console.log("check featuredCourses: ", featuredCourses);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },  // mobile nhỏ
        640: { slidesPerView: 2, spaceBetween: 10 },  // sm
        870: { slidesPerView: 3, spaceBetween: 10 },  // md
        1280: { slidesPerView: 4, spaceBetween: 10 }, // xl
    };

    const shouldUseSwiper = featuredCourses.length >= 4;
    const shouldLoop = featuredCourses.length >= 6;



    return (
        <section className='w-full bg-white py-16'>
            <div className='container mx-auto px-4'>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <h1 className="text-5xl lg:text-6xl font-bold text-brandBlue-900 text-center md:text-left">
                        Khóa học nổi bật
                    </h1>
                    <div className="flex justify-center md:justify-end mt-2 gap-2">
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
                {/* card cources */}
                {
                    shouldUseSwiper ? (
                        <div className='w-full h-full py-8'>
                            <CustomSwiper
                                breakpoint={
                                    breakpoints
                                }
                                autoplay={shouldLoop}
                                loop={shouldLoop}
                                navigation={{ prevEl: prevRef, nextEl: nextRef }}
                            >
                                {featuredCourses.map((item, index) => {
                                    const imgSrc = item?.image?.trim() ? item.image : "/images/course-placeholder.jpg";
                                    return (
                                        <div key={index} className='w-full h-full' >
                                            <CourseCard
                                                href={item?.slug ?? ""}
                                                image={imgSrc}
                                                title={item?.title ?? ""}
                                                description={item?.description ?? ""}
                                                level={item?.level ?? ""}
                                                btnText='Tìm hiểu thêm'
                                                card_layout='col'
                                            />
                                        </div>
                                    )
                                })}
                            </CustomSwiper>

                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-6">
                            {featuredCourses.map((item, index) => {
                                return (
                                    <CourseCard
                                        key={index}
                                        href={item?.slug ?? ""}
                                        image={item.image ?? ""}
                                        title={item?.title ?? ""}
                                        description={item?.description ?? ""}
                                        level={item?.level ?? ""}
                                        btnText='Tìm hiểu thêm'
                                        card_layout='col'
                                    />

                                )
                            })}
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default FeaturedCoursesSection