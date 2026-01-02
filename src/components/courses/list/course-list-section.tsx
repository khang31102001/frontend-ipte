"use client"
import { useMemo, useState } from "react"
import { Course } from "@/types/courses"
import CourseCard from "@/components/courses/card/course-card"
import { CategoryItem } from "@/types/category";
import { ROUTERS } from "@/config/routes/routers";




type ViewMode = "grid" | "list";
interface CourseListProps {
  category?: CategoryItem;
  data?: Course[];
  viewMode?: ViewMode
}
const ITEMS_PER_LOAD  = 4;
const CourseListSection = ({
  category,
  data = [],
  viewMode

}: CourseListProps) => {

  const currentCourse = useMemo(() => {
    return data.slice(0, ITEMS_PER_LOAD);
  }, [data]);



  
  if (!data || data.length === 0) return null;
  return (
    <section className="section sm:section--sm lg:section--lg ">
      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"
        }
      >
        {currentCourse?.map((item, index) => {
          const herf = ROUTERS.COURSES.detail(item.slug, category?.url);
          return viewMode === "grid" ? (
            <CourseCard
              key={`idx-${index}`}
              href={herf}
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
              href={herf}
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

export default CourseListSection
