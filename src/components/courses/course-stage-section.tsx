
import { CourseStageCard } from "./card/course-stage-card"
import { CategoryTag } from "./tag/category-tag"


const categories = [
  { icon: "☀️", label: "Xây nên" },
  { icon: "🔥", label: "Tăng tốc" },
  { icon: "🎯", label: "Về dịch" },
]

const courses = [
  {
    id: 1,
    title: "Xây dựng nền tảng",
    description: "Xây nền tiếng Anh từ đầu, làm quen IELTS và tư duy Linearthinking học đúng từ gốc.",
    goals: [
      "Làm quen format bài thi PTE",
      "Học ngữ pháp, từ vựng nền tảng",
      "Luyện nghe – nói theo tính huống",
      "Bộ dịch từng từ nhỏ Linearthinking",
      "Tạo nền tư duy tiếng Anh mạch lạc",
    ],
    info: ["9 tuần - 27 buổi học", "Phù hợp người mất gốc Tiếng Anh", "Đấu ra đạt mức 4.0+ IELTS"],
    buttons: [
      { text: "Khóa học...", variant: "outline" },
      { text: "Khóa học...", variant: "outline" },
      { text: "Khóa học...", variant: "solid" },
    ],
  },
  {
    id: 2,
    title: "Xây dựng nền tảng",
    description: "Xây nền tiếng Anh từ đầu, làm quen IELTS và tư duy Linearthinking học đúng từ gốc.",
    goals: [
      "Làm quen format bài thi PTE",
      "Học ngữ pháp, từ vựng nền tảng",
      "Luyện nghe – nói theo tính huống",
      "Bộ dịch từng từ nhỏ Linearthinking",
      "Tạo nền tư duy tiếng Anh mạch lạc",
    ],
    info: ["9 tuần - 27 buổi học", "Phù hợp người mất gốc Tiếng Anh", "Đấu ra đạt mức 4.0+ IELTS"],
    buttons: [
      { text: "Xem thêm", variant: "outline" },
      { text: "Xem thêm", variant: "outline" },
      { text: "Xem thêm", variant: "solid" },
    ],
  },
  {
    id: 3,
    title: "Xây dựng nền tảng",
    description: "Xây nền tiếng Anh từ đầu, làm quen IELTS và tư duy Linearthinking học đúng từ gốc.",
    goals: [
      "Làm quen format bài thi PTE",
      "Học ngữ pháp, từ vựng nền tảng",
      "Luyện nghe – nói theo tính huống",
      "Bộ dịch từng từ nhỏ Linearthinking",
      "Tạo nền tư duy tiếng Anh mạch lạc",
    ],
    info: ["9 tuần - 27 buổi học", "Phù hợp người mất gốc Tiếng Anh", "Đấu ra đạt mức 4.0+ IELTS"],
    buttons: [
      { text: "Xem thêm", variant: "outline" },
      { text: "Xem thêm", variant: "outline" },
      { text: "Xem thêm", variant: "solid" },
    ],
  },
]

export function CourseSection() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Category Tags */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {categories.map((category) => (
          <CategoryTag key={category.label} icon={category.icon} label={category.label} />
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseStageCard key={course.id} course={course as any} />
        ))}
      </div>
    </div>
  )
}
