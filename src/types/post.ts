import { Category } from "./category";
import { Tag } from "./tag";

export interface Post {
    id: number,
    author_id: number;
    img: string
    title: string,
    slug: string,
    summary: string; // Tóm tắt ngắn
    content: string; // Nội dung chi tiết
    category_id: number | null,
    category?: Category;
    created_at: string;
    updated_at: string;
    type: "news" | "event" | "document";
    status: "Draft" | "Published" | "Archived";
    isFeatured: boolean;
    startDate?: string; 
    endDate?: string;   
    metaTitle: string;
    metaDescription: string;
    tags?: Tag[];
    keywords: string[];
}