import { ArrowUpRight } from 'lucide-react';
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

const CoursesCard = ({ data }: FeaturedCoursesCardProps) => {
    const { image, duration, level, title, description, textBtn } = data;


    return (
        <div className='h-[460px] flex flex-col justify-center gap-2 p-4 overflow-hidden  rounded-3xl shadow-lg '>
            <div className='h-[180px] overflow-hidden rounded-3xl'>
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-3xl" />
            </div>
            <div className='flex text-sm text-gray-500  mt-4 mb-2'>
                <span className='border border-gray-300 px-2 py-1 rounded-[4px] mr-2'>
                    {duration}
                </span>
                <span className='border border-gray-300 px-2 py-1 rounded-[4px] ml-2'>
                    {level}
                </span>
            </div>

            <div>
                <h3 className='text-2xl font-semibold'>{title}</h3>
            </div>
            <div>
                <p className='text-gray-700 my-2 leading-relaxed'>
                    {description}
                </p>
            </div>

            <div className='flex justify-center items-center mt-auto'>
                <button
                    className='w-full group bg-gradient-to-r from-[#4916BC] to-[#04016D] 
                    text-white font-medium 
                    px-4 py-2 rounded-full 
                    hover:opacity-90 transition-opacity duration-300 
                    flex justify-center items-center'
                >
                    {textBtn || "Tìm hiểu thêm"}
                    <ArrowUpRight size={17} className='inline-block ml-4 h-4 w-4 transform transition-transform duration-300 group-hover:-translate-y-1' />
                </button>
            </div>

        </div>
    )
}

export default CoursesCard