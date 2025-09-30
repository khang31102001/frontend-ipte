
"use client"
import React from 'react'
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import DocumentCard from './card/document-card'


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
  const [activeTab, setActiveTab] = useState("writing");
  const tabs = [
    { id: "writing", label: "Writing" },
    { id: "listening", label: "Listening" },
    { id: "speaking", label: "Speaking" },
    { id: "vocabulary", label: "Vocabulary" },
  ];
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-purple-700 mb-4 text-balance">Tài liệu tham khảo</h2>
        <p className="text-gray-600 text-lg">Tổng hợp tất cả tài liệu có trong chương trình học</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-center mb-12">
        <button className="ml-4 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-4">
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-8 py-3 rounded-full font-medium transition-all ${activeTab === tab.id
                  ? "bg-purple-700 text-white hover:bg-purple-800"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button className="ml-4 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-4">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

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

    </section>
  )
}

export default DocumentPTE