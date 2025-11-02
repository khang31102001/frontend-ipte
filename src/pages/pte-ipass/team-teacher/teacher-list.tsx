"use client"
import Button from "@/components/button/Button"
import TeacherProfilesList from "@/components/pte-ipass/teacher/teacher-profiles-list";
import Pagination from "@/components/shared/Control/pagination";

import { TeacherProfile } from "@/types/teacher";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"


interface TeacherListProps {
  data?: TeacherProfile[];
  title?: string;
}
const ITEMS_PER_PAGE = 9
const TeacherList = ({ 
  title = "Khám phá profile thầy cô iPTE tại đây!",
  data 
}: TeacherListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data!.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProfiles = data!.slice(startIndex, endIndex)

 if (!data || data.length === 0) return null;
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          {title}
        </h2>

        <TeacherProfilesList data={currentProfiles} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  )
}

export default TeacherList