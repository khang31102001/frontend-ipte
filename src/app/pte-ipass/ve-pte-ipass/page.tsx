import HeroBanner from '@/components/banner/hero-banner'
import AboutPage from '@/pages/pte-ipass/about/about-page'
import { ecosystemData } from "@/data/ecosystemData";

export default function IndexAbout() {
    return (
        <div>
            <HeroBanner img="/images/banner-team-teacher.jpg" className="mb-12 " />
            <AboutPage
             dataEcosystem={ecosystemData}
             />
        </div>
    )
}
