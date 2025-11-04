import { CategoryItem } from "./category";

export interface Course {
  id?: number | null;
  author_id?: number | null;
  img?: string | null;
  title?: string | null;
  slug?: string | null;
  description?: string | null; // Tóm tắt ngắn
  content?: string | null;     // Nội dung chi tiết
  level?: string | null;
  duration?: string | null;
  schedule?: string | null;
  tuition?: string | null;
  category?: CategoryItem | null;
  created_at?: string | null;
  updated_at?: string | null;
  isFeatured?: boolean | null;
  startDate?: string | null;
  endDate?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string[] | null;
}
