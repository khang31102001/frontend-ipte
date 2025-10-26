"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Grid3x3, List } from "lucide-react"
import ArticleCard from "./article-card"
import SidebarSection from "./sidebar-section"
import ListGridControl from "../Control/list-grid-control"

interface Article {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  featured?: boolean
}


interface ArticleGridSectionProps {
  data?: Article[]
}
const ArticleGridSection = ({
  data
}: ArticleGridSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const articlesPerPage = 6
  const featuredArticle = data?.find((a) => a.featured)
  const regularArticles = data?.filter((a) => !a.featured)

  const filteredArticles = regularArticles?.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalPages = filteredArticles ? Math.ceil(filteredArticles.length / articlesPerPage) : 0
  const startIndex = (currentPage - 1) * articlesPerPage
  const paginatedArticles = filteredArticles ? filteredArticles.slice(startIndex, startIndex + articlesPerPage) : [];

  if (!data || data.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ListGridControl onChangeView={setViewMode} />
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Featured + Articles */}
        <div className="lg:col-span-2">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-8">
              <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="aspect-square overflow-hidden md:aspect-auto md:h-96">
                    <img
                      src={featuredArticle.image || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <p className="mb-2 text-sm font-semibold text-blue-600">{featuredArticle.category}</p>
                    <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">{featuredArticle.title}</h2>
                    <p className="text-sm text-gray-600">{featuredArticle.excerpt}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} layout="list" />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-2">
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
                    ? "bg-blue-600 text-white"
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
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <SidebarSection
            title="Khóa học tiêu biểu"
            items={[
              {
                id: "1",
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

          <SidebarSection
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

          <SidebarSection
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
