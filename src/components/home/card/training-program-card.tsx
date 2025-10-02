import { ArrowUpRight } from 'lucide-react'
import { title } from 'process'
import React from 'react'

interface CateProgram {
    title: string
    description: string
    bgColor?: string
    textColor?: string
    textBtn?: string
}
interface TrainingProgramCardProps {
    data: CateProgram
}

const TrainingProgramCard = ({ data }: TrainingProgramCardProps) => {
    const { title, description, bgColor, textColor, textBtn } = data
    return (
        <div className="relative  h-[380px] flex flex-col justify-center p-4 overflow-hidden rounded-3xl shadow-lg">
            {/* background for card */}
            <div className={`absolute inset-0 ${bgColor}`} />

            {/* content primary */}
            <div className="relative z-10 p-6 flex flex-col justify-between h-full gap-8" >
                <div className='h-20'>
                    <h1 className="text-white text-2xl font-bold">{title}</h1>
                </div>

                <div>
                    <p className="text-white font-medium leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className='flex items-center justify-center backdrop-blur-sm font-medium border-2 border-white/80 rounded-full overflow-hidden'>
                    <button className="inline-flex items-center gap-2 text-white  px-3 py-2 ">
                        {textBtn || "Tìm hiểu thêm"}
                        <ArrowUpRight size={17} />
                    </button>
                </div>
            </div>
        </div>

    )
}

export default TrainingProgramCard