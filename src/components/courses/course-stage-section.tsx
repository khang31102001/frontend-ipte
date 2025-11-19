
import { title } from "process"
import { CourseStageCard } from "./card/course-stage-card"
import { CategoryTag } from "./tag/category-tag"
import Link from "next/link"


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
    content: ` <h3>🎯 Mục tiêu khóa học</h3>
  <ul>
    <li>Làm quen format bài thi PTE</li>
    <li>Học ngữ pháp, từ vựng nền tảng</li>
    <li>Luyện nghe – nói theo tính huống</li>
    <li>Bộ dịch từng từ nhỏ Linearthinking</li>
    <li>Tạo nền tư duy tiếng Anh mạch lạc</li>
  </ul>

  <h3>📌 Thông tin khóa học</h3>
  <ul>
    <li>9 tuần - 27 buổi học</li>
    <li>Phù hợp người mất gốc Tiếng Anh</li>
    <li>Đầu ra đạt mức 4.0+ IELTS</li>
  </ul>`,
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
    content: `
    <h3>Mục tiêu khóa học</h3>
    <ul>
      <li>Làm quen format bài thi PTE</li>
      <li>Học ngữ pháp, từ vựng nền tảng</li>
      <li>Luyện nghe – nói theo tính huống</li>
      <li>Bộ dịch từng từ nhỏ Linearthinking</li>
      <li>Tạo nền tư duy tiếng Anh mạch lạc</li>
    </ul>

    <h3>Thông tin khóa học</h3>
    <ul>
      <li>9 tuần - 27 buổi học</li>
      <li>Phù hợp người mất gốc Tiếng Anh</li>
      <li>Đầu ra đạt mức 4.0+ IELTS</li>
    </ul>
  `,
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
    content: `
    <div class="course-level">
      <h4 class="course-level__title">🎯 Mục tiêu khóa học</h4>
      <ul class="course-level__list course-level__list--goals">
        <li>Làm quen format bài thi PTE</li>
        <li>Học ngữ pháp, từ vựng nền tảng</li>
        <li>Luyện nghe – nói theo tình huống</li>
        <li>Bộ dịch từng từ nhỏ Linearthinking</li>
        <li>Tạo nền tư duy tiếng Anh mạch lạc</li>
      </ul>

      <h4 class="course-level__title">📌 Thông tin khóa học</h4>
      <ul class="course-level__list course-level__list--info">
        <li>9 tuần - 27 buổi học</li>
        <li>Phù hợp người mất gốc Tiếng Anh</li>
        <li>Đầu ra đạt mức 4.0+ IELTS</li>
      </ul>
    </div>
  `,
    buttons: [
      { text: "Xem thêm", variant: "outline" },
      { text: "Xem thêm", variant: "outline" },
      { text: "Xem thêm", variant: "solid" },
    ],
  },
]

export function CourseStageSection() {
  return (
    <div className="course-stage-container course-stage-container--bg">
      {/* Category Tags */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {categories.map((category) => (
          <CategoryTag key={category.label} icon={category.icon} label={category.label} />
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((item, index) => (
          <Link key={index} href={""} className="card-link-wrapper">
            <CourseStageCard key={index}
              id={item.id}
              title={item.title}
              description={item.description as string}
              content={item.content as string}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
