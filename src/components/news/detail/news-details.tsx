
"use client";
import { ArticleContent, ArticleCovderImage, ArticleFooter, ArticleHeader, ArticleSidebar } from "@/shared/article";
import { SidebarItem } from "@/shared/article/article-sidebar";
import { FloatingCTA } from "@/shared/subscription/floating-cta";
import { SocialItem } from "@/types/about";
import { BreadcrumbItem } from "@/types/breadcrumbs";
import { Course } from "@/types/courses";
import { News } from "@/types/news";
import { useMemo } from "react";

interface NewsDetailsProps {
  news: News | null;
  featuredCourses?: Course[] | []; 
  socialData?: SocialItem[];
  breadcrumbs?: BreadcrumbItem[] | null;
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

const NewsDetail = ({
  news,
  breadcrumbs = [],
  featuredCourses = [],
}: NewsDetailsProps) => {

  const imgUrl = news?.image || "/images/img-news-default.jpg";
  const courseFeaturedItems = useMemo(()=>{
    if(!featuredCourses || featuredCourses.length === 0) return [];
    return featuredCourses.map((item)=> courseToSidebarItem(item, "/khoa-hoc"))
  }, [featuredCourses]);

  console.log("check featuredCourses in page NewsDetail:", featuredCourses)
  if (!news) return null;

  return (
    <article className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto pad-sm">

        <ArticleHeader
          title={news?.title}
          summary={news?.description}
          authorName={news?.author ?? ""}
          createdAt={news?.createdAt}
          updatedAt={news?.updatedAt}
          publishedAt={news?.publishedAt}
        />

        <ArticleCovderImage
          image={imgUrl} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ArticleContent content={news?.content} />
            <ArticleFooter tags={news?.tags} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
  
              <ArticleSidebar
                title="Khóa học tiêu biểu"
                items={courseFeaturedItems}
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

export default NewsDetail;