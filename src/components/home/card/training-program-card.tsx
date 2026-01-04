import { ArrowUpRight } from 'lucide-react'
import { title } from 'process'
import React from 'react'

interface TrainingProgramCardProps {
    name: string
    description?: string
    bgColor?: string
    textBtn?: string
}

const TrainingProgramCard = ({
    name = "",
    description = "",
    bgColor = "",
    textBtn = "",

}: TrainingProgramCardProps) => {

    return (
        <div className="relative h-[380px] overflow-hidden rounded-3xl shadow-lg">
            {/* Background */}
            <div className={`absolute inset-0 ${bgColor}`} />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Content */}
            <div className="relative z-10 h-full p-6 flex flex-col">

                <h3 className="text-white text-2xl font-bold leading-snug line-clamp-2 min-h-[3.5rem]">
                    {name || "Chưa có tiêu đề"}
                </h3>


                <p className="mt-4 text-white/95 font-medium leading-relaxed line-clamp-8 flex-1">
                    {description || "Nội dung đang được cập nhật."}
                </p>

                <div className="mt-6">
                    <button
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-2
                                 rounded-full border border-white/70 bg-white/10 backdrop-blur-sm
                                text-white px-5 py-2.5 font-medium
                                hover:bg-white/20 transition"
                     >
                        {textBtn || "Tìm hiểu thêm"}
                        <ArrowUpRight size={17} />
                    </button>
                </div>
            </div>
        </div>

    )
}

export default TrainingProgramCard