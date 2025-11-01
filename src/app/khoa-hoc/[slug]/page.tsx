import { CommentsSection } from "@/components/comment/comment-section"
import { ArticleContent } from "@/components/shared/article/detail/article-content"
import { ArticleCover } from "@/components/shared/article/detail/article-cover"

import ArticleHeader from "@/components/shared/article/detail/article-header"
import { AricleSidebar } from "@/components/shared/article/detail/article-sidebar"
import { dataDetailCourse } from "@/data/data-detail-course"
import { notFound } from "next/navigation"


interface CoursePageProps {
  params: { slug: string }
}


export async function generateMetadata({ params }: CoursePageProps) {
  const course = dataDetailCourse.find((item) => item.slug === params.slug)
  if (!course) return { title: "Khóa học không tồn tại" }
  return {
    title: course.title,
    description: course.summary,
  }
}

export default function CourseDetailIndex({ params }: CoursePageProps) {
  const course = dataDetailCourse.find((item) => item.slug === params.slug)

  if (!course) return notFound();

  return (
    <article className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <ArticleHeader
         title={course.title}
         summary={course.summary}
        />

        <ArticleCover
          title="title img"
          caption=""
          image={course.img}
          
        />

        <div className="grid grid-cols-1 lg:grid-col gap-8">
          <div className="col-span-2 space-y-8">
            <ArticleContent content={course.content}/>
            {/* <ArticleFooter/> */}
            <CommentsSection courseId="1"/>
          </div>

          <div className="col-span-1">
             {/* <div className="sticky top-8 space-y-6">
             
                {tocItems.length > 0 && (
                  <div className="hidden lg:block bg-card rounded-lg p-4 border">
                    <TableOfContents items={tocItems} />
                  </div>
                )}

             
                <CourseSidebar
                  level={course.level}
                  duration={course.duration}
                  schedule={course.schedule}
                  tuition={course.tuition}
                  totalStudents={course.totalStudents}
                  hotline={course.hotline}
                  downloadLink={course.downloadLink}
                  relatedCourses={course.relatedCourses}
                />
              </div> */}
          </div>
        </div>

      </div>
      {/* Floating CTA (Mobile) */}
        {/* <FloatingCTA hotline={course.hotline} onRegisterClick={handleRegister} /> */}
       {/* Style overrides for sanitized HTML */}
      <style>{`
        .image { text-align:center; }
        .image figcaption { color:#6b7280; font-size:.9rem; margin-top:.25rem; }
        .embed { position:relative; width:100%; aspect-ratio:16/9; border-radius:14px; overflow:hidden; border:1px solid #eef2f7; background:#000; }
        .embed iframe { position:absolute; inset:0; width:100%; height:100%; border:0; }
        .article-body h2 { font-size:1.5rem; margin-top:1.5rem; font-weight:800; }
        .article-body h3 { font-size:1.15rem; margin-top:1.25rem; font-weight:700; }
        .article-body a { color:#1d4ed8; text-decoration:underline; }
        .article-body a:hover { color:#1e40af; }
        .article-body blockquote { border-left:4px solid #e5e7eb; padding:.5rem 1rem; color:#374151; background:#fafafa; border-radius:8px; margin:1rem 0; }
        .article-body table { width:100%; border-collapse:collapse; font-size:.98rem; margin:1rem 0; }
        .article-body th, .article-body td { border:1px solid #e5e7eb; padding:.6rem .7rem; }
        .article-body th { background:#f9fafb; font-weight:600; }
        .article-body tr:nth-child(even) td { background:#fcfcfd; }
      `}</style>
    </article>
  )
}
