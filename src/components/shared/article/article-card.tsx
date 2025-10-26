interface ArticleCardProps {
  article: {
    id: string
    title: string
    excerpt: string
    image: string
    category: string
  }
  layout?: "grid" | "list"
}

export default function ArticleCard({ article, layout = "grid" }: ArticleCardProps) {
  if (layout === "list") {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="flex gap-4 p-4">
          <div className="h-24 w-32 flex-shrink-0 overflow-hidden rounded">
            <img src={article.image || "/placeholder.svg"} alt={article.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold text-blue-600">{article.category}</p>
              <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">{article.title}</h3>
              <p className="line-clamp-2 text-sm text-gray-600">{article.excerpt}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-video overflow-hidden bg-gray-100">
        <img src={article.image || "/placeholder.svg"} alt={article.title} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <p className="mb-2 text-xs font-semibold text-blue-600">{article.category}</p>
        <h3 className="mb-3 line-clamp-2 font-semibold text-gray-900">{article.title}</h3>
        <p className="line-clamp-3 text-sm text-gray-600">{article.excerpt}</p>
      </div>
    </div>
  )
}
