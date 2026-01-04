
import { ChevronRight } from "lucide-react"
import { News } from "@/types/news";
import HomeNewsCard from "./card/home-news-card";

interface NewsListSectionPops {
  newsData: News[] | [];
}
const NewsListSection = ({
  newsData
}: NewsListSectionPops) => {

  const newsFeatued = newsData ? newsData[0] : null;
   
  return (
    <section className="w-full bg-white section sm:section--sm lg:section--lg">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-brandBlue-900">Tin tức & Sự kiện</h1>
          <a
            href="/tin-tuc-pte-ipass"
            className="flex items-center text-brandBlue-500 hover:text-brandBlue-900 font-medium transition-colors duration-100
          group
          ">
            Xem thêm
            <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:h-[700px] items-stretch">
          {/* Featured Article - Left Side */}
          <HomeNewsCard
              item={newsFeatued as News}
              enableImg={true}
              heightImg="340"
              className="h-full"
            />
          {/* Related Articles - Right Side (scroll dọc khi cần) */}
          <div className="h-full flex flex-col gap-4 py-4 overflow-y-auto no-scrollbar pr-3">
            {newsData.map((item, index) => (
              <div key={index} className="mb-2 px-2">
                <HomeNewsCard item={item} enableImg={false} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}

export default NewsListSection