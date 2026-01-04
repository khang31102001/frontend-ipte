"use client"
import { News } from "@/types/news";
import Image from "next/image"
import Link from "next/link";
import { NEWS_BASE, ROUTERS } from "../../config/routes/routers";

interface FeaturedNewsSectionProps {
  title?: string;
  data: News[];
  basePath?: string;
}

const FeaturedNewsSection = ({
  title = "Thịnh hành",
  data = [],
  basePath = "/tin-tuc-pte-ipass",
}: FeaturedNewsSectionProps) => {
  if (!data?.length) return null;

  const featured = data[0];
  const imgUrl = featured?.image || "/images/img-news-default.jpg"

  // console.log("TrendingNews data:", data);
  return (
    <section className="section sm:section--sm lg:section--lg">
      <h2 className="mb-12 text-4xl font-bold text-hero-gradient md:text-5xl min-h-16">{title}</h2>
      <div className="trending-news grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="trending-news__list scroll-container">
          {data?.map((item, index) => {
            const baseHref = ROUTERS.NEWS.detail( NEWS_BASE, item.slug);
             const imgItemUrl = item?.image || "/images/img-news-default.jpg"
            return (
              <Link key={item.newsId ?? index} href={baseHref} className="block">
                <div className="trending-news__item group rounded-md">
                  <div className="trending-news__item-inner flex flex-row justify-between gap-4">
                    {item.image && (
                      <div className="trending-news__item-thumb">
                        <Image
                          src={imgItemUrl}
                          alt={item?.title ?? "pte ipass"}
                          fill
                          className="trending-news__item-image"
                        />
                      </div>
                    )}
                    <div className="trending-news__item-content">
                      {item.author && (
                        <p className="trending-news__author">
                          {item.author}
                        </p>
                      )}
                      <h3 className="trending-news__title">{item?.title}</h3>
                      <p className="trending-news__desc">{item?.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* FEATURED */}

        <div className="trending-news__featured group">

          <div className="trending-news__featured-inner">
            <Image
              src={imgUrl}
              alt={featured?.title ?? "pte ipass"}
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
                  {featured?.author}
                </p>
                <h3 className="trending-news__featured-title">
                  {featured?.title}
                </h3>
              </div>
            </div>
          </div>

        </div>


      </div>
    </section>

  )
}

export default FeaturedNewsSection
