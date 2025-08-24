'use client'

import Button from '@/components/button/Button'
import ArticleItem from './ArticleItem'

interface AsideAritleProps {
    article?: []
}

export default function Bookmark({ article }: AsideAritleProps) {
    // handle expand article on trending area

    return (
        <div className="p-5 border border-solid w-full mt-6 rounded-2xl dark:border-slate-800">
            <h4 className="font-bold text-xl">Bookmarks</h4>
            <ArticleItem />
            <ArticleItem />
            <Button
                href="/bookmark"
                className="block text-center text-sm w-full py-2 border border-solid rounded-3xl mt-3 hover:bg-slate-50 hover:dark:bg-slate-800 dark:border-slate-800"
            >
                See all bookmarks
            </Button>
        </div>
    )
}
