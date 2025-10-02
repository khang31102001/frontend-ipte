
"use client"
import React from 'react'
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import DocumentCard from './card/document-card'
import TabScroll from '../ui/tabSroll'


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
]
const DocumentPTE = () => {
  // const [activeTab, setActiveTab] = useState("writing");
  const tabs = [
    { id: "writing", label: "Writing" },
    { id: "listening", label: "Listening" },
    { id: "speaking", label: "Speaking" },
    { id: "vocabulary", label: "Vocabulary" },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="container  mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-700 mb-4 text-balance">Tài liệu tham khảo</h2>
          <p className="text-gray-600 text-lg">Tổng hợp tất cả tài liệu có trong chương trình học</p>
        </div>

       
        {/* Navigation Tabs */}
        <TabScroll tabs={tabs} enableBttn={true}/>.

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {courseData.map((item, index) => (
            <DocumentCard key={index} data={item} />
          ))}
        </div>

        {/* View All Materials Button */}
        <div className="flex items-center justify-center">
          <button className=" inline-flex items-center bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-full font-medium text-lg">
            Xem toàn bộ tài liệu
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>


      </div>
    </section>
  )
}

export default DocumentPTE