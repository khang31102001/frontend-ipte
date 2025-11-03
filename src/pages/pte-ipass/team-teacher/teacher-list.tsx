"use client"
import { useEffect, useMemo, useState } from "react"
import TeacherProfilesList from "@/components/pte-ipass/teacher/teacher-profiles-list";
import Pagination from "@/components/shared/Control/pagination";
import { TeacherProfile } from "@/types/teacher";


interface TeacherListProps {
  data?: TeacherProfile[];
  title?: string;
}
const ITEMS_PER_PAGE = 9
const TeacherList = ({
  title = "Khám phá profile thầy cô iPTE tại đây!",
  data
}: TeacherListProps) => {
  const list = Array.isArray(data) ? data : [];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.max(1, Math.ceil(list.length / ITEMS_PER_PAGE));

  
  useEffect(() => {
    // Khi data thay đổi (hoặc rỗng rồi có), đảm bảo currentPage không vượt totalPages
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const currentProfile = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return list.slice(startIndex, endIndex)
  }, [ list,currentPage]);

  if (!list || list.length === 0) return null;




  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          {title}
        </h2>
        {currentProfile && (
          <TeacherProfilesList data={currentProfile} />
        )}


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