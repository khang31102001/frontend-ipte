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
const CoursesList = ({
  category,
  categoryItems,
  coursesItems

}: CoursesListPageProps) => {

  // console.log("check categoryItems in course list:", categoryItems);
  return (
    <section>
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