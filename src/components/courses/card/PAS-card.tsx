import { X } from "lucide-react"
import Image from "next/image"

interface PAS {
    title: string
    icon?: string
    description?: string
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

interface ProblemAndSolutionCard {
    type?: 'problem' | "solution",
    data: PAS
}


const ProblemAndSolutionCard = ({ data, type }: ProblemAndSolutionCard) => {
    const { title, description, icon, position } = data

    const positionClasses = {
        "top-left": "md:absolute md:top-8 md:left-8 lg:left-16",
        "top-right": "md:absolute md:top-8 md:right-8 lg:right-16",
        "bottom-left": "md:absolute md:bottom-8 md:left-8 lg:left-16",
        "bottom-right": "md:absolute md:bottom-8 md:right-8 lg:right-16",
    }

    const borderClasses = {
        "top-left": "border-2 border-purple-600",
        "top-right": "border-2 border-purple-600",
        "bottom-left": "border-2 border-orange-400",
        "bottom-right": "border-2 border-orange-400",
    }

    return (
        <div
            className={`bg-white rounded-2xl p-6 shadow-lg max-w-sm ${positionClasses[position]} ${borderClasses[position]}`}
        >
            <div className="flex gap-4">
                <div className="flex-shrink-0">
                    <div className="relative w-8 h-8 rounded-full flex items-center justify-center">
                        <Image
                            src={icon || ""}
                            alt=""
                            fill
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2 leading-tight">{title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default ProblemAndSolutionCard