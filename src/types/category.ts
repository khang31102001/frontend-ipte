

// export enum CategoryType {
//   HEADER_MENU = "HEADER_MENU",
//   FOOTER_MENU = "FOOTER_MENU",
//   SIDEBAR_MENU = "SIDEBAR_MENU",
//   COURSE = "COURSE"
// }

import { Course } from "./courses";
import { Knowledges } from "./knowledges";
import { News } from "./news";

export interface Category {
    category_id: number;
    level?: number;
    icon?: string;
    name: string;
    slug?: string;
    url?: string;
    description?: string;
    parent_id?: number | null;
    category_type?: string;
    children?: CategoryItem[];
    is_featured?: boolean;
    is_disable?: boolean;
    created_at?: string ;
    updated_at?: string;
    meta_title?: string,
    meta_description?: string,
    h1_heading?: string,
    seo_content_top?: string,
    seo_content_bottom?: string,
    canonical_url?: string,
    noindex?: boolean
    version: number;
}

export interface CategoryItem {
    category_id: number;
    icon?: string;
    name: string;
    slug?: string;
    url?: string;
    description?: string;
    parent_id?: number | null;
    level: number | null;
    category_type?: string,
    children?: CategoryItem[];
     is_featured?: boolean;
    is_disable?: boolean;
     created_at?: string ;
    updated_at?: string;
    meta_title?: string;
    meta_description?: string;
    h1_heading?: string;
    seo_content_top?: string;
    seo_content_bottom?: string;
    canonical_url?: string;
    noindex?: boolean;
    version: number | null;
}

export interface CourseCategory extends Omit<CategoryItem, "children"> {
    children?: CourseCategory[];
    courses?: Course[];
}

export interface NewsCategory extends Omit<CategoryItem, "children"> {
    children?: NewsCategory[];
    news?: News[];
}

export interface KnowledgesCategory extends Omit<CategoryItem, "children"> {
    children?: NewsCategory[];
    knowledges?: Knowledges[];
}






