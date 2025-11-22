import { KnowledgesCategory } from "@/types/category";
import CateKnowledgesItem from "./list/cate-knowledge-item";

export  function CateKnowledgesSection({
  knowledgeCategory
}: { knowledgeCategory: KnowledgesCategory}) {

  if (!knowledgeCategory) return null;
  // console.log("category in section", id, name, url);
  const knowleges = Array.isArray(knowledgeCategory.knowledges) ? knowledgeCategory.knowledges : [];
  // console.log(`courses in section: `, courses);
  //  Trả về UI render sẵn (SSR)
  if (!knowleges || knowleges.length === 0) return null;
  return (

    <CateKnowledgesItem
      categoryParent={knowledgeCategory}
      data={knowleges}
      layout_type="swiper"
    />

  );
}
