"use client";

import Breadcrumb from "@/components/shared/Breadcrumb/breadcrumb";
import { FaqAccordion } from "@/components/courses/faq-accordion";
import CourseContent from "@/components/courses/course-content";
import React from "react";
import { BreadcrumbItem } from "@/types/breadcrumbs";

// props định nghĩa

interface CourseCategoryData {
  title: string | null;
  description: string | null;
  breadcrumbs: BreadcrumbItem[];
}
interface CoursesCategoryPageProps {
  data: CourseCategoryData,
  children?: React.ReactNode;
}

export default function CoursesCategoryPage({ data, children }: CoursesCategoryPageProps) {
  const { title, description, breadcrumbs } = data;

  return (
    <div className="bg-background text-foreground">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbs} className="container mx-auto px-4 mt-4" />

      {/* Tiêu đề + mô tả */}
      <div className="container mx-auto px-4 py-6">
        {title && <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>}
        {description && (
          <CourseContent data={description} />
        )}
      </div>

      {/* Children – danh sách section */}
      <div className="space-y-10 container mx-auto px-4">
        {children}
      </div>

      {/* FAQ */}
      <div className="container mx-auto px-4 py-8">
        <FaqAccordion />
      </div>
    </div>
  );
}
