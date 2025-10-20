import HeroBanner from '@/components/banner/hero-banner'
import AboutPage from '@/pages/pte-ipass/about/about-page'
import { ecosystemData } from "@/data/ecosystemData";
import { aboutMeService } from '@/services/about-me/newsService';

export default async function IndexAbout() {
    const aboutData = await aboutMeService.getAboutMe({ category: "ABOUT_ME" });
    console.log("About Me data:", aboutData?.items);
    return (
        <div>
            <HeroBanner img="/images/banner-team-teacher.jpg" className="mb-12 " />
            <AboutPage
             dataEcosystem={aboutData?.items || ecosystemData}
             />
        </div>
    )
}
