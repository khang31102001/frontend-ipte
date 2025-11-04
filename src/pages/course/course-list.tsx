"use client"

import { useState } from "react"
import ListGridControl from "@/components/shared/Control/list-grid-control"
import CourseGrid from "@/components/courses/course-grid"
import { CourseCategory } from "@/types/category"


type ViewMode = "grid" | "list";
interface CourseListProps {
  title?: string;
  subTitle?: string;
  data?: CourseCategory;
}
const CourseList = ({

  title = "",
  subTitle = "Học viên muốn đạt điểm cao tuyệt đối",
  data

}: CourseListProps) => {
  console.log("data:", data);

  const [viewMode, setViewMode] = useState<ViewMode>("grid")


  const handleViewMode = (type: ViewMode) => {
    setViewMode(type)
  }

  if (!data) return null;
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">

        {title && subTitle && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary">{title}</h3>
              <p className="text-muted-foreground mt-1">{subTitle}</p>
            </div>
          </div>
        )}
        {/* Controls */}
        <ListGridControl onChangeView={handleViewMode} />

        {/* Course Section */}
        <div>
          {data.children?.map((item, i) => {
            return (
              <CourseGrid key={i}
                title={item.name}
                data={item.courses}
                viewMode={viewMode}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CourseList
