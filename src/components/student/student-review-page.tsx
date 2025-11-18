
import StoriesSection from '@/components/student/stories-section';
import StudentComment from '@/components/student/student-comment'
import { VideoSwiper } from '@/components/student/video-swiper'
import React from 'react'
const commentsData = [
  {
    id: 1,
    name: "Phạm Thu Trang",
    avatar: "/images/student-1.jpg",
    comment:
      "Nhờ iPTE mà mình đã đạt được mục tiêu PTE trong 2 tháng. Giáo viên chỉnh phát âm chi tiết và cực kỳ tận tâm.",
  },
  {
    id: 2,
    name: "Nguyễn Quang Huy",
    avatar: "/images/student-2.jpg",
    comment:
      "Mình thích nhất là các buổi Speaking thực hành. Môi trường luyện tập năng động, không bị áp lực.",
  },
  {
    id: 3,
    name: "Lê Minh Khoa",
    avatar: "/images/student-3.jpg",
    comment:
      "Cấu trúc bài học rõ ràng, dễ hiểu. Nhờ học ở đây mà kỹ năng Writing của mình tăng vượt bậc.",
  },
  {
    id: 4,
    name: "Trần Thảo Nhi",
    avatar: "/images/student-4.jpg",
    comment:
      "Khoá học rất phù hợp cho người đi làm bận rộn. Lịch học linh hoạt và giáo viên hỗ trợ ngoài giờ.",
  },
  {
    id: 5,
    name: "Đỗ Quốc Bảo",
    avatar: "/images/student-5.jpg",
    comment:
      "Trước đây mình sợ Speaking nhất, nhưng sau 6 tuần luyện với cô Minh, điểm tăng từ 55 lên 79.",
  },
  {
    id: 6,
    name: "Lý Thu Hà",
    avatar: "/images/student-6.jpg",
    comment:
      "Tài liệu học sát đề và luôn được cập nhật mới. Cảm ơn đội ngũ iPTE đã giúp mình tự tin hơn rất nhiều.",
  },
  {
    id: 7,
    name: "Vũ Hoàng Nam",
    avatar: "/images/student-7.jpg",
    comment:
      "Không chỉ học, mình còn được chia sẻ nhiều mẹo thi thực tế rất hữu ích. Đội ngũ giáo viên cực kỳ chuyên nghiệp.",
  },
  {
    id: 8,
    name: "Nguyễn Thanh Hương",
    avatar: "/images/student-8.jpg",
    comment:
      "Môi trường học thân thiện, học viên hỗ trợ nhau rất tốt. Giờ mình đã đạt 79 điểm PTE như mong muốn!",
  },
  {
    id: 9,
    name: "Phan Gia Huy",
    avatar: "/images/student-9.jpg",
    comment:
      "Cảm ơn iPTE đã giúp mình cải thiện kỹ năng Listening nhanh chóng. Feedback của giáo viên cực chi tiết.",
  },
  {
    id: 10,
    name: "Trần Mai Anh",
    avatar: "/images/student-10.jpg",
    comment:
      "Chương trình học khoa học, học phí hợp lý. Sau khoá Foundation mình đã tự tin hơn rất nhiều khi làm bài thi.",
  },
];

const videosData = [
  {
    id: 1,
    title: "Video test 1 – PTE Motivation",
    description:
      "Video giúp bạn có thêm động lực trong quá trình luyện thi PTE.",
    thumbnail: "https://img.youtube.com/vi/5MgBikgcWnY/maxresdefault.jpg",
    author: "Education Channel",
    videoUrl: "https://www.youtube.com/watch?v=5MgBikgcWnY",
  },
  {
    id: 2,
    title: "Video test 2 – English Learning Tips",
    description:
      "Những mẹo quan trọng giúp cải thiện tiếng Anh nhanh hơn.",
    thumbnail: "https://img.youtube.com/vi/VBlFHuCzPgY/maxresdefault.jpg",
    author: "English Mastery",
    videoUrl: "https://www.youtube.com/watch?v=VBlFHuCzPgY",
  },
  {
    id: 3,
    title: "Video test 3 – Improve Speaking Fast",
    description:
      "Cách cải thiện Speaking hiệu quả trong thời gian ngắn.",
    thumbnail: "https://img.youtube.com/vi/q6EoRBvdVPQ/maxresdefault.jpg",
    author: "Fluent Academy",
    videoUrl: "https://www.youtube.com/watch?v=q6EoRBvdVPQ",
  },
  {
    id: 4,
    title: "Video test 4 – Mindset for Exam Success",
    description:
      "Suy nghĩ đúng giúp bạn đạt điểm cao trong bất kỳ kỳ thi nào.",
    thumbnail: "https://img.youtube.com/vi/UB1O30fR-EE/maxresdefault.jpg",
    author: "Study Coach",
    videoUrl: "https://www.youtube.com/watch?v=UB1O30fR-EE",
  },
];

const stories = [
  {
    id: 1,
    image: "/images/pte-1.jpg",
    alt: "Student achievement report 1",
  },
  {
    id: 2,
    image: "/images/pte-2.jpg",
    alt: "Student achievement report 2",
  },
  {
    id: 3,
    image: "/images/pte-3.jpg",
    alt: "Student achievement report 3",
  },
  {
    id: 4,
    image: "/images/pte-4.jpg",
    alt: "Student achievement report 4",
  },
  {
    id: 5,
    image: "/images/pte-5.jpg",
    alt: "Student achievement report 5",
  },
  {
    id: 6,
    image: "/images/pte-6.jpg",
    alt: "Student achievement report 6",
  },
]

interface StudentReviewPageProps {
  dataVideo?: typeof videosData;
  dataComments?: typeof commentsData;
  dataStories?: typeof stories;
}
const StudentReviewPage = ({
  dataVideo = videosData,
  dataComments = commentsData,
  dataStories = stories,
}: StudentReviewPageProps) => {
  return (
    <div className="bg-transparent">
      <VideoSwiper videos={dataVideo} />
      <StoriesSection stories={dataStories} />
      <StudentComment comments={dataComments} />
    </div>
  )
}

export default StudentReviewPage