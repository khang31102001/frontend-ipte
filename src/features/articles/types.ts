import type { BaseEntity, ListQuery } from "@/core/api";
import type { ContentStatus } from "@/shared/domain/content";

export type ArticleStatus = ContentStatus;

export interface ArticleCategory extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  /** Số bài viết (API tính). */
  articleCount: number;
}
export type ArticleCategoryQuery = ListQuery & { isActive?: "true" | "false" };

export interface Tag extends BaseEntity {
  name: string;
  slug: string;
  /** Số bài viết gắn tag (API tính). */
  articleCount: number;
}
export type TagQuery = ListQuery;

export interface Article extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  /** Nội dung bài viết (HTML/Markdown). */
  content: string;
  coverUrl?: string;
  categoryId: string;
  categoryName?: string;
  tagIds: string[];
  tagNames?: string[];
  authorId?: string;
  authorName?: string;
  isFeatured: boolean;
  status: ArticleStatus;
  publishedAt?: string | null;
  metaTitle?: string;
  metaDescription?: string;
  /** Thời gian đọc ước tính (phút), API tính. */
  readingMinutes: number;
  viewCount: number;
}

export interface ArticleQuery extends ListQuery {
  status?: ArticleStatus;
  categoryId?: string;
  authorId?: string;
  tagId?: string;
  isFeatured?: "true" | "false";
}
