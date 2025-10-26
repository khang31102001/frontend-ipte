import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image'
import React from 'react'
interface FeaturedCourses {
    id: number,
    image: string,
    duration?: string,
    level?: string,
    title: string,
    description: string,
    textBtn?: string,

}
interface FeaturedCoursesCardProps {
    data: FeaturedCourses
}

const CoursesCardColum = ({ data }: FeaturedCoursesCardProps) => {
    const { image, duration, level, title, description, textBtn } = data;


    return (
        <div className='flex flex-col flex-shrink-0 justify-between gap-3 p-4 
                rounded-3xl shadow-lg bg-white 
                overflow-hidden 
                h-auto '>
            {/* Image */}
            <div className='w-full h-36 sm:h-40 md:h-44 lg:h-48 xl:h-56 2xl:h-60 overflow-hidden rounded-2xl'>
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>

            {/* Tags */}
            <div className='flex flex-wrap text-xs sm:text-sm md:text-base text-gray-500 mt-3 mb-2 gap-2'>
                <span className='border border-gray-300 px-2 py-1 rounded-md'>
                    {duration}
                </span>
                <span className='border border-gray-300 px-2 py-1 rounded-md'>
                    {level}
                </span>
            </div>

            {/* Title */}
            <h3 className='text-lg md:text-xl font-semibold line-clamp-2'>
                {title}
            </h3>

            {/* Description */}
            <p className=' text-sm text-muted-foreground sm:text-base  my-2 leading-relaxed line-clamp-3'>
                {description}
            </p>

            {/* Button */}
            <div className='mt-auto'>
                <button
                    className='w-full group bg-gradient-to-r from-brandBlue-900 to-brandBlue-500
                 text-white font-medium 
                 px-4 py-3 rounded-full 
                 hover:opacity-90 transition duration-300 
                 flex justify-center items-center 
                 text-sm sm:text-base md:text-lg'
                >
                    {textBtn || "Tìm hiểu thêm"}
                    <ArrowRight
                        size={16}
                        className='ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-2'
                    />
                </button>
            </div>
        </div>

    )
}

export default CoursesCardColum