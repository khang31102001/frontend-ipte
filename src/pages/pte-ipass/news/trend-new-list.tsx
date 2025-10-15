import TrendingNews from "@/components/pte-ipass/news/trend-new";

interface NewsArticle {
  id: string
  image: string
  author: string
  date: string
  title: string
  description: string
  category?: string
}

interface TrendingNewsListProps {
  title?: string
  data?: NewsArticle[]
}
const TrendingNewsList = ({ data }: TrendingNewsListProps) => {

  if (!data || data.length === 0) return null;

  return (
    <section className="w-full px-4 py-12 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="mb-12 text-4xl font-bold text-hero-gradient md:text-5xl h-20">Thịnh hành</h2>
        <TrendingNews
          data={data}
        />
      </div>
    </section>
  )
}

export default TrendingNewsList