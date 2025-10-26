"use client"

import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import CoursesCard from "../home/card/courses-card"
import ListGridControl from "../shared/Control/list-grid-control"
import CourseCardRow from "./card/course-card-row"
interface Course {
  id: number
  title: string
  description: string
  duration: string
  level: string
  image: string
}

// 4 khóa học ban đầu
const initialCourses: Course[] = [
  { id: 1, title: "PTE Academic", description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic", duration: "4 Weeks", level: "Popular", image: "/images/course-1.jpg" },
  { id: 2, title: "PTE Academic", description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic", duration: "4 Weeks", level: "Popular", image: "/images/course-2.jpg" },
  { id: 3, title: "PTE Academic", description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic", duration: "4 Weeks", level: "Popular", image: "/images/course-3.jpg" },
  { id: 4, title: "PTE Academic", description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic", duration: "4 Weeks", level: "Popular", image: "/images/course-4.jpg" },
]

// Dữ liệu để load thêm (giả lập)
const allAdditionalCourses: Course[] = [
  { id: 5, title: "IELTS Foundation", description: "Khóa học IELTS cơ bản cho người mới bắt đầu.", duration: "6 Weeks", level: "Beginner", image: "/images/course-5.jpg" },
  { id: 6, title: "TOEFL iBT Mastery", description: "Luyện thi TOEFL iBT với chiến lược toàn diện.", duration: "8 Weeks", level: "Advanced", image: "/images/course-6.jpg" },
  { id: 7, title: "PTE Mock Test Pack", description: "Bộ đề thi thử PTE sát với đề thật.", duration: "1 Day", level: "Testing", image: "/images/course-7.jpg" },
  { id: 8, title: "General English A2", description: "Phát triển kỹ năng giao tiếp tiếng Anh tổng quát.", duration: "10 Weeks", level: "Basic", image: "/images/course-8.jpg" },
  // Thêm các phần tử khác để có thể load nhiều lần
  { id: 9, title: "Business English", description: "Tiếng Anh chuyên ngành kinh doanh.", duration: "7 Weeks", level: "Intermediate", image: "/images/course-9.jpg" },
  { id: 10, title: "Speaking Fluency", description: "Khóa học tập trung vào khả năng nói trôi chảy.", duration: "4 Weeks", level: "Popular", image: "/images/course-10.jpg" },
];

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

type ViewMode = "grid" | "list";
export function CourseGrid() {
  const [currentCourse, setCurrentCourse] = useState(initialCourses);
  const [loadMore, setloadMore] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  // const [searchQuery, setSearchQuery] = useState("")
  // const [sortBy, setSortBy] = useState("newest")
  const ITEMS_PER_LOAD = 4; // Số lượng phần tử load mỗi lần
  // const [currentItem, setCurrentItem] = useState(ITEMS_PER_LOAD);

  const handleLoadMore = () => {
    setloadMore(!loadMore);
    /// sử lý api
  }

  const handleViewMode = (type: ViewMode) => {
    setViewMode(type)
  }
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">


        {/* Controls */}
        <ListGridControl onChangeView={handleViewMode} />

        {/* Course Section */}
        <div className="space-y-12">
          {/* Featured Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary">Khóa học nổi bật</h3>
                <p className="text-muted-foreground mt-1">Luyện chuyên sâu cho học viên muốn đạt điểm cao tuyệt đối.</p>
              </div>

            </div>

            <div
              className={
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"
              }
            >
              {currentCourse.map((item, index) => (
                <>
                  {viewMode === "grid" ? (
                    <CoursesCard key={index} data={item} />
                  ) : (
                    <CourseCardRow
                      key={index}
                      image={item.image}
                      duration={item.duration}
                      level={item.level}
                      title={item.title}
                      description={item.description}
                    />
                  )}
                </>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                className="text-primary font-semibold inline-flex items-center group"
                onClick={handleLoadMore}
              // disabled={loadMore}
              >
                {loadMore ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang tải...
                  </>
                ) :
                  <>
                    Xem thêm
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                }
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
