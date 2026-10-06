import Image from "next/image";
import Link from "next/link";
import type { PublicArticle } from "@/features/public-api";
import { articleHref } from "../../config/routes";
import PageContent from "../../shared/page/page-content";
import { Section } from "../../shared/page/section";

interface FeaturedNewsSectionProps {
  title?: string;
  data: PublicArticle[];
}

const FeaturedNewsSection = ({ title = "Thịnh hành", data }: FeaturedNewsSectionProps) => {
  const featured = data[0];
  if (!featured) return null;

  return (
    <Section className="w-full">
      <PageContent>
        <h2 className="mb-8 text-4xl font-bold text-hero-gradient md:text-5xl min-h-16">{title}</h2>
        <div className="trending-news grid gap-6 lg:grid-cols-[1fr_1.5fr]">
          <div className="trending-news__list scroll-container">
            {data.map((item) => (
              <Link key={item.id} href={articleHref(item)} className="block">
                <div className="trending-news__item group rounded-md">
                  <div className="trending-news__item-inner flex flex-row justify-between gap-4">
                    <div className="trending-news__item-thumb">
                      <Image src={item.coverUrl || "/images/img-news-default.jpg"} alt={item.title} fill className="trending-news__item-image" />
                    </div>
                    <div className="trending-news__item-content">
                      <h3 className="trending-news__title">{item.title}</h3>
                      <p className="trending-news__desc">{item.excerpt}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link href={articleHref(featured)} className="trending-news__featured group block">
            <div className="trending-news__featured-inner">
              <Image src={featured.coverUrl || "/images/img-news-default.jpg"} alt={featured.title} fill className="trending-news__featured-image" priority />
              <div className="trending-news__featured-gradient" />
              <div className="trending-news__featured-text">
                <div>
                  {featured.categoryName && <p className="trending-news__featured-author">{featured.categoryName}</p>}
                  <h3 className="trending-news__featured-title">{featured.title}</h3>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </PageContent>
    </Section>
  );
};

export default FeaturedNewsSection;
