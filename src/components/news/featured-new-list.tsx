import TrendingNews from "@/components/news/featured-news-section";
import { News } from "@/types/news";


interface TrendingNewsListProps {
  title?: string
  data?: News[]
}
const FeaturedNewsList = ({ 
  data, 
  title = "Thịnh hành" 
}: TrendingNewsListProps) => {

  if (!data || data.length === 0) return null;

  return (
    <section className="w-full px-4 py-12 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="mb-12 text-4xl font-bold text-hero-gradient md:text-5xl h-20">{title}</h2>
        <TrendingNews
          data={data}
        />
      </div>
    </section>
  )
}

export default FeaturedNewsList