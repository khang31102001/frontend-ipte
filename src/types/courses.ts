import { CategoryItem } from "./category";

export interface Course {
  courseId?: number | null;
  authorId?: number | null;
  image?: string | null;
  title?: string | null;
  slug?: string | null;
  description?: string | null;      // Tóm tắt ngắn
  content?: string | null;          // Nội dung chi tiết
  level?: string | null;
  duration?: string | null;
  schedule?: string | null;
  tuition?: string | null;

  category?: CategoryItem | null;
  categoryId?: number;

  createdAt?: string | null;
  updatedAt?: string | null;

  isFeatured?: boolean | null;

  startDate?: string | null;
  endDate?: string | null;

  metaTitle?: string | null;
  metaDescription?: string | null;

  keywords?: string[] | null;
}


export interface CourseListResponse {
  items: Course[];
  page: number | null;
  pageSize: number | null;
  total: number | null;
  totalPages: number | null;
}