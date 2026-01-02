import NewsSwiper from '@/components/news/news-swiper';
import { CategoryItem } from '@/types/category';
import { News } from '@/types/news'
import React from 'react'
import NewsListSection from '../news-list-section';

type layout_type = "grid" | "swiper";

interface NewCategoryItemProps {
    category: CategoryItem;
    newData: News[];
    layout_type?: layout_type;
}
const NewsCategoryItem = ({
    category,
    newData,
    layout_type,

}: NewCategoryItemProps) => {

    if (layout_type === "swiper") {
        return (
            <NewsSwiper
                category={category}
                newItem={newData}
            />
        )
    }
    return (
        <NewsListSection
            category={category}
            newData={newData}
        />
    )
}

export default NewsCategoryItem