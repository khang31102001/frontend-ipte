import HeroBanner from "@/components/banner/hero-banner";
import { articles, pteTipData } from "@/data/news";
import NewPage from "@/pages/pte-ipass/news/news-page";


export default function IndexNews() {
    return (
        <div>
            <HeroBanner img="/images/hero-banner-new.png" className="mb-12 " />
            <NewPage
                dataNews={articles}
                dataTip={pteTipData}
            />
        </div>
    )
}
