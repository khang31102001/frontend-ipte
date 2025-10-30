import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import { SAMPLE_StudyWork } from "@/data/data-study-work";
import KnowledgePage from "@/pages/knowledge/knowledge-page";
import StudyWorkImmigraionPage from "@/pages/study-work-immigration/study-work-immigraion-page";


export default function WorkStudyIndex(){
    return(
        <div>
            <HeroBanner
            img="/images/hero-banner-primary.png"
            className="mb-12"
            />
            
      
            <StudyWorkImmigraionPage data={SAMPLE_StudyWork}/>

        </div>   
    );
}