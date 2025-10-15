import exp from "constants"
import { BookOpen } from "lucide-react"

interface TargetAudienceCardProps {
    data?: any
}

const TargetAudienceCard = ({ data }: TargetAudienceCardProps) => {
    const { title, description } = data || {}
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
                <p className="text-sm leading-relaxed text-gray-600">{description}</p>
            </div>
        </div>
    )
}

export default TargetAudienceCard