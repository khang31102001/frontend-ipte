// import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import { newServices } from "@/lib/service/new";
import NewPage from "@/pages/pte-ipass/news/news-page";


export default async function IndexNews() {
    const data = await newServices.getNewsAndTipList({})
    const news = data.news ?? [];
    const tips = data.tips ?? []
    return (
        <div>
            <HeroBanner img="/images/hero-banner-new.png" className="mb-12"/>
            
            <NewPage
                dataNews={news}
                dataTip={tips}
            />
        </div>
    )
}
