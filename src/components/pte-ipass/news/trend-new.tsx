import Image from "next/image"


interface NewsArticle {
  id: string
  image: string
  author: string
  date: string
  title: string
  description: string
  category?: string
}

interface TrendingNewsProps {
  data: NewsArticle[]
}

const TrendingNews = ({ data }: TrendingNewsProps) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
      {/* Left Column - Article List */}
      <div className="flex flex-col gap-6">
        {data.map((item ) => (
          <div key={item.id} className="group overflow-hidden transition-shadow hover:shadow-lg rounded-md ">
            <div className="flex flex-row justify-between gap-4 p-0 ">
              <div className="relative h-40 w-40 lg:h-48 lg:w-72 flex-shrink-0 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center py-4 pr-4 ">
                <p className="mb-2 text-xs text-muted-foreground">
                  {item.author} - {item.date}
                </p>
                <h3 className="mb-2 text-sm lg:text-lg font-semibold leading-tight text-foreground line-clamp-2">{item.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Column - Featured Article */}
      <div className="group relative overflow-hidden rounded-md">
        <div className="relative h-full min-h-[600px]">
          <Image
            src={data[3]?.image || "/placeholder.svg"}
            alt={data[3]?.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between p-8">
            <div>
              {data[3]?.category && (
                <span className="inline-block rounded-sm border-2 border-white px-4 py-2 text-sm font-medium text-white">
                  {data[3]?.category}
                </span>
              )}
            </div>
            <div>
              <p className="mb-4 text-sm text-white/90">
                {data[3]?.author} - {data[3]?.date}
              </p>
              <h3 className="text-4xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl">
                {data[3]?.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingNews
