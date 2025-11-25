"use client"
import { useMemo, useState } from "react"
import { Course } from "@/types/courses"
import CourseCard from "@/components/courses/card/course-card"
import { CategoryItem } from "@/types/category";
import { buildUrl } from "@/utils/helpers";



type ViewMode = "grid" | "list";
interface CourseListProps {
  category?: CategoryItem;
  data?: Course[];
  viewMode?: ViewMode
}
const ITEMS_PER_LOAD = 4;
const CourseListItems = ({
  category,
  data = [],
  viewMode

}: CourseListProps) => {

  const [loadMore, setloadMore] = useState<boolean>(false);// số lượng item đang hiển thị
  console.log("khoa học có category", category)

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
    <section className="section--sm ">
      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"
        }
      >
        {currentCourse?.map((item, index) => {
          const base_url = buildUrl({
            baseUrl: category?.url,
            slug: item?.slug ?? undefined,
          });
          console.log("course base_url", base_url);
          return viewMode === "grid" ? (
            <CourseCard
              key={`idx-${index}`}
              href={base_url}
              image={item.image || "/images/course-3.jpg"}
              duration={item.duration || ""}
              level={item.level || ""}
              title={item.title || ""}
              description={item.description || ""}
              card_layout="col"
            />

          ) : (

            <CourseCard
              key={`idx-${index}`}
              href={base_url}
              image={item.image || "/images/course-3.jpg"}
              duration={item.duration || ""}
              level={item.level || ""}
              title={item.title || ""}
              description={item.description || ""}
              card_layout="row"
            />

          );
        })}

      </div>
    </section>
  )
}

export default CourseListItems
