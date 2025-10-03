import HeroSection from '@/components/HeroSection'
import AboutPTE from '@/components/home/about-PTE'
import CommunityPTE from '@/components/home/community-PTE'
import { ConsultationSection } from '@/components/home/consultation-section'
import DocumentPTE from '@/components/home/document-PTE'
import FeaturedCoursesPTE from '@/components/home/featured-courses-PTE'
import NewList from '@/components/home/news-list'
import PressSection from '@/components/home/PressSection'
import StudentReview from '@/components/home/student-review'
import StudyPathPTE from '@/components/home/study-path-PTE'
import TeamTeacherPTE from '@/components/home/team-teacher-PTE'
import TrainingProgramPTE from '@/components/home/training-program-PTE'

import React from 'react'

const MainHomePage = () => {
  return (
    <div className='bg-background text-foreground ' >
        <AboutPTE/>
        <StudyPathPTE/>
        <TrainingProgramPTE/>
        <FeaturedCoursesPTE/>
        <TeamTeacherPTE/>
        <StudentReview/>
        <NewList/>
        <DocumentPTE/>
        <PressSection/>
        <CommunityPTE/>
        <ConsultationSection/>

    </div>
  )
}

export default MainHomePage