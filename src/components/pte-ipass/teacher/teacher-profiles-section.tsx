"use client"

import Button from "@/components/button/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
// import { Button } from "@/components/ui/button"
import { useState } from "react"

const teacherProfiles = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    image: "/professional-teacher-with-laptop-yellow-background.jpg",
    overallScore: 88,
    listening: 90,
    reading: 89,
    speaking: 88,
    writing: 86,
  },
  {
    id: 2,
    name: "Nguyễn Minh Anh",
    image: "/professional-teacher-with-laptop-yellow-background.jpg",
    overallScore: 88,
    listening: 90,
    reading: 89,
    speaking: 88,
    writing: 86,
  },
  {
    id: 3,
    name: "Nguyễn Minh Anh",
    image: "/professional-teacher-with-laptop-yellow-background.jpg",
    overallScore: 88,
    listening: 90,
    reading: 89,
    speaking: 88,
    writing: 86,
  },
  {
    id: 4,
    name: "Nguyễn Minh Anh",
    image: "/professional-teacher-with-laptop-yellow-background.jpg",
    overallScore: 88,
    listening: 90,
    reading: 89,
    speaking: 88,
    writing: 86,
  },
  {
    id: 5,
    name: "Nguyễn Minh Anh",
    image: "/professional-teacher-with-laptop-yellow-background.jpg",
    overallScore: 88,
    listening: 90,
    reading: 89,
    speaking: 88,
    writing: 86,
  },
  {
    id: 6,
    name: "Nguyễn Minh Anh",
    image: "/professional-teacher-with-laptop-yellow-background.jpg",
    overallScore: 88,
    listening: 90,
    reading: 89,
    speaking: 88,
    writing: 86,
  },
  {
    id: 7,
    name: "Nguyễn Minh Anh",
    image: "/professional-teacher-with-laptop-yellow-background.jpg",
    overallScore: 88,
    listening: 90,
    reading: 89,
    speaking: 88,
    writing: 86,
  },
  {
    id: 8,
    name: "Nguyễn Minh Anh",
    image: "/professional-teacher-with-laptop-yellow-background.jpg",
    overallScore: 88,
    listening: 90,
    reading: 89,
    speaking: 88,
    writing: 86,
  },
  {
    id: 9,
    name: "Nguyễn Minh Anh",
    image: "/professional-teacher-with-laptop-yellow-background.jpg",
    overallScore: 88,
    listening: 90,
    reading: 89,
    speaking: 88,
    writing: 86,
  },
]

const ITEMS_PER_PAGE = 9

export function TeacherProfilesSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(teacherProfiles.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProfiles = teacherProfiles.slice(startIndex, endIndex)

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Khám phá profile thầy cô iPTE tại đây!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentProfiles.map((teacher) => (
            <div
              key={teacher.id}
              className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white"
            >
              <div className="bg-[#FDD835] p-8 flex items-end justify-center min-h-[320px]">
                <Image
                  src={teacher.image || "/placeholder.svg"}
                  alt={teacher.name}
                  width={340}
                  height={340}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="bg-[#001F3F] text-white p-6">
                <h3 className="font-bold text-lg mb-3">{teacher.name}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-bold text-[#FDD835]">{teacher.overallScore}</span>
                  <span className="text-base font-medium">IELTS Overall</span>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[#4FC3F7] font-bold text-xl">{teacher.listening}</span>
                    <span className="text-white">Listening</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#4FC3F7] font-bold text-xl">{teacher.reading}</span>
                    <span className="text-white">Reading</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#4FC3F7] font-bold text-xl">{teacher.speaking}</span>
                    <span className="text-white">Speaking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#4FC3F7] font-bold text-xl">{teacher.writing}</span>
                    <span className="text-white">Writing</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
         
         
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-full w-10 h-10 ${
                currentPage === page ? "bg-[#001F3F] text-white hover:bg-[#001F3F]/90" : "hover:bg-gray-100"
              }`}
            >
              {page}
            </Button>
          ))}

          <Button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
