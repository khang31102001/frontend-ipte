"use client";

import { ArrowDown, ArrowUp, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { usePermissions } from "@/core/rbac";
import { PTE_LEVEL_LABELS, toOptions } from "@/shared/domain/pte";
import { Form, FormActions, createFormFields, useEntityForm } from "@/shared/form";
import { useLookup } from "@/shared/lookups/use-lookup";
import { Button, Card, CardBody, CardHeader } from "@/shared/ui";
import { toDateInputValue } from "@/shared/lib/format";
import { useCreateLearningPath, useGeneratePath, useUpdateLearningPath } from "../hooks/use-learning-paths";
import { learningPathSchema, type LearningPathFormValues } from "../schemas";
import { PATH_STATUS_LABELS, STEP_STATUS_LABELS, type LearningPath } from "../types";

const F = createFormFields<LearningPathFormValues>();

interface GeneratedInfo {
  feasible: boolean;
  warnings: string[];
  weeks: number;
  endDate: string;
}

const today = () => toDateInputValue(new Date());

const DEFAULTS: Partial<LearningPathFormValues> = {
  studentId: "",
  title: "",
  currentLevel: "none",
  targetScore: 50,
  deadline: "",
  startDate: today(),
  weeklyHours: 8,
  status: "draft",
  steps: [],
};

function toValues(p: LearningPath): Partial<LearningPathFormValues> {
  return {
    studentId: p.studentId,
    title: p.title,
    currentLevel: p.currentLevel,
    targetScore: p.targetScore,
    deadline: p.deadline ?? "",
    startDate: p.startDate,
    weeklyHours: p.weeklyHours,
    status: p.status,
    steps: p.steps.map((s) => ({
      title: s.title,
      courseId: s.courseId ?? "",
      targetScore: s.targetScore,
      startDate: s.startDate,
      endDate: s.endDate,
      status: s.status,
      note: s.note ?? "",
    })),
  };
}

export function LearningPathForm({
  path,
  onSaved,
  onCancel,
}: {
  path?: LearningPath;
  onSaved?: (path: LearningPath) => void;
  onCancel?: () => void;
}) {
  const create = useCreateLearningPath();
  const update = useUpdateLearningPath();
  const generate = useGeneratePath();
  const [generated, setGenerated] = useState<GeneratedInfo | null>(null);
  const students = useLookup("students");
  const courses = useLookup("courses");
  const { can } = usePermissions();

  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: learningPathSchema,
    entity: path,
    defaults: DEFAULTS,
    toValues,
    create: (values) => create.mutateAsync(values),
    update: (id, values) => update.mutateAsync({ id, input: values }),
    onSaved,
  });
  const steps = useFieldArray({ control: form.control, name: "steps" });
  const canWrite = can(isEdit ? "learning_path.edit" : "learning_path.create");

  async function handleGenerate() {
    const ok = await form.trigger(["currentLevel", "targetScore", "startDate", "weeklyHours", "deadline"]);
    if (!ok) return;
    const v = form.getValues();
    const result = await generate.mutateAsync({
      currentLevel: v.currentLevel,
      targetScore: Number(v.targetScore),
      deadline: v.deadline || undefined,
      startDate: v.startDate,
      weeklyHours: Number(v.weeklyHours),
    });
    steps.replace(
      result.steps.map((s) => ({
        title: s.title,
        courseId: s.courseId ?? "",
        targetScore: s.targetScore,
        startDate: s.startDate,
        endDate: s.endDate,
        status: s.status,
        note: "",
      })),
    );
    generate.reset();
    form.setValue("deadline", v.deadline ?? "");
    setGenerated({ feasible: result.feasible, warnings: result.warnings, weeks: result.estimatedWeeks, endDate: result.endDate });
  }

  return (
    <Form form={form} onSubmit={onSubmit} id="learning-path-form">
      <fieldset disabled={!canWrite || isSubmitting} className="space-y-5">
        <Card>
          <CardHeader title="Thông tin lộ trình" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Select name="studentId" label="Học viên" required options={students.options} placeholder="— Chọn học viên —" disabled={isEdit} />
            <F.Input name="title" label="Tên lộ trình" required placeholder="Lộ trình Nguyễn Văn A → PTE 65" />
            <F.Select name="currentLevel" label="Trình độ hiện tại" options={toOptions(PTE_LEVEL_LABELS)} />
            <F.Input name="targetScore" label="Điểm mục tiêu" type="number" numeric required min={10} max={90} />
            <F.Input name="startDate" label="Ngày bắt đầu" type="date" required />
            <F.Input name="deadline" label="Hạn cần chứng chỉ" type="date" />
            <F.Input name="weeklyHours" label="Giờ học / tuần" type="number" numeric required min={1} max={80} />
            <F.Select name="status" label="Trạng thái" options={toOptions(PATH_STATUS_LABELS)} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Các bước học"
            description="Gợi ý tự động dựa trên trình độ hiện tại, điểm mục tiêu, số giờ học và hạn chứng chỉ; có thể chỉnh sửa thủ công."
            actions={
              canWrite && (
                <>
                  <Button variant="outline" size="sm" startIcon={<Sparkles className="size-4" />} loading={generate.isPending} onClick={handleGenerate}>
                    Gợi ý lộ trình
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    startIcon={<Plus className="size-4" />}
                    onClick={() =>
                      steps.append({ title: "", courseId: "", targetScore: undefined, startDate: today(), endDate: today(), status: "pending", note: "" })
                    }
                  >
                    Thêm bước
                  </Button>
                </>
              )
            }
          />
          <CardBody className="space-y-4">
            {generated && (
              <div
                role="status"
                className={`rounded-lg border px-4 py-3 text-sm ${generated.feasible ? "border-success-300 bg-success-50 text-success-700" : "border-warning-300 bg-warning-50 text-warning-600"}`}
              >
                <p className="font-medium">
                  {generated.feasible ? "Lộ trình khả thi" : "Lộ trình chưa kịp hạn"} · ước tính {generated.weeks} tuần, hoàn thành {generated.endDate}
                </p>
                {generated.warnings.map((w) => (
                  <p key={w}>• {w}</p>
                ))}
              </div>
            )}
            {form.formState.errors.steps?.root?.message && <p role="alert" className="text-sm text-error-500">{form.formState.errors.steps.root.message}</p>}
            {typeof form.formState.errors.steps?.message === "string" && <p role="alert" className="text-sm text-error-500">{form.formState.errors.steps.message}</p>}
            {steps.fields.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">Chưa có bước nào. Bấm “Gợi ý lộ trình” hoặc “Thêm bước”.</p>
            )}
            {steps.fields.map((field, index) => (
              <div key={field.id} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-brand-500">Bước {index + 1}</p>
                  {canWrite && (
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" aria-label="Chuyển lên" disabled={index === 0} onClick={() => steps.move(index, index - 1)}>
                        <ArrowUp className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Chuyển xuống" disabled={index === steps.fields.length - 1} onClick={() => steps.move(index, index + 1)}>
                        <ArrowDown className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Xóa bước" onClick={() => steps.remove(index)}>
                        <Trash2 className="size-4 text-error-500" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <F.Input name={`steps.${index}.title`} label="Tên bước" required className="md:col-span-2" />
                  <F.Select name={`steps.${index}.courseId`} label="Khóa học" options={courses.options} placeholder="— Không gắn khóa —" />
                  <F.Input name={`steps.${index}.startDate`} label="Bắt đầu" type="date" required />
                  <F.Input name={`steps.${index}.endDate`} label="Kết thúc" type="date" required />
                  <F.Input name={`steps.${index}.targetScore`} label="Mốc điểm" type="number" numeric min={10} max={90} />
                  <F.Select name={`steps.${index}.status`} label="Trạng thái" options={toOptions(STEP_STATUS_LABELS)} />
                  <F.Input name={`steps.${index}.note`} label="Ghi chú" className="md:col-span-2" />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </fieldset>
      {canWrite && <FormActions submitting={isSubmitting} submitLabel={isEdit ? "Lưu thay đổi" : "Tạo lộ trình"} onCancel={onCancel} />}
    </Form>
  );
}
