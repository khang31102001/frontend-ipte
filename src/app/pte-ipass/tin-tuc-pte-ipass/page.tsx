import HeroImage from "@/components/banner/banner";

import { articles, pteTipData } from "@/data/news";
import NewPage from "@/pages/pte-ipass/news/news-page";
import { newsService } from "@/services/news/newsService";

export default async function IndexNews() {
    const newsJoinedKnowledge = await newsService.getNewsAndTips({});
    console.log("News and Tips data:", newsJoinedKnowledge);
    return (
        <div>
            <HeroImage
                src="/images/hero-banner-new.png"
                objectPosition="center"
                preset="soft"
                className="hero--fullscreen"

            />
            <NewPage
                dataNews={newsJoinedKnowledge.news || articles}
                dataTip={newsJoinedKnowledge.tips || pteTipData}
            />
        </div>
    )
}
