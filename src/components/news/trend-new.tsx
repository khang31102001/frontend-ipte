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
    <div className="trending-news grid gap-6 lg:grid-cols-[1fr_1.5fr]">
      <div className="trending-news__list scroll-container">
        {data.slice(0, 3).map((item) => (
          <Link key={item.id} href={`${item.slug}`} className="block">
            <div className="trending-news__item group rounded-md">
              <div className="trending-news__item-inner flex flex-row justify-between gap-4">
                {item.image && (
                  <div className="trending-news__item-thumb">
                    <Image
                      src={item.image}
                      alt={item.title ?? "pte ipass"}
                      fill
                      className="trending-news__item-image"
                    />
                  </div>
                )}
                <div className="trending-news__item-content">
                  {item.authorname && (
                    <p className="trending-news__author">
                      {item.authorname}
                    </p>
                  )}
                  <h3 className="trending-news__title">{item.title}</h3>
                  <p className="trending-news__desc">{item.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* FEATURED */}
      <div className="trending-news__featured group">
        <div className="trending-news__featured-inner">
          <Image
            src={data[0]?.image ?? ""}
            alt={data[0]?.title ?? "pte ipass"}
            fill
            className="trending-news__featured-image"
          />

          <div className="trending-news__featured-gradient" />

          <div className="trending-news__featured-text">
            {/* <span className="trending-news__featured-category">
              {data[0]?.category}
            </span> */}

            <div>
              <p className="trending-news__featured-author">
                {data[0]?.authorname}
              </p>
              <h3 className="trending-news__featured-title">
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
