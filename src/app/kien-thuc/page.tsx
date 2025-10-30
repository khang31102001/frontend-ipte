import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import { SAMPLE_PTEuniversity } from "@/data/daihoc";
import KnowledgePage from "@/pages/knowledge/knowledge-page";


export default function KnowledgeIndex() {
    return (
        <div>
            {/* <HeroBanner
            img="/images/hero-banner-primary.png"
            className="mb-12"
            /> */}
            <HeroImage
                src="/images/hero-banner-primary.png"
                objectPosition="center"
                preset="soft"
                className="hero--fullscreen"
            />
            <KnowledgePage data={SAMPLE_PTEuniversity} />

        </div>
    );
}