import { CommentsSection } from "@/components/comment/comment-section";
import { ArticleContent, ArticleCovderImage, ArticleFooter, ArticleHeader, ArticleSidebar } from "@/shared/article";
import CourseSidebar from "./course-sidebar";
import { FloatingCTA } from "@/shared/subscription/floating-cta";
import { Course } from "@/types/courses";
import { BreadcrumbItem } from "@/types/breadcrumbs";

interface CourseDeatilsProps {
  course: Course | null;
  breadcrumbs: BreadcrumbItem[] | null;
}
const CourseDetailPage = ({
  course,
  breadcrumbs = []
}: CourseDeatilsProps) => {

  // console.log("course", course);

  if (!course) return null;

  return (
    <article className="min-h-screen section bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto pad-sm">

        <ArticleHeader
          title={course.title}
          summary={course.description}
        />

        <ArticleCovderImage
          image={course.image} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ArticleContent content={course?.content} />
            <ArticleContent content={course?.benefits} />
            <ArticleFooter tags={course?.keywords as string[]} />
            {/* <CommentsSection courseId={course.courseId ?? 0} /> */}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/*              
                {tocItems.length > 0 && (
                  <div className="hidden lg:block bg-card rounded-lg p-4 border">
                    <TableOfContents items={tocItems} />
                  </div>
                )} */}
              <CourseSidebar
                Detailstitle="PTE Course Info"
                level={course.level}
                duration={course.duration}
                schedule={course.schedule}
                tuition={course.tuition}

              />

              <ArticleSidebar
                title="Khóa học tiêu biểu"
                items={[
                  {
                    id: "1",
                    title: "Luyện thi PTE core chuyên biệt",
                    image: "/images/course-1.jpg",
                    badge: "Miễn phí",
                  },
                  {
                    id: "2",
                    title: "Luyện thi PTE core chuyên biệt",
                    image: "/images/course-2.jpg",
                    badge: "Miễn phí",
                  },
                  {
                    id: "3",
                    title: "Luyện thi PTE core chuyên biệt",
                    image: "/images/course-3.jpg",
                    badge: "Miễn phí",
                  },
                ]}
              />

              <ArticleSidebar
                title="Cộng đồng PTE lớn nhất"
                items={[
                  {
                    id: "1",
                    title: "Join our PTE community",
                    image: "/images/news-1.jpg",
                  },
                ]}
                variant="large"
              />

              <ArticleSidebar
                title="Cập nhật thông tin PTE"
                items={[
                  {
                    id: "1",
                    title: "Follow us on social media",
                    image: "/images/news-2.jpg",
                  },
                ]}
                variant="large"
              />

            </div>
          </div>
        </div>

      </div>
      {/* Floating CTA (Mobile) */}
      <FloatingCTA />
    </article>
  )
}

export default CourseDetailPage;