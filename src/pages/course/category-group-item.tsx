"use client";
import CourseList from "@/components/courses/course-list";
import { CourseService } from "@/services/course/courseService";

import { CourseCategory } from "@/types/category";
import { Course } from "@/types/courses";
import { useEffect, useState } from "react";


interface CategoryGroup {
  title?: string;
  subTitle?: string;
  courses: Course[];
  viewMode: "grid" | "list";
}
export default function CategoryGroupItem({
  courses,
  viewMode,
  title = "Khóa học nổi bật",
  subTitle = "Luyện chuyên sâu cho học viên muốn đạt điểm cao tuyệt đối",
}: CategoryGroup) {

 
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

            <CourseList
              data={courses}
              viewMode={viewMode}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
