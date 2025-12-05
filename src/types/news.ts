
export interface News {
  id: number;
  authorId?: number;
  image?: string | null;
  title?: string | null;
  slug?: string;

  description?: string | null;   
  content?: string | null;       
  categoryId?: number | null;
  category?: string | null;

  createdAt?: string;
  updatedAt?: string;

  authorName?: string | null;
  authorAvatar?: string | null;

  status?: "Draft" | "Published" | "Archived";

  isFeatured?: boolean;

  startDate?: string;
  endDate?: string;

  metaTitle?: string;
  metaDescription?: string;

  tags?: any[];
  keywords?: string[];
}

