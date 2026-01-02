"use client";
import { ArticleContent, ArticleCovderImage, ArticleFooter, ArticleHeader, ArticleSidebar } from "@/shared/article";
import CourseSidebar from "./course-sidebar";
import { FloatingCTA } from "@/shared/subscription/floating-cta";
import { Course } from "@/types/courses";
import { BreadcrumbItem } from "@/types/breadcrumbs";
import { SidebarItem } from "@/shared/article/article-sidebar";
import { useMemo } from "react";
import { usePopupRegistration } from "@/context/popup-registration-context";


interface CourseDeatilsProps {
  course: Course | null;
  breadcrumbs?: BreadcrumbItem[] | null;
  featuredCourses?: Course[] | null;
}

export function courseToSidebarItem(
  course: Course,
  basePath = "/khoa-hoc"
): SidebarItem {
  return {
    id: course.courseId ?? course.slug,
    title: course.title ?? course.courseName ?? "Khóa học",
    image: course.image ?? "/images/course-default.jpg",
    badge: "Miễn phí",
    href: course.slug ? `${basePath}/${course.slug}` : basePath,
  };
}

const CourseDetail = ({
  course,
  featuredCourses,
  breadcrumbs = []
}: CourseDeatilsProps) => {

  // console.log("course", course);
   const imgUrl = course?.image || "/images/img-courses-deault.jpg";
   const courseFeaturedItems = useMemo(()=>{
       if(!featuredCourses || featuredCourses.length === 0) return [];
       return featuredCourses.map((item)=> courseToSidebarItem(item, "/khoa-hoc"))
     }, [featuredCourses]);
        const { openRegistration } = usePopupRegistration();
   
  if (!course) return null;

  return (
    <article className="min-h-screen section bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto pad-sm">

        <ArticleHeader
          title={course.title}
          summary={course?.description}
          authorName={course?.createdBy ?? ""}
          createdAt={course?.createdAt}
          updatedAt={course?.updatedAt}
        />

        <ArticleCovderImage
          image={imgUrl}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ArticleContent content={course?.content} />
            <ArticleContent content={course?.benefits} />
            {course?.audience &&(
              <ArticleFooter tags={course?.audience as string[]} />
            )}
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
                Detailstitle="Thông tin khóa học PTE"
                level={course?.level}
                duration={course?.duration}
                schedule={course?.schedule}
                tuition={course?.tuition}
                openRegistration={openRegistration}

              />

              {courseFeaturedItems && (
                <ArticleSidebar
                title="Khóa học tiêu biểu"
                items={courseFeaturedItems}
              />
              )}

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

export default CourseDetail;