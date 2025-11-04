"use client"

import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import ListGridControl from "@/components/shared/Control/list-grid-control"
import CoursesCardColum from "@/components/courses/card/course-card-colum"
import CourseCardRow from "@/components/courses/card/course-card-row"
import Link from "next/link"
import { Course } from "@/types/courses"



type ViewMode = "grid" | "list";
interface CourseListProps {
  title?: string;
  subTitle?: string;
  data?: Course[];
  viewMode?: ViewMode
}
const CourseGrid = ({
  title = "Khóa học nổi bật",
  subTitle = "Luyện chuyên sâu cho học viên muốn đạt điểm cao tuyệt đối",
  data,
  viewMode

}: CourseListProps) => {

  const [currentCourse, setCurrentCourse] = useState(data || []);
  const [loadMore, setloadMore] = useState<boolean>(false);
  // const [viewMode, setViewMode] = useState<ViewMode>("grid")
  // const [searchQuery, setSearchQuery] = useState("")
  // const [sortBy, setSortBy] = useState("newest")
  const ITEMS_PER_LOAD = 4; // Số lượng phần tử load mỗi lần
  // const [currentItem, setCurrentItem] = useState(ITEMS_PER_LOAD);

  const handleLoadMore = () => {
    setloadMore(!loadMore);
    /// sử lý api
  }



  if (!data || data.length === 0) return null;
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">

        {/* Course Section */}
        <div className="space-y-12">
          {/* Featured Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary">{title}</h3>
                <p className="text-muted-foreground mt-1">{subTitle}</p>
              </div>
            </div>

            <div
              className={
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"
              }
            >
              {currentCourse.map((item, index) => (
                <>
                  {viewMode === "grid" ? (

                    <CoursesCardColum
                      key={index}
                      slug={item.slug!}
                      title={item.title || ""}
                      image={item.img || ""}
                      description={item.description || ""}

                    />

                  ) : (
                    <CourseCardRow
                      key={index}
                      slug={item.slug!}
                      image={item.img || ""}
                      duration={item.duration || ""}
                      level={item.level || ""}
                      title={item.title || ""}
                      description={item.description || ""}
                    />
                  )}
                </>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                className="text-primary font-semibold inline-flex items-center group"
                onClick={handleLoadMore}
              // disabled={loadMore}
              >
                {loadMore ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang tải...
                  </>
                ) :
                  <>
                    Xem thêm
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                }
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CourseGrid
