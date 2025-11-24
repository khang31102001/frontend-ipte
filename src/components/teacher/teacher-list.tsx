"use client";
import { useEffect, useMemo, useState } from "react";
import TeacherProfilesList from "./teacher-profiles-list";
import { Teacher } from "@/types/teacher";
import { usePathname } from "next/navigation";
// import CirclePagination from "../shared/control/pagination";






interface TeacherListProps {
  data?: Teacher[];
  title?: string;

}
const ITEMS_PER_PAGE = 9
const TeacherList = ({
  title = "Khám phá profile thầy cô iPTE tại đây!",
  data,
}: TeacherListProps) => {
  const list = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.max(1, Math.ceil(list.length / ITEMS_PER_PAGE));
  const pathname = usePathname();

  useEffect(() => {
    // Khi data thay đổi (hoặc rỗng rồi có), đảm bảo currentPage không vượt totalPages
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const currentProfile = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return list.slice(startIndex, endIndex)
  }, [list, currentPage]);

  if (!list || list.length === 0) return null;




  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          {title}
        </h2>

        <section>
          {currentProfile && (
            <TeacherProfilesList
              base_url={pathname}
              data={currentProfile} 
            />
          )}
        </section>

        {/* <CirclePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        /> */}
      </div>
    </section>
  )
}

export default TeacherList