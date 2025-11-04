
import { FaqAccordion } from '@/components/courses/faq-accordion'
import React from 'react'
import ProblemsAndSolutionList from './problem-solution-list'
import CourseContent from '@/components/courses/course-content'
import Breadcrumb from '@/components/shared/Breadcrumb/breadcrumb'
import CourseList from './course-list'
import { CourseCategory } from '@/types/category'


const breadcrumbItems = [
    {
        name: 'Trang chủ',
        href: '/' // Đường dẫn đến trang chủ
    },
    {
        name: 'Khóa học',
        href: '/khoa-hoc' // Đường dẫn của trang hiện tại (mục cuối cùng)
    },
];
interface CoursePageProps {
    dataCourseByCate?: CourseCategory[];
}
const CoursePage = ({ dataCourseByCate }: CoursePageProps) => {
    const parent = dataCourseByCate?.find(c => c.slug === 'khoa-hoc');

    // ví dụ: lấy courses của "pte-co-ban"
    const pteCoBanCourses =
        parent?.children
            ?.find(ch => ch.slug === 'pte-co-ban')
            ?.courses ?? [];


    return (
        <div className='bg-background text-foreground'>
            <Breadcrumb
                items={breadcrumbItems}
                className="container mx-auto px-4"
            />
            <CourseContent data={parent?.description ?? ""} />
            <CourseList
                title="Tất Cả các khóa học"
                data={parent}
            />



            {/* <Course /> */}
            {/* <PteProblemsSection /> */}
            {/* <ProblemsAndSolutionList/> */}
            <FaqAccordion />


        </div>
    )
}

export default CoursePage