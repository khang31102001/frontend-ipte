"use client"
import { ChevronLeft, ChevronRight, Key } from 'lucide-react'
import React, { useRef } from 'react'
import CoursesCard from './card/courses-card'
import CustomSwiper from '../ui/custom-swiper'

const FeaturedCoursesPTE = () => {
    const FeturedCourses = [
        {
            id: 1,
            image: "/images/featured-course-1.png",
            duration: "4 Weeks",
            level: "Beginner",
            title: "PTE Academic 65+",
            description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
            textBtn: "Đăng ký ngay",
        },
        {
            id: 2,
            image: "/images/featured-course-2.png",
            duration: "4 Weeks",
            level: "Beginner",
            title: "PTE Academic 65+",
            description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
            textBtn: "Đăng ký ngay",
        },
        {
            id: 3,
            image: "/images/featured-course-3.png",
            duration: "4 Weeks",
            level: "Beginner",
            title: "PTE Academic 65+",
            description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
            textBtn: "Đăng ký ngay",
        },
        {
            id: 4,
            image: "/images/featured-course-4.png",
            duration: "4 Weeks",
            level: "Beginner",
            title: "PTE Academic 65+",
            description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
            textBtn: "Đăng ký ngay",
        },
        {
            id: 5,
            image: "/images/featured-course-1.png",
            duration: "4 Weeks",
            level: "Beginner",
            title: "PTE Academic 65+",
            description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
            textBtn: "Đăng ký ngay",
        },
        {
            id: 6,
            image: "/images/featured-course-2.png",
            duration: "4 Weeks",
            level: "Beginner",
            title: "PTE Academic 65+",
            description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
            textBtn: "Đăng ký ngay",
        },
        {
            id: 7,
            image: "/images/featured-course-3.png",
            duration: "4 Weeks",
            level: "Beginner",
            title: "PTE Academic 65+",
            description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
            textBtn: "Đăng ký ngay",
        },
        {
            id: 8,
            image: "/images/featured-course-4.png",
            duration: "4 Weeks",
            level: "Beginner",
            title: "PTE Academic 65+",
            description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
            textBtn: "Đăng ký ngay",
        },
    ];

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },  // mobile nhỏ
        640: { slidesPerView: 2, spaceBetween: 10 },  // sm
        870: { slidesPerView: 3, spaceBetween: 10 },  // md
        1280: { slidesPerView: 4, spaceBetween: 10 }, // xl
    };

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
                            className="rounded-full border border-gray-300 hover:bg-gray-100 bg-transparent p-3 md:p-4"
                        >
                            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                        </button>
                        <button
                            ref={nextRef}
                            className="rounded-full border border-gray-300 hover:bg-gray-100 bg-transparent p-3 md:p-4"
                        >
                            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                        </button>
                    </div>
                </div>
                {/* card cources */}
                <div className='w-full h-full py-8'>
                    <CustomSwiper
                        breakpoint={
                            breakpoints
                        }
                        autoplay
                        loop
                        navigation={{ prevEl: prevRef, nextEl: nextRef }}
                    >
                        {FeturedCourses.map((item, index) => {
                            return (
                                <div key={index} className='w-full h-full' >
                                    <CoursesCard

                                        data={item}

                                    />
                                </div>
                            )
                        })}
                    </CustomSwiper>

                </div>
            </div>
        </section>
    )
}

export default FeaturedCoursesPTE