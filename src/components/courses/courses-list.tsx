import React from 'react'
import ProblemsAndSolutionList from './list/problem-solution-list'
import { CourseStageSection } from './course-stage-section'
import { FaqAccordion } from './faq-accordion'
import { CategoryItem, CourseCategory } from '@/types/category'
import { Course } from '@/types/courses'
import { PteCategorySection } from './category/pte-category-section'
import CourseListSection from './list/course-list-section'

interface CoursesListPageProps {
  category?: CategoryItem;
  categoryItems?: CourseCategory[];
  coursesItems?: Course[];
}
const CoursesList = ({
  category,
  categoryItems,
  coursesItems

}: CoursesListPageProps) => {

  // console.log("check categoryItems in course list:", categoryItems);
  return (
    <section>
      {coursesItems && (
        <CourseListSection

          viewMode="grid"
          data={coursesItems}
        />
      )}
      <ProblemsAndSolutionList backgroundImage="/images/bg-pte-pob-solution.jpg" />
      <CourseStageSection />
      {categoryItems && categoryItems.map((item, index) => {
        return (
  
            <PteCategorySection
             key={index}
             pteCategory={item}
          />
     
        )
      })}
      <FaqAccordion />
    </section>
  )
}

export default CoursesList