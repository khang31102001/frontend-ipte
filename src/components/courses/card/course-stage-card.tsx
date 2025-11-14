import { CheckCircle2, Calendar, Users, Target } from "lucide-react"

interface Button {
  text: string
  variant: "outline" | "solid"
}

interface Course {
  id: number
  title: string
  description: string
  goals: string[]
  info: string[]
  buttons: Button[]
}

interface CourseStageCardProps {
  course: Course
}

export function CourseStageCard({ course }: CourseStageCardProps) {
  return (
    <div className="bg-white rounded-3xl border-4 border-yellow-400 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Card Content */}
      <div className="p-6 lg:p-8 flex flex-col h-full">
        {/* Title */}
        <h3 className="text-2xl lg:text-3xl font-bold text-indigo-900 mb-4">{course.title}</h3>

        {/* Description */}
        <p className="text-gray-700 text-sm lg:text-base mb-6 leading-relaxed">{course.description}</p>

        {/* Goals Section */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Mục tiêu:</h4>
          <ul className="space-y-2">
            {course.goals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm lg:text-base">{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Learning Info Section */}
        <div className="mb-6 space-y-2">
          <h4 className="font-bold text-gray-900 mb-3">Thông tin học tập</h4>
          {course.info.map((item, idx) => {
            const icons = [Calendar, Users, Target]
            const Icon = icons[idx]
            return (
              <div key={idx} className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-indigo-900 flex-shrink-0" />
                <span className="text-gray-700 text-sm lg:text-base">{item}</span>
              </div>
            )
          })}
        </div>

        {/* Buttons Section */}
        <div className="mt-auto">
          <h4 className="font-bold text-gray-900 mb-3">Khóa học</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {course.buttons.slice(0, 2).map((btn, idx) => (
              <button
                key={idx}
                className={`py-3 px-4 rounded-full font-semibold text-sm lg:text-base transition-colors ${
                  btn.variant === "outline"
                    ? "bg-white border-2 border-indigo-900 text-indigo-900 hover:bg-indigo-50"
                    : "bg-indigo-900 text-white hover:bg-indigo-800"
                }`}
              >
                {btn.text}
              </button>
            ))}
          </div>
          <button className="w-full py-3 px-4 rounded-full font-semibold text-sm lg:text-base bg-indigo-900 text-white hover:bg-indigo-800 transition-colors">
            {course.buttons[2]?.text}
          </button>
        </div>
      </div>
    </div>
  )
}
