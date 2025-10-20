import KnowledgePTE from "@/components/knowledge/knowledge-pte";
import NewsTipList from "./news-tip-list";
import TrendingNewsList from "./trend-new-list";
import ConsultationForm from "@/components/form/consultation-form";
import { NewsArticle, pteTip } from "@/types/post";


interface NewPageProps {
  dataNews?: any[];
  dataTip?: any[];
}

const NewPage = ({ dataNews, dataTip }: NewPageProps) => {
  return (
    <div className='bg-background text-foreground'>
      <TrendingNewsList data={dataNews} />
      <NewsTipList data={dataTip} />
      <KnowledgePTE />
      <ConsultationForm />
    </div>
  )
}

export default NewPage