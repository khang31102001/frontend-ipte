"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { usePermissions } from "@/core/rbac";
import { CONTENT_STATUS_LABELS } from "@/shared/domain/content";
import { toOptions } from "@/shared/domain/pte";
import { Form, FormActions, createFormFields, useAutoSlug, useEntityForm } from "@/shared/form";
import { Button, Card, CardBody, CardHeader } from "@/shared/ui";
import { useCreatePage, useUpdatePage } from "../hooks/use-pages";
import { cmsPageSchema, type CmsPageFormValues } from "../schemas";
import { PAGE_TEMPLATE_LABELS, SECTION_TYPE_LABELS, type CmsPage, type SectionType } from "../types";

const F = createFormFields<CmsPageFormValues>();

const DEFAULTS: Partial<CmsPageFormValues> = {
  title: "",
  slug: "",
  template: "static",
  status: "draft",
  summary: "",
  content: "",
  sections: [],
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  noindex: false,
};

function toValues(p: CmsPage): Partial<CmsPageFormValues> {
  return {
    title: p.title,
    slug: p.slug,
    template: p.template,
    status: p.status,
    summary: p.summary ?? "",
    content: p.content ?? "",
    sections: p.sections.map((s) => ({
      type: s.type,
      heading: s.heading,
      body: s.body ?? "",
      buttonLabel: s.buttonLabel ?? "",
      buttonUrl: s.buttonUrl ?? "",
      imageUrl: s.imageUrl ?? "",
      items: s.items,
    })),
    metaTitle: p.metaTitle ?? "",
    metaDescription: p.metaDescription ?? "",
    canonicalUrl: p.canonicalUrl ?? "",
    noindex: p.noindex,
  };
}

const ITEM_HINT: Partial<Record<SectionType, string>> = {
  features: "Mỗi dòng một điểm nổi bật",
  faq: "Mỗi dòng: Câu hỏi | Câu trả lời",
  hero: "Mỗi dòng một ý nổi bật (hiển thị dạng danh sách tích xanh)",
  stats: "Mỗi dòng một số liệu, ví dụ: 15.000+ học viên đạt điểm",
  steps: "Mỗi dòng: Tên bước | Mô tả",
  programs: "Mỗi dòng: Tên chương trình | Mô tả | Đường dẫn (tùy chọn)",
  gallery: "Mỗi dòng: Đường dẫn ảnh | Chú thích",
};

export function PageForm({ page, onSaved, onCancel }: { page?: CmsPage; onSaved?: (page: CmsPage) => void; onCancel?: () => void }) {
  const create = useCreatePage();
  const update = useUpdatePage();
  const { can } = usePermissions();

  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: cmsPageSchema,
    entity: page,
    defaults: DEFAULTS,
    toValues,
    create: (values) => create.mutateAsync(values),
    update: (id, values) => update.mutateAsync({ id, input: values }),
    onSaved,
  });
  useAutoSlug(form, "title", "slug", !isEdit);
  const sections = useFieldArray({ control: form.control, name: "sections" });
  const template = form.watch("template");
  const currentStatus = form.watch("status");

  const canWrite = can(isEdit ? "page.edit" : "page.create");
  const canApprove = can("page.approve");
  const statusOptions = toOptions(CONTENT_STATUS_LABELS).filter((o) => canApprove || o.value !== "published" || currentStatus === "published");
  const sectionsError = form.formState.errors.sections;
  const sectionsMessage = (sectionsError?.root?.message ?? (typeof sectionsError?.message === "string" ? sectionsError.message : undefined)) as string | undefined;

  return (
    <Form form={form} onSubmit={onSubmit} id="page-form">
      <fieldset disabled={!canWrite || isSubmitting} className="space-y-5">
        <Card>
          <CardHeader title="Thông tin trang" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Input name="title" label="Tiêu đề" required />
            <F.Input name="slug" label="Slug (URL)" required hint="Tự sinh từ tiêu đề" />
            <F.Select name="template" label="Loại trang" options={toOptions(PAGE_TEMPLATE_LABELS)} />
            <F.Select name="status" label="Trạng thái" options={statusOptions} hint={canApprove ? undefined : "Chọn “Chờ duyệt” để gửi cho người có quyền Duyệt"} />
            <F.Textarea name="summary" label="Mô tả ngắn" rows={2} className="md:col-span-2" />
          </CardBody>
        </Card>

        {template === "static" ? (
          <Card>
            <CardHeader title="Nội dung" />
            <CardBody>
              <F.Textarea name="content" label="Nội dung trang" rows={14} required hint="Hỗ trợ văn bản thuần/Markdown. Trình soạn thảo trực quan sẽ được tích hợp sau." />
            </CardBody>
          </Card>
        ) : (
          <Card>
            <CardHeader
              title="Các khối nội dung"
              description="Landing page được ghép từ các khối theo thứ tự từ trên xuống"
              actions={
                canWrite && (
                  <Button
                    variant="outline"
                    size="sm"
                    startIcon={<Plus className="size-4" />}
                    onClick={() => sections.append({ type: "text", heading: "", body: "", buttonLabel: "", buttonUrl: "", imageUrl: "", items: [] })}
                  >
                    Thêm khối
                  </Button>
                )
              }
            />
            <CardBody className="space-y-4">
              {sectionsMessage && <p role="alert" className="text-sm text-error-500">{sectionsMessage}</p>}
              {sections.fields.length === 0 && <p className="py-6 text-center text-sm text-gray-500">Chưa có khối nào.</p>}
              {sections.fields.map((field, index) => {
                const type = form.watch(`sections.${index}.type`) as SectionType;
                return (
                  <div key={field.id} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-brand-500">Khối {index + 1}</p>
                      {canWrite && (
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" aria-label="Chuyển lên" disabled={index === 0} onClick={() => sections.move(index, index - 1)}>
                            <ArrowUp className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Chuyển xuống" disabled={index === sections.fields.length - 1} onClick={() => sections.move(index, index + 1)}>
                            <ArrowDown className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Xóa khối" onClick={() => sections.remove(index)}>
                            <Trash2 className="size-4 text-error-500" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <F.Select name={`sections.${index}.type`} label="Loại khối" options={toOptions(SECTION_TYPE_LABELS)} />
                      <F.Input name={`sections.${index}.heading`} label="Tiêu đề khối" required />
                      <F.Textarea name={`sections.${index}.body`} label="Nội dung" rows={3} className="md:col-span-2" />
                      {(type === "hero" || type === "cta") && (
                        <>
                          <F.Input name={`sections.${index}.buttonLabel`} label="Nhãn nút" />
                          <F.Input name={`sections.${index}.buttonUrl`} label="Liên kết nút" placeholder="/lien-he hoặc #form" />
                        </>
                      )}
                      {(type === "hero" || type === "text") && <F.Input name={`sections.${index}.imageUrl`} label="Ảnh (URL)" className="md:col-span-2" />}
                      {(type === "features" || type === "faq") && (
                        <F.Lines name={`sections.${index}.items`} label="Mục" hint={ITEM_HINT[type]} className="md:col-span-2" rows={4} />
                      )}
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        )}

        <Card>
          <CardHeader title="SEO" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Input name="metaTitle" label="Meta title" hint="Tối đa 70 ký tự" />
            <F.Input name="canonicalUrl" label="Canonical URL" placeholder="https://…" />
            <F.Textarea name="metaDescription" label="Meta description" rows={3} className="md:col-span-2" hint="Tối đa 170 ký tự" />
            <F.Switch name="noindex" label="Không cho công cụ tìm kiếm lập chỉ mục (noindex)" className="md:col-span-2" />
          </CardBody>
        </Card>
      </fieldset>
      {canWrite && <FormActions submitting={isSubmitting} submitLabel={isEdit ? "Lưu thay đổi" : "Tạo trang"} onCancel={onCancel} />}
    </Form>
  );
}
