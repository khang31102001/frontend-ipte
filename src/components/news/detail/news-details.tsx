import { CommentsSection } from "@/components/comment/comment-section";
import CourseSidebar from "@/components/courses/detail/course-sidebar";
import { ArticleContent, ArticleCovderImage, ArticleHeader, ArticleSidebar } from "@/components/shared/article";
import { FloatingCTA } from "@/components/shared/subscription/floating-cta";
import { Course } from "@/types/courses";
import { News } from "@/types/news";

interface NewsDetailsProps {
  news?: News | null;
  breadcrumbs?: any[] | null;
}
const NewsDetail = ({
  news,
  breadcrumbs = []
}: NewsDetailsProps) => {

  // console.log("course", course);

  if (!news) return null;

  return (
    <article className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto pad-sm">

        <ArticleHeader
          title={news.title}
          summary={news.description}
        />

        <ArticleCovderImage
          image={news.image} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ArticleContent content={news.content} />
            {/* <ArticleFooter /> */}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
     

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

export default NewsDetail;