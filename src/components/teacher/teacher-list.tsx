"use client";
import { useEffect, useMemo, useState } from "react";
import TeacherProfilesList from "./teacher-profiles-list";
import { Teacher } from "@/types/teacher";
import CirclePagination from "@/shared/control/pagination";
// import CirclePagination from "../shared/control/pagination";


interface TeacherListProps {
  teacherData?: Teacher[];
  title?: string;

}
const ITEMS_PER_PAGE = 9;

const TeacherList = ({
  title = "Khám phá profile thầy cô iPTE tại đây!",
  teacherData,
}: TeacherListProps) => {

  const [currentPage, setCurrentPage] = useState<number>(1);


  const totalPages = useMemo(() => {
    return teacherData?.length  ? 
    Math.max(1, Math.ceil(teacherData?.length / ITEMS_PER_PAGE)) :  1;
  }, [teacherData]);

  useEffect(() => {
    // Khi data thay đổi (hoặc rỗng rồi có), đảm bảo currentPage không vượt totalPages
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const currentProfile = useMemo(() => {
    if(!teacherData) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return teacherData?.slice(startIndex, endIndex)
  }, [teacherData, currentPage]);

  if (!teacherData || teacherData?.length === 0) return null;




  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto ">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          {title}
        </h2>

        <section className="teacher-list">
          <div className="teacher-list__gridFade">
            <TeacherProfilesList data={currentProfile} />
          </div>

          {totalPages > 1 && (
            <CirclePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </section>

      </div>
    </section>
  )
}

export default TeacherList