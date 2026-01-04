"use client"
import React, { useMemo } from 'react'
import TrainingProgramCard from './card/training-program-card'
import CustomSwiper from '../ui/custom-swiper'
import { CategoryItem } from '@/types/category';



interface TrainingProgramsSectionProps {
  data?: CategoryItem | null;
}

const BG_COLORS = [
  "bg-gradient-to-br from-amber-400 to-orange-500",
  "bg-gradient-to-br from-blue-500 to-blue-600",
  "bg-gradient-to-br from-green-500 to-green-600",
  "bg-gradient-to-br from-yellow-400 to-amber-500",
] as const;


const TrainingProgramsSection = ({
  data = null,
}: TrainingProgramsSectionProps) => {

  const cateCourseWithBg = useMemo(() => {
    const children = data?.children ?? [];
    return children.map((item, index) => ({
      ...item,
      bgColor: BG_COLORS[index % BG_COLORS.length],
      textBtn: "Khám phá khóa học",
    }));
  }, [data?.children]);

  const shouldUseSwiper = cateCourseWithBg.length >= 4;
  const shouldLoop = cateCourseWithBg.length >= 6;

  const breakpoints = {
    0: { slidesPerView: 1, spaceBetween: 10 },  // mobile nhỏ
    640: { slidesPerView: 2, spaceBetween: 10 },  // sm
    870: { slidesPerView: 3, spaceBetween: 10 },  // md
    1280: { slidesPerView: 4, spaceBetween: 10 }, // xl
  };

  // console.log("check data cate course:", cateCourseWithBg);

  if (!data) return null;

  return (
    <section className="w-full section sm:section--sm lg:section--lg bg-white">
      <div className="container mx-auto px-4 ">
        {/* Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          <div className="lg:col-span-7 min-w-0">
            <h1 className="text-[40px] sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance">
              <span className="text-hero-gradient">Tinh thông tiếng Anh với bộ</span>
              <br />
              <span className="text-amber-500">chương trình đào tạo</span>
              <br />
              <span className="text-hero-gradient">chất lượng cao</span>
            </h1>
          </div>

          <div className="lg:col-span-5 min-w-0 lg:pt-3">
            <p className="text-lg sm:text-xl lg:text-2xl text-hero-gradient leading-relaxed max-w-xl">
              Học ngoại ngữ thật dễ dàng với lộ trình
              <br />
              Học &amp; Luyện Thi toàn diện, được cá nhân
              <br />
              hóa riêng biệt.
            </p>
          </div>
        </div>

        {/* Course cards */}
        {shouldUseSwiper ? (
          <div className="w-full h-full py-6">
            <CustomSwiper
              breakpoint={
                breakpoints
              }
              autoplay={shouldLoop}
              loop={shouldLoop}
            >
              {cateCourseWithBg?.map((item, index) => (
                <a href={item?.url ?? "#"} key={index} className="block">
                  <TrainingProgramCard
                    name={item.name}
                    description={item?.description}
                    bgColor={item.bgColor}
                    textBtn={item.textBtn}
                  />
                </a>
              ))}
            </CustomSwiper>

          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cateCourseWithBg.map((item) => (
              <div
                key={item.categoryId}
                className="h-full"
              >
                {item.url ? (
                  <a href={item.url} className="block h-full">
                    <TrainingProgramCard
                      name={item.name}
                      description={item.description}
                      bgColor={item.bgColor}
                      textBtn={item.textBtn}
                    />
                  </a>
                ) : (
                  <div className="block h-full">
                    <TrainingProgramCard
                      name={item.name}
                      description={item.description}
                      bgColor={item.bgColor}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

        )}
      </div>
    </section>

  )
}

export default TrainingProgramsSection