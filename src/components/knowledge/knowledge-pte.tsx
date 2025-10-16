
"use client"
import React, { useRef } from 'react'
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

import TabScroll from '../ui/tabSroll'
import CustomSwiper from '../ui/custom-swiper'
import KnowledgeCard from './knowledge-card'


const courseData = [
  {
    id: 1,
    image: "/images/featured-course-1.png",
    title: "PTE Speaking & writing",
    description: "Bí quyết đạt điểm cao trong phần thi Speaking & Writing",
  },
  {
    id: 2,
    image: "/images/featured-course-2.png",
    title: "PTE Speaking & writing",
    description: "Bí quyết đạt điểm cao trong phần thi Speaking & Writing",
  },
  {
    id: 3,
    image: "/images/featured-course-3.png",
    title: "PTE Speaking & writing",
    description: "Bí quyết đạt điểm cao trong phần thi Speaking & Writing",
  },
  {
    id: 4,
    image: "/images/featured-course-4.png",
    title: "PTE Speaking & writing",
    description: "Bí quyết đạt điểm cao trong phần thi Speaking & Writing",
  },
  {
    id: 5,
    image: "/images/featured-course-1.png",
    title: "PTE Speaking & writing",
    description: "Bí quyết đạt điểm cao trong phần thi Speaking & Writing",
  },
  {
    id: 6,
    image: "/images/featured-course-2.png",
    title: "PTE Speaking & writing",
    description: "Bí quyết đạt điểm cao trong phần thi Speaking & Writing",
  },
  {
    id: 7,
    image: "/images/featured-course-3.png",
    title: "PTE Speaking & writing",
    description: "Bí quyết đạt điểm cao trong phần thi Speaking & Writing",
  },
  {
    id: 8,
    image: "/images/featured-course-4.png",
    title: "PTE Speaking & writing",
    description: "Bí quyết đạt điểm cao trong phần thi Speaking & Writing",
  },
]
const KnowledgePTE = () => {
  // const [activeTab, setActiveTab] = useState("writing");
  const tabs = [
    { id: "writing", label: "Writing" },
    { id: "listening", label: "Listening" },
    { id: "speaking", label: "Speaking" },
    { id: "vocabulary", label: "Vocabulary" },
  ];

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const breakpoints = {
    0: { slidesPerView: 1, spaceBetween: 10 },  // mobile nhỏ
    640: { slidesPerView: 2, spaceBetween: 10 },  // sm
    870: { slidesPerView: 3, spaceBetween: 10 },  // md
    1280: { slidesPerView: 4, spaceBetween: 10 }, // xl
  };

  return (
    <section className="py-16 bg-white">
      <div className="container  mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-6xl font-bold text-brandBlue-900 mb-4 text-balance">Tài liệu tham khảo</h2>
          <p className="text-gray-600 text-lg">Tổng hợp tất cả tài liệu có trong chương trình học</p>
        </div>


        {/* Navigation Tabs */}
        <TabScroll tabs={tabs} navigation={true} />.

        {/* Course Cards Grid */}
        <div className="w-full h-auto mb-12">
          <CustomSwiper
            breakpoint={
              breakpoints
            }
            autoplay
            loop
          >
            {courseData.map((item, index) => (
              <KnowledgeCard 
              key={index} 
              data={item} 
                className="flex flex-col  justify-center"
              />
            ))}

          </CustomSwiper>
        </div>

        {/* View All Materials Button */}
        <div className="flex items-center justify-center">
          <button className=" inline-flex items-center bg-brandBlue-500 hover:bg-brandBlue-900 text-white px-8 py-4 rounded-full font-medium text-lg group">
            Xem toàn bộ tài liệu
            <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>


      </div>
    </section>
  )
}

export default KnowledgePTE