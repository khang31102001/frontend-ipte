"use client";

import { CourseCategory, NewsCategory } from "@/types/category";

import NewsCategoryItem from "./news-category-item";

interface NewsCategorySection {
    newsCategory: NewsCategory
}

const NewsCategorySection = ({
    newsCategory,
}: NewsCategorySection) => {

    if (!newsCategory) return null;
    const newsData = Array.isArray(newsCategory.news) ? newsCategory.news : [];

    return (

        <NewsCategoryItem
            category={newsCategory}
            newData={newsData}
            layout_type="swiper"
        />

    );
}

export default NewsCategorySection;
