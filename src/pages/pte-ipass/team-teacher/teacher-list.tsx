"use client"
import Button from "@/components/button/Button"
import TeacherProfilesList from "@/components/pte-ipass/teacher/teacher-profiles-list";

import { TeacherProfile } from "@/types/teacher";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"


interface TeacherListProps {
  data?: TeacherProfile[];
}
const ITEMS_PER_PAGE = 9
const TeacherList = ({ data }: TeacherListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  
  if (!data || data.length === 0) return null
  const totalPages = Math.ceil(data!.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProfiles = data!.slice(startIndex, endIndex)


  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Khám phá profile thầy cô iPTE tại đây!
        </h2>

        <TeacherProfilesList data={currentProfiles} />

        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="rounded-full  p-4 transition-colors group"
          >
            <ChevronLeft className="h-5 w-5 group-hover:bg-gray-900" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`bg-hero-gradient rounded-full w-10 h-10 ${currentPage === page ? "bg-[#001F3F] text-white hover:bg-[#001F3F]/90" : "hover:bg-gray-100"
                }`}
            >
              {page}
            </Button>
          ))}

          <Button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className=" rounded-full  transition-colors hover:bg-gray-400 p-4"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default TeacherList