import React from 'react'
import TrainingProgramCard from './card/training-program-card'
import CustomSwiper from '../ui/CustomSwiper'

const TrainingProgramPTE = () => {
  const courses = [
    {
      id: 1,
      title: "Bổ trợ tiếng anh nâng cao",
      description: "Bắt kịp lộ trình luyện thi PTE 36-79 dù nền tảng yếu đầu tay không sử dụng tiếng Anh.",
      bgColor: "bg-gradient-to-br from-amber-400 to-orange-500",
      textColor: "text-white",
      textBtn: "Khám phá khóa học"
    },
    {
      id: 2,
      title: "PTE du học",
      description: "Du học Úc, Anh, Canada tiết kiệm và rút ngắn thời gian học tiếng anh đầu vào.",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-white",
      textBtn: "Khám phá khóa học"
    },
    {
      id: 3,
      title: "PTE định cư",
      description: "Giáo viên theo sát đảm bảo nâng cao các kĩ năng.",
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
      textColor: "text-white",
      textBtn: "Khám phá khóa học"
    },
    {
      id: 4,
      title: "PTE 1 kèm 1",
      description: "Chiến thắng mọi target, luyện thi theo thời gian và yêu cầu của bạn",
      bgColor: "bg-gradient-to-br from-yellow-400 to-amber-500",
      textColor: "text-white",
      textBtn: "Khám phá khóa học"
    },
    {
      id: 5,
      title: "Bổ trợ tiếng anh nâng cao",
      description: "Bắt kịp lộ trình luyện thi PTE 36-79 dù nền tảng yếu đầu tay không sử dụng tiếng Anh.",
      bgColor: "bg-gradient-to-br from-amber-400 to-orange-500",
      textColor: "text-white",
      textBtn: "Khám phá khóa học"
    },
    {
      id: 6,
      title: "PTE du học",
      description: "Du học Úc, Anh, Canada tiết kiệm và rút ngắn thời gian học tiếng anh đầu vào.",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-white",
      textBtn: "Khám phá khóa học"
    },
    {
      id: 7,
      title: "PTE định cư",
      description: "Giáo viên theo sát đảm bảo nâng cao các kĩ năng.",
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
      textColor: "text-white",
      textBtn: "Khám phá khóa học"
    },
    {
      id: 8,
      title: "PTE 1 kèm 1",
      description: "Chiến thắng mọi target, luyện thi theo thời gian và yêu cầu của bạn",
      bgColor: "bg-gradient-to-br from-yellow-400 to-amber-500",
      textColor: "text-white",
      textBtn: "Khám phá khóa học"
    },
  ];

  const breakpoints = {
    0: { slidesPerView: 1, spaceBetween: 10 },  // mobile nhỏ
    640: { slidesPerView: 2, spaceBetween: 10 },  // sm
    870: { slidesPerView: 3, spaceBetween: 10 },  // md
    1280: { slidesPerView: 4, spaceBetween: 10 }, // xl
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 ">
        {/* Title & Subtitle */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
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
        <div className="w-full h-full py-6">
          <CustomSwiper
            breakpoint={
              breakpoints
            }
            autoplay
            loop
          >
            {courses.map((item, index) => (
              <TrainingProgramCard key={index} data={item} />
            ))}
          </CustomSwiper>

        </div>
      </div>
    </section>

  )
}

export default TrainingProgramPTE