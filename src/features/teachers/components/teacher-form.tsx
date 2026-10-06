"use client";

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { usePermissions } from "@/core/rbac";
import { PTE_SKILLS, PTE_SKILL_LABELS, toOptions } from "@/shared/domain/pte";
import { Form, FormActions, createFormFields, useEntityForm } from "@/shared/form";
import { useLookup } from "@/shared/lookups/use-lookup";
import { Button, Card, CardBody, CardHeader } from "@/shared/ui";
import { useCreateTeacher, useUpdateTeacher } from "../hooks/use-teachers";
import { teacherSchema, type TeacherFormValues } from "../schemas";
import {
  AVAILABILITY_MODE_LABELS,
  TEACHER_STATUS_LABELS,
  WEEKDAY_LABELS,
  WEEKDAYS,
  type Teacher,
} from "../types";

const F = createFormFields<TeacherFormValues>();

const DEFAULTS: Partial<TeacherFormValues> = {
  fullName: "",
  email: "",
  phone: "",
  headline: "",
  bio: "",
  pteScore: undefined,
  yearsExperience: 0,
  specialties: [],
  qualifications: [],
  branchId: "",
  status: "active",
  availability: [],
};

function toValues(t: Teacher): Partial<TeacherFormValues> {
  return {
    fullName: t.fullName,
    email: t.email,
    phone: t.phone ?? "",
    headline: t.headline ?? "",
    bio: t.bio ?? "",
    pteScore: t.pteScore,
    yearsExperience: t.yearsExperience,
    specialties: t.specialties,
    qualifications: t.qualifications,
    branchId: t.branchId ?? "",
    status: t.status,
    availability: t.availability,
  };
}

export function TeacherForm({
  teacher,
  onSaved,
  onCancel,
}: {
  teacher?: Teacher;
  onSaved?: (teacher: Teacher) => void;
  onCancel?: () => void;
}) {
  const create = useCreateTeacher();
  const update = useUpdateTeacher();
  const branches = useLookup("branches");
  const { can } = usePermissions();

  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: teacherSchema,
    entity: teacher,
    defaults: DEFAULTS,
    toValues,
    create: (values) => create.mutateAsync(values),
    update: (id, values) => update.mutateAsync({ id, input: values }),
    onSaved,
  });
  const slots = useFieldArray({ control: form.control, name: "availability" });
  const canWrite = can(isEdit ? "teacher.edit" : "teacher.create");

  return (
    <Form form={form} onSubmit={onSubmit} id="teacher-form">
      <fieldset disabled={!canWrite || isSubmitting} className="space-y-5">
        <Card>
          <CardHeader title="Hồ sơ" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Input name="fullName" label="Họ và tên" required />
            <F.Input name="email" label="Email" type="email" required />
            <F.Input name="phone" label="Điện thoại" />
            <F.Select name="branchId" label="Cơ sở" options={branches.options} placeholder="— Chưa chọn —" />
            <F.Input name="headline" label="Chức danh / giới thiệu ngắn" className="md:col-span-2" placeholder="Giảng viên PTE Speaking & Pronunciation" />
            <F.Textarea name="bio" label="Tiểu sử" rows={4} className="md:col-span-2" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Chuyên môn" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <F.Input name="pteScore" label="Điểm PTE của giáo viên" type="number" numeric min={10} max={90} />
            <F.Input name="yearsExperience" label="Số năm kinh nghiệm" type="number" numeric required min={0} />
            <F.Select name="status" label="Trạng thái" options={toOptions(TEACHER_STATUS_LABELS)} />
            <F.CheckboxGroup
              name="specialties"
              label="Kỹ năng giảng dạy"
              options={PTE_SKILLS.map((s) => ({ value: s, label: PTE_SKILL_LABELS[s] }))}
              className="md:col-span-3"
            />
            <F.Lines name="qualifications" label="Chứng chỉ / bằng cấp" className="md:col-span-3" rows={3} placeholder="PTE 90 overall" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Lịch rảnh trong tuần"
            description="Dùng để xếp lớp và đặt lịch học thử/kèm 1-1"
            actions={
              canWrite && (
                <Button
                  variant="outline"
                  size="sm"
                  startIcon={<Plus className="size-4" />}
                  onClick={() => slots.append({ day: 0, from: "18:00", to: "21:00", mode: "online" })}
                >
                  Thêm khung giờ
                </Button>
              )
            }
          />
          <CardBody className="space-y-3">
            {slots.fields.length === 0 && <p className="py-4 text-center text-sm text-gray-500">Chưa khai báo lịch rảnh.</p>}
            {slots.fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-2 items-start gap-3 md:grid-cols-[1.2fr_1fr_1fr_1.2fr_auto]">
                <F.Select name={`availability.${index}.day`} label={index === 0 ? "Thứ" : undefined} numeric options={WEEKDAYS.map((d) => ({ value: d, label: WEEKDAY_LABELS[d] }))} />
                <F.Input name={`availability.${index}.from`} label={index === 0 ? "Từ" : undefined} type="time" />
                <F.Input name={`availability.${index}.to`} label={index === 0 ? "Đến" : undefined} type="time" />
                <F.Select name={`availability.${index}.mode`} label={index === 0 ? "Hình thức" : undefined} options={toOptions(AVAILABILITY_MODE_LABELS)} />
                {canWrite && (
                  <Button variant="ghost" size="icon" aria-label="Xóa khung giờ" className={index === 0 ? "mt-7" : ""} onClick={() => slots.remove(index)}>
                    <Trash2 className="size-4 text-error-500" />
                  </Button>
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </fieldset>
      {canWrite && <FormActions submitting={isSubmitting} submitLabel={isEdit ? "Lưu thay đổi" : "Tạo giáo viên"} onCancel={onCancel} />}
    </Form>
  );
}
