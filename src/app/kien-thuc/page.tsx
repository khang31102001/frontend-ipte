import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import { SAMPLE_PTEuniversity } from "@/data/daihoc";
import KnowledgePage from "@/pages/knowledge/knowledge-page";
// import { knowledgeService } from "@/services/knowledge/knowledgeService";


export default function KnowledgeIndex() {
    // const knowledges = knowledgeService.getKnowledges(3, { page: 1, page_size: 7 }).then(res => res.data).catch(err => {
    //     console.error("Error fetching knowledges:", err);
    //     return [];
    // });
    // console.log("knowledges", knowledges);
    return (
        <div>
            <HeroBanner
            img="/images/hero-banner-primary.png"
            className="mb-12"
            />
           
            <KnowledgePage data={SAMPLE_PTEuniversity ?? []} />

        </div>
    );
}