"use client";

import { usePermissions } from "@/core/rbac";
import {
  LEARNING_PURPOSE_LABELS,
  PTE_LEVEL_LABELS,
  STUDY_MODE_LABELS,
  TARGET_COUNTRY_LABELS,
  toOptions,
} from "@/shared/domain/pte";
import { Form, FormActions, createFormFields, useEntityForm } from "@/shared/form";
import { Card, CardBody, CardHeader, ErrorState, Skeleton } from "@/shared/ui";
import { useSaveStudentProfile, useStudentProfile } from "../hooks/use-students";
import { studentProfileSchema, type StudentProfileFormValues } from "../schemas";
import type { StudentProfile } from "../types";

const F = createFormFields<StudentProfileFormValues>();

const DEFAULTS: Partial<StudentProfileFormValues> = {
  currentLevel: "none",
  purpose: "study_abroad",
  preferredMode: "online",
  currentScore: undefined,
  targetScore: undefined,
  examDeadline: "",
  purposeDetail: "",
  preferredSchedule: "",
  notes: "",
  skillScores: { speaking: undefined, writing: undefined, reading: undefined, listening: undefined },
};

function toValues(p: StudentProfile): Partial<StudentProfileFormValues> {
  return {
    currentLevel: p.currentLevel,
    currentScore: p.currentScore,
    skillScores: {
      speaking: p.skillScores?.speaking,
      writing: p.skillScores?.writing,
      reading: p.skillScores?.reading,
      listening: p.skillScores?.listening,
    },
    targetScore: p.targetScore,
    purpose: p.purpose,
    purposeDetail: p.purposeDetail ?? "",
    targetCountry: p.targetCountry,
    examDeadline: p.examDeadline ?? "",
    studyHoursPerWeek: p.studyHoursPerWeek,
    preferredMode: p.preferredMode,
    preferredSchedule: p.preferredSchedule ?? "",
    notes: p.notes ?? "",
  };
}

/** Hồ sơ PTE: trình độ hiện tại, mục tiêu, mục đích học, hạn chứng chỉ. */
export function StudentProfileForm({ studentId }: { studentId: string }) {
  const { data: profile, isLoading, error, refetch } = useStudentProfile(studentId);
  const save = useSaveStudentProfile(studentId);
  const { can } = usePermissions();

  const { form, onSubmit, isSubmitting } = useEntityForm({
    schema: studentProfileSchema,
    entity: profile ?? null,
    defaults: DEFAULTS,
    toValues,
    create: (values) => save.mutateAsync(values),
    update: (_id, values) => save.mutateAsync(values),
  });

  if (isLoading) return <Skeleton className="h-96 w-full" />;
  if (error) return <ErrorState onRetry={() => void refetch()} />;

  const canWrite = can("student.edit");

  return (
    <Form form={form} onSubmit={onSubmit} id="student-profile-form">
      <fieldset disabled={!canWrite || isSubmitting} className="space-y-5">
        {!profile && (
          <p className="rounded-lg border border-warning-300 bg-warning-50 px-4 py-3 text-sm text-warning-600">
            Học viên chưa có hồ sơ PTE. Hãy nhập mục tiêu và mục đích học để bắt đầu tư vấn lộ trình.
          </p>
        )}
        <Card>
          <CardHeader title="Trình độ hiện tại" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <F.Select name="currentLevel" label="Mức PTE hiện tại" options={toOptions(PTE_LEVEL_LABELS)} />
            <F.Input name="currentScore" label="Điểm tổng hiện tại" type="number" numeric min={10} max={90} />
            <F.Input name="studyHoursPerWeek" label="Giờ học / tuần" type="number" numeric min={1} max={80} />
            <F.Input name="skillScores.speaking" label="Speaking" type="number" numeric min={10} max={90} />
            <F.Input name="skillScores.writing" label="Writing" type="number" numeric min={10} max={90} />
            <F.Input name="skillScores.reading" label="Reading" type="number" numeric min={10} max={90} />
            <F.Input name="skillScores.listening" label="Listening" type="number" numeric min={10} max={90} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Mục tiêu & mục đích" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Input name="targetScore" label="Điểm mục tiêu" type="number" numeric required min={10} max={90} />
            <F.Input name="examDeadline" label="Hạn cần có chứng chỉ" type="date" />
            <F.Select name="purpose" label="Mục đích" options={toOptions(LEARNING_PURPOSE_LABELS)} />
            <F.Select name="targetCountry" label="Quốc gia" options={toOptions(TARGET_COUNTRY_LABELS)} placeholder="— Chưa chọn —" />
            <F.Textarea name="purposeDetail" label="Chi tiết mục đích" className="md:col-span-2" rows={3} hint="Ví dụ: xét visa 190, cần 65 mỗi kỹ năng" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Hình thức & lịch học mong muốn" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Select name="preferredMode" label="Hình thức" options={toOptions(STUDY_MODE_LABELS)} />
            <F.Input name="preferredSchedule" label="Lịch học mong muốn" placeholder="Tối T2-4-6" />
            <F.Textarea name="notes" label="Ghi chú" className="md:col-span-2" rows={3} />
          </CardBody>
        </Card>
      </fieldset>
      {canWrite && <FormActions submitting={isSubmitting} submitLabel="Lưu hồ sơ PTE" />}
    </Form>
  );
}
