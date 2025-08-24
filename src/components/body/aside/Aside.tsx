import Bookmark from '@/components/blog/asideArticle/Bookmark'
import TrendingArticle from '@/components/blog/trendingArticle/TrendingArticle'
import AsideFooter from '@/components/footer/AsideFooter'

export default function Aside() {
    return (
        <aside className="w-2/5 ">
            <TrendingArticle />
            <Bookmark />
            <AsideFooter />
        </aside>
    )
}
