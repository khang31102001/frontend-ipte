"use client"
import React, { useRef, useState } from 'react'
import CustomSwiper from '../ui/custom-swiper'
import CoursesCard from '../home/card/courses-card'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface Course {
    id: number
    title: string
    description: string
    duration: string
    level: string
    image: string
}

const courses: Course[] = [
    {
        id: 1,
        title: "PTE Academic",
        description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
        duration: "4 Weeks",
        level: "Popular",
        image: "/images/course-1.jpg",
    },
    {
        id: 2,
        title: "PTE Academic",
        description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
        duration: "4 Weeks",
        level: "Popular",
        image: "/images/course-2.jpg",
    },
    {
        id: 3,
        title: "PTE Academic",
        description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
        duration: "4 Weeks",
        level: "Popular",
        image: "/images/course-3.jpg",
    },
    {
        id: 4,
        title: "PTE Academic",
        description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
        duration: "4 Weeks",
        level: "Popular",
        image: "/images/course-4.jpg",
    },
     {
        id: 1,
        title: "PTE Academic",
        description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
        duration: "4 Weeks",
        level: "Popular",
        image: "/images/course-1.jpg",
    },
    {
        id: 2,
        title: "PTE Academic",
        description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
        duration: "4 Weeks",
        level: "Popular",
        image: "/images/course-2.jpg",
    },
    {
        id: 3,
        title: "PTE Academic",
        description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
        duration: "4 Weeks",
        level: "Popular",
        image: "/images/course-3.jpg",
    },
    {
        id: 4,
        title: "PTE Academic",
        description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
        duration: "4 Weeks",
        level: "Popular",
        image: "/images/course-4.jpg",
    },
]
const Course = () => {
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
       <div className="py-16">
         <div className="container mx-auto px-4">
            <div className='w-full flex items-center justify-between'>
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary">Khóa học nổi bật</h3>
                    <p className="text-muted-foreground mt-1">Luyện chuyên sâu cho học viên muốn đạt điểm cao tuyệt đối.</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button
                    
                        ref={prevRef}              
                        className="inline-flex items-center justify-center rounded-full bg-transparent p-2"
                    >
                    </button>
                    <ChevronLeft className="w-4 h-4" />
                    <button
                        ref={nextRef}
                        className="inline-flex items-center justify-center rounded-full bg-transparent p-2 "
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
                    autoplay
                    loop
                    navigation={{ prevEl: prevRef, nextEl: nextRef }}
                >
                    {courses.map((item, index) => (
                        <CoursesCard key={index} data={item} />
                    ))}
                </CustomSwiper>
            </div>
             <div className="flex justify-center mt-8">
              <button
                className="text-primary font-semibold inline-flex items-center group"
               
              >
                Xem thêm
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
        </div>
       </div>
    )
}

export default Course       