"use client";

import { ArrowRight, Star } from "lucide-react";
import { usePermissions } from "@/core/rbac";
import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { CONTENT_STATUS_LABELS } from "@/shared/domain/content";
import { toOptions } from "@/shared/domain/pte";
import { Form, FormModal, createFormFields, useEntityForm } from "@/shared/form";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { useLookup } from "@/shared/lookups/use-lookup";
import { Avatar, Badge, ContentStatusBadge } from "@/shared/ui";
import { useCreateTestimonial, useDeleteTestimonial, useTestimonials, useUpdateTestimonial } from "../hooks/use-testimonials";
import { testimonialSchema, type TestimonialFormValues } from "../schemas";
import type { Testimonial, TestimonialQuery } from "../types";

const F = createFormFields<TestimonialFormValues>();

type FilterKey = "status" | "courseId";

function useTestimonialsList(query: ListParams<FilterKey>) {
  return useTestimonials(query as TestimonialQuery);
}

const columns: Column<Testimonial>[] = [
  {
    key: "student",
    header: "Học viên",
    sortKey: "studentName",
    className: "min-w-[260px]",
    cell: (t) => (
      <span className="flex items-start gap-3">
        <Avatar name={t.studentName} src={t.avatarUrl} />
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 font-medium text-gray-800 dark:text-white/90">
            {t.studentName}
            {t.isFeatured && <Star className="size-3.5 fill-warning-500 text-warning-500" aria-label="Nổi bật" />}
          </span>
          <span className="block text-theme-xs text-gray-500">{t.headline}</span>
        </span>
      </span>
    ),
  },
  {
    key: "score",
    header: "Điểm",
    sortKey: "scoreAfter",
    cell: (t) => (
      <span className="inline-flex items-center gap-1.5 font-medium">
        {t.scoreBefore !== undefined && (
          <>
            <span className="text-gray-500">{t.scoreBefore}</span>
            <ArrowRight className="size-3.5 text-gray-400" aria-hidden />
          </>
        )}
        <span className="text-success-600">{t.scoreAfter}</span>
      </span>
    ),
  },
  { key: "rating", header: "Đánh giá", sortKey: "rating", hideBelow: "md", cell: (t) => <span aria-label={`${t.rating} sao`}>{"★".repeat(t.rating)}<span className="text-gray-300">{"★".repeat(5 - t.rating)}</span></span> },
  { key: "course", header: "Khóa học", hideBelow: "lg", cell: (t) => t.courseName ?? "—" },
  { key: "video", header: "Video", hideBelow: "lg", align: "center", cell: (t) => (t.videoUrl ? <Badge color="info">Có</Badge> : "—") },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (t) => <ContentStatusBadge status={t.status} /> },
];

function TestimonialDialog({ item, open, onClose }: { item: Testimonial | null; open: boolean; onClose: () => void }) {
  const create = useCreateTestimonial();
  const update = useUpdateTestimonial();
  const courses = useLookup("courses");
  const { can } = usePermissions();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: testimonialSchema,
    entity: item,
    defaults: { studentName: "", headline: "", quote: "", avatarUrl: "", scoreBefore: undefined, scoreAfter: undefined, rating: 5, courseId: "", videoUrl: "", isFeatured: false, status: "draft", sortOrder: 1 },
    toValues: (t) => ({
      studentName: t.studentName,
      headline: t.headline,
      quote: t.quote,
      avatarUrl: t.avatarUrl ?? "",
      scoreBefore: t.scoreBefore,
      scoreAfter: t.scoreAfter,
      rating: t.rating,
      courseId: t.courseId ?? "",
      videoUrl: t.videoUrl ?? "",
      isFeatured: t.isFeatured,
      status: t.status,
      sortOrder: t.sortOrder,
    }),
    resetKey: open,
    create: (v) => create.mutateAsync(v),
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved: onClose,
  });
  const canApprove = can("testimonial.approve");
  const currentStatus = form.watch("status");
  const statusOptions = toOptions(CONTENT_STATUS_LABELS).filter((o) => canApprove || o.value !== "published" || currentStatus === "published");

  return (
    <FormModal open={open} onClose={onClose} title={isEdit ? "Sửa cảm nhận" : "Thêm cảm nhận"} size="lg" formId="testimonial-form" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="testimonial-form">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <F.Input name="studentName" label="Tên học viên" required />
          <F.Input name="headline" label="Tiêu đề ngắn" required placeholder="Du học Úc – từ PTE 36 lên 65" />
          <F.Textarea name="quote" label="Cảm nhận" required rows={4} className="md:col-span-2" />
          <F.Input name="scoreBefore" label="Điểm trước" type="number" numeric min={10} max={90} />
          <F.Input name="scoreAfter" label="Điểm sau" type="number" numeric required min={10} max={90} />
          <F.Input name="rating" label="Đánh giá (1–5 sao)" type="number" numeric required min={1} max={5} />
          <F.Select name="courseId" label="Khóa học" options={courses.options} placeholder="— Không gắn khóa —" />
          <F.Input name="avatarUrl" label="Ảnh học viên (URL)" />
          <F.Input name="videoUrl" label="Video (URL)" />
          <F.Select name="status" label="Trạng thái" options={statusOptions} hint={canApprove ? undefined : "Chọn “Chờ duyệt” để gửi duyệt"} />
          <F.Input name="sortOrder" label="Thứ tự hiển thị" type="number" numeric required min={0} />
          <F.Switch name="isFeatured" label="Nổi bật (trang chủ)" />
        </div>
      </Form>
    </FormModal>
  );
}

export function TestimonialsPage() {
  const dialog = useDialogState<Testimonial>();
  const courses = useLookup("courses");
  const filters: FilterDef<FilterKey>[] = [
    { key: "status", label: "Trạng thái", options: toOptions(CONTENT_STATUS_LABELS) },
    { key: "courseId", label: "Khóa học", options: courses.options },
  ];
  return (
    <>
      <CrudListPage<Testimonial, FilterKey>
        title="Cảm nhận & câu chuyện thành công"
        description="Minh chứng năng lực trung tâm: điểm trước/sau, video và cảm nhận học viên"
        resource="testimonial"
        noun="cảm nhận"
        useList={useTestimonialsList}
        useRemove={useDeleteTestimonial}
        columns={columns}
        filters={filters}
        defaultSort={{ sortBy: "sortOrder", sortOrder: "asc" }}
        searchPlaceholder="Tìm theo tên, nội dung…"
        getRowLabel={(t) => t.studentName}
        onCreate={dialog.openCreate}
        onEdit={dialog.openEdit}
      />
      <TestimonialDialog item={dialog.editing} open={dialog.open} onClose={dialog.close} />
    </>
  );
}
