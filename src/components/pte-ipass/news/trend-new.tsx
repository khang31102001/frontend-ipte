import { News } from "@/types/news";
import Image from "next/image"
import Link from "next/link";

interface TrendingNewsProps {
  data: News[]
}

const TrendingNews = ({ data }: TrendingNewsProps) => {
  if (!data || data.length === 0) return null;
  // console.log("TrendingNews data:", data);
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
      {/* Left Column - Article List */}
      <div className="flex flex-col gap-6">
        {data.map((item) => (
          <Link 
          key={item.id}
          href={`/tin-tuc/${item.slug}`} 
          className="block"
          >
           <div className="group overflow-hidden transition-shadow hover:shadow-lg rounded-md ">
            <div className="flex flex-row justify-between gap-4 p-0 ">
              {item.image && (
                <div className="relative h-40 w-40 lg:h-48 lg:w-72 flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title ?? "pte ipass"}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-center py-4 pr-4 ">
                {item.authoravatar && (
                  <p className="mb-2 text-xs text-muted-foreground">
                    {item.authoravatar} - 21/10/2025
                  </p>
                )}
                <h3 className="mb-2 text-sm lg:text-lg font-semibold leading-tight text-foreground line-clamp-2">{item.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
          </Link>
         
        ))}
      </div>

      {/* Right Column - Featured Article */}
      <div className="group relative overflow-hidden rounded-md">
        <div className="relative h-full min-h-[600px]">
          <Image
            src={data[0]?.image || "/placeholder.svg"}
            alt={data[0]?.title ?? "pte ipass"}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between p-8">
            {data[0]?.category && (
              <span className="inline-block rounded-sm border-2 border-white px-4 py-2 text-sm font-medium text-white">
                {data[3]?.category}
              </span>
            )}
            <div>
              {data[0].authorname && (
                <p className="mb-4 text-sm text-white/90">
                  {data[3]?.authorname} - 20/10/2025
                </p>
              )}
              <h3 className="text-4xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl">
                {data[0]?.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingNews
