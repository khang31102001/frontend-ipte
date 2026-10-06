"use client";

import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { CrudListPage, ExportCsvButton, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import {
  PTE_SKILLS,
  PTE_SKILL_LABELS,
  PTE_TARGET_SCORES,
  QUESTION_TYPES,
  QUESTION_TYPE_META,
  questionTypesBySkill,
  toOptions,
  type PteSkill,
  type QuestionType,
} from "@/shared/domain/pte";
import { Form, FormModal, createFormFields, useEntityForm } from "@/shared/form";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDate } from "@/shared/lib/format";
import { Badge, Button, Checkbox, Input, type BadgeColor } from "@/shared/ui";
import { useCreateQuestion, useDeleteQuestion, useQuestions, useUpdateQuestion } from "../hooks/use-questions";
import { questionSchema, type QuestionFormValues, type QuestionInput } from "../schemas";
import { questionService } from "../services/question-service";
import {
  DIFFICULTY_LABELS,
  MEDIA_QUESTION_TYPES,
  QUESTION_STATUS_LABELS,
  isOptionQuestion,
  type Difficulty,
  type Question,
  type QuestionQuery,
  type QuestionStatus,
} from "../types";

const F = createFormFields<QuestionFormValues>();

type FilterKey = "skill" | "type" | "difficulty" | "status";

function useQuestionsList(query: ListParams<FilterKey>) {
  return useQuestions(query as QuestionQuery);
}

const DIFFICULTY_COLOR: Record<Difficulty, BadgeColor> = { easy: "success", medium: "warning", hard: "error" };
const STATUS_COLOR: Record<QuestionStatus, BadgeColor> = { draft: "warning", published: "success", archived: "gray" };

const columns: Column<Question>[] = [
  { key: "code", header: "Mã", sortKey: "code", className: "w-24", cell: (q) => <span className="font-mono text-theme-xs">{q.code}</span> },
  {
    key: "type",
    header: "Dạng câu hỏi",
    sortKey: "type",
    className: "min-w-[220px]",
    cell: (q) => (
      <span>
        <span className="block font-medium text-gray-800 dark:text-white/90">{QUESTION_TYPE_META[q.type].label}</span>
        <Badge color="primary">{PTE_SKILL_LABELS[q.skill]}</Badge>
      </span>
    ),
  },
  { key: "prompt", header: "Đề bài", hideBelow: "md", cell: (q) => <span className="line-clamp-2 max-w-md text-gray-600">{q.content ?? q.prompt}</span> },
  { key: "difficulty", header: "Độ khó", sortKey: "difficulty", hideBelow: "sm", cell: (q) => <Badge color={DIFFICULTY_COLOR[q.difficulty]}>{DIFFICULTY_LABELS[q.difficulty]}</Badge> },
  { key: "band", header: "Mức điểm", sortKey: "targetBand", hideBelow: "lg", cell: (q) => (q.targetBand ? `PTE ${q.targetBand}` : "—") },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (q) => <Badge color={STATUS_COLOR[q.status]}>{QUESTION_STATUS_LABELS[q.status]}</Badge> },
  { key: "createdAt", header: "Ngày tạo", sortKey: "createdAt", hideBelow: "lg", cell: (q) => formatDate(q.createdAt) },
];

const CSV_COLUMNS = [
  { header: "Mã", value: (q: Question) => q.code },
  { header: "Kỹ năng", value: (q: Question) => PTE_SKILL_LABELS[q.skill] },
  { header: "Dạng câu hỏi", value: (q: Question) => QUESTION_TYPE_META[q.type].label },
  { header: "Đề bài", value: (q: Question) => q.prompt },
  { header: "Nội dung", value: (q: Question) => q.content },
  { header: "Đáp án", value: (q: Question) => (q.options.length ? q.options.filter((o) => o.isCorrect).map((o) => o.text).join(" | ") : q.answerKey) },
  { header: "Độ khó", value: (q: Question) => DIFFICULTY_LABELS[q.difficulty] },
  { header: "Mức điểm", value: (q: Question) => q.targetBand },
  { header: "Trạng thái", value: (q: Question) => QUESTION_STATUS_LABELS[q.status] },
];

function OptionsEditor({ form, disabled }: { form: UseFormReturn<QuestionFormValues, unknown, QuestionInput>; disabled?: boolean }) {
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "options" });
  const errors = form.formState.errors.options;
  const rootMessage = (errors?.root?.message ?? (typeof errors?.message === "string" ? errors.message : undefined)) as string | undefined;
  return (
    <div className="md:col-span-2">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Các lựa chọn</span>
        <Button variant="outline" size="sm" disabled={disabled} startIcon={<Plus className="size-4" />} onClick={() => append({ text: "", isCorrect: false })}>
          Thêm lựa chọn
        </Button>
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-3">
            <div className="flex-1">
              <Input
                aria-label={`Lựa chọn ${index + 1}`}
                invalid={Boolean(errors?.[index]?.text)}
                {...form.register(`options.${index}.text`)}
                disabled={disabled}
              />
              {errors?.[index]?.text?.message && <p role="alert" className="mt-1 text-theme-xs text-error-500">{String(errors[index]?.text?.message)}</p>}
            </div>
            <div className="pt-3">
              <Checkbox label="Đúng" {...form.register(`options.${index}.isCorrect`)} disabled={disabled} />
            </div>
            <Button variant="ghost" size="icon" aria-label="Xóa lựa chọn" disabled={disabled} onClick={() => remove(index)}>
              <Trash2 className="size-4 text-error-500" />
            </Button>
          </div>
        ))}
        {fields.length === 0 && <p className="text-sm text-gray-500">Chưa có lựa chọn.</p>}
      </div>
      {rootMessage && <p role="alert" className="mt-1.5 text-theme-xs text-error-500">{rootMessage}</p>}
    </div>
  );
}

function QuestionDialog({ question, open, onClose }: { question: Question | null; open: boolean; onClose: () => void }) {
  const create = useCreateQuestion();
  const update = useUpdateQuestion();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: questionSchema,
    entity: question,
    defaults: {
      skill: "speaking",
      type: "read_aloud",
      prompt: "",
      content: "",
      mediaUrl: "",
      options: [],
      answerKey: "",
      difficulty: "medium",
      targetBand: undefined,
      tags: [],
      status: "draft",
    },
    toValues: (q) => ({
      skill: q.skill,
      type: q.type,
      prompt: q.prompt,
      content: q.content ?? "",
      mediaUrl: q.mediaUrl ?? "",
      options: q.options,
      answerKey: q.answerKey ?? "",
      difficulty: q.difficulty,
      targetBand: q.targetBand,
      tags: q.tags,
      status: q.status,
    }),
    resetKey: open,
    create: (values) => create.mutateAsync(values),
    update: (id, values) => update.mutateAsync({ id, input: values }),
    onSaved: onClose,
  });

  const skill = form.watch("skill") as PteSkill;
  const type = form.watch("type") as QuestionType;
  const types = questionTypesBySkill(skill);

  // Đổi kỹ năng ⇒ dạng câu hỏi phải thuộc kỹ năng đó.
  useEffect(() => {
    if (QUESTION_TYPE_META[type]?.skill !== skill && types[0]) form.setValue("type", types[0], { shouldValidate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill]);

  const hasOptions = isOptionQuestion(type);
  const hasMedia = MEDIA_QUESTION_TYPES.includes(type);

  return (
    <FormModal open={open} onClose={onClose} title={isEdit ? "Sửa câu hỏi" : "Thêm câu hỏi"} size="xl" formId="question-form" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="question-form">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <F.Select name="skill" label="Kỹ năng" options={PTE_SKILLS.map((s) => ({ value: s, label: PTE_SKILL_LABELS[s] }))} />
          <F.Select name="type" label="Dạng câu hỏi" options={types.map((t) => ({ value: t, label: QUESTION_TYPE_META[t].label }))} />
          <F.Textarea name="prompt" label="Đề bài / hướng dẫn" required rows={3} className="md:col-span-2" />
          <F.Textarea name="content" label="Nội dung (đoạn văn / transcript)" rows={5} className="md:col-span-2" />
          {hasMedia && <F.Input name="mediaUrl" label="Âm thanh / hình ảnh (URL)" placeholder="https://…" className="md:col-span-2" />}
          {hasOptions ? (
            <OptionsEditor form={form} disabled={isSubmitting} />
          ) : (
            <F.Textarea name="answerKey" label="Đáp án mẫu / đáp án đúng" rows={3} className="md:col-span-2" hint="Với Re-order Paragraphs, nhập thứ tự đúng, ví dụ B-D-A-C" />
          )}
          <F.Select name="difficulty" label="Độ khó" options={toOptions(DIFFICULTY_LABELS)} />
          <F.Select name="targetBand" label="Mức điểm phù hợp" numeric options={PTE_TARGET_SCORES.map((s) => ({ value: s, label: `PTE ${s}` }))} placeholder="— Tất cả —" />
          <F.Select name="status" label="Trạng thái" options={toOptions(QUESTION_STATUS_LABELS)} />
          <F.Tags name="tags" label="Tag" />
        </div>
      </Form>
    </FormModal>
  );
}

export function QuestionBankPage() {
  const dialog = useDialogState<Question>();

  const filters: FilterDef<FilterKey>[] = [
    { key: "skill", label: "Kỹ năng", options: PTE_SKILLS.map((s) => ({ value: s, label: PTE_SKILL_LABELS[s] })) },
    { key: "type", label: "Dạng", options: QUESTION_TYPES.map((t) => ({ value: t, label: QUESTION_TYPE_META[t].label })) },
    { key: "difficulty", label: "Độ khó", options: toOptions(DIFFICULTY_LABELS) },
    { key: "status", label: "Trạng thái", options: toOptions(QUESTION_STATUS_LABELS) },
  ];

  return (
    <>
      <CrudListPage<Question, FilterKey>
        title="Ngân hàng câu hỏi"
        description="Quản lý câu hỏi Speaking / Writing / Reading / Listening theo từng dạng (dùng cho học liệu, không làm bài trực tiếp trên website)"
        resource="question"
        noun="câu hỏi"
        useList={useQuestionsList}
        useRemove={useDeleteQuestion}
        columns={columns}
        filters={filters}
        defaultSort={{ sortBy: "createdAt", sortOrder: "desc" }}
        searchPlaceholder="Tìm theo mã, đề bài, nội dung, tag…"
        getRowLabel={(q) => q.code}
        onCreate={dialog.openCreate}
        onEdit={dialog.openEdit}
        toolbarActions={(query) => (
          <ExportCsvButton<Question>
            permission="question.export"
            noun="câu hỏi"
            filename="ngan-hang-cau-hoi.csv"
            columns={CSV_COLUMNS}
            fetchRows={() => {
              const filtersQuery: QuestionQuery = { ...(query as QuestionQuery) };
              delete filtersQuery.page;
              delete filtersQuery.pageSize;
              return questionService.exportAll(filtersQuery);
            }}
          />
        )}
      />
      <QuestionDialog question={dialog.editing} open={dialog.open} onClose={dialog.close} />
    </>
  );
}
