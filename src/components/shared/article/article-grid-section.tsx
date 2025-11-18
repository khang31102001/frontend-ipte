"use client"
import { useState } from "react"
// import { ChevronLeft, ChevronRight, Grid3x3, List } from "lucide-react"
import ArticleCard from "./card/article-card"
import ListGridControl from "../Control/list-grid-control"
import FeaturedArticleCard from "./card/featured-article-card"
import ArticleSidebar from "./article-sidebar"
import { CategoryItem } from "@/types/category"





interface ArticleGridSectionProps {
  category: CategoryItem;
  data?: any[];
}
const ArticleGridSection = ({
  category,
  data
}: ArticleGridSectionProps) => {
  // console.log("ArticleGridSection", data);
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const articlesPerPage = 6
  // const featuredArticle = data?.find((a) => a.featured)
  // const regularArticles = data?.filter((a) => !a.featured)

  // const filteredArticles = regularArticles?.filter((article) =>
  //   article.title.toLowerCase().includes(searchQuery.toLowerCase()),
  // )

  // const totalPages = filteredArticles ? Math.ceil(filteredArticles.length / articlesPerPage) : 0
  // const startIndex = (currentPage - 1) * articlesPerPage

  // ham này để map hiển thị
  // const paginatedArticles = filteredArticles ? filteredArticles.slice(startIndex, startIndex + articlesPerPage) : [];

  if (!data || data.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ListGridControl onChangeView={setViewMode} />
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Featured + Articles */}
        <div className="lg:col-span-2">
          {/* Featured Article */}
      
            <div className="mb-8">
              <FeaturedArticleCard
                baseUrl={category.url}
                href={data[0].slug ?? ""}
                image={data[0].image}
                category={data[0].category}
                title={data[0].title}
                description={data[0].description}
              />
            </div>
       

          {/* Articles Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {data.map((item, index) => (
                <ArticleCard
                  key={index}
                  baseUrl={category.url}
                  href={item.slug}
                  image={item.image}
                  title={item.title}
                   description={item.description}
                 
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {data.map((item, index) => (
                <ArticleCard key={index}
                  baseUrl={category.url}
                  href={item.slug}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  layout="list" />
              ))}
            </div>
          )}

          {/* Pagination */}

          {/* <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${currentPage === pageNum
                    ? "bg-hero-gradient text-white"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div> */}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <ArticleSidebar
            title="Khóa học tiêu biểu"
            items={[
              {
                id: 1,
                title: "Luyện thi PTE core chuyên biệt",
                image: "/pte-exam-course.jpg",
                badge: "Miễn phí",
              },
              {
                id: "2",
                title: "Luyện thi PTE core chuyên biệt",
                image: "/english-course.jpg",
                badge: "Miễn phí",
              },
              {
                id: "3",
                title: "Luyện thi PTE core chuyên biệt",
                image: "/study-abroad.jpg",
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
                image: "/community-group.jpg",
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
                image: "/social-media-icons.jpg",
              },
            ]}
            variant="large"
          />
        </div>
      </div>
    </div>
  )
}

export default ArticleGridSection
