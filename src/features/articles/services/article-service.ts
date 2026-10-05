import { createCrudService } from "@/core/api";
import type { ArticleCategoryInput, ArticleInput, TagInput } from "../schemas";
import type { Article, ArticleCategory, ArticleCategoryQuery, ArticleQuery, Tag, TagQuery } from "../types";

export const articleService = createCrudService<Article, ArticleInput, ArticleInput, ArticleQuery>("/articles");
export const articleCategoryService = createCrudService<ArticleCategory, ArticleCategoryInput, ArticleCategoryInput, ArticleCategoryQuery>("/article-categories");
export const tagService = createCrudService<Tag, TagInput, TagInput, TagQuery>("/tags");
