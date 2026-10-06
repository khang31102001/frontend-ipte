"use client";

import { ExternalLink, FileText, Link2, Paperclip, Video, ClipboardList } from "lucide-react";
import type { ReactNode } from "react";
import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import {
  PTE_SKILL_LABELS,
  PTE_SKILLS,
  QUESTION_TYPE_META,
  questionTypesBySkill,
  toOptions,
  type PteSkill,
} from "@/shared/domain/pte";
import { Form, FormModal, createFormFields, useEntityForm } from "@/shared/form";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDate } from "@/shared/lib/format";
import { useLookup } from "@/shared/lookups/use-lookup";
import { Badge, type BadgeColor } from "@/shared/ui";
import { useCreateMaterial, useDeleteMaterial, useMaterials, useUpdateMaterial } from "../hooks/use-materials";
import { materialSchema, type MaterialFormValues } from "../schemas";
import {
  MATERIAL_STATUS_LABELS,
  MATERIAL_TYPE_LABELS,
  MATERIAL_VISIBILITY_LABELS,
  type LearningMaterial,
  type MaterialQuery,
  type MaterialType,
} from "../types";

const F = createFormFields<MaterialFormValues>();

type FilterKey = "type" | "skill" | "courseId" | "visibility" | "status";

function useMaterialsList(query: ListParams<FilterKey>) {
  return useMaterials(query as MaterialQuery);
}

const TYPE_ICON: Record<MaterialType, ReactNode> = {
  video: <Video className="size-4" />,
  pdf: <FileText className="size-4" />,
  document: <Paperclip className="size-4" />,
  link: <Link2 className="size-4" />,
  worksheet: <ClipboardList className="size-4" />,
};

const VISIBILITY_COLOR: Record<LearningMaterial["visibility"], BadgeColor> = { public: "info", enrolled: "primary", staff: "gray" };

function formatDuration(seconds?: number) {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  return `${m} phút`;
}

const columns: Column<LearningMaterial>[] = [
  {
    key: "title",
    header: "Học liệu",
    sortKey: "title",
    className: "min-w-[260px]",
    cell: (m) => (
      <span className="flex items-start gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-25 text-brand-500">{TYPE_ICON[m.type]}</span>
        <span className="min-w-0">
          <a href={m.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-gray-800 hover:text-brand-500 dark:text-white/90">
            {m.title}
            <ExternalLink className="size-3 opacity-60" aria-hidden />
          </a>
          <span className="block text-theme-xs text-gray-500">
            {MATERIAL_TYPE_LABELS[m.type]}
            {m.durationSeconds ? ` · ${formatDuration(m.durationSeconds)}` : ""}
            {m.fileSizeKb ? ` · ${(m.fileSizeKb / 1024).toFixed(1)} MB` : ""}
          </span>
        </span>
      </span>
    ),
  },
  { key: "skill", header: "Kỹ năng", hideBelow: "md", cell: (m) => (m.skill ? PTE_SKILL_LABELS[m.skill] : "—") },
  { key: "course", header: "Khóa / Bài học", hideBelow: "lg", cell: (m) => (
      <span>
        {m.courseName ?? "—"}
        {m.lessonTitle && <span className="block max-w-[220px] truncate text-theme-xs text-gray-500">{m.lessonTitle}</span>}
      </span>
    ) },
  { key: "visibility", header: "Hiển thị", hideBelow: "md", cell: (m) => <Badge color={VISIBILITY_COLOR[m.visibility]}>{MATERIAL_VISIBILITY_LABELS[m.visibility]}</Badge> },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (m) => <Badge color={m.status === "published" ? "success" : "warning"}>{MATERIAL_STATUS_LABELS[m.status]}</Badge> },
  { key: "createdAt", header: "Ngày tạo", sortKey: "createdAt", hideBelow: "lg", cell: (m) => formatDate(m.createdAt) },
];

function MaterialDialog({
  material,
  courseId,
  open,
  onClose,
}: {
  material: LearningMaterial | null;
  courseId?: string;
  open: boolean;
  onClose: () => void;
}) {
  const create = useCreateMaterial();
  const update = useUpdateMaterial();
  const courses = useLookup("courses");

  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: materialSchema,
    entity: material,
    defaults: {
      title: "",
      type: "pdf",
      url: "",
      description: "",
      skill: undefined,
      questionType: undefined,
      courseId: courseId ?? "",
      lessonId: "",
      fileSizeKb: undefined,
      durationSeconds: undefined,
      tags: [],
      visibility: "enrolled",
      status: "draft",
    },
    toValues: (m) => ({
      title: m.title,
      type: m.type,
      url: m.url,
      description: m.description ?? "",
      skill: m.skill,
      questionType: m.questionType,
      courseId: m.courseId ?? "",
      lessonId: m.lessonId ?? "",
      fileSizeKb: m.fileSizeKb,
      durationSeconds: m.durationSeconds,
      tags: m.tags,
      visibility: m.visibility,
      status: m.status,
    }),
    resetKey: open,
    create: (values) => create.mutateAsync(values),
    update: (id, values) => update.mutateAsync({ id, input: values }),
    onSaved: onClose,
  });

  const type = form.watch("type");
  const skill = form.watch("skill") as PteSkill | undefined;
  const selectedCourse = form.watch("courseId");
  const lessons = useLookup("lessons", selectedCourse ? { parentId: selectedCourse } : undefined);

  return (
    <FormModal open={open} onClose={onClose} title={isEdit ? "Sửa học liệu" : "Thêm học liệu"} size="lg" formId="material-form" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="material-form">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <F.Input name="title" label="Tiêu đề" required className="md:col-span-2" />
          <F.Select name="type" label="Loại" options={toOptions(MATERIAL_TYPE_LABELS)} />
          <F.Input name="url" label="Đường dẫn (URL)" required placeholder="https://…" />
          {type === "video" ? (
            <F.Input name="durationSeconds" label="Thời lượng (giây)" type="number" numeric min={1} />
          ) : type !== "link" ? (
            <F.Input name="fileSizeKb" label="Dung lượng (KB)" type="number" numeric min={1} />
          ) : null}
          <F.Select name="skill" label="Kỹ năng" options={PTE_SKILLS.map((s) => ({ value: s, label: PTE_SKILL_LABELS[s] }))} placeholder="— Không áp dụng —" />
          {skill && (
            <F.Select
              name="questionType"
              label="Dạng câu hỏi"
              options={questionTypesBySkill(skill).map((t) => ({ value: t, label: QUESTION_TYPE_META[t].label }))}
              placeholder="— Tất cả —"
            />
          )}
          <F.Select name="courseId" label="Thuộc khóa học" options={courses.options} placeholder="— Không gắn khóa học —" />
          <F.Select
            name="lessonId"
            label="Thuộc bài học"
            options={selectedCourse ? lessons.options : []}
            placeholder={selectedCourse ? "— Không gắn bài học —" : "Chọn khóa học trước"}
            disabled={!selectedCourse}
          />
          <F.Select name="visibility" label="Quyền xem" options={toOptions(MATERIAL_VISIBILITY_LABELS)} />
          <F.Select name="status" label="Trạng thái" options={toOptions(MATERIAL_STATUS_LABELS)} />
          <F.Textarea name="description" label="Mô tả" rows={3} className="md:col-span-2" />
          <F.Tags name="tags" label="Tag" className="md:col-span-2" />
        </div>
      </Form>
    </FormModal>
  );
}

/** Danh sách học liệu (toàn hệ thống hoặc theo một khóa học khi truyền courseId). */
export function MaterialsCrud({ courseId, embedded }: { courseId?: string; embedded?: boolean }) {
  const dialog = useDialogState<LearningMaterial>();
  const courses = useLookup("courses");

  const filters: FilterDef<FilterKey>[] = [
    { key: "type", label: "Loại", options: toOptions(MATERIAL_TYPE_LABELS) },
    { key: "skill", label: "Kỹ năng", options: PTE_SKILLS.map((s) => ({ value: s, label: PTE_SKILL_LABELS[s] })) },
    ...(courseId ? [] : [{ key: "courseId" as const, label: "Khóa học", options: courses.options }]),
    { key: "visibility", label: "Quyền xem", options: toOptions(MATERIAL_VISIBILITY_LABELS) },
    { key: "status", label: "Trạng thái", options: toOptions(MATERIAL_STATUS_LABELS) },
  ];

  return (
    <>
      <CrudListPage<LearningMaterial, FilterKey>
        embedded={embedded}
        title={embedded ? "Học liệu của khóa học" : "Học liệu"}
        description="Video, PDF, tài liệu, liên kết, worksheet dùng cho bài học và lead magnet"
        resource="learning_material"
        noun="học liệu"
        useList={useMaterialsList}
        useRemove={useDeleteMaterial}
        columns={columns}
        filters={filters}
        fixedQuery={courseId ? { courseId } : undefined}
        defaultSort={{ sortBy: "createdAt", sortOrder: "desc" }}
        searchPlaceholder="Tìm theo tiêu đề, tag…"
        getRowLabel={(m) => m.title}
        onCreate={dialog.openCreate}
        onEdit={dialog.openEdit}
      />
      <MaterialDialog material={dialog.editing} courseId={courseId} open={dialog.open} onClose={dialog.close} />
    </>
  );
}
