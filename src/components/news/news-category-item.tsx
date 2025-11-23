import NewsList from '@/components/news/list/news-list-items';
import NewsSwiper from '@/components/news/news-swiper';
import { News } from '@/types/news'
import React from 'react'

type layout_type = "grid" | "swiper";
interface NewCategoryItemProps {
    title?: string;
    desription?: string;
    newList: News[];
    layout_type?: layout_type;
    category_url?: string;
}
const NewsCategoryItem = ({
    title,
    desription,
    newList,
    layout_type,
    category_url
}: NewCategoryItemProps) => {

    if (layout_type === "swiper") {
        return (
            <NewsSwiper
                title={title}
                description={desription}
                data={newList}
                href={category_url}
            />
        )
    }
    return (
        <NewsList
            title={title}
            description={desription}
            data={newList}
        />
    )
}

export default NewsCategoryItem