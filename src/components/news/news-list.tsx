// import NewsTipList from "./news-tip-list";
// import FeaturedNewsList from "./featured-new-list";
import ConsultationForm from "@/components/form/consultation-form";
import { News } from "@/types/news";
import TrendingNews from "./trend-new";
import NewsListItems from "./list/news-list-items";
import { CategoryItem, NewsCategory } from "@/types/category";


interface NewsListProps {
  knowledgesCategory?: CategoryItem;
  newsCategory?: NewsCategory[];
  newsFeatured?: News[];
  newsData?: News[];

}

const NewsList = ({ 
  knowledgesCategory,
  newsCategory,
  newsFeatured, 
  newsData,
 
}: NewsListProps) => {

  return (
    <section className='bg-background text-foreground'>
      {newsFeatured && (
        <TrendingNews title="Thịnh Hành" data={newsFeatured} />
      )}
      {/* <NewsTipList data={dataTip} /> */}
      {newsData && (
        <NewsListItems data={newsData} />
      )}
      {/* {knowledgesCategory && (
         <KnowledgesSection data={newsList} category={knowledgesCategory} />
      )}
      */}
      <ConsultationForm />
    </section>
  )
}

export default NewsList