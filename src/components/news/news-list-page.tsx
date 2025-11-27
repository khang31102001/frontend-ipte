import KnowledgePTE from "@/components/knowledge/knowledge-pte";
// import NewsTipList from "./news-tip-list";
// import FeaturedNewsList from "./featured-new-list";
import ConsultationForm from "@/components/form/consultation-form";
import { News } from "@/types/news";
import TrendingNews from "./trend-new";
import NewsListItems from "./list/news-list-items";
import { CategoryItem, NewsCategory } from "@/types/category";


interface NewPageProps {
  knowledgesCategory?: CategoryItem;
  newsCategory?: NewsCategory[];
  newsFeatured?: News[];
  newsList?: News[];

}

const NewListPage = ({ 
  knowledgesCategory,
  newsCategory,
  newsFeatured, 
  newsList,
 
}: NewPageProps) => {

  return (
    <section className='bg-background text-foreground'>
      {newsFeatured && (
        <TrendingNews title="Thịnh Hành" data={newsFeatured} />
      )}
      {/* <NewsTipList data={dataTip} /> */}
      {newsList && (
        <NewsListItems data={newsList} />
      )}
      {knowledgesCategory && (
         <KnowledgePTE category={knowledgesCategory} />
      )}
     
      <ConsultationForm />
    </section>
  )
}

export default NewListPage