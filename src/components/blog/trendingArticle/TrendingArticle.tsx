'user client'

import Button from '@/components/button/Button'
import ArticleItem from './ArticleItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function TrendingArticle(params: any) {
    // handle expand article on trending area
    const onClickSeemore = () => {
        console.log('See more!')
    }

    return (
        <div className="p-5 border border-solid w-full mt-6 rounded-2xl">
            <h4 className="font-bold text-xl">Trending Articles</h4>
            <ArticleItem />
            <ArticleItem />
            <Button
                // onClick={onClickSeemore}
                className="w-full py-2 border border-solid rounded-3xl mt-3 hover:bg-slate-50 hover:dark:bg-slate-800"
                rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
                See more
            </Button>
        </div>
    )
}
