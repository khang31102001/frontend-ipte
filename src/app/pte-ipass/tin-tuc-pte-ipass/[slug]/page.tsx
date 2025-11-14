import { CommentsSection } from "@/components/comment/comment-section"
import CourseSidebar from "@/components/courses/detail/course-sidebar"
import {
  ArticleContent,
  ArticleCovderImage,
  ArticleFooter,
  ArticleHeader,
  ArticleSidebar
} from "@/components/shared/article"
import { newServices } from "@/lib/service/new"
import { News } from "@/types/news"
import { notFound } from "next/navigation"


interface CourseDeatilsProps {
  params: { slug: string }
}


export async function generateMetadata({ params }: CourseDeatilsProps) {

  const article:News = await newServices.getNewsList({ 
    slug: params.slug 
  }).then(res => res.items[0] ?? null);

  if (!article) return { title: "Khóa học không tồn tại" }
  return {
    title: article.title,
    description: article.description,
  }
}

export default async function NewsDetailIndex({ params }: CourseDeatilsProps) {

 const article:News = await newServices.getNewsList({ slug: params.slug }).then(res => res.items[0]);
 
 console.log('article', article);
  if (!article) return notFound();

  return (
    <article className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto pad-sm">
        
        <ArticleHeader
          title={article.title}
          summary={article.description}
        />

        <ArticleCovderImage
          title="title img"
          caption=""
          image={article.image}

        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ArticleContent content={article.content} />
            <ArticleFooter />
            <CommentsSection courseId="1" />
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
      {/* <FloatingCTA hotline={course.hotline} onRegisterClick={handleRegister} /> */}
    </article>
  )
}
