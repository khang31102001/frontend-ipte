import HeroBanner from "@/components/banner/hero-banner";
import { SAMPLE_PTEuniversity } from "@/data/daihoc";
import KnowledgePage from "@/pages/knowledge/knowledge-page";


export default function KnowledgeIndex(){
    return(
        <div>
            <HeroBanner
            img="/images/hero-banner-primary.png"
            className="mb-12"
            />
      
            <KnowledgePage data={SAMPLE_PTEuniversity}/>

        </div>   
    );
}