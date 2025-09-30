import React from 'react'
import TrainingProgramCard from './card/training-program-card'

const TrainingProgramPTE = () => {
  const courses = [
    {
      title: "Bổ trợ tiếng anh nâng cao",
      description: "Bắt kịp lộ trình luyện thi PTE 36-79 dù nền tảng yếu đầu tay không sử dụng tiếng Anh.",
      bgColor: "bg-gradient-to-br from-amber-400 to-orange-500",
      textColor: "text-white",
      textBtn: "Khám phá khóa học"
    },
    {
      title: "PTE du học",
      description: "Du học Úc, Anh, Canada tiết kiệm và rút ngắn thời gian học tiếng anh đầu vào.",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-white",
      textBtn: "Khám phá khóa học"
    },
    {
      title: "PTE định cư",
      description: "Giáo viên theo sát đảm bảo nâng cao các kĩ năng.",
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
      textColor: "text-white",
      textBtn: "Khám phá khóa học"
    },
    {
      title: "PTE 1 kèm 1",
      description: "Chiến thắng mọi target, luyện thi theo thời gian và yêu cầu của bạn",
      bgColor: "bg-gradient-to-br from-yellow-400 to-amber-500",
      textColor: "text-white",
      textBtn: "Khám phá khóa học"
    },
  ]
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto ">
        {/* Title & Subtitle */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-6">
          <div className="flex-1">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-indigo-700">Tinh thông tiếng Anh với bộ</span>
              <br />
              <span className="text-amber-500">chương trình đào tạo</span>
              <br />
              <span className="text-indigo-700">chất lượng cao</span>
            </h1>
          </div>

          <div className="flex-1">
            <p className="text-lg md:text-2xl text-indigo-700 leading-relaxed">
              Học ngoại ngữ thật dễ dàng với lộ trình
              <br />
              Học &amp; Luyện Thi toàn diện, được cá nhân
              <br />
              hóa riêng biệt.
            </p>
          </div>
        </div>

        {/* Course cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 px-6">
          {courses.map((item, index) => (
            <TrainingProgramCard key={index} data={item} />
          ))}
        </div>
      </div>
    </section>

  )
}

export default TrainingProgramPTE