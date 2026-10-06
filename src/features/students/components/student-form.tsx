"use client";

import { usePermissions } from "@/core/rbac";
import { Form, FormActions, createFormFields, useEntityForm } from "@/shared/form";
import { toOptions } from "@/shared/domain/pte";
import { useLookup } from "@/shared/lookups/use-lookup";
import { Card, CardBody, CardHeader } from "@/shared/ui";
import { useCreateStudent, useUpdateStudent } from "../hooks/use-students";
import { studentSchema, type StudentFormValues } from "../schemas";
import { GENDER_LABELS, LEAD_SOURCE_LABELS, STUDENT_STATUS_LABELS, type Student } from "../types";

const F = createFormFields<StudentFormValues>();

const DEFAULTS: StudentFormValues = {
  fullName: "",
  gender: "female",
  dateOfBirth: "",
  email: "",
  phone: "",
  zalo: "",
  city: "",
  address: "",
  source: "website",
  branchId: "",
  assignedTo: "",
  status: "active",
  tags: [],
  notes: "",
};

function toValues(s: Student): StudentFormValues {
  return {
    fullName: s.fullName,
    gender: s.gender,
    dateOfBirth: s.dateOfBirth ?? "",
    email: s.email,
    phone: s.phone,
    zalo: s.zalo ?? "",
    city: s.city ?? "",
    address: s.address ?? "",
    source: s.source,
    branchId: s.branchId ?? "",
    assignedTo: s.assignedTo ?? "",
    status: s.status,
    tags: s.tags,
    notes: s.notes ?? "",
  };
}

/** Form hồ sơ master học viên, dùng cho cả tạo mới và chỉnh sửa. */
export function StudentForm({
  student,
  onSaved,
  onCancel,
}: {
  student?: Student;
  onSaved?: (student: Student) => void;
  onCancel?: () => void;
}) {
  const create = useCreateStudent();
  const update = useUpdateStudent();
  const branches = useLookup("branches");
  const staff = useLookup("staff");
  const { can } = usePermissions();

  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: studentSchema,
    entity: student,
    defaults: DEFAULTS,
    toValues,
    create: (values) => create.mutateAsync(values),
    update: (id, values) => update.mutateAsync({ id, input: values }),
    onSaved,
  });

  const canWrite = can(isEdit ? "student.edit" : "student.create");

  return (
    <Form form={form} onSubmit={onSubmit} id="student-form">
      <fieldset disabled={!canWrite || isSubmitting} className="space-y-5">
        <Card>
          <CardHeader title="Thông tin cá nhân" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Input name="fullName" label="Họ và tên" required placeholder="Nguyễn Văn A" />
            <F.Select name="gender" label="Giới tính" options={toOptions(GENDER_LABELS)} />
            <F.Input name="dateOfBirth" label="Ngày sinh" type="date" />
            <F.Input name="city" label="Tỉnh / Thành phố" />
            <F.Input name="address" label="Địa chỉ" className="md:col-span-2" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Liên hệ" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Input name="email" label="Email" type="email" required placeholder="email@example.com" />
            <F.Input name="phone" label="Số điện thoại" required placeholder="09xx xxx xxx" />
            <F.Input name="zalo" label="Zalo / WhatsApp" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Quản lý" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Select name="source" label="Nguồn lead" options={toOptions(LEAD_SOURCE_LABELS)} />
            <F.Select name="status" label="Trạng thái" options={toOptions(STUDENT_STATUS_LABELS)} />
            <F.Select name="branchId" label="Cơ sở" options={branches.options} placeholder="— Chưa chọn —" />
            <F.Select name="assignedTo" label="Nhân viên phụ trách" options={staff.options} placeholder="— Chưa phân công —" />
            <F.Tags name="tags" label="Tag" className="md:col-span-2" placeholder="VIP, Cần gọi lại" />
            <F.Textarea name="notes" label="Ghi chú" className="md:col-span-2" />
          </CardBody>
        </Card>
      </fieldset>

      {canWrite && (
        <FormActions submitting={isSubmitting} submitLabel={isEdit ? "Lưu thay đổi" : "Tạo học viên"} onCancel={onCancel} />
      )}
    </Form>
  );
}
