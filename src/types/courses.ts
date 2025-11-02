import { CategoryItem } from "./category";

export interface Course {
    id: number,
        author_id?: number;
        img: string
        title: string,
        slug: string,
        summary: string; // Tóm tắt ngắn
        content: string; // Nội dung chi tiết
        level?: string;
        duration?: string;
        schedule?: string;
        tuition?: string;
        category?: CategoryItem;
        created_at?: string;
        updated_at?: string;
        isFeatured?: boolean;
        startDate?: string; 
        endDate?: string;   
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
}