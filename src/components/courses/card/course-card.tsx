import type React from "react"
import { Check, Calendar, Users, Target } from "lucide-react"
import Button from "@/components/button/Button"


export interface CourseCardProps {
  category: {
    icon: React.ReactNode
    label: string
  }
  title: string
  description: string
  objectives: string[]
  learningInfo: {
    duration: string
    audience: string
    requirements: string
  }
  buttons: {
    label: string
    variant?: "default" | "outline"
  }[]
}

export function CourseCard({ category, title, description, objectives, learningInfo, buttons }: CourseCardProps) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border-2 border-yellow-500 bg-white p-8 shadow-lg">
      {/* Category Badge */}
      <div className="flex">
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-yellow-500 bg-transparent px-6 py-2.5">
          {category.icon}
          <span className="font-semibold text-yellow-600">{category.label}</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-indigo-700">{title}</h2>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">{description}</p>

      {/* Objectives */}
      <div>
        <h3 className="mb-3 font-bold text-gray-900">Mục tiêu:</h3>
        <ul className="space-y-2">
          {objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
              <span className="text-gray-700">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learning Info */}
      <div>
        <h3 className="mb-3 font-bold text-gray-900">Thông tin học tập</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
            <span className="text-gray-700">{learningInfo.duration}</span>
          </li>
          <li className="flex items-start gap-2">
            <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
            <span className="text-gray-700">{learningInfo.audience}</span>
          </li>
          <li className="flex items-start gap-2">
            <Target className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
            <span className="text-gray-700">{learningInfo.requirements}</span>
          </li>
        </ul>
      </div>

      {/* Buttons */}
      <div>
        <h3 className="mb-3 font-bold text-gray-900">Khóa học</h3>
        <div className="grid grid-cols-2 gap-3">
          {buttons.slice(0, 2).map((button, index) => (
            <Button
              key={index}
              className="h-12 rounded-full bg-indigo-700 font-semibold text-white hover:bg-indigo-800"
            >
              {button.label}
            </Button>
          ))}
        </div>
        {buttons[2] && (
          <Button className="mt-3 h-12 w-full rounded-full bg-indigo-700 font-semibold text-white hover:bg-indigo-800">
            {buttons[2].label}
          </Button>
        )}
      </div>
    </div>
  )
}
