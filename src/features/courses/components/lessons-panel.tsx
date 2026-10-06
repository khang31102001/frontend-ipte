"use client";

import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { PTE_SKILL_LABELS, PTE_SKILLS, toOptions } from "@/shared/domain/pte";
import { Form, FormModal, createFormFields, useEntityForm } from "@/shared/form";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { useCreateLesson, useDeleteLesson, useLessons, useUpdateLesson } from "../hooks/use-courses";
import { lessonSchema, type LessonFormValues } from "../schemas";
import { LESSON_STATUS_LABELS, LESSON_TYPE_LABELS, type Lesson, type LessonQuery } from "../types";
import { LessonStatusBadge } from "./course-badges";

const F = createFormFields<LessonFormValues>();

type FilterKey = "type" | "status";

function useLessonsList(query: ListParams<FilterKey>) {
  return useLessons(query as LessonQuery);
}

const columns: Column<Lesson>[] = [
  { key: "order", header: "#", sortKey: "order", className: "w-12", cell: (l) => l.order },
  {
    key: "title",
    header: "Bài học",
    sortKey: "title",
    className: "min-w-[240px]",
    cell: (l) => (
      <span>
        <span className="block font-medium text-gray-800 dark:text-white/90">{l.title}</span>
        {l.objectives && <span className="block max-w-md truncate text-theme-xs text-gray-500">{l.objectives}</span>}
      </span>
    ),
  },
  { key: "type", header: "Hình thức", hideBelow: "md", cell: (l) => LESSON_TYPE_LABELS[l.type] },
  { key: "skill", header: "Kỹ năng", hideBelow: "md", cell: (l) => (l.skill ? PTE_SKILL_LABELS[l.skill] : "Tổng hợp") },
  { key: "duration", header: "Thời lượng", sortKey: "durationMinutes", hideBelow: "sm", cell: (l) => `${l.durationMinutes} phút` },
  { key: "materials", header: "Học liệu", align: "center", hideBelow: "lg", cell: (l) => l.materialCount },
  { key: "status", header: "Trạng thái", cell: (l) => <LessonStatusBadge status={l.status} /> },
];

function LessonFormDialog({
  courseId,
  lesson,
  nextOrder,
  open,
  onClose,
}: {
  courseId: string;
  lesson: Lesson | null;
  nextOrder: number;
  open: boolean;
  onClose: () => void;
}) {
  const create = useCreateLesson();
  const update = useUpdateLesson();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: lessonSchema,
    entity: lesson,
    defaults: { courseId, title: "", order: nextOrder, type: "video", skill: undefined, durationMinutes: 60, objectives: "", status: "draft" },
    toValues: (l) => ({
      courseId: l.courseId,
      title: l.title,
      order: l.order,
      type: l.type,
      skill: l.skill,
      durationMinutes: l.durationMinutes,
      objectives: l.objectives ?? "",
      status: l.status,
    }),
    resetKey: open,
    create: (values) => create.mutateAsync(values),
    update: (id, values) => update.mutateAsync({ id, input: values }),
    onSaved: onClose,
  });

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Sửa bài học" : "Thêm bài học"}
      size="lg"
      formId="lesson-form"
      submitting={isSubmitting}
    >
      <Form form={form} onSubmit={onSubmit} id="lesson-form">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <F.Input name="title" label="Tiêu đề" required className="md:col-span-2" />
          <F.Input name="order" label="Thứ tự" type="number" numeric required min={1} />
          <F.Input name="durationMinutes" label="Thời lượng (phút)" type="number" numeric required min={5} />
          <F.Select name="type" label="Hình thức" options={toOptions(LESSON_TYPE_LABELS)} />
          <F.Select name="skill" label="Kỹ năng" options={PTE_SKILLS.map((s) => ({ value: s, label: PTE_SKILL_LABELS[s] }))} placeholder="— Tổng hợp —" />
          <F.Select name="status" label="Trạng thái" options={toOptions(LESSON_STATUS_LABELS)} />
          <F.Textarea name="objectives" label="Mục tiêu bài học" rows={3} className="md:col-span-2" />
        </div>
      </Form>
    </FormModal>
  );
}

/** Danh sách bài học của một khóa học (nhúng trong trang chi tiết khóa học). */
export function LessonsPanel({ courseId }: { courseId: string }) {
  const dialog = useDialogState<Lesson>();
  const { data } = useLessons({ courseId, pageSize: 200 });
  const nextOrder = (data?.items.reduce((m, l) => Math.max(m, l.order), 0) ?? 0) + 1;

  const filters: FilterDef<FilterKey>[] = [
    { key: "type", label: "Hình thức", options: toOptions(LESSON_TYPE_LABELS) },
    { key: "status", label: "Trạng thái", options: toOptions(LESSON_STATUS_LABELS) },
  ];

  return (
    <>
      <CrudListPage<Lesson, FilterKey>
        embedded
        title="Bài học"
        description="Các bài học/module thuộc khóa học, sắp theo thứ tự"
        resource="lesson"
        noun="bài học"
        useList={useLessonsList}
        useRemove={useDeleteLesson}
        columns={columns}
        filters={filters}
        fixedQuery={{ courseId }}
        defaultSort={{ sortBy: "order", sortOrder: "asc" }}
        getRowLabel={(l) => l.title}
        onCreate={dialog.openCreate}
        onEdit={dialog.openEdit}
      />
      <LessonFormDialog courseId={courseId} lesson={dialog.editing} nextOrder={nextOrder} open={dialog.open} onClose={dialog.close} />
    </>
  );
}
