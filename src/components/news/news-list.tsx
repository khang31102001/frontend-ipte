import ConsultationForm from "@/components/form/consultation-form";
import { News, NewsListRes } from "@/types/news";
import { CategoryItem, NewsCategory } from "@/types/category";
import FeaturedNewsSection from "./featured-news-section";
import PteKnowledgeSection from "../knowledge/pte-knowledge-section";
import NewsCategorySection from "./category/news-category-section";
import NewsListSection from "./news-list-section";


interface NewsListProps {
  knowledgesCategory?: CategoryItem | null;
  newsCategory?: NewsCategory[];
  newsFeatured?: News[];
  newsData?: News[];

}

const NewsList = ({
  knowledgesCategory = null,
  newsCategory,
  newsFeatured = [],
  newsData,

}: NewsListProps) => {

  return (
    <section className='bg-background text-foreground'>

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