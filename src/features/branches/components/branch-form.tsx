"use client";

import { usePermissions } from "@/core/rbac";
import { toOptions } from "@/shared/domain/pte";
import { Form, FormActions, createFormFields, useEntityForm } from "@/shared/form";
import { Card, CardBody, CardHeader } from "@/shared/ui";
import { useCreateBranch, useUpdateBranch } from "../hooks/use-branches";
import { branchSchema, type BranchFormValues } from "../schemas";
import { BRANCH_COUNTRY_LABELS, BRANCH_STATUS_LABELS, type Branch } from "../types";

const F = createFormFields<BranchFormValues>();

const DEFAULTS: BranchFormValues = {
  code: "",
  name: "",
  country: "VN",
  city: "",
  address: "",
  phone: "",
  email: "",
  managerName: "",
  openingHours: "",
  mapUrl: "",
  status: "active",
};

function toValues(b: Branch): BranchFormValues {
  return {
    code: b.code,
    name: b.name,
    country: b.country,
    city: b.city,
    address: b.address,
    phone: b.phone,
    email: b.email ?? "",
    managerName: b.managerName ?? "",
    openingHours: b.openingHours ?? "",
    mapUrl: b.mapUrl ?? "",
    status: b.status,
  };
}

export function BranchForm({ branch, onSaved, onCancel }: { branch?: Branch; onSaved?: (b: Branch) => void; onCancel?: () => void }) {
  const create = useCreateBranch();
  const update = useUpdateBranch();
  const { can } = usePermissions();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: branchSchema,
    entity: branch,
    defaults: DEFAULTS,
    toValues,
    create: (v) => create.mutateAsync(v),
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved,
  });
  const canWrite = can(isEdit ? "branch.edit" : "branch.create");

  return (
    <Form form={form} onSubmit={onSubmit} id="branch-form">
      <fieldset disabled={!canWrite || isSubmitting} className="space-y-5">
        <Card>
          <CardHeader title="Thông tin cơ sở" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Input name="name" label="Tên cơ sở" required />
            <F.Input name="code" label="Mã cơ sở" required placeholder="HCM-Q1" />
            <F.Select name="country" label="Quốc gia" options={toOptions(BRANCH_COUNTRY_LABELS)} />
            <F.Input name="city" label="Thành phố" required />
            <F.Input name="address" label="Địa chỉ" required className="md:col-span-2" />
            <F.Select name="status" label="Trạng thái" options={toOptions(BRANCH_STATUS_LABELS)} />
            <F.Input name="managerName" label="Quản lý cơ sở" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Liên hệ & giờ mở cửa" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Input name="phone" label="Điện thoại" required />
            <F.Input name="email" label="Email" type="email" />
            <F.Input name="openingHours" label="Giờ mở cửa" placeholder="08:00 – 21:00 (T2–CN)" />
            <F.Input name="mapUrl" label="Liên kết bản đồ" placeholder="https://maps.google.com/…" />
          </CardBody>
        </Card>
      </fieldset>
      {canWrite && <FormActions submitting={isSubmitting} submitLabel={isEdit ? "Lưu thay đổi" : "Tạo cơ sở"} onCancel={onCancel} />}
    </Form>
  );
}
