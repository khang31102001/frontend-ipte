"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface CourseCardProps {
    slug: string;
    image: string
    duration: string
    level: string
    title: string
    description: string
    buttonText?: string
    onButtonClick?: () => void
}

const CourseCardRow = ({
    slug,
    image,
    duration,
    level,
    title,
    description,
    buttonText = "Tìm hiểu thêm",
    // onButtonClick,
}: CourseCardProps) => {
    return (
      <Link href={`/khoa-hoc/${slug}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl">
        <div className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Course Image */}
            <div className="flex-shrink-0">
                <img src={image || "/placeholder.svg"} alt={title} className="w-64 h-48 object-cover rounded-xl" />
            </div>

            {/* Course Content */}
            <div className="flex-1 flex flex-col justify-between">
                {/* Metadata */}
                <div className="flex gap-4 mb-4">
                    <span className="text-sm font-medium text-gray-600">{duration}</span>
                    <span className="text-sm font-medium text-gray-600">{level}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed mb-6">{description}</p>

                {/* Button */}
                <div className='mt-auto'>
                    <button
                        className=' group bg-gradient-to-r from-brandBlue-900 to-brandBlue-500
                 text-white font-medium 
                 px-4 py-3 rounded-full 
                 hover:opacity-90 transition duration-300 
                 flex justify-center items-center 
                 text-sm sm:text-base md:text-lg'
                    >
                        {buttonText || "Tìm hiểu thêm"}
                        <ArrowRight
                            size={16}
                            className='ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-2'
                        />
                    </button>
                </div>
            </div>
        </div>
      </Link>
    )
}

export default CourseCardRow
