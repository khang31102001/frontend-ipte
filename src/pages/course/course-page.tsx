import Course from '@/components/courses/course'
import { CourseGrid } from '@/components/courses/course-grid'
import { FaqAccordion } from '@/components/courses/faq-accordion'
import React from 'react'

interface CoursePageProps {
    data?: any[]
}
const CoursePage = ({ data }: CoursePageProps) => {
  return (
    <div className=''>
        <CourseGrid />
        <Course />
        <FaqAccordion />
        
        
    </div>
  )
}

export default CoursePage