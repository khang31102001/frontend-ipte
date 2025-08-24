'use client'

import Button from '@/components/button/Button'
import ArticleItem from './ArticleItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface AsideAritleProps {
    article?: []
    onClick?: () => void
}

export default function TrendingArticle({
    article,
    onClick,
}: AsideAritleProps) {
    // handle expand article on trending area

    return (
        <div className="p-5 border border-solid w-full mt-6 rounded-2xl dark:border-slate-800">
            <h4 className="font-bold text-xl">Trending Articles</h4>
            <ArticleItem />
            <ArticleItem />
            <Button
                onClick={onClick}
                className="w-full py-2 text-sm border border-solid rounded-3xl mt-3 hover:bg-slate-50 hover:dark:bg-slate-800 dark:border-slate-800"
                rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
                See more
            </Button>
        </div>
    )
}
