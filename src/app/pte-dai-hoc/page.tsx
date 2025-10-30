import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import { SAMPLE_PTEuniversity } from "@/data/daihoc";
import { SAMPLE_Knowledge } from "@/data/data-pte-knowledge";
import KnowledgePage from "@/pages/knowledge/knowledge-page";
import PTEUniversityPage from "@/pages/pte-university/pte-university-page";


export default function UniversityIndex() {
    return (
        <div>
            <HeroBanner
            img="/images/hero-banner-primary.png"
            className="mb-12"
            />
           
            <PTEUniversityPage data={SAMPLE_PTEuniversity} />

        </div>
    );
}