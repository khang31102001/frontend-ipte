import Course from '@/components/courses/course'
import { CourseGrid } from '@/components/courses/course-grid'
import { FaqAccordion } from '@/components/courses/faq-accordion'

import React from 'react'
import ProblemsAndSolutionList from './problem-solution-list'
import CourseContent from '@/components/courses/course-content'
import Breadcrumb from '@/components/shared/Breadcrumb/breadcrumb'

const courseIntroHtml = `
  <div>
    <h1 style="font-weight: bold; font-size: 2.5rem; color: #2C3E50; margin-bottom: 20px;">Khám phá những khóa học giúp bạn chinh phục PTE tại iPass</h1>
    
    <p style="font-size: 1.1rem; line-height: 1.6;">
        <strong style="color: #FEC333;">Khóa học PTE</strong> ngày càng được nhiều người tìm kiếm khi PTE trở thành chứng chỉ tiếng Anh quốc tế phổ biến để du học, định cư và phát triển sự nghiệp. Trong vô số lựa chọn trên thị trường, PTE Helper nổi bật nhờ hơn 8 năm kinh nghiệm đào tạo, 30.000+ học viên đạt điểm cao cùng cam kết kết quả thực tế. Bài viết này sẽ giới thiệu đến bạn 4 khóa học PTE uy tín và chất lượng nhất, giúp bạn nhanh chóng lựa chọn được khóa học phù hợp.
    </p>
    
    <img 
        src="/images/news-1.jpg" 
        alt="Tổng quan các khóa học PTE" 
        style="width: 100%; max-width: 600px; height: auto; margin: 20px auto; display: block; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);" 
    />
    
    <h2 style="font-size: 2rem; color: #16A085; margin-top: 30px; border-bottom: 2px solid #16A085; padding-bottom: 10px;">Lộ trình Cá nhân hóa và Phương pháp Linearthinking</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.6;">
        PTE Helper cung cấp nhiều khóa học đa dạng, từ cơ bản đến nâng cao, phù hợp với mọi trình độ. Mỗi khóa học đều được thiết kế với lộ trình rõ ràng, tài liệu độc quyền và sự hỗ trợ tận tâm từ đội ngũ giáo viên giàu kinh nghiệm. Phương pháp <strong>Linearthinking</strong> được áp dụng triệt để, giúp học viên hiểu bản chất câu hỏi, tối ưu hóa thời gian trả lời và đạt điểm cao một cách bền vững.
    </p>

    <img 
        src="/images/news-2.jpg" 
        alt="Học viên thành công" 
        style="width: 100%; max-width: 300px; height: auto; float: right; margin: 0 0 15px 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);" 
    />

    <p style="font-size: 1.1rem; line-height: 1.6; text-align: justify;">
        Khóa học không chỉ tập trung vào kỹ năng làm bài thi mà còn xây dựng nền tảng tiếng Anh vững chắc. Các buổi luyện tập 1-1 với giáo viên, kết hợp với công nghệ AI chấm chữa bài, đảm bảo mọi lỗi sai của bạn đều được khắc phục kịp thời. Đây là yếu tố then chốt giúp 30.000+ học viên của chúng tôi vượt qua điểm kẹt và đạt được mục tiêu du học, định cư tại Úc, Canada hay các quốc gia khác.
    </p>
    
    <div style="clear: both; margin: 30px 0;"></div> 
    
    <h2 style="font-size: 2rem; color: #E74C3C; margin-top: 30px;">Video Giới thiệu Khóa học Đột phá</h2>
    
    <div style="text-align: center; margin: 20px 0;">
        <!-- Thẻ iframe thường được dùng để nhúng video từ YouTube -->
        <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Video Giới thiệu Phương pháp PTE Helper" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
            style="max-width: 100%; border-radius: 12px; box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);"
        ></iframe>
    </div>
    
    <p style="font-size: 1.1rem; line-height: 1.6; text-align: center; margin-top: 20px;">
        Xem video trên để hiểu rõ hơn về cách Linearthinking giúp bạn thay đổi cách học PTE.
    </p>

  </div>
`;
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
    data?: any[]
}
const CoursePage = ({ data }: CoursePageProps) => {
  return (
    <div className='bg-background text-foreground'>
        <Breadcrumb 
        items={breadcrumbItems}
        className="container mx-auto px-4"
        />
       <CourseContent data={courseIntroHtml} />
        <CourseGrid />
        {/* <Course /> */}
        {/* <PteProblemsSection /> */}
        <ProblemsAndSolutionList/>
        <FaqAccordion />
       
        
    </div>
  )
}

export default CoursePage