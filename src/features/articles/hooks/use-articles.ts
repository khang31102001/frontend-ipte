"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { articleCategoryService, articleService, tagService } from "../services/article-service";

const articleHooks = createCrudHooks({ name: "articles", service: articleService, label: "bài viết" });
export const useArticles = articleHooks.useList;
export const useArticle = articleHooks.useDetail;
export const useCreateArticle = articleHooks.useCreate;
export const useUpdateArticle = articleHooks.useUpdate;
export const useDeleteArticle = articleHooks.useRemove;

const categoryHooks = createCrudHooks({ name: "article-categories", service: articleCategoryService, label: "danh mục" });
export const useArticleCategories = categoryHooks.useList;
export const useCreateArticleCategory = categoryHooks.useCreate;
export const useUpdateArticleCategory = categoryHooks.useUpdate;
export const useDeleteArticleCategory = categoryHooks.useRemove;

const tagHooks = createCrudHooks({ name: "tags", service: tagService, label: "tag" });
export const useTags = tagHooks.useList;
export const useCreateTag = tagHooks.useCreate;
export const useUpdateTag = tagHooks.useUpdate;
export const useDeleteTag = tagHooks.useRemove;
