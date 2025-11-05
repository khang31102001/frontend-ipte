

// export enum CategoryType {
//   HEADER_MENU = "HEADER_MENU",
//   FOOTER_MENU = "FOOTER_MENU",
//   SIDEBAR_MENU = "SIDEBAR_MENU",
//   COURSE = "COURSE"
// }

import { Course } from "./courses";

export interface Category {
    id: number
    level?: number,
    icon?: string,
    name: string,
    slug?: string,
    url?: string,
    description?: string,
    parent_id?: number | null,
    category_type?: string,
    children?: CategoryItem[] ,
    meta_title?: string,
    meta_description?: string,
    h1_heading?: string,
    seo_content_top?: string,
    seo_content_bottom?: string,
    canonical_url?: string,
    noindex?: boolean
}

export interface CategoryItem {
    id: number
    icon?: string,
    name: string,
    slug?: string,
    url?: string,
    description?: string,
    parent_id?: number | null,
    category_type?: string,
    children?: CategoryItem[],
    meta_title?: string,
    meta_description?: string,
    h1_heading?: string,
    seo_content_top?: string,
    seo_content_bottom?: string,
    canonical_url?: string,
    noindex?: boolean
}

export interface CourseCategory extends Omit<CategoryItem, "children"> {
    children?: CourseCategory[];
    courses?: Course[];
}




