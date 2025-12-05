import { Course } from "./courses";
import { Knowledges } from "./knowledges";
import { News } from "./news";

export interface CategoryItem {
  categoryId: number;

  icon?: string;
  name: string;
  slug?: string;
  url?: string;
  description?: string;

  parentId?: number | null;
  level: number | null;

  categoryType?: string;

  children?: CategoryItem[];

  isFeatured?: boolean;
  isDisable?: boolean;

  createdAt?: string;
  updatedAt?: string;

  metaTitle?: string;
  metaDescription?: string;

  h1Heading?: string;

  seoContentTop?: string;
  seoContentBottom?: string;

  canonicalUrl?: string;

  noindex?: boolean;

  version: number | null;
}

export interface CourseCategory extends Omit<CategoryItem, "children"> {
    children?: CourseCategory[];
    courses?: Course[];
}

export interface NewsCategory extends Omit<CategoryItem, "children"> {
    children?: NewsCategory[];
    news?: News[];
}

export interface KnowledgesCategory extends Omit<CategoryItem, "children"> {
    children?: NewsCategory[];
    knowledges?: Knowledges[];
}






