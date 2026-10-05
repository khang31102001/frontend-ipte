"use client";

import { usePermissions } from "@/core/rbac";
import { CONTENT_STATUS_LABELS } from "@/shared/domain/content";
import { toOptions } from "@/shared/domain/pte";
import { Form, FormActions, createFormFields, useAutoSlug, useEntityForm } from "@/shared/form";
import { useLookup } from "@/shared/lookups/use-lookup";
import { Card, CardBody, CardHeader } from "@/shared/ui";
import { useCreateArticle, useUpdateArticle } from "../hooks/use-articles";
import { articleSchema, type ArticleFormValues } from "../schemas";
import type { Article } from "../types";

const F = createFormFields<ArticleFormValues>();

const DEFAULTS: Partial<ArticleFormValues> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverUrl: "",
  categoryId: "",
  tagIds: [],
  authorId: "",
  isFeatured: false,
  status: "draft",
  metaTitle: "",
  metaDescription: "",
};

function toValues(a: Article): Partial<ArticleFormValues> {
  return {
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    content: a.content,
    coverUrl: a.coverUrl ?? "",
    categoryId: a.categoryId,
    tagIds: a.tagIds,
    authorId: a.authorId ?? "",
    isFeatured: a.isFeatured,
    status: a.status,
    metaTitle: a.metaTitle ?? "",
    metaDescription: a.metaDescription ?? "",
  };
}

export function ArticleForm({ article, onSaved, onCancel }: { article?: Article; onSaved?: (article: Article) => void; onCancel?: () => void }) {
  const create = useCreateArticle();
  const update = useUpdateArticle();
  const categories = useLookup("article-categories");
  const tags = useLookup("tags");
  const staff = useLookup("staff");
  const { can } = usePermissions();

  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: articleSchema,
    entity: article,
    defaults: DEFAULTS,
    toValues,
    create: (values) => create.mutateAsync(values),
    update: (id, values) => update.mutateAsync({ id, input: values }),
    onSaved,
  });
  useAutoSlug(form, "title", "slug", !isEdit);

  const canWrite = can(isEdit ? "article.edit" : "article.create");
  const canApprove = can("article.approve");
  const currentStatus = form.watch("status");
  const statusOptions = toOptions(CONTENT_STATUS_LABELS).filter((o) => canApprove || o.value !== "published" || currentStatus === "published");

  return (
    <Form form={form} onSubmit={onSubmit} id="article-form">
      <fieldset disabled={!canWrite || isSubmitting} className="space-y-5">
        <Card>
          <CardHeader title="Nội dung bài viết" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Input name="title" label="Tiêu đề" required className="md:col-span-2" />
            <F.Input name="slug" label="Slug (URL)" required hint="Tự sinh từ tiêu đề" />
            <F.Input name="coverUrl" label="Ảnh đại diện (URL)" placeholder="https://…" />
            <F.Textarea name="excerpt" label="Mô tả ngắn" required rows={3} className="md:col-span-2" />
            <F.Textarea name="content" label="Nội dung" required rows={16} className="md:col-span-2" hint="Hỗ trợ văn bản thuần/Markdown. Trình soạn thảo trực quan sẽ được tích hợp sau." />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Phân loại & xuất bản" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Select name="categoryId" label="Danh mục" required options={categories.options} placeholder="— Chọn danh mục —" />
            <F.Select name="authorId" label="Tác giả" options={staff.options} placeholder="— Người tạo —" />
            <F.CheckboxGroup name="tagIds" label="Tag" options={tags.options} className="md:col-span-2" />
            <F.Select name="status" label="Trạng thái" options={statusOptions} hint={canApprove ? undefined : "Chọn “Chờ duyệt” để gửi cho người có quyền Duyệt"} />
            <F.Switch name="isFeatured" label="Bài viết nổi bật" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="SEO" />
          <CardBody className="grid grid-cols-1 gap-5">
            <F.Input name="metaTitle" label="Meta title" hint="Tối đa 70 ký tự" />
            <F.Textarea name="metaDescription" label="Meta description" rows={3} hint="Tối đa 170 ký tự" />
          </CardBody>
        </Card>
      </fieldset>
      {canWrite && <FormActions submitting={isSubmitting} submitLabel={isEdit ? "Lưu thay đổi" : "Tạo bài viết"} onCancel={onCancel} />}
    </Form>
  );
}
