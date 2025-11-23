"use client"
import { useMemo, useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import ListGridControl from "@/components/shared/control/list-grid-control"
import CoursesCardColum from "@/components/courses/card/course-card-colum"
import CourseCardRow from "@/components/courses/card/course-card-row"
import Link from "next/link"
import { Course } from "@/types/courses"



type ViewMode = "grid" | "list";
interface CourseListProps {
  data?: Course[];
  viewMode?: ViewMode
}
const ITEMS_PER_LOAD = 4;
const CourseList = ({
  data = [],
  viewMode

}: CourseListProps) => {

  const [loadMore, setloadMore] = useState<boolean>(false);// số lượng item đang hiển thị

  // số lượng item đang hiển thị
  const [currentItem, setCurrentItem] = useState(ITEMS_PER_LOAD);
  // slice từ 0 -> visibleCount
  const currentCourse = useMemo(() => {
    return data.slice(0, currentItem);
  }, [data, currentItem]);


  // const [viewMode, setViewMode] = useState<ViewMode>("grid")
  // const [searchQuery, setSearchQuery] = useState("")
  // const [sortBy, setSortBy] = useState("newest")


  const handleLoadMore = () => {
    setloadMore(true);
    setCurrentItem((c) => Math.min(c + ITEMS_PER_LOAD, data.length));
    /// sử lý api
    setloadMore(false)
  }



  if (!data || data.length === 0) return null;
  return (
   <section>
     <div
      className={
        viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"
      }
    >
      {currentCourse?.map((item, index) => {
        return viewMode === "grid" ? (
          <div key={item.course_id ?? item.slug ?? `idx-${index}`}>
            <CoursesCardColum
              slug={item.slug!}
              title={item.title || ""}
              image={item.image || ""}
              description={item.description || ""}
            />
          </div>

        ) : (
          <div key={item.course_id ?? item.slug ?? `idx-${index}`}>
            <CourseCardRow
              slug={item.slug!}
              image={item.image || ""}
              duration={item.duration || ""}
              level={item.level || ""}
              title={item.title || ""}
              description={item.description || ""}
            />
          </div>
        );
      })}

    </div>
   </section>
  )
}

export default CourseList
