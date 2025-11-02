export interface PTETips {
     id: number,
    author_id?: number;
    image?: string | null
    title?: string | null,
    slug?: string,
    description?: string | null; // Tóm tắt ngắn
    content?: string | null; // Nội dung chi tiết
    category_id?: number | null,
    category?: string | null;
    created_at?: string;
    updated_at?: string;
    authorname?: string | null;
    authoravatar?: string | null;
    status?: "Draft" | "Published" | "Archived";
    isFeatured?: boolean;
    startDate?: string; 
    endDate?: string;   
    metaTitle?: string;
    metaDescription?: string;
    tags?: any[];
    keywords?: string[];
}