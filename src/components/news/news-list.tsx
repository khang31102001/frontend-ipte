import ConsultationForm from "@/components/form/consultation-form";
import { News, NewsListRes } from "@/types/news";
import { CategoryItem, NewsCategory } from "@/types/category";
import FeaturedNewsSection from "./featured-news-section";
import PteKnowledgeSection from "../knowledge/pte-knowledge-section";
import NewsCategorySection from "./category/news-category-section";
import NewsListSection from "./news-list-section";
import Breadcrumb from "@/shared/breadcrumb";
import { BreadcrumbItem } from "@/types/breadcrumbs";
import { HeroBanner } from "@/shared/banner/hero-banner";


interface NewsListProps {
  breadcrumbs?: BreadcrumbItem[] | [];
  knowledgesCategory?: CategoryItem | null;
  newsCategory?: NewsCategory[];
  newsFeatured?: News[];
  newsData?: News[];

}

const NewsList = ({
  breadcrumbs = [],
  knowledgesCategory = null,
  newsCategory,
  newsFeatured = [],
  newsData,

}: NewsListProps) => {

  return (
    <section className='bg-background text-foreground'>
      <HeroBanner
        alt="Trang chủ pte ipass"
        src="/images/banner/banner-tin-tuc-pte-ipas.jpg"
        priority={true}
      />

      <Breadcrumb
        items={breadcrumbs}
        className="container max-auto px-4 py-4 md:py-8"
      />

      {/* <div className="container max-auto px-4 py-8 md:py-12">
                <p className="text-base  text-primary mb-2">{newsCategory?.description}</p>
            </div> */}

      <FeaturedNewsSection title="Thịnh Hành" data={newsFeatured} />

      <NewsListSection newData={newsData} />

      {newsCategory && newsCategory?.map((item, index) => {
        return (
          <NewsCategorySection
            key={index}
            newsCategory={item}
          />
        )
      })}


      <PteKnowledgeSection cateKnowledges={knowledgesCategory} />

      <ConsultationForm />
    </section>
  )
}

export default NewsList