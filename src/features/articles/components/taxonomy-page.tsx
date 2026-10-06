"use client";

import { useState } from "react";
import { CrudListPage } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { Form, FormModal, createFormFields, useAutoSlug, useEntityForm } from "@/shared/form";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { Badge, PageHeader, Tabs } from "@/shared/ui";
import {
  useArticleCategories,
  useCreateArticleCategory,
  useCreateTag,
  useDeleteArticleCategory,
  useDeleteTag,
  useTags,
  useUpdateArticleCategory,
  useUpdateTag,
} from "../hooks/use-articles";
import { articleCategorySchema, tagSchema, type ArticleCategoryFormValues, type TagFormValues } from "../schemas";
import type { ArticleCategory, ArticleCategoryQuery, Tag, TagQuery } from "../types";

const CF = createFormFields<ArticleCategoryFormValues>();
const TF = createFormFields<TagFormValues>();

function useCategoriesList(query: ListParams<never>) {
  return useArticleCategories(query as ArticleCategoryQuery);
}
function useTagsList(query: ListParams<never>) {
  return useTags(query as TagQuery);
}

const categoryColumns: Column<ArticleCategory>[] = [
  { key: "sortOrder", header: "#", sortKey: "sortOrder", className: "w-14", cell: (c) => c.sortOrder },
  {
    key: "name",
    header: "Danh mục",
    sortKey: "name",
    cell: (c) => (
      <span>
        <span className="block font-medium text-gray-800 dark:text-white/90">{c.name}</span>
        <span className="block text-theme-xs text-gray-500">/{c.slug}</span>
      </span>
    ),
  },
  { key: "articleCount", header: "Số bài viết", sortKey: "articleCount", align: "center", cell: (c) => c.articleCount },
  { key: "isActive", header: "Trạng thái", cell: (c) => <Badge color={c.isActive ? "success" : "gray"}>{c.isActive ? "Đang dùng" : "Ẩn"}</Badge> },
];

const tagColumns: Column<Tag>[] = [
  {
    key: "name",
    header: "Tag",
    sortKey: "name",
    cell: (t) => (
      <span>
        <span className="block font-medium text-gray-800 dark:text-white/90">{t.name}</span>
        <span className="block text-theme-xs text-gray-500">/{t.slug}</span>
      </span>
    ),
  },
  { key: "articleCount", header: "Số bài viết", sortKey: "articleCount", align: "center", cell: (t) => t.articleCount },
];

function CategoryDialog({ category, open, onClose }: { category: ArticleCategory | null; open: boolean; onClose: () => void }) {
  const create = useCreateArticleCategory();
  const update = useUpdateArticleCategory();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: articleCategorySchema,
    entity: category,
    defaults: { name: "", slug: "", description: "", sortOrder: 1, isActive: true },
    toValues: (c) => ({ name: c.name, slug: c.slug, description: c.description ?? "", sortOrder: c.sortOrder, isActive: c.isActive }),
    resetKey: open,
    create: (v) => create.mutateAsync(v),
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved: onClose,
  });
  useAutoSlug(form, "name", "slug", !isEdit);
  return (
    <FormModal open={open} onClose={onClose} title={isEdit ? "Sửa danh mục" : "Thêm danh mục"} formId="article-category-form" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="article-category-form">
        <CF.Input name="name" label="Tên danh mục" required />
        <CF.Input name="slug" label="Slug" required />
        <CF.Textarea name="description" label="Mô tả" rows={3} />
        <CF.Input name="sortOrder" label="Thứ tự" type="number" numeric required min={0} />
        <CF.Switch name="isActive" label="Đang sử dụng" />
      </Form>
    </FormModal>
  );
}

function TagDialog({ tag, open, onClose }: { tag: Tag | null; open: boolean; onClose: () => void }) {
  const create = useCreateTag();
  const update = useUpdateTag();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: tagSchema,
    entity: tag,
    defaults: { name: "", slug: "" },
    toValues: (t) => ({ name: t.name, slug: t.slug }),
    resetKey: open,
    create: (v) => create.mutateAsync(v),
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved: onClose,
  });
  useAutoSlug(form, "name", "slug", !isEdit);
  return (
    <FormModal open={open} onClose={onClose} title={isEdit ? "Sửa tag" : "Thêm tag"} formId="tag-form" size="sm" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="tag-form">
        <TF.Input name="name" label="Tên tag" required />
        <TF.Input name="slug" label="Slug" required />
      </Form>
    </FormModal>
  );
}

type TabKey = "categories" | "tags";

/** Quản lý danh mục bài viết và tag (taxonomy) trên cùng một màn hình. */
export function TaxonomyPage() {
  const [tab, setTab] = useState<TabKey>("categories");
  const categoryDialog = useDialogState<ArticleCategory>();
  const tagDialog = useDialogState<Tag>();

  return (
    <RequirePermission permission="taxonomy.view">
      <PageHeader title="Danh mục & Tag" description="Phân loại bài viết trên website" />
      <Tabs
        className="mb-5"
        items={[
          { key: "categories", label: "Danh mục bài viết" },
          { key: "tags", label: "Tag" },
        ]}
        value={tab}
        onChange={setTab}
      />
      {tab === "categories" ? (
        <CrudListPage<ArticleCategory>
          embedded
          title="Danh mục bài viết"
          resource="taxonomy"
          noun="danh mục"
          useList={useCategoriesList}
          useRemove={useDeleteArticleCategory}
          columns={categoryColumns}
          defaultSort={{ sortBy: "sortOrder", sortOrder: "asc" }}
          getRowLabel={(c) => c.name}
          onCreate={categoryDialog.openCreate}
          onEdit={categoryDialog.openEdit}
        />
      ) : (
        <CrudListPage<Tag>
          embedded
          title="Tag"
          resource="taxonomy"
          noun="tag"
          useList={useTagsList}
          useRemove={useDeleteTag}
          columns={tagColumns}
          defaultSort={{ sortBy: "name", sortOrder: "asc" }}
          getRowLabel={(t) => t.name}
          onCreate={tagDialog.openCreate}
          onEdit={tagDialog.openEdit}
        />
      )}
      <CategoryDialog category={categoryDialog.editing} open={categoryDialog.open} onClose={categoryDialog.close} />
      <TagDialog tag={tagDialog.editing} open={tagDialog.open} onClose={tagDialog.close} />
    </RequirePermission>
  );
}
