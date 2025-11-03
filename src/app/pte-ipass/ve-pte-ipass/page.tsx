import HeroBanner from '@/components/banner/hero-banner'
import AboutPage from '@/pages/pte-ipass/about/about-page'
import { aboutService } from '@/lib/service/about';

export default async function IndexAbout() {
    const dataEcosystem = await aboutService.getAboutMeList({ category: "ABOUT_ME" }).then(res => res?.items ?? []);
    const dataBranches = await aboutService.getAboutMeList({ category: "BRANCH" }).then(res => res?.items ?? []);
    const dataAudiences = await aboutService.getAboutMeList({ category: "AUDIENCE" }).then(res => res?.items || []);

    // console.log("dataEcosystem", dataEcosystem);
    // console.log("branches", branches);
    return (
        <div>
            <HeroBanner img="/images/banner-team-teacher.jpg" className="mb-12 " />
            
            <AboutPage
                dataEcosystem={dataEcosystem }
                dataBranches={dataBranches}
                dataAudiences={dataAudiences}
            />
        </div>
    )
}
