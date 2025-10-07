
export interface Category {
    id: number
    icon?: string,
    name: string,
    slug: string,
    description?: string,
    parent_id: number | null,
    category_type: string,
    children?: Category[] ,
    meta_title?: string,
    meta_description?: string,
    h1_heading?: string,
    seo_content_top?: string,
    seo_content_bottom?: string,
    canonical_url?: string,
    noindex?: boolean
}

export interface Categories {
    id: number
    icon?: string,
    name: string,
    slug: string,
    description?: string,
    parent_id: number | null,
    children: Categories[] ,
    level: number,
    category_type: string,
    meta_title?: string,
    meta_description?: string,
    h1_heading?: string,
    seo_content_top?: string,
    seo_content_bottom?: string,
    canonical_url?: string,
    noindex?: boolean
}


