import exp from "constants"
import { BookOpen, ChevronRight } from "lucide-react"
import TargetAudienceCard from "./TargetAudienceCard"
import { About } from "@/types/about"


interface PTEEcosystemCardProps {
    data?: About
}

const PTEEcosystemCard = ({ data }: PTEEcosystemCardProps) => {
    const {  title, description } = data || {}
    return (
        <div className="relative rounded-2xl bg-white p-6">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-amber-400 p-[2px]">
                <div className="h-full w-full rounded-2xl bg-white" />
            </div>

            {/* Card content */}
            <div className="relative z-10">
                <BookOpen className="mb-4 h-10 w-10 text-amber-400" strokeWidth={1.5} />
                <h3 className="mb-3 text-xl font-semibold text-purple-700 leading-relaxed">{title}</h3>
                <div className="text-sm leading-relaxed text-gray-600 line-clamp-6">
                    <div dangerouslySetInnerHTML={{ __html: description || "" }} />
                </div>
                <button
                    className="mt-8 flex items-center text-hero-gradient font-medium hover:underline "
                   
                >

                    Tìm hiểu thêm
                    <ChevronRight className="ml-2 h-4 w-4 text-blue-800" />
                </button>
            </div>
        </div>
    )
}

export default PTEEcosystemCard