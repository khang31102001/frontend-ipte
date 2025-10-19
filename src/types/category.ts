export enum CategoryType {
  HEADER_MENU = "HEADER_MENU",
  FOOTER_MENU = "FOOTER_MENU",
  SIDEBAR_MENU = "SIDEBAR_MENU",
}


export interface CategoryItem {
    id: number
    icon?: string,
    name: string,
    slug?: string,
    url?: string,
    description?: string,
    parent_id?: number | null,
    category_type?: CategoryType,
    children?: CategoryItem[] ,
    meta_title?: string,
    meta_description?: string,
    h1_heading?: string,
    seo_content_top?: string,
    seo_content_bottom?: string,
    canonical_url?: string,
    noindex?: boolean
}



