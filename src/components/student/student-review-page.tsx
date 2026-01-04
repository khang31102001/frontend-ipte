
import StoriesSection from '@/components/student/stories-section';
import StudentComment from '@/components/student/student-comment'
import { VideoSwiper } from '@/components/student/video-swiper'
import React from 'react'
import ConsultationForm from '../form/consultation-form';
import { IMediaItem } from '@/types/media';
import { HeroBanner } from '@/shared/banner/hero-banner';

const commentsData = [
  {
    id: 1,
    name: "Phạm Thu Trang",
    avatar: "",
    comment:
      "Nhờ iPTE mà mình đã đạt được mục tiêu PTE trong 2 tháng. Giáo viên chỉnh phát âm chi tiết và cực kỳ tận tâm.",
  },
  {
    id: 2,
    name: "Nguyễn Quang Huy",
    avatar: "",
    comment:
      "Mình thích nhất là các buổi Speaking thực hành. Môi trường luyện tập năng động, không bị áp lực.",
  },
  {
    id: 3,
    name: "Lê Minh Khoa",
    avatar: "",
    comment:
      "Cấu trúc bài học rõ ràng, dễ hiểu. Nhờ học ở đây mà kỹ năng Writing của mình tăng vượt bậc.",
  },
  {
    id: 4,
    name: "Trần Thảo Nhi",
    avatar: "",
    comment:
      "Khoá học rất phù hợp cho người đi làm bận rộn. Lịch học linh hoạt và giáo viên hỗ trợ ngoài giờ.",
  },
  {
    id: 5,
    name: "Đỗ Quốc Bảo",
    avatar: "",
    comment:
      "Trước đây mình sợ Speaking nhất, nhưng sau 6 tuần luyện với cô Minh, điểm tăng từ 55 lên 79.",
  },
  {
    id: 6,
    name: "Lý Thu Hà",
    avatar: "",
    comment:
      "Tài liệu học sát đề và luôn được cập nhật mới. Cảm ơn đội ngũ iPTE đã giúp mình tự tin hơn rất nhiều.",
  },
  {
    id: 7,
    name: "Vũ Hoàng Nam",
    avatar: "",
    comment:
      "Không chỉ học, mình còn được chia sẻ nhiều mẹo thi thực tế rất hữu ích. Đội ngũ giáo viên cực kỳ chuyên nghiệp.",
  },
  {
    id: 8,
    name: "Nguyễn Thanh Hương",
    avatar: "",
    comment:
      "Môi trường học thân thiện, học viên hỗ trợ nhau rất tốt. Giờ mình đã đạt 79 điểm PTE như mong muốn!",
  },
  {
    id: 9,
    name: "Phan Gia Huy",
    avatar: "",
    comment:
      "Cảm ơn iPTE đã giúp mình cải thiện kỹ năng Listening nhanh chóng. Feedback của giáo viên cực chi tiết.",
  },
  {
    id: 10,
    name: "Trần Mai Anh",
    avatar: "",
    comment:
      "Chương trình học khoa học, học phí hợp lý. Sau khoá Foundation mình đã tự tin hơn rất nhiều khi làm bài thi.",
  },
];



interface StudentReviewPageProps {
  dataVideo?: IMediaItem[] | [];
  dataComments?: any[];
  dataStudentStories?: IMediaItem[];
}
const StudentReviewPage = ({
  dataVideo = [],
  dataComments,
  dataStudentStories,
}: StudentReviewPageProps) => {


  return (
    <div className="min-h-screen bg-white">
      <HeroBanner
            alt="Trang chủ pte ipass"
            src="/images/hero-img-hoc-vien-review.png"
            priority={true}
          />
  
      <VideoSwiper videos={dataVideo} />
      <StoriesSection stories={dataStudentStories} />
      <StudentComment comments={commentsData} />
      <ConsultationForm  />

    </div>
  )
}

export default StudentReviewPage