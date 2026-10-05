import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { PublicArticle } from "@/features/public-api";
import { ARTICLE_SECTIONS } from "../../config/routes";
import PageContent from "../../shared/page/page-content";
import { Section } from "../../shared/page/section";
import HomeNewsCard from "./card/home-news-card";

interface NewsListSectionProps {
  heading?: string;
  description?: string;
  articles: PublicArticle[];
}

const NewsListSection = ({ heading = "Tin tức", description, articles }: NewsListSectionProps) => {
  const [featured, ...rest] = articles;
  if (!featured) return null;

  return (
    <Section className="w-full mt-4">
      <PageContent>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <h2 className="sm:text-3xl md:text-5xl font-bold text-brandBlue-900">{heading}</h2>
            {description && <p className="mt-2 text-lg text-gray-600">{description}</p>}
          </div>
          <Link href={ARTICLE_SECTIONS.news.base} className="flex items-center text-brandBlue-500 hover:text-brandBlue-900 font-medium transition-colors duration-100 group">
            Xem thêm
            <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:h-[700px] items-stretch">
          <HomeNewsCard item={featured} enableImg heightImg="h-[340px]" className="h-full" />
          <div className="h-full flex flex-col gap-4 py-4 overflow-y-auto no-scrollbar bg-blue-50">
            {rest.map((item) => (
              <div key={item.id} className="mb-2 px-2">
                <HomeNewsCard item={item} enableImg={false} />
              </div>
            ))}
          </div>
        </div>
      </PageContent>
    </Section>
  );
};

export default NewsListSection;
