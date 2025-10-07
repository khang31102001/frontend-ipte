import { Category } from "./category";

export interface Course {
    id: number,
    img: string
    title: string,
    slug: string,
    description: string,
    category_id: number | null,
    category?: Category,
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
}