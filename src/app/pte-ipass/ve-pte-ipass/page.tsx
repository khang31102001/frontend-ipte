import HeroBanner from '@/components/banner/hero-banner'
import AboutPage from '@/pages/pte-ipass/about/about-page'
import { ecosystemData } from "@/data/ecosystemData";
import { aboutMeService } from '@/services/about-me/newsService';

export default async function IndexAbout() {
    const dataEcosystem = await aboutMeService.getAboutMe({ category: "ABOUT_ME" }).then(res => res?.items || []);
    const branches = await aboutMeService.getAboutMe({ category: "BRANCH" }).then(res => res?.items || []);
    return (
        <div>
            <HeroBanner img="/images/banner-team-teacher.jpg" className="mb-12 " />
            <AboutPage
             dataEcosystem={dataEcosystem}
             branches={branches}
             />
        </div>
    )
}
