import HeroBanner from "@/components/banner/hero-banner";
import { articles, pteTipData } from "@/data/news";
import NewPage from "@/pages/pte-ipass/news/news-page";
import { newsService } from "@/services/news/newsService";

export default async function IndexNews() {
    const newsJoinedKnowledge = await newsService.getNewsAndTips({});
    console.log("News and Tips data:", newsJoinedKnowledge);
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
