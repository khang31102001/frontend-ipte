import { ChevronLeft, ChevronRight, Key } from 'lucide-react'
import React from 'react'
import CoursesCard from './card/courses-card'

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
    ]
    return (
        <section className='w-full bg-white py-16'>
            <div className='container mx-auto px-4'>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-6xl font-bold text-purple-700">Khóa học nổi bật</h1>
                    <div className="flex gap-2">
                        <button
                            className="rounded-full border border-gray-300 hover:bg-gray-100 bg-transparent p-4"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            className="rounded-full border border-gray-300 hover:bg-gray-100 bg-transparent p-4"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>
                {/* card cources */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                    {FeturedCourses.map((item, index)=>{
                        return(
                            <CoursesCard key={index} data={item}/>
                        )
                    })}
                </div>
            </div>



        </section>
    )
}

export default FeaturedCoursesPTE