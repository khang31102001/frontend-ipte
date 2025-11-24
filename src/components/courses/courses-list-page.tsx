import React from 'react'
import ProblemsAndSolutionList from './list/problem-solution-list'
import { CourseStageSection } from './course-stage-section'
import { FaqAccordion } from './faq-accordion'
import { CategoryItem, CourseCategory } from '@/types/category'
import { Course } from '@/types/courses'
import CourseListItems from './list/course-list-items'
import { PteCategorySection } from './category/pte-category-section'

interface CoursesListPageProps {
  category?: CategoryItem;
  categoryItems?: CourseCategory[];
  coursesItems?: Course[];
}
const CoursesListPage = ({
  category,
  categoryItems,
  coursesItems

}: CoursesListPageProps) => {
  return (
    <section className="">
      {coursesItems && (
        <CourseListItems
          category={category}
          viewMode="grid"
          data={coursesItems}
        />
      )}
      <ProblemsAndSolutionList backgroundImage="/images/bg-pte-pob-solution.jpg" />
      <CourseStageSection />
      {categoryItems && categoryItems.map((item, index) => {
        return (
          <PteCategorySection key={index}
            pteCategory={item}
          />
        )
      })}
      <FaqAccordion />
    </section>
  )
}

export default CoursesListPage