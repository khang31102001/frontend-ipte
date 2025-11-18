import KnowledgePTE from "@/components/knowledge/knowledge-pte";
import NewsTipList from "./news-tip-list";
import FeaturedNewsList from "./featured-new-list";
import ConsultationForm from "@/components/form/consultation-form";
import { News } from "@/types/news";
import { PTETips } from "@/types/PTETips";


interface NewPageProps {
  dataNews?: News[];
  dataTip?: PTETips[];
}

const NewPage = ({ dataNews, dataTip }: NewPageProps) => {
  return (
    <div className='bg-background text-foreground'>
      <FeaturedNewsList data={dataNews} />
      <NewsTipList data={dataTip} />
      <KnowledgePTE />
      <ConsultationForm />
    </div>
  )
}

export default NewPage