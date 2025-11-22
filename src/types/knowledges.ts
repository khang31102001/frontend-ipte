import { CategoryItem } from "./category";

export interface Knowledges {
  id: number ;
  image?: string | null;
  title?: string | null;
  slug?: string | null;
  description?: string | null; // Tóm tắt ngắn
  content?: string | null;     // Nội dung chi tiết
  created_at?: string | null;
  updated_at?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string[] | null;
}



