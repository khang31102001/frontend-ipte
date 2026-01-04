import React from 'react'
import ProblemsAndSolutionList from './list/problem-solution-list'
import { CourseStageSection } from './course-stage-section'
import { FaqAccordion } from './faq-accordion'
import { CategoryItem, CourseCategory } from '@/types/category'
import { Course } from '@/types/courses'
import { PteCategorySection } from './category/pte-category-section'
import CourseListSection from './list/course-list-section'
import Breadcrumb from '@/shared/breadcrumb'
import { BreadcrumbItem } from '@/types/breadcrumbs'

interface CoursesListPageProps {
  category?: CategoryItem;
  categoryItems?: CourseCategory[];
  coursesItems?: Course[];
  breadcrumbs?: BreadcrumbItem[] | [];
}
const CoursesList = ({
  category,
  categoryItems,
  coursesItems,
  breadcrumbs = []

}: CoursesListPageProps) => {

  // console.log("check categoryItems in course list:", categoryItems);
  return (
    <div className="bg-white">

      <Breadcrumb
        items={breadcrumbs}
        className="container max-auto px-4 py-4 md:py-8"
      />

      <div className="container max-auto px-4 py-8 md:py-12">
        <p className="text-base  text-primary mb-2">{category?.description}</p>
      </div>


      {coursesItems && (
        <CourseListSection

          viewMode="grid"
          data={coursesItems}
        />
      )}
      <ProblemsAndSolutionList backgroundImage="/images/bg-pte-pob-solution.jpg" />
      {/* <CourseStageSection /> */}
      {categoryItems && categoryItems.map((item, index) => {
        return (

          <PteCategorySection
            key={index}
            pteCategory={item}
          />

        )
      })}
      <FaqAccordion />
    </div>
  )
}

export default CoursesList